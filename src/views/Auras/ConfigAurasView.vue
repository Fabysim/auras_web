<template>
  <div>

    <!-- Modules' tables -->

    <v-card>
      <v-card-title class="justify-center">
        Method: {{ currentMethod.name }}
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
        <v-btn color="#a83248"
               class="white--text"
               @click="redirectTo('IndexAuras')"
        >
          All Methods
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 20px">
        <vue-scroll-snap :horizontal="true">
          <table>
            <tr>
              <!--Tray module-->

              <td>
                <v-card>
                  <v-card-title class="justify-center text-color">{{ trayModule.name }}</v-card-title>
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
                                @save="save"
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
                        <tbody v-else>
                        <tr>
                          <td :colspan="headers.length" style="text-align: center; color: gray; opacity: 0.6;">
                            No data available
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
                  <v-card-title class="justify-center text-color">
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
                                @save="save"
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
                        <tbody v-else>
                        <tr>
                          <td :colspan="headers.length" style="text-align: center; color: gray; opacity: 0.6;">
                            No data available
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
                  <v-card-title class="justify-center text-color" style="color: dodgerblue">
                    {{ dropDispenserModule.name }}
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
                                @save="save"
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
                        <tbody v-else>
                        <tr>
                          <td :colspan="headers.length" style="text-align: center; color: gray; opacity: 0.6;">
                            No data available
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
                  <v-card-title class="justify-center text-color">{{ tlcMigrationModule.name }}</v-card-title>
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
                                @save="save"
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
                        <tbody v-else>
                        <tr>
                          <td :colspan="headers.length" style="text-align: center; color: gray; opacity: 0.6;">
                            No data available
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
                  <v-card-title class="justify-center text-color">{{ phMeterModule.name }}</v-card-title>
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
                                @save="save"
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
                        <tbody v-else>
                        <tr>
                          <td :colspan="headers.length" style="text-align: center; color: gray; opacity: 0.6;">
                            No data available
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
                  <v-card-title class="justify-center text-color">
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
                              @save="save"
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
                      <tbody v-else>
                      <tr>
                        <td :colspan="headers.length" style="text-align: center; color: gray; opacity: 0.6;">
                          No data available
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
                  <v-card-title class="justify-center text-color">Comment</v-card-title>
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
                                @save="save"
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
                        <tbody v-else>
                        <tr>
                          <td :colspan="headers.length" style="text-align: center; color: gray; opacity: 0.6;">
                            No data available
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

      <v-card-actions class="justify-center">
        <v-btn style="background-color: dodgerblue; color: white;"
               @click="SaveMethod">
          Save Method
        </v-btn>
      </v-card-actions>
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

    trayModule: {
      name: '',
      columns: [
        {text: 'Step', value: 'Step', align: 'start', width: 82, sortable: true},
        {text: 'Value1', value: 'Step1', width: 82, sortable: false},
        {text: 'Value2', value: 'Step2', width: 82, sortable: false},
        {text: 'Value3', value: 'Step3', width: 82, sortable: false},
        {text: 'Value4', value: 'Step4', width: 82, sortable: false},
      ],
      data: []
    },

    liquidDispenserModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Step1', width: 82, sortable: false},
        {text: 'Value2', value: 'Step2', width: 82, sortable: false},
        {text: 'Value3', value: 'Step3', width: 82, sortable: false},
        {text: 'Value4', value: 'Step4', width: 82, sortable: false},
      ],
      data: []
    },

    dropDispenserModule: {
      name: '',
      columns: [
        {text: "S1", value: "S1", width: 82, sortable: false},
        {text: "S2", value: "S2", width: 82, sortable: false},
        {text: "S3", value: "S3", width: 82, sortable: false},
        {text: "S4", value: "S4", width: 82, sortable: false},
        {text: "S5", value: "S5", width: 82, sortable: false},
        {text: "S6", value: "S6", width: 82, sortable: false},
        {text: "S7", value: "S7", width: 82, sortable: false},
        {text: "S8", value: "S8", width: 82, sortable: false},
        {text: "PS1 Target", value: "PS1P", width: 82, sortable: false},
        {text: "PS1 Speed", value: "PS1S", width: 82, sortable: false},
        {text: "PS2 Target", value: "PS2P", width: 82, sortable: false},
        {text: "PS2 Speed", value: "PS2S", width: 100, sortable: false},
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
    this.loadModulesNames();
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

      this.$refs.plateForm.resetPlatformTables();

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

      let liquidDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModule.data[0]));
      this.$data.liquidDispenserModule.data.push(liquidDispenserStep);
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

        waitingConditionStep = {'WaitingCondition': this.$refs.plateForm.waitingCondition.selectedOption};

      } else if (this.$refs.plateForm.waitingCondition.selectedOption === 'Timeout') {

        waitingConditionStep = {
          'WaitingCondition': this.$refs.plateForm.waitingCondition.selectedOption + ': ' + this.$refs.plateForm.waitingCondition.timeoutValue
        };

      } else {

        waitingConditionStep = {
          'WaitingCondition': this.$refs.plateForm.waitingCondition.selectedOption + ': ' + this.$refs.plateForm.waitingCondition.instrumentSelected
        };

      }

      this.waitingCondition.data.push(waitingConditionStep);

    },
    /*------------------------------------------------------------------------
     * Function used to extract dropDispenserModule step data
     * ------------------------------------------------------------------------*/
    saveDropDispenserStep() {

      let dropDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.dropDispenserModule.data[0]));

      if (this.$refs.plateForm.PSElement.PS1Position === true)
        dropDispenserStep.PS1P = JSON.parse(JSON.stringify(this.$refs.plateForm.PSElement.PS1PositionValue));
      else
        dropDispenserStep.PS1P = JSON.parse(JSON.stringify(this.$refs.plateForm.PSElement.PS1StopContractor));

      if (this.$refs.plateForm.PSElement.PS2Position === true)
        dropDispenserStep.PS2P = JSON.parse(JSON.stringify(this.$refs.plateForm.PSElement.PS2PositionValue));
      else
        dropDispenserStep.PS2P = JSON.parse(JSON.stringify(this.$refs.plateForm.PSElement.PS2StopContractor));

      this.$data.dropDispenserModule.data.push(dropDispenserStep);
    },

    /*------------------------------------------------------------------------
    * Function used to save a method into the database
    * ------------------------------------------------------------------------*/
    SaveMethod() {
      this.resetData();
    },

    /*------------------------------------------------------------------------
     * Function to reset tables' data after it's been saved in database
     * ------------------------------------------------------------------------*/
    resetData() {
      this.$data.trayModule.data = [];
      this.$data.liquidDispenserModule.data = [];
      this.$data.dropDispenserModule.data = [];
      this.$data.tlcMigrationModule.data = [];
      this.$data.commentModule.data = [];
      this.waitingCondition = '';
    },

    save() {
    },
    cancel() {
    },
    open() {
    },
    close() {
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
     * Function used to load all modules names
     * ------------------------------------------------------------------------*/
    loadModulesNames() {

      this.trayModule.name = this.$store.state.trayModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.tlcMigrationModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
    },

    /*--------------------------------------------------------------------------
     *  Redirection to another page
     * -------------------------------------------------------------------------*/
    redirectTo(route) {
      this.$router.push({name: route});
    }

  }
}
</script>


<style scoped>


.text-color {
  color: dodgerblue;
}

.horizontal >>> .v-hl-btn svg {
  margin-left: 60px;

}

</style>