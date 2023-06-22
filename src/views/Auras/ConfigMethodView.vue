<template>
  <div>
    <!--Method actions-->
    <div style="min-height: 100px" class="visibleTop">
      <v-card elevation="1" id="navCard">
        <v-card-title class="justify-center">
          <strong><u>Current Method:</u> {{ currentMethod.name }}</strong>

          <v-spacer/>
          <v-btn color="purple"
                 class="white--text"
                 @click="redirectTo('home')"
          >
            <v-icon>mdi-slot-machine-outline</v-icon>
            All stations
          </v-btn>
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
          <v-btn v-if="simulatorMode"
                 color="#eb3434"
                 class="ma-2 white--text"
                 @click="restartSimulator()"
          >
            <v-icon>mdi-refresh</v-icon>
            Reset Simulator
          </v-btn>
          <v-btn v-else
                 color="#eb3434"
                 class="ma-2 white--text"
                 @click="emergencyStop">
            Emergency Stop
          </v-btn>
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

    <vue-scroll-snap style="width:100%; overflow: hidden; " :horizontal="true">

      <!--Steps -->

      <v-card elevation="0">
        <v-card-title class="justify-center module-title-color">{{ stepModule.name }}</v-card-title>
        <v-card-text>
          <v-data-table :headers="stepModule.columns"
                        :items="stepModule.data"
                        :hide-default-footer="true"
                        disable-pagination
                        v-simple-table-sticky
          >

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

      <v-card elevation="0" style="width:88%;">

        <vue-horizontal ref="horizontal" scroll snap="none" responsive :displacement="0.5" :button="false">

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

                        v-simple-table-sticky
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

                        v-simple-table-sticky
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
                        v-simple-table-sticky
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
                        v-simple-table-sticky
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
                                                v-model="liquidDispenserModule.update.selectedSPOption"/>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td v-if="liquidDispenserModule.update.volumeSelected">
                                      <v-text-field v-model="liquidDispenserModule.update.selectedVolumeValue"
                                                    label="Volume in µL"/>

                                    </td>

                                  </tr>
                                </table>
                                <table
                                    v-else-if="header.value ==='sP1S'|| header.value ==='sP2S' || header.value ==='sP3S'">

                                  <tr>
                                    <td>
                                      <v-text-field
                                          :rules="[speedRulesForSp.acceptedValues]"
                                          v-model="liquidDispenserModule.update.selectedSpeedValue"
                                          label="Speed in µL/s"/>

                                    </td>

                                  </tr>
                                </table>
                                <table
                                    v-else-if="header.value ==='pumP1S'">

                                  <tr>
                                    <td>
                                      <v-text-field
                                          :rules="[speedRulesForPump.acceptedValues]"
                                          v-model="liquidDispenserModule.update.selectedSpeedValue"
                                          label="Speed in rpm"/>

                                    </td>

                                  </tr>
                                </table>
                                <table v-else-if="header.value.includes('displayedLds')">
                                  <tr>
                                    <td>
                                      <v-select :items="liquidDispenserModule.items2"
                                                v-model="liquidDispenserModule.update.selectedLDSOption"/>
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
                        v-simple-table-sticky
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
                  <v-card-title class="justify-center module-title-color">Description</v-card-title>
                  <v-card-text>
                    <v-data-table
                        :headers="commentModule.columns"
                        :items="commentModule.data"
                        :hide-default-footer="true"
                        disable-pagination

                        v-simple-table-sticky
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

        </vue-horizontal>

<!--        Navigation buttons-->
        <v-btn
            @click="$refs.horizontal.prev()"
           id="btnPrev"
            outlined
            small
            fab
            color="indigo"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
            @click="$refs.horizontal.next()"
            id="btnNext"
            outlined
            small
            fab
            color="indigo"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

      </v-card>

      <!--Step actions-->

      <v-card elevation="0">
        <v-card-title class="justify-center module-title-color">{{ actionsModule.name }}</v-card-title>
        <v-card-text>
          <v-data-table :headers="actionsModule.columns"
                        :items="actionsModule.data"
                        :hide-default-footer="true"
                        disable-pagination
                        v-simple-table-sticky
          >
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

    <PlatFormCard mode="config" @lineSaved="SaveLine" ref="plateForm" key="configComponent"/>

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

