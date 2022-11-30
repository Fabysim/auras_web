<template>
  <div>

    <!--Actions-->
    <v-card>
      <v-card-title class="justify-center">
        Method: {{ currentMethod.name }}

        <v-spacer/>
        <v-btn color="#a83248"
               class="white--text"
               @click="redirectTo('IndexAuras')"
        >
          All Methods
        </v-btn>
        <v-spacer/>
        <download-excel :data="downloadedData" :name="currentMethod.name + '.xls'">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-on="on"
                  v-bind="attrs"
                  color="#1dc249"
                  class="white--text"
                  min-width="150"
              >
                <v-icon color="#FFFFFF">mdi-file-excel</v-icon>
                <span class="mr-2">Download</span>
              </v-btn>
            </template>
            <span>Download method in Excel</span>
          </v-tooltip>
        </download-excel>

        <v-spacer/>
        <v-btn style="background-color: dodgerblue; color: white;"
               @click="saveMethod">
          Save Method
        </v-btn>
      </v-card-title>

      <!-- Modules' tables -->
      <vue-scroll-snap style="width:100%; overflow: hidden"
                       :horizontal="true">

        <v-data-table :headers="stepModule.columns"
                      :hide-default-footer="true"
                      disable-pagination>

        </v-data-table>

        <v-card-text style="padding: 20px;width:90%">
          <vue-scroll-snap :horizontal="true">
            <table>
              <tr>
                <!--Tray module-->

                <td>
                  <v-card>
                    <v-card-title class="justify-center module-title-color">{{ trayModule.name }}</v-card-title>
                    <v-card-text>

                      <v-data-table

                          :headers="trayModule.columns"
                          :items="trayModule.data"
                          :hide-default-footer="true"
                          disable-pagination
                      >
                        <template v-slot:body="{ items, headers }">
                          <tbody v-if="items.length > 0">
                          <tr v-for="(item,idx) in items" :key="idx">
                            <td v-for="(header,key) in headers" :key="key">
                              <v-edit-dialog
                                  :return-value.sync="item[header.value]"
                                  @save="save(item[header.value], key, trayModule.name, idx)"
                                  @cancel="cancel"
                                  @open="open"
                                  @close="close"

                              > {{ item[header.value] }}
                                <template v-slot:input>
                                  <v-text-field
                                      v-model.number="item[header.value]"
                                      label="Edit"
                                      single-line
                                  ></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                          </tr>
                          </tbody>
                        </template>

                      </v-data-table>

                    </v-card-text>
                  </v-card>
                </td>

                <!--Liquid dispenser module-->

                <td>
                  <v-card>
                    <v-card-title class="justify-center module-title-color">
                      <!--{{ dropDispenserModule.name }}-->
                      DD
                    </v-card-title>

                    <v-card-text>
                      <v-data-table
                          :headers="dropDispenserModule.columns"
                          :items="dropDispenserModule.data"
                          :hide-default-footer="true"
                          disable-pagination
                      >
                        <template v-slot:body="{ items, headers }">
                          <tbody v-if="items.length > 0">
                          <tr v-for="(item,idx) in items" :key="idx">
                            <td v-for="(header,key) in headers" :key="key">
                              <v-edit-dialog
                                  :return-value.sync="item[header.value]"
                                  @save="save(item[header.value], key, dropDispenserModule.name, idx)"
                                  @cancel="cancel"
                                  @open="open"
                                  @close="close"

                              > {{ item[header.value] }}
                                <template v-slot:input>
                                  <v-text-field
                                      v-model="item[header.value]"
                                      label="Edit"
                                      single-line
                                  ></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                          </tr>
                          </tbody>
                        </template>
                      </v-data-table>
                    </v-card-text>

                  </v-card>
                </td>

                <!--Drop dispenser module-->

                <td>
                  <v-card>
                    <v-card-title class="justify-center module-title-color" style="color: dodgerblue">
                      {{ liquidDispenserModule.name }}
                    </v-card-title>

                    <v-card-text>
                      <v-data-table
                          :headers="liquidDispenserModule.columns"
                          :items="liquidDispenserModule.data"
                          :hide-default-footer="true"
                          disable-pagination
                      >
                        <template v-slot:body="{ items, headers }">
                          <tbody v-if="items.length > 0">
                          <tr v-for="(item,idx) in items" :key="idx">
                            <td v-for="(header,key) in headers" :key="key">
                              <v-edit-dialog
                                  :return-value.sync="item[header.value]"
                                  @save="save(item[header.value], key, liquidDispenserModule.name, idx)"
                                  @cancel="cancel"
                                  @open="open"
                                  @close="close"

                              > {{ item[header.value] }}
                                <template v-slot:input>
                                  <v-text-field
                                      v-model="item[header.value]"
                                      label="Edit"
                                      single-line
                                  ></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                          </tr>
                          </tbody>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </td>

                <!--TLC Module-->

                <td>
                  <v-card>
                    <v-card-title class="justify-center module-title-color">{{ tlcMigrationModule.name }}</v-card-title>
                    <v-card-text>
                      <v-data-table
                          :headers="tlcMigrationModule.columns"
                          :items="tlcMigrationModule.data"
                          :hide-default-footer="true"
                          disable-pagination
                      >
                        <template v-slot:body="{ items, headers }">
                          <tbody v-if="items.length > 0">
                          <tr v-for="(item,idx) in items" :key="idx">
                            <td v-for="(header,key) in headers" :key="key">
                              <v-edit-dialog
                                  :return-value.sync="item[header.value]"
                                  @save="save(item[header.value], key, tlcMigrationModule.name, idx)"
                                  @cancel="cancel"
                                  @open="open"
                                  @close="close"

                              > {{ item[header.value] }}
                                <template v-slot:input>
                                  <v-text-field
                                      v-model="item[header.value]"
                                      label="Edit"
                                      single-line
                                  ></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                          </tr>
                          </tbody>
                        </template>
                      </v-data-table>

                    </v-card-text>
                  </v-card>
                </td>

                <!--PH Meter Module-->

                <td>
                  <v-card>
                    <v-card-title class="justify-center module-title-color">{{ phMeterModule.name }}</v-card-title>
                    <v-card-text>
                      <v-data-table
                          :headers="phMeterModule.columns"
                          :items="phMeterModule.data"
                          :hide-default-footer="true"
                          disable-pagination
                      >
                        <template v-slot:body="{ items, headers }">
                          <tbody v-if="items.length > 0">
                          <tr v-for="(item,idx) in items" :key="idx">
                            <td v-for="(header,key) in headers" :key="key">
                              <v-edit-dialog
                                  :return-value.sync="item[header.value]"
                                  @save="save(item[header.value], key, phMeterModule.name, idx)"
                                  @cancel="cancel"
                                  @open="open"
                                  @close="close"

                              > {{ item[header.value] }}
                                <template v-slot:input>
                                  <v-text-field
                                      v-model="item[header.value]"
                                      label="Edit"
                                      single-line
                                  ></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                          </tr>
                          </tbody>
                        </template>
                      </v-data-table>

                    </v-card-text>
                  </v-card>
                </td>

                <!--waiting condition-->

                <td>
                  <v-card>
                    <v-card-title class="justify-center module-title-color">
                      {{ waitingCondition.name }}
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                          :headers="waitingCondition.columns"
                          :items="waitingCondition.data"
                          :hide-default-footer="true"
                          disable-pagination
                      >
                        <template v-slot:body="{ items, headers }">
                          <tbody v-if="items.length > 0">
                          <tr v-for="(item,idx) in items" :key="idx">
                            <td v-for="(header,key) in headers" :key="key">
                              <v-edit-dialog
                                  :return-value.sync="item[header.value]"
                                  @save="save(item[header.value], key, waitingCondition.name, idx)"
                                  @cancel="cancel"
                                  @open="open"
                                  @close="close"

                              > {{ item[header.value] }}
                                <template v-slot:input>
                                  <v-text-field
                                      v-model="item[header.value]"
                                      label="Edit"
                                      single-line
                                  ></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                          </tr>
                          </tbody>
                        </template>

                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </td>

                <!--Comments-->

                <td>
                  <v-card>
                    <v-card-title class="justify-center module-title-color">Comment</v-card-title>
                    <v-card-text>
                      <v-data-table
                          :headers="commentModule.columns"
                          :items="commentModule.data"
                          :hide-default-footer="true"
                          disable-pagination
                      >
                        <template v-slot:body="{ items, headers }">
                          <tbody v-if="items.length > 0">
                          <tr v-for="(item,idx) in items" :key="idx">
                            <td v-for="(header,key) in headers" :key="key">
                              <v-edit-dialog
                                  :return-value.sync="item[header.value]"
                                  @save="save(item[header.value], key, commentModule.name, idx)"
                                  @cancel="cancel"
                                  @open="open"
                                  @close="close"

                              > {{ item[header.value] }}
                                <template v-slot:input>
                                  <v-text-field
                                      v-model="item[header.value]"
                                      label="Edit"
                                      single-line
                                  ></v-text-field>
                                </template>
                              </v-edit-dialog>
                            </td>
                          </tr>
                          </tbody>
                        </template>

                      </v-data-table>

                    </v-card-text>
                  </v-card>
                </td>

              </tr>
            </table>
          </vue-scroll-snap>
        </v-card-text>

        <v-data-table :headers="stepModule.columns"
                      :hide-default-footer="true"
                      disable-pagination/>
      </vue-scroll-snap>


    </v-card>

    <!-- PlatForms -->

    <PlatFormCard @lineSaved="SaveLine" ref="plateForm"/>

  </div>
