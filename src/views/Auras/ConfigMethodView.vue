<template>
  <div>
    <!--Method actions-->
    <div style="min-height: 100px">
      <v-card elevation="1">
        <v-card-title class="justify-center">
          Method: {{ currentMethod.name }}

          <v-spacer/>
          <v-btn color="#a83248"
                 class="white--text"
                 @click="redirectTo('IndexAuras')"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
            All Methods
          </v-btn>
          <v-btn color="#2e4c80"
                 class="ma-2 white--text"
                 @click="redirectTo('RunAuras')"
          >
            <v-icon small>
              mdi-play-outline
            </v-icon>
            Run method
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

          <v-btn color="primary"
                 class="ma-2 white--text"
                 @click="loadModulesData()"
          >
            <v-icon>mdi-refresh</v-icon>
            Refresh
          </v-btn>
        </v-card-title>
      </v-card>
    </div>
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
                      @close="close(item[header.value], column, stepModule.name, idx)"

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
                                           @open="open(item[header.value], key, tlcMigrationModule.name, idx)"
                                           @close="close"

                            > {{ item[header.value] }}
                              <template v-slot:input>
                                <v-select :items="tlcMigrationModule.items"
                                          v-model="tlcMigrationModule.update.selectedOption"/>
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
                        style="min-width: 150px"
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
                                           @open="open(item[header.value], key, phMeterModule.name, idx)"
                                           @close="close"

                            > {{ item[header.value] }}
                              <template v-slot:input>
                                <v-select :items="phMeterModule.items"
                                          v-model="phMeterModule.update.selectedOption"/>

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
                                           @save="updateLine(item[header.value], key, dropDispenserModule.name, idx)"
                                           @cancel="cancelLineUpdate"
                                           @open="open(item[header.value], key, dropDispenserModule.name, idx)"
                                           @close="close">
                              {{ item[header.value] }}
                              <template v-slot:input>
                                <v-select :items="dropDispenserModule.items"
                                          v-model="dropDispenserModule.update.selectedOption"/>
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
                                           @open="open(item[header.value], key, liquidDispenserModule.name, idx)"
                                           @close="close"

                            > {{ item[header.value] }}
                              <template v-slot:input>
                                <table
                                    v-if="header.value ==='displayedSP1Info'|| header.value ==='displayedSP2Info' || header.value ==='displayedSP3Info'">
                                  <tr>
                                    <td>
                                      <v-select :items="liquidDispenserModule.items"
                                                v-model="liquidDispenserModule.update.selectedOption"/>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td v-if="liquidDispenserModule.update.volumeSelected">
                                      <v-text-field v-model="liquidDispenserModule.update.selectedValue"
                                                    label="Volume in µL"/>

                                    </td>

                                  </tr>
                                </table>
                                <v-text-field v-else
                                              v-model="item[header.value]"
                                              label="Edit"
                                              single-line
                                />
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
                    {{ waitingConditionModule.name }}
                  </v-card-title>
                  <v-card-text>
                    <v-data-table
                        :headers="waitingConditionModule.columns"
                        :items="waitingConditionModule.data"
                        :hide-default-footer="true"
                        disable-pagination
                    >
                      <template v-slot:body="{ items, headers }">
                        <tbody v-if="items.length > 0">
                        <tr v-for="(item,idx) in items" :key="idx">
                          <td v-for="(header,key) in headers" :key="key">
                            <v-edit-dialog large
                                           :return-value.sync="item[header.value]"
                                           @save="updateLine(item[header.value], key, waitingConditionModule.name, idx)"
                                           @cancel="cancelLineUpdate"
                                           @open="open(item[header.value], key, waitingConditionModule.name, idx)"
                                           @close="close"

                            > {{ item[header.value] }}
                              <template v-slot:input>
                                <table>
                                  <tr>
                                    <td>
                                      <v-select
                                          v-model="updateWaitingCondition.selectedOption"
                                          :items="updateWaitingCondition.items"
                                      >

                                      </v-select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td v-if="updateWaitingCondition.timeoutOptionSelected">
                                      <v-text-field
                                          label="timeout in ms"
                                          v-model="updateWaitingCondition.timeoutValue"
                                      />
                                    </td>
                                  </tr>
                                </table>
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
                      @click="confirmDelete(item.line)"
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


    <!-- PlatForms -->

    <PlatFormCard mode="config" @lineSaved="SaveLine" ref="plateForm"/>

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
    <v-snackbar v-model="snackbar.show" :timeout="timeout" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>

  </div>
</template>

<script>

Vue.component("downloadExcel", JsonExcel);
import PlatFormCard from '@/components/Auras/PlatformCard.vue'
import VueScrollSnap from "vue-scroll-snap";
import axios from "axios";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