import VueHorizontal from "vue-horizontal";

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
    VueScrollSnap,
    VueHorizontal
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
    timeout: 1000,
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
      ldS10: '',
      ldS11: '',
      ldS12: '',
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
      items: ['Idle position', 'QC sample', 'Rinsing', 'Calibration 1', 'Calibration 2', 'Lift'],
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
      items: ['Volume', 'QC sample drop', 'Fill LAL cartridge'],
      items2: ['Left', 'Right', '0'],
      columns: [
        {text: "LDS1", value: "displayedLds1", width: 82, sortable: false, align: 'center'},
        {text: "LDS2", value: "displayedLds2", width: 82, sortable: false, align: 'center'},
        {text: "LDS3", value: "displayedLds3", width: 82, sortable: false, align: 'center'},
        {text: "LDS4", value: "displayedLds4", width: 82, sortable: false, align: 'center'},
        {text: "LDS5", value: "displayedLds5", width: 82, sortable: false, align: 'center'},
        {text: "LDS6", value: "displayedLds6", width: 82, sortable: false, align: 'center'},
        {text: "LDS7", value: "displayedLds7", width: 82, sortable: false, align: 'center'},
        {text: "LDS8", value: "displayedLds8", width: 82, sortable: false, align: 'center'},
        {text: "LDS9", value: "displayedLds9", width: 82, sortable: false, align: 'center'},
        {text: "LDS10", value: "displayedLds10", width: 82, sortable: false, align: 'center'},
        {text: "LDS11", value: "displayedLds11", width: 82, sortable: false, align: 'center'},
        {text: "LDS12", value: "displayedLds12", width: 82, sortable: false, align: 'center'},
        {text: "SP3 Quantity", value: "displayedSP3Info", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Speed (µL/s)", value: "sP3S", width: 150, sortable: false, align: 'center'},
        {text: "SP1 Quantity", value: "displayedSP1Info", width: 150, sortable: false, align: 'center'},
        {text: "SP1 Speed (µL/s)", value: "sP1S", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Quantity", value: "displayedSP2Info", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Speed (µL/s)", value: "sP2S", width: 150, sortable: false, align: 'center'},
        {text: "Rotations pump", value: "pumP1P", width: 150, sortable: false, align: 'center'},
        {text: "Speed pump (rpm)", value: "pumP1S", width: 150, sortable: false, align: 'center'},
      ],
      data: [],
      update: {
        selectedSPOption: '',
        selectedLDSOption: '',
        selectedVolumeValue: '',
        selectedSpeedValue: '',
        volumeSelected: false
      }
    },

    volumeRules: {
      acceptedValues: value => value > 0 && value <= 1000 || 'Values must be between 0µL and 1000 µL'
    },

    speedRulesForSp: {
      acceptedValues: value => value > 0 && value <= 200 || 'Values must be between 1µL/s and 200 µL/s'
    },

    speedRulesForPump: {
      acceptedValues: value => value > 0 && value <= 500 || 'Values must be between rpm and 200 rpm'
    },

    commentModule: {
      name: '',
      columns: [
        {text: 'Description', value: 'content', width: 350, sortable: false, align: 'center'},
      ],
      data: []
    },

    waitingConditionModule: {
      name: 'Waiting condition',
      columns: [{text: 'Waiting condition', value: 'description', width: 160, sortable: false, align: 'center'}],
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
    contentHeight: 0,
    simulatorMode: false,
  }),

  mounted() {

    this.initialization();
    this.fetchMethod();
    this.fetchModulesList();
    this.loadModulesData();

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
      if (vm.prevRoute.path !== '/')
        location.reload();
    });
  },

  watch: {

    /*------------------------------------------------------------------------
    * Listener used to watch the changes in the waiting condition module
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

    /*------------------------------------------------------------------------
    * Listener used to watch the changes in the SP update pop up
    * ------------------------------------------------------------------------*/
    'liquidDispenserModule.update.selectedSPOption'() {

      this.liquidDispenserModule.update.selectedSPOption.toLowerCase().includes('volume') ?
          this.liquidDispenserModule.update.volumeSelected = true :
          this.liquidDispenserModule.update.volumeSelected = false;
    }

  },

  methods: {

    restartSimulator() {
      let data = {
        restart: true
      }
      this.$refs.plateForm.sendToWebsocket(data);

    },
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
        this.concatenatedData.ldS10 = this.liquidDispenserModule.data[i].ldS10;
        this.concatenatedData.ldS11 = this.liquidDispenserModule.data[i].ldS11;
        this.concatenatedData.ldS12 = this.liquidDispenserModule.data[i].ldS12;
        this.concatenatedData.sp1P = this.liquidDispenserModule.data[i].sP1P;
        this.concatenatedData.sp1S = this.liquidDispenserModule.data[i].sP1S;
        this.concatenatedData.sp2P = this.liquidDispenserModule.data[i].sP2P;
        this.concatenatedData.sp2S = this.liquidDispenserModule.data[i].sP2S;
        this.concatenatedData.sp3P = this.liquidDispenserModule.data[i].sP3P;
        this.concatenatedData.sp3S = this.liquidDispenserModule.data[i].sP3S;
        this.concatenatedData.pump1p = this.liquidDispenserModule.data[i].pumP1P;
        this.concatenatedData.pump1S = this.liquidDispenserModule.data[i].pumP1S;

        this.concatenatedData.dropDispenser = this.dropDispenserModule.data[i].description;
        this.concatenatedData.tlcMigration = this.tlcMigrationModule.data[i].description;
        this.concatenatedData.phMeter = this.phMeterModule.data[i].description;

        this.downloadedData.splice(i, 0, JSON.parse(JSON.stringify(this.concatenatedData)));
      }


    },

    emergencyStop() {

      this.$refs.plateForm.sendToWebsocket({"EmergencyStop ": true});
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
        !isNaN(parseInt(line.sP1P)) ? line.displayedSP1Info = 'Volume: ' + line.sP1P + ' µL' : line.displayedSP1Info = line.sP1P;
        !isNaN(parseInt(line.sP2P)) ? line.displayedSP2Info = 'Volume: ' + line.sP2P + ' µL' : line.displayedSP2Info = line.sP2P;
        !isNaN(parseInt(line.sP3P)) ? line.displayedSP3Info = 'Volume: ' + line.sP3P + ' µL' : line.displayedSP3Info = line.sP3P;

        if (line.ldS1 === 0) line.displayedLds1 = '0';
        else if (line.ldS1 > 0) line.displayedLds1 = 'Right';
        else line.displayedLds1 = 'Left';

        if (line.ldS2 === 0) line.displayedLds2 = '0';
        else if (line.ldS2 > 0) line.displayedLds2 = 'Right';
        else line.displayedLds2 = 'Left';

        if (line.ldS3 === 0) line.displayedLds3 = '0';
        else if (line.ldS3 > 0) line.displayedLds3 = 'Right';
        else line.displayedLds3 = 'Left';

        if (line.ldS4 === 0) line.displayedLds4 = '0';
        else if (line.ldS4 > 0) line.displayedLds4 = 'Right';
        else line.displayedLds4 = 'Left';

        if (line.ldS5 === 0) line.displayedLds5 = '0';
        else if (line.ldS5 > 0) line.displayedLds5 = 'Right';
        else line.displayedLds5 = 'Left';

        if (line.ldS6 === 0) line.displayedLds6 = '0';
        else if (line.ldS6 > 0) line.displayedLds6 = 'Right';
        else line.displayedLds6 = 'Left';

        if (line.ldS7 === 0) line.displayedLds7 = '0';
        else if (line.ldS7 > 0) line.displayedLds7 = 'Right';
        else line.displayedLds7 = 'Left';

        if (line.ldS8 === 0) line.displayedLds8 = '0';
        else if (line.ldS8 > 0) line.displayedLds8 = 'Right';
        else line.displayedLds8 = 'Left';

        if (line.ldS9 === 0) line.displayedLds9 = '0';
        else if (line.ldS9 > 0) line.displayedLds9 = 'Right';
        else line.displayedLds9 = 'Left';

        if (line.ldS10 === 0) line.displayedLds10 = '0';
        else if (line.ldS10 > 0) line.displayedLds10 = 'Right';
        else line.displayedLds10 = 'Left';

        if (line.ldS11 === 0) line.displayedLds11 = '0';
        else if (line.ldS11 > 0) line.displayedLds11 = 'Right';
        else line.displayedLds11 = 'Left';

        if (line.ldS12 === 0) line.displayedLds12 = '0';
        else if (line.ldS12 > 0) line.displayedLds12 = 'Right';
        else line.displayedLds12 = 'Left';

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

      if (col === 0)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS1 = 20;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS1 = -20;
        else
          this.liquidDispenserModule.data[line].ldS1 = 0;

      if (col === 1)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS2 = 20;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS2 = -20;
        else
          this.liquidDispenserModule.data[line].ldS2 = 0;

      if (col === 2)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS3 = 20;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS3 = -20;
        else
          this.liquidDispenserModule.data[line].ldS3 = 0;

      if (col === 3)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS4 = 20;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS4 = -20;
        else
          this.liquidDispenserModule.data[line].ldS4 = 0;

      if (col === 4)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS5 = 20;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS5 = -20;
        else
          this.liquidDispenserModule.data[line].ldS5 = 0;

      if (col === 5)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS6 = 20;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS6 = -20;
        else
          this.liquidDispenserModule.data[line].ldS6 = 0;

      if (col === 6)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS7 = 20;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS7 = -20;
        else
          this.liquidDispenserModule.data[line].ldS7 = 0;


      if (col === 7)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS8 = 55;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS8 = -55;
        else
          this.liquidDispenserModule.data[line].ldS8 = 0;


      if (col === 8)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS9 = 55;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS9 = -55;
        else
          this.liquidDispenserModule.data[line].ldS9 = 0;


      if (col === 9)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS10 = 20;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS10 = -20;
        else
          this.liquidDispenserModule.data[line].ldS10 = 0;


      if (col === 10)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS11 = 20;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS11 = -20;
        else
          this.liquidDispenserModule.data[line].ldS11 = 0;

      if (col === 11)
        if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('right'))
          this.liquidDispenserModule.data[line].ldS12 = 20;
        else if (this.liquidDispenserModule.update.selectedLDSOption.toLowerCase().includes('left'))
          this.liquidDispenserModule.data[line].ldS12 = -20;
        else
          this.liquidDispenserModule.data[line].ldS12 = 0;

      if (col === 12)
        if (this.liquidDispenserModule.update.selectedSPOption.toLowerCase().includes('volume')) {
          this.liquidDispenserModule.data[line].sP3P = this.liquidDispenserModule.update.selectedVolumeValue;
        } else
          this.liquidDispenserModule.data[line].sP3P = this.liquidDispenserModule.update.selectedSPOption;

      if (col === 13)
        if (this.liquidDispenserModule.update.selectedSpeedValue >= 1 && this.liquidDispenserModule.update.selectedSpeedValue <= 200)
          this.liquidDispenserModule.data[line].sP3S = this.liquidDispenserModule.update.selectedSpeedValue;

      if (col === 14)
        if (this.liquidDispenserModule.update.selectedSPOption.toLowerCase().includes('volume')) {
          this.liquidDispenserModule.data[line].sP1P = this.liquidDispenserModule.update.selectedVolumeValue;
        } else
          this.liquidDispenserModule.data[line].sP1P = this.liquidDispenserModule.update.selectedSPOption;

      if (col === 15)
        if (this.liquidDispenserModule.update.selectedSpeedValue >= 1 && this.liquidDispenserModule.update.selectedSpeedValue <= 200)
          this.liquidDispenserModule.data[line].sP1S = this.liquidDispenserModule.update.selectedSpeedValue;

      if (col === 16)
        if (this.liquidDispenserModule.update.selectedSPOption.toLowerCase().includes('volume')) {
          this.liquidDispenserModule.data[line].sP2P = this.liquidDispenserModule.update.selectedVolumeValue;
        } else
          this.liquidDispenserModule.data[line].sP2P = this.liquidDispenserModule.update.selectedSPOption;

      if (col === 17)
        if (this.liquidDispenserModule.update.selectedSpeedValue >= 1 && this.liquidDispenserModule.update.selectedSpeedValue <= 200)
          this.liquidDispenserModule.data[line].sP2S = this.liquidDispenserModule.update.selectedSpeedValue;

      if (col === 19)
        if (this.liquidDispenserModule.update.selectedSpeedValue >= 1 && this.liquidDispenserModule.update.selectedSpeedValue <= 500)
          this.liquidDispenserModule.data[line].pumP1S = this.liquidDispenserModule.update.selectedSpeedValue;

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
          this.dropDispenserModule.data[line].value = 0;
          break;
        case "Standards":
          this.dropDispenserModule.data[line].value = 1;
          break;
        default:
          this.dropDispenserModule.data[line].value = 0;
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
      let speed;

      if (col === 0)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds1;
      if (col === 1)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds2;
      if (col === 2)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds3;
      if (col === 3)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds4;
      if (col === 4)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds5;
      if (col === 5)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds6;
      if (col === 6)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds7;
      if (col === 7)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds8;
      if (col === 8)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds9;
      if (col === 9)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds10;
      if (col === 10)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds11;
      if (col === 11)
        this.liquidDispenserModule.update.selectedLDSOption = this.liquidDispenserModule.data[line].displayedLds12;
      if (col === 12)
        volume = this.liquidDispenserModule.data[line].sP3P;
      if (col === 13)
        speed = this.liquidDispenserModule.data[line].sP3S;
      if (col === 14)
        volume = this.liquidDispenserModule.data[line].sP1P;
      if (col === 15)
        speed = this.liquidDispenserModule.data[line].sP1S;
      if (col === 16)
        volume = this.liquidDispenserModule.data[line].sP2P;
      if (col === 17)
        speed = this.liquidDispenserModule.data[line].sP2S;
      if (col === 19)
        speed = this.liquidDispenserModule.data[line].pumP1S;


      if (col === 13 || col === 15 || col === 17 || col === 19) {

        this.liquidDispenserModule.update.selectedSpeedValue = speed;

      } else if (col === 12 || col === 14 || col === 16) {

        if (value.toLowerCase().includes("volume")) {

          this.liquidDispenserModule.update.selectedSPOption = "Volume";
          this.liquidDispenserModule.update.volumeSelected = true;
          this.liquidDispenserModule.update.selectedVolumeValue = volume;

        } else {
          this.liquidDispenserModule.update.selectedSPOption = value;
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
              setTimeout(() => this.loadModulesData(), 1000);
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

        setTimeout(() => this.snackbar.color = '', 1000);
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
      this.contentHeight = this.$vuetify.application.top;

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

      let tlcMMStep = JSON.parse(JSON.stringify(this.$refs.plateForm.tlcMigrationModuleConfig.data[0]));
      tlcMMStep.step = this.currentStep;
      tlcMMStep.methodId = this.currentMethod.id;
      tlcMMStep.description = JSON.parse(JSON.stringify(this.$refs.plateForm.tlcMigrationModuleConfig.selectedOption));

      //this.$data.tlcMigrationModule.data.push(tlcMMStep);
      this.postStep(tlcMMStep, this.tlcMigrationModule.name);
    },
    /*------------------------------------------------------------------------
      * Function used to extract phMeterModule step data
      * ------------------------------------------------------------------------*/
    savePhMeterModuleLine() {

      let phMeterStep = JSON.parse(JSON.stringify(this.$refs.plateForm.phMeterModuleConfig.data[0]));

      phMeterStep.step = this.currentStep;
      phMeterStep.methodId = this.currentMethod.id;
      phMeterStep.description = JSON.parse(JSON.stringify(this.$refs.plateForm.phMeterModuleConfig.selectedOption));

      //this.$data.phMeterModule.data.push(phMeterStep);

      this.postStep(phMeterStep, this.phMeterModule.name);
    },
    /*------------------------------------------------------------------------
    * Function used to extract liquidDispenserModule step data
    * ------------------------------------------------------------------------*/
    saveDropDispenserModuleLine() {
      let dropDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.dropDispenserModuleConfig.data[0]));

      dropDispenserStep.step = this.currentStep;
      dropDispenserStep.methodId = this.currentMethod.id;
      dropDispenserStep.description = JSON.parse(JSON.stringify(this.$refs.plateForm.dropDispenserModuleConfig.selectedOption));

      //this.$data.dropDispenserModule.data.push(dropDispenserStep);
      this.postStep(dropDispenserStep, this.dropDispenserModule.name);
    },

    /*------------------------------------------------------------------------
     * Function used to extract dropDispenserModule step data
     * ------------------------------------------------------------------------*/
    saveLiquidDispenserLine() {

      let liquidDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModuleConfig.data[0]));

      liquidDispenserStep.displayedSP1Info = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModuleConfig.selectedSP1));
      liquidDispenserStep.displayedSP2Info = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModuleConfig.selectedSP2));
      liquidDispenserStep.displayedSP3Info = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModuleConfig.selectedSP3));

      liquidDispenserStep.displayedSP1Info.includes('Volume') ? liquidDispenserStep.displayedSP1Info += ': ' + liquidDispenserStep.sP1P + ' µL' : '';
      liquidDispenserStep.displayedSP2Info.includes('Volume') ? liquidDispenserStep.displayedSP2Info += ': ' + liquidDispenserStep.sP2P + ' µL' : '';
      liquidDispenserStep.displayedSP3Info.includes('Volume') ? liquidDispenserStep.displayedSP3Info += ': ' + liquidDispenserStep.sP3P + ' µL' : '';

      liquidDispenserStep.step = this.currentStep;
      liquidDispenserStep.methodId = this.currentMethod.id;

      if (liquidDispenserStep.ldS1 > 7) liquidDispenserStep.ldS1 = 20;
      else if (liquidDispenserStep.ldS1 < -7) liquidDispenserStep.ldS1 = -20;
      else liquidDispenserStep.ldS1 = 0;

      if (liquidDispenserStep.ldS2 > 7) liquidDispenserStep.ldS2 = 20;
      else if (liquidDispenserStep.ldS2 < -7) liquidDispenserStep.ldS2 = -20;
      else liquidDispenserStep.ldS2 = 0;

      if (liquidDispenserStep.ldS3 > 7) liquidDispenserStep.ldS3 = 20;
      else if (liquidDispenserStep.ldS3 < -7) liquidDispenserStep.ldS3 = -20;
      else liquidDispenserStep.ldS3 = 0;

      if (liquidDispenserStep.ldS4 > 7) liquidDispenserStep.ldS4 = 20;
      else if (liquidDispenserStep.ldS4 < -7) liquidDispenserStep.ldS4 = -20;
      else liquidDispenserStep.ldS4 = 0;

      if (liquidDispenserStep.ldS5 > 7) liquidDispenserStep.ldS5 = 20;
      else if (liquidDispenserStep.ldS5 < -7) liquidDispenserStep.ldS5 = -20;
      else liquidDispenserStep.ldS5 = 0;

      if (liquidDispenserStep.ldS6 > 7) liquidDispenserStep.ldS6 = 20;
      else if (liquidDispenserStep.ldS6 < -7) liquidDispenserStep.ldS6 = -20;
      else liquidDispenserStep.ldS6 = 0;

      if (liquidDispenserStep.ldS7 > 7) liquidDispenserStep.ldS7 = 55;
      else if (liquidDispenserStep.ldS7 < -7) liquidDispenserStep.ldS7 = -55;
      else liquidDispenserStep.ldS7 = 0;

      if (liquidDispenserStep.ldS8 > 7) liquidDispenserStep.ldS8 = 55;
      else if (liquidDispenserStep.ldS8 < -7) liquidDispenserStep.ldS8 = -55;
      else liquidDispenserStep.ldS8 = 0;

      if (liquidDispenserStep.ldS9 > 7) liquidDispenserStep.ldS9 = 20;
      else if (liquidDispenserStep.ldS9 < -7) liquidDispenserStep.ldS9 = -20;
      else liquidDispenserStep.ldS9 = 0;

      if (liquidDispenserStep.ldS10 > 7) liquidDispenserStep.ldS10 = 20;
      else if (liquidDispenserStep.ldS10 < -7) liquidDispenserStep.ldS10 = -20;
      else liquidDispenserStep.ldS10 = 0;

      if (liquidDispenserStep.ldS11 > 7) liquidDispenserStep.ldS11 = 20;
      else if (liquidDispenserStep.ldS11 < -7) liquidDispenserStep.ldS11 = -20;
      else liquidDispenserStep.ldS11 = 0;

      if (liquidDispenserStep.ldS12 > 7) liquidDispenserStep.ldS12 = 20;
      else if (liquidDispenserStep.ldS12 < -7) liquidDispenserStep.ldS12 = -20;
      else liquidDispenserStep.ldS12 = 0;


      liquidDispenserStep.sP1P = liquidDispenserStep.sP1P.toString();
      liquidDispenserStep.sP2P = liquidDispenserStep.sP2P.toString();
      liquidDispenserStep.sP3P = liquidDispenserStep.sP3P.toString();
      liquidDispenserStep.sP1S = parseInt(liquidDispenserStep.sP1S);
      liquidDispenserStep.sP2S = parseInt(liquidDispenserStep.sP2S);
      liquidDispenserStep.sP3S = parseInt(liquidDispenserStep.sP3S);
      liquidDispenserStep.pumP1P = parseInt(liquidDispenserStep.pumP1P);

      //this.$data.liquidDispenserModule.data.push(liquidDispenserStep);
      this.postStep(liquidDispenserStep, this.liquidDispenserModule.name);
    },

    /*------------------------------------------------------------------------
    * Function used to extract waiting condition step data
    * ------------------------------------------------------------------------*/
    saveWaitingConditionLine() {


      let waitingConditionStep = {
        description: this.$refs.plateForm.waitingConditionConfig.selectedOption
      };

      if (this.$refs.plateForm.waitingConditionConfig.selectedOption === 'None') {
        waitingConditionStep.value = 0;

      } else if (this.$refs.plateForm.waitingConditionConfig.selectedOption === 'Timeout') {
        waitingConditionStep.value = this.$refs.plateForm.waitingConditionConfig.timeoutValue;

      } else {
        waitingConditionStep = {
          description: this.$refs.plateForm.waitingConditionConfig.selectedOption,
          value: -1,
        };
      }

      waitingConditionStep.step = this.currentStep;
      waitingConditionStep.methodId = this.currentMethod.id;
      waitingConditionStep.type = this.$refs.plateForm.waitingConditionConfig.selectedOption

      this.postStep(waitingConditionStep, this.waitingConditionModule.name);

      // for UI displaying purpose
      if (this.$refs.plateForm.waitingConditionConfig.selectedOption === 'Timeout')
        waitingConditionStep.description += ': ' + waitingConditionStep.value + ' ms';

      // this.waitingConditionModule.data.push(waitingConditionStep);

    },

    /*------------------------------------------------------------------------
    * Function used to extract Comment step data
    * ------------------------------------------------------------------------*/
    saveCommentModuleLine() {

      let commentStep = {
        content: this.$refs.plateForm.commentConfig,
        Step: this.currentStep,
        methodId: this.currentMethod.id
      };
      // this.$data.commentModule.data.push(commentStep);
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
      setTimeout(() => this.loadModulesData(), 1000);

      this.$refs.plateForm.resetPlatformTables();

      this.currentStep++;

      let data = {stepCreated: true}
      this.$refs.plateForm.sendToWebsocket(data);
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

      setTimeout(() => this.loadModulesData(), 1000);
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
              this.snackbar.color = 'black';
              name.toLowerCase().includes('delete')
                  ? this.snackbar.message = "Step deleted successfully"
                  : this.snackbar.message = "Step updated successfully";
            } else {
              this.snackbar.message = response.data.message;
              this.snackbar.color = 'error';
            }

            this.snackbar.show = true;
          });

    },

  }
}