</template>

<script>
// @ is an alias to /src
import PlatFormCard from '@/components/PlatformCard.vue'

import VueScrollSnap from "vue-scroll-snap";
import axios from "axios";


export default {
  name: 'AurasConfigView',
  components: {
    PlatFormCard,
    VueScrollSnap
  },

  data: () => ({

    lineNumber: 0,
    downloadedData: [],
    currentMethod: '',
    currentStep: 0,

    stepModule: {
      name: '',
      columns: [
        {text: 'Step', value: 'Step', align: 'start', width: 82, sortable: true},
      ],
      data: []
    },

    trayModule: {
      name: '',
      columns: [
        {text: 'Step', value: 'Step', align: 'start', width: 82, sortable: true},
        {text: 'Value1', value: 'value1', width: 82, sortable: false}
      ],
      data: []
    },

    spModule: {
      name: '',
      columns: [

        {text: 'Syr', value: 'SyrValue', align: 'start', width: 82},
      ],
      data: [
        {
          StdValue: 0,
        }
      ]
    },

    dropDispenserModule: {
      name: '',
      columns: [
        {text: 'Value', value: 'stdValue', width: 82, sortable: false},
      ],
      data: []
    },

    liquidDispenserModule: {
      name: '',
      columns: [
        {text: "LDS1", value: "LDS1", width: 82, sortable: false},
        {text: "LDS2", value: "LDS2", width: 82, sortable: false},
        {text: "LDS3", value: "LDS3", width: 82, sortable: false},
        {text: "LDS4", value: "LDS4", width: 82, sortable: false},
        {text: "LDS5", value: "LDS5", width: 82, sortable: false},
        {text: "LDS6", value: "LDS6", width: 82, sortable: false},
        {text: "LDS7", value: "LDS7", width: 82, sortable: false},
        {text: "LDS8", value: "LDS8", width: 82, sortable: false},
        {text: "LDS9", value: "LDS9", width: 82, sortable: false},
        {text: "SP1 Target", value: "SP1P", width: 150, sortable: false},
        {text: "SP1 Speed", value: "SP1", width: 82, sortable: false},
        {text: "SP2 Target", value: "SP2P", width: 150, sortable: false},
        {text: "SP2 Speed", value: "SP2", width: 82, sortable: false},
        {text: "SP3 Target", value: "SP2P", width: 150, sortable: false},
        {text: "SP3 Speed", value: "SP3", width: 82, sortable: false},
        {text: "Rotations pump", value: "PUMP1P", width: 82, sortable: false},
        {text: "Speed pump (rpm)", value: "PUMP1S", width: 82, sortable: false},
      ],
      data: []
    },

    tlcMigrationModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Step1', width: 82, sortable: false},
        {text: 'Value2', value: 'Step2', width: 82, sortable: false},
        {text: 'Value3', value: 'Step3', width: 82, sortable: false},
        {text: 'Value4', value: 'Step4', width: 82, sortable: false},
      ],
      data: []
    },

    phMeterModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Step1', width: 82, sortable: false},
        {text: 'Value2', value: 'Step2', width: 82, sortable: false},
        {text: 'Value3', value: 'Step3', width: 82, sortable: false},
        {text: 'Value4', value: 'Step4', width: 82, sortable: false},
      ],
      data: []
    },

    commentModule: {
      name: '',
      columns: [
        {text: 'Comment', value: 'Comment', width: 120, sortable: false},
      ],
      data: []
    },

    GinaModule: {
      name: '',
      columns: [
        {text: 'Comment', value: 'Comment', width: 82, sortable: false},
      ],
      data: []
    },

    waitingCondition: {
      name: 'Waiting condition',
      columns: [{text: 'Waiting condition', value: 'WaitingCondition', width: 160, sortable: false}],
      data: []
    }

  }),

  mounted() {
    this.initializeModulesNames();
    this.fetchMethodName();

  },

  methods: {

    /*------------------------------------------------------------------------
    * Function used to add a step in the currently created method
    * ------------------------------------------------------------------------*/
    SaveLine() {

      this.saveDropDispenserStep();
      this.saveTrayStep();
      this.saveLiquidDispenserStep();
      this.saveTlcMigrationStep();
      this.savePhMeterStep();
      this.saveCommentsStep();
      this.saveWaitingConditionStep();

      this.createMethodData();
      this.$refs.plateForm.resetPlatformTables();

    },

    /*------------------------------------------------------------------------
    * Function create all method's data
    * ------------------------------------------------------------------------*/
    createMethodData() {

      let methodStep = this.getSingleMethodLine();


      if (this.currentMethod.data === undefined) {

        this.$data.currentMethod.data = [];
        for (let i = 0; i < methodStep.length; i++) {
          let objectLength = Object.keys(methodStep[i]).length;

          this.$data.currentMethod.data[i] = new Array(objectLength);
          this.$data.currentMethod.data[i].push(methodStep[i]);
        }

      } else {
        for (let i = 0; i < this.currentMethod.data.length; i++)
          this.$data.currentMethod.data[i].push(methodStep[i]);
      }

    },

    /*------------------------------------------------------------------------
    * Function used to save a method into the database
    * ------------------------------------------------------------------------*/
    saveMethod() {

      this.postMethod();
      this.resetData();

    },

    /*------------------------------------------------------------------------
    * Function to concatenate all modules' data
    * ------------------------------------------------------------------------*/
    getSingleMethodLine() {
      return this.trayModule.data.concat(
          this.dropDispenserModule.data,
          this.liquidDispenserModule.data,
          this.tlcMigrationModule.data,
          this.phMeterModule.data,
          this.waitingCondition.data,
          this.$data.commentModule.data);
    },

    /*------------------------------------------------------------------------
     * Function to reset tables' data after it's been saved in database
     * ------------------------------------------------------------------------*/
    resetData() {
      this.$data.trayModule.data = [];
      this.$data.dropDispenserModule.data = [];
      this.$data.liquidDispenserModule.data = [];
      this.$data.tlcMigrationModule.data = [];
      this.$data.phMeterModule.data = [];
      this.waitingCondition.data = [];
      this.$data.commentModule.data = [];
    },

    /*------------------------------------------------------------------------
     * Function to fetch current method name
     * ------------------------------------------------------------------------*/
    fetchMethodName() {
      axios
          .get('http://' + this.$aurasApi + 'api/Methods/' + this.$route.params.idMethod)
          .then((response) => {
            if (response.status === 200) {
              this.currentMethod = response.data;
            } else {
              this.message = response.data.message;
            }
          });
    },

    /*------------------------------------------------------------------------
    * Function to send method's line to database
    * ------------------------------------------------------------------------*/
    postMethod() {

    },

    /*------------------------------------------------------------------------
    * Function to update method's data to database
    * ------------------------------------------------------------------------*/
    updateMethodStep(step, stepNr) {

      console.log('Update step Nr: ' + stepNr);
      console.log(step);
    },

    save(value, col, name, line) {

      console.log('Value: ' + value + ' - col: ' + col + ' - device: ' + name + ' - line: ' + line);


      switch (name) {

        case this.trayModule.name:
          this.updateMethodStep(this.trayModule.data.find(({Step}) => Step === line), line);
          break;
        case this.dropDispenserModule.name:
          this.updateMethodStep(this.dropDispenserModule.data[line], line);

          break;
        case this.liquidDispenserModule.name:
          this.updateMethodStep(this.liquidDispenserModule.data[line], line);
          break;
        case this.tlcMigrationModule.name:
          this.updateMethodStep(this.tlcMigrationModule.data[line], line);
          break;
        case this.phMeterModule.name:
          this.updateMethodStep(this.phMeterModule.data[line], line);
          break;
        case this.waitingCondition.name:
          this.updateMethodStep(this.waitingCondition.data[line], line);
          break;
        case this.commentModule.name:
          this.updateMethodStep(this.commentModule.data[line], line);
          break;
        default:
          break;
      }


    },
    cancel() {
    },
    open() {
    },
    close() {
    },
    /*------------------------------------------------------------------------
     * Function used to load all modules names
     * ------------------------------------------------------------------------*/
    initializeModulesNames() {

      this.trayModule.name = this.$store.state.trayModuleName;
      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.tlcMigrationModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
    },

    /*--------------------------------------------------------------------------
     *  Redirection to another page
     * -------------------------------------------------------------------------*/
    redirectTo(route) {
      this.$router.push({name: route});
    },

    /*------------------------------------------------------------------------
   * Function used to extract Tray step data
   * ------------------------------------------------------------------------*/
    saveCommentsStep() {

      let comment = {Comment: this.$refs.plateForm.comment};
      this.$data.commentModule.data.push(comment);
    },

    /*------------------------------------------------------------------------
    * Function used to extract phMeterModule step data
    * ------------------------------------------------------------------------*/
    savePhMeterStep() {

      let phMeterStep = JSON.parse(JSON.stringify(this.$refs.plateForm.phMeterModule.data[0]));
      this.$data.phMeterModule.data.push(phMeterStep);
    },

    /*------------------------------------------------------------------------
    * Function used to extract liquidDispenserModule step data
    * ------------------------------------------------------------------------*/
    saveLiquidDispenserStep() {

      let dropDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.dropDispenserModule.data[0]));
      this.$data.dropDispenserModule.data.push(dropDispenserStep);

      console.log(dropDispenserStep)
    },

    /*------------------------------------------------------------------------
    * Function used to extract tlcModule step data
    * ------------------------------------------------------------------------*/
    saveTlcMigrationStep() {
      let tlcMMStep = JSON.parse(JSON.stringify(this.$refs.plateForm.tlcModule.data[0]));
      this.$data.tlcMigrationModule.data.push(tlcMMStep);
    },

    /*------------------------------------------------------------------------
     * Function used to extract trayModule step data
     * ------------------------------------------------------------------------*/
    saveTrayStep() {

      let trayModuleStep = JSON.parse(JSON.stringify(this.$refs.plateForm.trayModule.data[0]));
      trayModuleStep.Step = JSON.parse(JSON.stringify(this.currentStep));
      this.$data.trayModule.data.push(trayModuleStep);
      this.currentStep++;
    },

    /*------------------------------------------------------------------------
    * Function used to extract waiting condition step data
    * ------------------------------------------------------------------------*/
    saveWaitingConditionStep() {

      let waitingConditionStep = '';

      if (this.$refs.plateForm.waitingCondition.selectedOption === 'None') {
        waitingConditionStep = {
          'WaitingCondition': this.$refs.plateForm.waitingCondition.selectedOption
        };
      } else if (this.$refs.plateForm.waitingCondition.selectedOption === 'Timeout') {
        waitingConditionStep = {
          'WaitingCondition': this.$refs.plateForm.waitingCondition.selectedOption + ': '
              + this.$refs.plateForm.waitingCondition.timeoutValue
        };
      } else {
        waitingConditionStep = {
          'WaitingCondition': this.$refs.plateForm.waitingCondition.selectedOption + ': '
              + this.$refs.plateForm.waitingCondition.instrumentSelected
        };

      }
      this.waitingCondition.data.push(waitingConditionStep);

    },
    /*------------------------------------------------------------------------
     * Function used to extract dropDispenserModule step data
     * ------------------------------------------------------------------------*/
    saveDropDispenserStep() {

      let dropDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModule.data[0]));

      if (this.$refs.plateForm.PSElement.SP1Position === true)
        dropDispenserStep.SP1P = JSON.parse(JSON.stringify(this.$refs.plateForm.PSElement.SP1PositionValue));
      else
        dropDispenserStep.SP1P = JSON.parse(JSON.stringify(this.$refs.plateForm.PSElement.SP1StopContractor));

      if (this.$refs.plateForm.PSElement.SP2Position === true)
        dropDispenserStep.SP2P = JSON.parse(JSON.stringify(this.$refs.plateForm.PSElement.SP2PositionValue));
      else
        dropDispenserStep.SP2P = JSON.parse(JSON.stringify(this.$refs.plateForm.PSElement.SP2StopContractor));

      this.$data.liquidDispenserModule.data.push(dropDispenserStep);
    },


  }
}
</script>


<style scoped>


.module-title-color {
  color: dodgerblue;
}

.horizontal >>> .v-hl-btn svg {
  margin-left: 60px;

}

</style>