export default {
  name: 'AurasConfigMethodView',
  components: {
    PlatFormCard,
    VueScrollSnap
  },

  data: () => ({

    lineNumber: 0,
    currentMethod: '',
    allModulesList: [],
    aurasModules: [],
    currentStep: 0,
    dialogDelete: false,
    snackbar: {show: false, message: null, color: null},
    deletedIndex: '',
    timeout: 2000,
    displayedMessage: '',
    stepCount: 0,
    isVisibleLD: false,
    isVisibleDD: false,

    //Modules variables

    updateWaitingCondition: {
      selectedOption: '',
      items: ['None', 'Gina', 'Timeout'],
      instrumentOptionSelected: false,
      timeoutOptionSelected: false,
      selectedInstrument: '',
      selectedOldInstrument: 'Gina',
      timeoutValue: '',
      timeoutOldValue: 0,
      instrumentsList: ['Gina', 'Auras'],
    },

    downloadedData: [],

    concatenatedData: {
      step: '',
      tlcMigration: '',
      phMeter: '',
      dropDispenser: '',
      ldS1: '',
      ldS2: '',
      ldS3: '',
      ldS4: '',
      ldS5: '',
      ldS6: '',
      ldS7: '',
      ldS8: '',
      ldS9: '',
      sp1P: '',
      sp1S: '',
      sp2P: '',
      sp2S: '',
      sp3P: '',
      sp3S: '',
      pump1p: '',
      pumP1S: '',
    },

    stepModule: {
      name: '',
      columns: [
        {
          text: 'Step',
          value: 'step',
          align: 'center',
          width: 82,
          sortable: true
        },
      ],
      data: [],
      updateStep: [
        {
          oldValue: '',
          newValue: '',
          stepToUpdate: false
        }
      ],

    },

    tlcMigrationModule: {
      name: '',
      items: ['Idle position', 'Ready position', 'Cycle', 'Redeposit tab'],
      columns: [
        {text: 'Position', value: 'description', width: 150, align: 'center'},
      ],
      data: [],
      update: {
        selectedOption: ''
      },
    },

    phMeterModule: {
      name: '',
      items: ['Idle position', 'QC sample', 'Rinsing', 'Tempo 1', 'Tempo 2', 'Lift'],
      columns: [
        {text: 'Position', value: 'description', width: 100, align: 'center'},
      ],
      data: [],
      update: {
        selectedOption: ''
      },
    },

    dropDispenserModule: {
      name: '',
      items: ['None', 'Standards'],
      columns: [
        {text: 'Value', value: 'description', width: 150, sortable: false, align: 'center'},
      ],
      data: [],
      update: {
        selectedOption: ''
      },
    },


    liquidDispenserModule: {
      name: '',
      items: ['None', 'Volume', 'QC sample drop', 'Fill LAL cartridge'],
      columns: [
        {text: "LDS1", value: "ldS1", width: 82, sortable: false, align: 'center'},
        {text: "LDS2", value: "ldS2", width: 82, sortable: false, align: 'center'},
        {text: "LDS3", value: "ldS3", width: 82, sortable: false, align: 'center'},
        {text: "LDS4", value: "ldS4", width: 82, sortable: false, align: 'center'},
        {text: "LDS5", value: "ldS5", width: 82, sortable: false, align: 'center'},
        {text: "LDS6", value: "ldS6", width: 82, sortable: false, align: 'center'},
        {text: "LDS7", value: "ldS7", width: 82, sortable: false, align: 'center'},
        {text: "LDS8", value: "ldS8", width: 82, sortable: false, align: 'center'},
        {text: "LDS9", value: "ldS9", width: 82, sortable: false, align: 'center'},
        {text: "SP1 Target", value: "displayedSP1Info", width: 150, sortable: false, align: 'center'},
        {text: "SP1 Speed", value: "sP1S", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Target", value: "displayedSP2Info", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Speed", value: "sP2S", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Target", value: "displayedSP3Info", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Speed", value: "sP3S", width: 150, sortable: false, align: 'center'},
        {text: "Rotations pump", value: "pumP1P", width: 150, sortable: false, align: 'center'},
        {text: "Speed pump (rpm)", value: "pumP1S", width: 150, sortable: false, align: 'center'},
      ],
      data: [],
      update: {
        selectedOption: '',
        selectedValue: '',
        volumeSelected: false
      }
    },

    commentModule: {
      name: '',
      columns: [
        {text: 'Comment', value: 'content', width: 350, sortable: false, align: 'center'},
      ],
      data: []
    },

    waitingConditionModule: {
      name: 'Waiting condition',
      columns: [{text: 'Waiting condition', value: 'description', width: 160, sortable: false}],
      data: []
    },

    ginaModule: {
      name: '',
      columns: [],
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

    this.initialization();
    this.fetchMethod();
    this.fetchModulesList();
    this.loadModulesData();

  },


  watch: {


    /*------------------------------------------------------------------------
    * Function used to watch the changes in the waiting condition module
    * ------------------------------------------------------------------------*/
    'updateWaitingCondition.selectedOption'() {

      if (this.updateWaitingCondition.selectedOption !== undefined && this.updateWaitingCondition.selectedOption !== '') {

        if (this.updateWaitingCondition.selectedOption.toLowerCase() === 'none') {
          this.updateWaitingCondition.instrumentOptionSelected = false;
          this.updateWaitingCondition.timeoutOptionSelected = false;
        }

        if (this.updateWaitingCondition.selectedOption.toLowerCase() === 'instrument') {
          this.updateWaitingCondition.instrumentOptionSelected = true;
          this.updateWaitingCondition.timeoutOptionSelected = false;

          this.updateWaitingCondition.selectedInstrument = this.updateWaitingCondition.selectedOldInstrument;
        }

        if (this.updateWaitingCondition.selectedOption.toLowerCase() === 'timeout') {
          this.updateWaitingCondition.instrumentOptionSelected = false;
          this.updateWaitingCondition.timeoutOptionSelected = true;
          this.updateWaitingCondition.timeoutValue = this.updateWaitingCondition.timeoutOldValue;
        }

      }
    },

  },

  methods: {

    /*------------------------------------------------------------------------
     * Create data to be downloaded
     * ------------------------------------------------------------------------*/
    setDownloadedData() {


      for (let i = 0; i < this.stepModule.data.length; i++) {

        this.concatenatedData.step = this.liquidDispenserModule.data[i].step;

        this.concatenatedData.ldS1 = this.liquidDispenserModule.data[i].ldS1;
        this.concatenatedData.ldS2 = this.liquidDispenserModule.data[i].ldS2;
        this.concatenatedData.ldS3 = this.liquidDispenserModule.data[i].ldS3;
        this.concatenatedData.ldS4 = this.liquidDispenserModule.data[i].ldS4;
        this.concatenatedData.ldS5 = this.liquidDispenserModule.data[i].ldS5;
        this.concatenatedData.ldS6 = this.liquidDispenserModule.data[i].ldS6;
        this.concatenatedData.ldS7 = this.liquidDispenserModule.data[i].ldS7;
        this.concatenatedData.ldS8 = this.liquidDispenserModule.data[i].ldS8;
        this.concatenatedData.ldS9 = this.liquidDispenserModule.data[i].ldS9;
        this.concatenatedData.sp1P = this.liquidDispenserModule.data[i].sP1P;
        this.concatenatedData.sp1S = this.liquidDispenserModule.data[i].sP1S;
        this.concatenatedData.sp2P = this.liquidDispenserModule.data[i].sP2P;
        this.concatenatedData.sp2S = this.liquidDispenserModule.data[i].sP2S;
        this.concatenatedData.sp3P = this.liquidDispenserModule.data[i].sP3P;
        this.concatenatedData.sp3S = this.liquidDispenserModule.data[i].sP3S;
        this.concatenatedData.pump1p = this.liquidDispenserModule.data[i].pump1p;
        this.concatenatedData.pump1S = this.liquidDispenserModule.data[i].pump1S;

        this.concatenatedData.dropDispenser = this.dropDispenserModule.data[i].value;
        this.concatenatedData.tlcMigration = this.tlcMigrationModule.data[i].position;
        this.concatenatedData.phMeter = this.phMeterModule.data[i].position;

        this.downloadedData.splice(i, 0, JSON.parse(JSON.stringify(this.concatenatedData)));
      }

      console.log(this.downloadedData);


    },
    /*------------------------------------------------------------------------
    * Function to load all method's data
    * ------------------------------------------------------------------------*/
    async loadModulesData() {
      this.stepCount = 0;
      this.currentStep = 0;
      this.stepModule.data = [];
      this.actionsModule.data = [];

      this.aurasModules.forEach(m => this.fetchData(m));

      setTimeout(() => this.setDownloadedData(), 1000);
    },

    /*------------------------------------------------------------------------
      * Function to set LiquidDispenserModule's update info
      * ------------------------------------------------------------------------*/
    loadLiquidDispenserUpdateInfo() {

      this.liquidDispenserModule.data.forEach(function (line) {

        line.sP1P === 0 ? line.displayedSP1Info = 'None' : '';
        line.sP2P === 0 ? line.displayedSP2Info = 'None' : '';
        line.sP3P === 0 ? line.displayedSP3Info = 'None' : '';

        line.sP1P === -1 ? line.displayedSP1Info = 'QC sample drop' : '';
        line.sP2P === -1 ? line.displayedSP2Info = 'QC sample drop' : '';
        line.sP3P === -1 ? line.displayedSP3Info = 'QC sample drop' : '';

        line.sP1P === -2 ? line.displayedSP1Info = 'Fill LAL cartridge' : '';
        line.sP2P === -2 ? line.displayedSP2Info = 'Fill LAL cartridge' : '';
        line.sP3P === -2 ? line.displayedSP3Info = 'Fill LAL cartridge' : '';

        line.sP1P > 0 ? line.displayedSP1Info = 'Volume: ' + line.sP1P + ' µL' : '';
        line.sP2P > 0 ? line.displayedSP2Info = 'Volume: ' + line.sP2P + ' µL' : '';
        line.sP3P > 0 ? line.displayedSP3Info = 'Volume: ' + line.sP3P + ' µL' : '';

        line.sP1P >= 0 ? line.ldSp1PositionSelected = true : line.ldSp1PositionSelected = false;
        line.sP2P >= 0 ? line.ldSp2PositionSelected = true : line.ldSp2PositionSelected = false;
        line.sP3P >= 0 ? line.ldSp3PositionSelected = true : line.ldSp3PositionSelected = false;

      });


    },

    /*------------------------------------------------------------------------
    * Function load number of actual steps
    * ------------------------------------------------------------------------*/
    loadDropDispenserDisplayedInfo() {

      for (let i = 0; i < this.dropDispenserModule.data.length; i++) {

        let displayedTarget = '';
        let spTarget = '';

        this.dropDispenserModule.data[i].value >= 0 ? displayedTarget = this.dropDispenserModule.data[i].value : displayedTarget = 'Drop detected';
        this.dropDispenserModule.data[i].value >= 0 ? spTarget = 'Position' : spTarget = 'Drop detected';
        this.dropDispenserModule.data[i].selectedInstrumentComponent = this.dropDispenserModule.data[i].type;
        this.dropDispenserModule.data[i].displayedInfo = this.dropDispenserModule.data[i].type + ': ' + displayedTarget;
        this.dropDispenserModule.data[i].spTarget = spTarget;
      }


    },

    /*------------------------------------------------------------------------
    * Function to load the number of actual steps
    * ------------------------------------------------------------------------*/
    loadWCDisplayedInfo() {

      for (let i = 0; i < this.waitingConditionModule.data.length; i++) {

        this.waitingConditionModule.data[i].description.toLowerCase().includes('timeout') ?
            this.waitingConditionModule.data[i].description += ': ' + this.waitingConditionModule.data[i].value + ' ms' :
            this.waitingConditionModule.data[i].description.toLowerCase() === 'gina' ? 'Gina' : '';

      }

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
    * Function to extract Liquid Dispenser's updated data from the update dialog
    * ------------------------------------------------------------------------*/
    extractLiquidDispenserDataFromDialog(col, line) {


      if (col === 9)
        this.liquidDispenserModule.data[line].sP1P = this.liquidDispenserModule.update.selectedValue;
      if (col === 11)
        this.liquidDispenserModule.data[line].sP2P = this.liquidDispenserModule.update.selectedValue;
      if (col === 13)
        this.liquidDispenserModule.data[line].sP3P = this.liquidDispenserModule.update.selectedValue;


    },


    /*------------------------------------------------------------------------
    * Function to extract Drop Dispenser's updated data from the update dialog
    * ------------------------------------------------------------------------*/
    extractTlcMigrationDataFromDialog(line) {

      this.tlcMigrationModule.data[line].description = this.tlcMigrationModule.update.selectedOption;
      switch (this.tlcMigrationModule.update.selectedOption) {

        case "Idle position":
          this.tlcMigrationModule.data[line].position = 0;
          break;
        case "Ready position":
          this.tlcMigrationModule.data[line].position = 1;
          break;
        case "Cycle":
          this.tlcMigrationModule.data[line].position = 2;
          break;
        case "Redeposit tab":
          this.tlcMigrationModule.data[line].position = 3;
          break;
        default:
          this.tlcMigrationModule.data[line].position = 0;
          break;
      }

    },
    /*------------------------------------------------------------------------
    * Function to extract PH Meter's updated data from the update dialog
    * ------------------------------------------------------------------------*/
    extractPhMeterDataFromDialog(line) {

      this.phMeterModule.data[line].description = this.phMeterModule.update.selectedOption;

      switch (this.phMeterModule.update.selectedOption) {

        case "Idle position":
          this.phMeterModule.data[line].position = 0;
          break;
        case "QC sample":
          this.phMeterModule.data[line].position = 1;
          break;
        case "Rinsing":
          this.phMeterModule.data[line].position = 2;
          break;
        case "Tempo 1":
          this.phMeterModule.data[line].position = 3;
          break;
        case "Tempo 2":
          this.phMeterModule.data[line].position = 4;
          break;
        case "Lift":
          this.phMeterModule.data[line].position = 5;
          break;
        default:
          this.phMeterModule.data[line].position = 0;
          break;
      }
    },
    /*------------------------------------------------------------------------
    * Function to extract Drop Dispenser's updated data from the update dialog
    * ------------------------------------------------------------------------*/
    extractDropDispenserDataFromDialog(line) {

      this.dropDispenserModule.data[line].description = this.dropDispenserModule.update.selectedOption;

      switch (this.dropDispenserModule.update.selectedOption) {

        case "None":
          this.dropDispenserModule.data[line].position = 0;
          break;
        case "Standards":
          this.dropDispenserModule.data[line].position = 1;
          break;
        default:
          this.dropDispenserModule.data[line].position = 0;
          break;
      }
    },

    /*--------------------------------------------------------------------------------
    * Function to extract Waiting Condition's updated data from the update dialog
    * ------------------------------------------------------------------------------*/
    extractWaitingConditionDataFromDialog(line) {

      this.waitingConditionModule.data[line].type = this.updateWaitingCondition.selectedOption;

      if (this.updateWaitingCondition.selectedOption.toLowerCase().includes('timeout')) {

        this.waitingConditionModule.data[line].description = 'Timeout';
        this.waitingConditionModule.data[line].value = this.updateWaitingCondition.timeoutValue;
      } else if (this.updateWaitingCondition.selectedOption.toLowerCase().includes('gina')) {

        this.waitingConditionModule.data[line].description = 'Gina';
        this.waitingConditionModule.data[line].value = -1;
      } else {
        this.waitingConditionModule.data[line].description = 'None';
        this.waitingConditionModule.data[line].value = 0;
      }
    },

    /*--------------------------------------------------------------------------------
    * Function to extract Step Module updated data from the update dialog
    * ------------------------------------------------------------------------------*/
    extractStepDataFromDialog(line) {
      this.stepModule.data[line].id = line;
      this.stepModule.data[line].newValue = this.stepModule.data[line].step;
      this.stepModule.data[line].oldValue = this.stepModule.updateStep[0].oldValue;
      this.stepModule.data[line].methodId = this.currentMethod.id;

      this.stepModule.updateStep[0].stepToUpdate = true;
      this.stepCount = 0;
    },

    /*---------------------------------------------------------------------------
    * Function to load selected load Liquid Dispenser's data into update dialog
    * --------------------------------------------------------------------------*/
    loadLiquidDispenserDataInDialog(value, col, line) {

      this.liquidDispenserModule.update.volumeSelected = false;
      let volume;

      if (col === 9)
        volume = this.liquidDispenserModule.data[line].sP1P;
      if (col === 11)
        volume = this.liquidDispenserModule.data[line].sP2P;
      if (col === 13)
        volume = this.liquidDispenserModule.data[line].sP3P;

      if (col === 9 || col === 11 || col === 13) {

        if (value.toLowerCase().includes("volume")) {

          this.liquidDispenserModule.update.selectedOption = "Volume";
          this.liquidDispenserModule.update.volumeSelected = true;
          this.liquidDispenserModule.update.selectedValue = volume;

        } else {
          this.liquidDispenserModule.update.selectedOption = value;
        }
      }


    },


    /*---------------------------------------------------------------------------
    * Function to load selected load Tlc Migration's data into update dialog
    * --------------------------------------------------------------------------*/
    loadTlcMigrationDataInDialog(value) {
      this.tlcMigrationModule.update.selectedOption = value;
    },
    /*---------------------------------------------------------------------------
    * Function to load selected load PH Meter's data into update dialog
    * --------------------------------------------------------------------------*/
    loadPhMeterDataInDialog(value) {
      this.phMeterModule.update.selectedOption = value;
    },
    /*----------------------------------------------------------------------------------
    * Function to load selected load Drop Dispenser's data into update dialog
    * ---------------------------------------------------------------------------------*/
    loadDropDispenserDataInDialog(value) {

      this.dropDispenserModule.update.selectedOption = value;
    },

    /*----------------------------------------------------------------------------------
    * Function to load selected load Waiting Condition's data into update dialog
    * ---------------------------------------------------------------------------------*/
    loadWaitingConditionDataInDialog(line) {

      this.updateWaitingCondition.timeoutOptionSelected = false;
      this.updateWaitingCondition.instrumentOptionSelected = false;

      if (this.waitingConditionModule.data[line].description.toLowerCase().includes('timeout')) {
        this.updateWaitingCondition.selectedOption = 'Timeout';
        this.updateWaitingCondition.timeoutOptionSelected = true;
        this.updateWaitingCondition.instrumentOptionSelected = false;
        this.updateWaitingCondition.timeoutOldValue = this.updateWaitingCondition.timeoutValue = this.waitingConditionModule.data[line].value;
      } else {
        this.updateWaitingCondition.selectedOption = this.waitingConditionModule.data[line].description;
      }

    },


    /*------------------------------------------------------------------------
    * Function to retrieve updated line and module
    * ------------------------------------------------------------------------*/
    updateLine(value, col, name, line) {

      switch (name) {

        case this.tlcMigrationModule.name:
          this.extractTlcMigrationDataFromDialog(line);
          this.updateModule(this.tlcMigrationModule.data[line], name);
          setTimeout(() => this.fetchData(this.tlcMigrationModule), 1000);
          break;

        case this.dropDispenserModule.name:
          this.extractDropDispenserDataFromDialog(line);
          this.updateModule(this.dropDispenserModule.data[line], name);
          setTimeout(() => this.fetchData(this.dropDispenserModule), 1000);
          break;

        case this.liquidDispenserModule.name:
          this.extractLiquidDispenserDataFromDialog(col, line);
          this.updateModule(this.liquidDispenserModule.data[line], name);
          setTimeout(() => this.fetchData(this.liquidDispenserModule), 1000);
          break;


        case this.phMeterModule.name:
          this.extractPhMeterDataFromDialog(line);
          this.updateModule(this.phMeterModule.data[line], name);
          setTimeout(() => this.fetchData(this.phMeterModule), 1000);
          break;

        case this.waitingConditionModule.name:
          this.extractWaitingConditionDataFromDialog(line);
          this.updateModule(this.waitingConditionModule.data[line], name);
          setTimeout(() => this.fetchData(this.waitingConditionModule), 1000);
          break;

        case this.commentModule.name:
          this.updateModule(this.commentModule.data[line], name);
          break;

        case this.stepModule.name:
          if (this.checkStepNumberValidity(value)) {
            if (this.stepModule.data[line].step !== this.stepModule.updateStep[0].oldValue) {
              this.extractStepDataFromDialog(line);
              this.updateModule(this.stepModule.data[line], 'methods/editStep');
              setTimeout(() => this.loadModulesData(), 1500);
            }
          }
          break;

        default:
          break;
      }


    },

    cancelLineUpdate() {
    },

    /*------------------------------------------------------------------------
     * Function called when one edits a line (initialize dialog data)
     * ------------------------------------------------------------------------*/
    open(value, col, name, line) {

      switch (name) {
        case this.stepModule.name:
          this.stepModule.updateStep[0].oldValue = this.stepModule.data[line].step;
          break;

        case this.tlcMigrationModule.name:
          this.loadTlcMigrationDataInDialog(value);
          break;

        case this.phMeterModule.name:
          this.loadPhMeterDataInDialog(value);
          break;

        case this.liquidDispenserModule.name:
          this.loadLiquidDispenserDataInDialog(value, col, line);
          break;

        case this.dropDispenserModule.name:
          this.loadDropDispenserDataInDialog(value);
          break;

        case this.waitingConditionModule.name:
          this.loadWaitingConditionDataInDialog(line);
          break;

        default:
          break;
      }

    },

    /*------------------------------------------------------------------------
     * Function called when one closes the edit line
     * ------------------------------------------------------------------------*/
    close(value, col, name, line) {

      if (name === this.stepModule.name && this.stepModule.updateStep[0].stepToUpdate === false) {
        this.stepModule.data[line].step = this.stepModule.updateStep[0].oldValue;
        this.snackbar.color = 'error';
        this.snackbar.message = 'Step out of bounds';
        this.snackbar.show = true;
        setTimeout(() => this.snackbar.color = '', 2000);
      }
      this.stepModule.updateStep[0].stepToUpdate = false;

      // Reset waiting condition  values
      if (name === this.waitingConditionModule.name) {
        this.updateWaitingCondition.timeoutOldValue = 0;
        this.updateWaitingCondition.selectedOldInstrument = 'Gina';
      }

    },

    /*------------------------------------------------------------------------
     * Function to check if the new step number is valid
     * ------------------------------------------------------------------------*/
    checkStepNumberValidity(lineNumber) {

      return !(parseInt(lineNumber) < 0 || parseInt(lineNumber) > this.stepModule.data.length - 1);
    },

    /*------------------------------------------------------------------------
     * Function used to load all modules names
     * ------------------------------------------------------------------------*/
    initialization() {

      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.tlcMigrationModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
      this.commentModule.name = this.$store.state.commentModuleName;
      this.stepModule.name = 'Steps';
      this.actionsModule.name = 'Actions';

      this.aurasModules.push(
          this.dropDispenserModule,
          this.phMeterModule,
          this.liquidDispenserModule,
          this.tlcMigrationModule,
          this.commentModule,
          this.waitingConditionModule);
    },

    /*--------------------------------------------------------------------------
     *  Redirection to another page
     * -------------------------------------------------------------------------*/
    redirectTo(route) {
      if (route.includes('RunAuras'))
        this.$router.push({name: route, params: {idMethod: this.currentMethod.id}});
      else
        this.$router.push({name: route});
    },


    /*------------------------------------------------------------------------
    * Function used to extract tlcModule step data
    * ------------------------------------------------------------------------*/
    saveTlcMigrationModuleLine() {

      let tlcMMStep = JSON.parse(JSON.stringify(this.$refs.plateForm.tlcMigrationModule.data[0]));
      tlcMMStep.step = this.currentStep;
      tlcMMStep.methodId = this.currentMethod.id;
      tlcMMStep.description = JSON.parse(JSON.stringify(this.$refs.plateForm.tlcMigrationModule.selectedOption));

      this.$data.tlcMigrationModule.data.push(tlcMMStep);
      this.postStep(tlcMMStep, this.tlcMigrationModule.name);
    },
    /*------------------------------------------------------------------------
      * Function used to extract phMeterModule step data
      * ------------------------------------------------------------------------*/
    savePhMeterModuleLine() {

      let phMeterStep = JSON.parse(JSON.stringify(this.$refs.plateForm.phMeterModule.data[0]));

      phMeterStep.step = this.currentStep;
      phMeterStep.methodId = this.currentMethod.id;
      phMeterStep.description = JSON.parse(JSON.stringify(this.$refs.plateForm.phMeterModule.selectedOption));
      this.$data.phMeterModule.data.push(phMeterStep);

      this.postStep(phMeterStep, this.phMeterModule.name);
    },
    /*------------------------------------------------------------------------
    * Function used to extract liquidDispenserModule step data
    * ------------------------------------------------------------------------*/
    saveDropDispenserModuleLine() {
      let dropDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.dropDispenserModule.data[0]));

      dropDispenserStep.step = this.currentStep;
      dropDispenserStep.methodId = this.currentMethod.id;
      dropDispenserStep.description = JSON.parse(JSON.stringify(this.$refs.plateForm.dropDispenserModule.selectedOption));

      this.$data.dropDispenserModule.data.push(dropDispenserStep);
      this.postStep(dropDispenserStep, this.dropDispenserModule.name);
    },

    /*------------------------------------------------------------------------
     * Function used to extract dropDispenserModule step data
     * ------------------------------------------------------------------------*/
    saveLiquidDispenserLine() {

      let liquidDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModule.data[0]));

      liquidDispenserStep.displayedSP1Info = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModule.selectedSP1));
      liquidDispenserStep.displayedSP2Info = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModule.selectedSP2));
      liquidDispenserStep.displayedSP3Info = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModule.selectedSP3));

      liquidDispenserStep.displayedSP1Info.includes('Volume') ? liquidDispenserStep.displayedSP1Info += ': ' + liquidDispenserStep.sP1P + ' µL' : '';
      liquidDispenserStep.displayedSP2Info.includes('Volume') ? liquidDispenserStep.displayedSP2Info += ': ' + liquidDispenserStep.sP2P + ' µL' : '';
      liquidDispenserStep.displayedSP3Info.includes('Volume') ? liquidDispenserStep.displayedSP3Info += ': ' + liquidDispenserStep.sP3P + ' µL' : '';

      liquidDispenserStep.step = this.currentStep;
      liquidDispenserStep.methodId = this.currentMethod.id;

      this.$data.liquidDispenserModule.data.push(liquidDispenserStep);
      this.postStep(liquidDispenserStep, this.liquidDispenserModule.name);
    },

    /*------------------------------------------------------------------------
    * Function used to extract waiting condition step data
    * ------------------------------------------------------------------------*/
    saveWaitingConditionLine() {


      let waitingConditionStep = {
        description: this.$refs.plateForm.waitingCondition.selectedOption
      };

      if (this.$refs.plateForm.waitingCondition.selectedOption === 'None') {
        waitingConditionStep.value = 0;

      } else if (this.$refs.plateForm.waitingCondition.selectedOption === 'Timeout') {
        waitingConditionStep.value = this.$refs.plateForm.waitingCondition.timeoutValue;

      } else {
        waitingConditionStep = {
          description: this.$refs.plateForm.waitingCondition.selectedOption,
          value: -1,
        };
      }

      waitingConditionStep.step = this.currentStep;
      waitingConditionStep.methodId = this.currentMethod.id;
      waitingConditionStep.type = this.$refs.plateForm.waitingCondition.selectedOption

      this.postStep(waitingConditionStep, this.waitingConditionModule.name);

      // for UI displaying purpose
      if (this.$refs.plateForm.waitingCondition.selectedOption === 'Timeout')
        waitingConditionStep.description += ': ' + waitingConditionStep.value + ' ms';

      this.waitingConditionModule.data.push(waitingConditionStep);

    },

    /*------------------------------------------------------------------------
    * Function used to extract Comment step data
    * ------------------------------------------------------------------------*/
    saveCommentModuleLine() {

      let commentStep = {
        content: this.$refs.plateForm.comment,
        Step: this.currentStep,
        methodId: this.currentMethod.id
      };
      this.$data.commentModule.data.push(commentStep);
      this.postStep(commentStep, this.commentModule.name);
    },

    /*------------------------------------------------------------------------
    * Function used to add a step in the currently created method
    * ------------------------------------------------------------------------*/
    async SaveLine() {

      this.extractStepModuleLine();
      this.saveTlcMigrationModuleLine();
      this.savePhMeterModuleLine();
      this.saveDropDispenserModuleLine();
      this.saveLiquidDispenserLine();
      this.saveWaitingConditionLine();
      this.saveCommentModuleLine();

      this.$refs.plateForm.resetPlatformTables();

      this.currentStep++;
    },

    /*------------------------------------------------------------------------
    * Function to confirm the deletion of a step of current method
    * ------------------------------------------------------------------------*/
    confirmDelete(index) {

      this.dialogDelete = true;
      this.deletedIndex = index;

    },

    /*------------------------------------------------------------------------
    * Function to delete a step of current method
    * ------------------------------------------------------------------------*/
    async deleteStep() {

      this.dialogDelete = false;
      let data = {
        id: this.deletedIndex,
        methodId: this.currentMethod.id
      };

      this.updateModule(data, 'methods/deleteStep');

      setTimeout(() => this.loadModulesData(), 1500);
    },

    /*------------------------------------------------------------------------
     * Function to fetch current method data
     * ------------------------------------------------------------------------*/
    fetchMethod() {

      axios
          .get('http://' + this.$aurasApi + 'api/Methods/' + this.$route.params.idMethod)
          .then((response) => {
            if (response.status === 200) {
              this.currentMethod = response.data;
            } else {
              this.snackbar.message = response.data.message;
            }
          });
    },

    /*------------------------------------------------------------------------
     * Function to fetch all modules data
     * ------------------------------------------------------------------------*/
    fetchModulesList() {
      axios
          .get('http://' + this.$aurasApi + 'api/Modules')
          .then((response) => {
            if (response.status === 200) {
              this.allModulesList = response.data;
            } else {
              this.snackbar.message = response.data.message;
            }
          });
    },

    /*------------------------------------------------------------------------
     * Function load number of actual steps
     * ------------------------------------------------------------------------*/
    loadStepsAndActions(length) {

      for (let i = 0; i < length; i++) {

        let step = {step: JSON.parse(JSON.stringify(this.currentStep))};
        this.$data.stepModule.data.push(step);
        let line = {line: JSON.parse(JSON.stringify(this.currentStep))};
        this.$data.actionsModule.data.push(line);
        this.currentStep++;

      }
    },

    /*------------------------------------------------------------------------
    * Function to call module's webservice
    * ------------------------------------------------------------------------*/
    async fetchData(module) {

      let uri = this.getModuleUri(module.name);

      await axios
          .get('http://' + this.$aurasApi + 'api/' + uri + this.$route.params.idMethod)
          .then(async (response) => {
            if (response.status === 200) {
              module.data = await response.data;

              //Set stepModule data and actions
              if (0 === this.stepCount++)
                this.loadStepsAndActions(module.data.length);

              if (module.name.toLowerCase().includes('drop'))
                this.loadDropDispenserDisplayedInfo();

              if (module.name.toLowerCase().includes('liquid'))
                this.loadLiquidDispenserUpdateInfo();

              if (module.name.toLowerCase().includes('waiting'))
                this.loadWCDisplayedInfo();


            } else {
              this.snackbar.message = response.data.message;
            }
          });
    },

    /*------------------------------------------------------------------------
    * Function to send method's line to database
    * ------------------------------------------------------------------------*/
    async postStep(moduleData, moduleName) {
      let url = this.getModuleUri(moduleName);

      axios.post('http://' + this.$aurasApi + "api/" + url, moduleData)
          .then(
              (response) => {

                if (response.status === 201)
                  this.snackbar.message = "Step created correctly";
                else
                  this.snackbar.message = "Could not create the step";

              });
      this.snackbar.show = true;

    },

    /*------------------------------------------------------------------------
    * Function to update method's data to database
    * ------------------------------------------------------------------------*/
    getModuleUri(moduleName) {
      return moduleName.replace(/ +/g, "") + 's/';
    },

    /*------------------------------------------------------------------------
    * Function to update method's data to database
    * ------------------------------------------------------------------------*/
    updateModule(data, name) {

      let url = this.getModuleUri(name);
      url = 'api/' + url;

      axios
          .put('http://' + this.$aurasApi + url + data.id, data)
          .then((response) => {

            if (response.status === 204) {
              name.toLowerCase().includes('delete')
                  ? this.snackbar.message = "Step deleted successfully"
                  : this.snackbar.message = "Step updated successfully";

            } else {
              this.snackbar.message = response.data.message;
              this.snackbar.color = 'error';
            }
          });
      this.snackbar.show = true;
    },
  }
}
</script>


<style scoped>

table {
  table-layout: auto;
  border-collapse: collapse;
  width: 100%;
}

table .absorbing-column {
  width: 100%;
}

.module-title-color {
  color: dodgerblue;
}

.horizontal >>> .v-hl-btn svg {
  margin-left: 60px;

}

</style>