function stickyScrollHandler(el) {
  return () => {
    const getOffsetTop = function (element) {
      let offsetTop = 0;
      while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
      }
      return offsetTop;
    }

    const table = el.querySelector("table");
    const tableHeader = el.querySelector(".adx-table_sticky_header");
    let tableHeaderFloat = el.querySelector(".adx-table_sticky--float");

    let navOffset = document.getElementById('navCard').offsetHeight;

    const pos = getOffsetTop(table) - navOffset - window.scrollY;

    if (pos < 0) {
      if (!tableHeaderFloat) {
        const clone = tableHeader.cloneNode(true);
        clone.classList.remove('.table_sticky_header');

        tableHeaderFloat = document.createElement('table');
        tableHeaderFloat.appendChild(clone);
        tableHeaderFloat.classList.add("adx-table_sticky--float");
        table.parentNode.appendChild(tableHeaderFloat);

        tableHeader.style.opacity = 0;
      }

      if (Math.abs(pos) < table.offsetHeight - tableHeaderFloat.offsetHeight) {
        tableHeaderFloat.style.position = "absolute";
        tableHeaderFloat.style.top = Math.abs(pos) + "px";
      }
    } else {
      if (tableHeaderFloat) {
        tableHeaderFloat.remove();
      }

      tableHeader.style.opacity = 1;
      tableHeader.style.background = 'white';
    }
  }
}

