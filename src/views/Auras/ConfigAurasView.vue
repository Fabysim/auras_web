<template>
  <div>
    <!--Method actions-->

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

      <!-- Method data -->

      <vue-scroll-snap style="width:100%; overflow: hidden" :horizontal="true">

        <!--Steps -->

        <v-card elevation="0">
          <v-card-title class="justify-center module-title-color">{{ stepModule.name }}</v-card-title>
          <v-card-text>
            <v-data-table :headers="stepModule.columns"
                          :items="stepModule.data"
                          :hide-default-footer="true"
                          disable-pagination>

              <template v-slot:body="{ items, headers }">
                <tbody v-if="items.length > 0">
                <tr v-for="(item,idx) in items" :key="idx">
                  <td v-for="(header,column) in headers" :key="column">
                    <v-edit-dialog
                        large
                        :return-value.sync="item[header.value]"
                        @save="updateLine(item[header.value], column, stepModule.name, idx)"
                        @cancel="cancelLineUpdate"
                        @open="open(item[header.value], column, stepModule.name, idx)"
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

        <!--Module tables-->

        <v-card elevation="0" style="width:88%">
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
                              <v-edit-dialog large
                                             :return-value.sync="item[header.value]"
                                             @save="updateLine(item[header.value], key, trayModule.name, idx)"
                                             @cancel="cancelLineUpdate"
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
                              <v-edit-dialog large
                                             :return-value.sync="item[header.value]"
                                             @save="updateLine(item[header.value], key, tlcMigrationModule.name, idx)"
                                             @cancel="cancelLineUpdate"
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
                              <v-edit-dialog large
                                             :return-value.sync="item[header.value]"
                                             @save="updateLine(item[header.value], key, phMeterModule.name, idx)"
                                             @cancel="cancelLineUpdate"
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
                              <v-edit-dialog large
                                             :return-value.sync="item[header.value]"
                                             @save="updateLine(item[header.Value], key, dropDispenserModule.name, idx)"
                                             @cancel="cancelLineUpdate"
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

                <!--Liquid dispenser module-->

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
                              <v-edit-dialog large
                                             :return-value.sync="item[header.value]"
                                             @save="updateLine(item[header.value], key, liquidDispenserModule.name, idx)"
                                             @cancel="cancelLineUpdate"
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
                              <v-edit-dialog large
                                             :return-value.sync="item[header.value]"
                                             @save="updateLine(item[header.value], key, waitingCondition.name, idx)"
                                             @cancel="cancelLineUpdate"
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
                              <v-edit-dialog large
                                             :return-value.sync="item[header.value]"
                                             @save="updateLine(item[header.value], key, commentModule.name, idx)"
                                             @cancel="cancelLineUpdate"
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
        </v-card>

        <!--Step actions-->

        <v-card elevation="0">
          <v-card-title class="justify-center module-title-color">{{ actionsModule.name }}</v-card-title>
          <v-card-text>
            <v-data-table :headers="actionsModule.columns"
                          :items="actionsModule.data"
                          :hide-default-footer="true"
                          disable-pagination>
              <template v-slot:[`item.actions`]="{ item }">

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        v-on="on"
                        v-bind="attrs"
                        color="red"
                        min-width="150"
                        @click="beforeDelete(item.step)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                  <span>Delete step</span>
                </v-tooltip>

              </template>

            </v-data-table>
          </v-card-text>
        </v-card>

      </vue-scroll-snap>
    </v-card>

    <!-- PlatForms -->

    <PlatFormCard @lineSaved="SaveLine" ref="plateForm"/>

    <!--Confirm deletion dialog-->

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
        >Are you sure you want to delete this item?
        </v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
          >Cancel
          </v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteStep"
          >Delete
          </v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ message }}
    </v-snackbar>

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
    dialogDelete: false,
    snackbar: false,
    deletedIndex: '',
    timeout: 1000,
    message: '',

    //Modules variables

    stepModule: {
      name: '',
      columns: [
        {text: 'Step', value: 'step', align: 'center', width: 82, sortable: true},
      ],
      data: [],
      oldValue: '',
      newValue: ''
    },

    trayModule: {
      name: '',
      columns: [
        {text: 'Value', value: 'value1', width: 82, sortable: false}
      ],
      data: []
    },

    dropDispenserModule: {
      name: '',
      columns: [
        {text: 'Value', value: 'Value', width: 150, sortable: false, align: 'center'},
      ],
      data: []
    },

    tlcMigrationModule: {
      name: '',
      columns: [
        {text: 'Position', value: 'position', width: 150, align: 'center'},
      ],
      data: []
    },

    phMeterModule: {
      name: '',
      columns: [
        {text: 'Position', value: 'position', width: 100, align: 'center'},
      ],
      data: []
    },

    liquidDispenserModule: {
      name: '',
      columns: [
        {text: "LDS1", value: "LDS1", width: 82, sortable: false, align: 'center'},
        {text: "LDS2", value: "LDS2", width: 82, sortable: false, align: 'center'},
        {text: "LDS3", value: "LDS3", width: 82, sortable: false, align: 'center'},
        {text: "LDS4", value: "LDS4", width: 82, sortable: false, align: 'center'},
        {text: "LDS5", value: "LDS5", width: 82, sortable: false, align: 'center'},
        {text: "LDS6", value: "LDS6", width: 82, sortable: false, align: 'center'},
        {text: "LDS7", value: "LDS7", width: 82, sortable: false, align: 'center'},
        {text: "LDS8", value: "LDS8", width: 82, sortable: false, align: 'center'},
        {text: "LDS9", value: "LDS9", width: 82, sortable: false, align: 'center'},
        {text: "SP1 Target", value: "SP1P", width: 150, sortable: false, align: 'center'},
        {text: "SP1 Speed", value: "SP1", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Target", value: "SP2P", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Speed", value: "SP2", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Target", value: "SP2P", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Speed", value: "SP3", width: 150, sortable: false, align: 'center'},
        {text: "Rotations pump", value: "PUMP1P", width: 150, sortable: false, align: 'center'},
        {text: "Speed pump (rpm)", value: "PUMP1S", width: 150, sortable: false, align: 'center'},
      ],
      data: []
    },

    commentModule: {
      name: '',
      columns: [
        {text: 'Comment', value: 'Comment', width: 120, sortable: false, align: 'center'},
      ],
      data: []
    },

    waitingCondition: {
      name: 'Waiting condition',
      columns: [{text: 'Waiting condition', value: 'WaitingCondition', width: 160, sortable: false}],
      data: []
    },

    ginaModule: {
      name: '',
      columns: [
        {text: 'Comment', value: 'Comment', width: 82, sortable: false, align: 'center'},
      ],
      data: []
    },

    actionsModule: {
      name: '',
      columns: [
        {text: 'Actions', value: 'actions', align: 'center', width: 82, sortable: false},
        {text: 'Step', value: 'step', align: ' d-none', width: 82, sortable: false},
      ],
      data: []
    },

  }),

  mounted() {
    this.initializeModulesNames();
    this.fetchMethodName();

  },

  methods: {

    /*------------------------------------------------------------------------
    * Function used to add a step in the currently created method
    * ------------------------------------------------------------------------*/
    async SaveLine() {

      this.extractStepModuleLine();
      this.extractLiquidDispenserLine();
      this.extractTrayModuleLine();
      this.extractDropDispenserModuleLine();
      this.extractTlcMigrationModuleLine();
      this.extractPhMeterModuleLine();
      this.extractCommentModuleLine();
      this.extractWaitingConditionLine();

      this.createMethodData();
      this.$refs.plateForm.resetPlatformTables();

      this.currentStep++;
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

    beforeDelete(index) {

      this.dialogDelete = true;
      this.deletedIndex = index;
    },

    /*------------------------------------------------------------------------
    * Function create all method's data
    * ------------------------------------------------------------------------*/
    async deleteStep(index) {

      this.stepModule.data.splice(index, 1);
      this.trayModule.data.splice(index, 1);
      this.dropDispenserModule.data.splice(index, 1);
      this.liquidDispenserModule.data.splice(index, 1);
      this.tlcMigrationModule.data.splice(index, 1);
      this.phMeterModule.data.splice(index, 1);
      this.waitingCondition.data.splice(index, 1);
      this.actionsModule.data.splice(index, 1);
      this.commentModule.data.splice(index, 1);

      this.message = 'Step deleted';
      this.dialogDelete = false;
      this.snackbar = true;
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

    /*------------------------------------------------------------------------
    * Function to retrieve updated line and module
    * ------------------------------------------------------------------------*/
    updateLine(value, col, name, line) {

      switch (name) {

        case this.trayModule.name:
          this.updateMethodStep(this.trayModule.data[line], line);
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

        case this.stepModule.name:

          this.checkStepNumberValidity(value);
          /* console.log(valid)
           if (valid) {

             this.updateMethodStep(this.stepModule.data[line], line);
             console.log('here 3a')
           } else {
             console.log('here 3b')
             console.log(this.stepModule.newValue)
             this.stepModule.data[line].step = this.stepModule.oldValue;
             console.log(this.stepModule.data[line].step)
           }*/
          break;

        default:
          break;
      }


    },
    /*------------------------------------------------------------------------
     * Function to check if the new step number is valid
     * ------------------------------------------------------------------------*/
    checkStepNumberValidity(lineNumber) {

      return !(parseInt(lineNumber) < 0 || parseInt(lineNumber) > this.stepModule.data.length - 1);
    },

    cancelLineUpdate() {
    },

    open(value, col, name, line) {

      this.stepModule.newValue = this.stepModule.data[line].step;

      console.log('here 1')
      if (name === this.stepModule.name)
        this.stepModule.oldValue = this.stepModule.data[line].step;

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
      this.stepModule.name = 'Steps';
      this.actionsModule.name = 'Actions';
    },

    /*------------------------------------------------------------------------
     * Function to reset tables' data after it's been saved in database
     * ------------------------------------------------------------------------*/
    resetData() {
      this.currentStep = 0;
      this.$data.trayModule.data = [];
      this.$data.dropDispenserModule.data = [];
      this.$data.liquidDispenserModule.data = [];
      this.$data.tlcMigrationModule.data = [];
      this.$data.phMeterModule.data = [];
      this.waitingCondition.data = [];
      this.$data.commentModule.data = [];
      this.$data.stepModule.data = [];
      this.$data.actionsModule.data = [];
    },

    /*--------------------------------------------------------------------------
     *  Redirection to another page
     * -------------------------------------------------------------------------*/
    redirectTo(route) {
      this.$router.push({name: route});
    },

    /*------------------------------------------------------------------------
    * Function used to extract phMeterModule step data
    * ------------------------------------------------------------------------*/
    extractPhMeterModuleLine() {

      let phMeterStep = JSON.parse(JSON.stringify(this.$refs.plateForm.phMeterModule.data[0]));
      this.$data.phMeterModule.data.push(phMeterStep);
    },


    /*------------------------------------------------------------------------
    * Function used to extract tlcModule step data
    * ------------------------------------------------------------------------*/
    extractTlcMigrationModuleLine() {
      let tlcMMStep = JSON.parse(JSON.stringify(this.$refs.plateForm.tlcModule.data[0]));
      this.$data.tlcMigrationModule.data.push(tlcMMStep);
    },

    /*------------------------------------------------------------------------
     * Function used to extract trayModule step data
     * ------------------------------------------------------------------------*/
    extractTrayModuleLine() {

      let trayModuleStep = JSON.parse(JSON.stringify(this.$refs.plateForm.trayModule.data[0]));
      this.$data.trayModule.data.push(trayModuleStep);

    },

    /*-------------------------------------------------------------------------
     * Function to create the method steps
     * ------------------------------------------------------------------------*/
    extractStepModuleLine() {

      let step = {step: JSON.parse(JSON.stringify(this.currentStep))};
      this.$data.stepModule.data.push(step);
      let line = {line: JSON.parse(JSON.stringify(this.currentStep))};
      this.$data.actionsModule.data.push(line);

    },
    /*------------------------------------------------------------------------
 * Function used to extract Tray step data
 * ------------------------------------------------------------------------*/
    extractCommentModuleLine() {

      let comment = {Comment: this.$refs.plateForm.comment};
      this.$data.commentModule.data.push(comment);
    },


    /*------------------------------------------------------------------------
    * Function used to extract waiting condition step data
    * ------------------------------------------------------------------------*/
    extractWaitingConditionLine() {

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
    extractLiquidDispenserLine() {

      let LiquidDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModule.data[0]));

      if (this.$refs.plateForm.SPElements.LdSp1PositionMode === true)
        LiquidDispenserStep.SP1P = JSON.parse(JSON.stringify(this.$refs.plateForm.SPElements.LdSp1PositionValue));
      else
        LiquidDispenserStep.SP1P = -1;

      if (this.$refs.plateForm.SPElements.LdSp2PositionMode === true)
        LiquidDispenserStep.SP2P = JSON.parse(JSON.stringify(this.$refs.plateForm.SPElements.LdSp2PositionValue));
      else
        LiquidDispenserStep.SP2P = -1;

      this.$data.liquidDispenserModule.data.push(LiquidDispenserStep);
    },

    /*------------------------------------------------------------------------
    * Function used to extract liquidDispenserModule step data
    * ------------------------------------------------------------------------*/
    extractDropDispenserModuleLine() {

      let dropDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.dropDispenserModule.data[0]));

      dropDispenserStep.Type = this.$refs.plateForm.SPElements.selectedSpDdOption;
      dropDispenserStep.Step = JSON.parse(JSON.stringify(this.currentStep));
      console.log(dropDispenserStep);
      this.$data.dropDispenserModule.data.push(dropDispenserStep);
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