Vue.directive("simple-table-sticky", {
  bind: function (el) {
    el.querySelector("table thead").classList.add("adx-table_sticky_header");
    el.style.position = "relative"

    window.addEventListener('scroll', stickyScrollHandler(el));
  },
  unbind: function (el) {
    window.removeEventListener('scroll', stickyScrollHandler(el));
  }
});
</script>


<style scoped>

v-data-table /deep/ .sticky-header {
  position: sticky;
  top: 10px;
}

v-data-table /deep/ .v-data-table__wrapper {
  overflow: unset;
}

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

.vue-horizontal {
  position: fixed;
  top: 0;


}

.horizontal >>> .v-hl-btn svg {
  opacity: 0.50;

}

.horizontal >>> .v-hl-btn-next  svg {
  background-color: red;
  top: 250px;
  position: sticky;
}

.visibleTop {
  position: sticky;
  top: v-bind(contentHeight);
  width: 100%;
  z-index: 3;
  opacity: 1;
}

#btnNext {
  position: fixed;
  top: 500px;
  right: 100px;
  z-index: 3;
  background: lightsteelblue;
  opacity: 0.50;
}
#btnPrev {
  position: fixed;
  top: 500px;
  left: 100px;
  background: lightsteelblue;
  opacity: 0.50;
}

</style>