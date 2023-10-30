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
                 @click="redirectTo('IndexAurasV2')"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
            All Methods
          </v-btn>
          <v-btn color="#2e4c80"
                 class="ma-2 white--text"
                 @click="redirectTo('RunAurasV2')"
          >
            <v-icon small>
              mdi-play-outline
            </v-icon>
            Run method
          </v-btn>
          <v-spacer/>

          <!-- Excel Emergency stop button -->

          <v-tooltip v-if="simulatorMode" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-on="on"
                  v-bind="attrs"
                  color="#eb3434"
                  class="ma-2 white--text"
                  @click="restartSimulator()"
              >
                <Icon icon="bi:sign-stop"
                      class="ma-2 emergency-stop-icon"
                      x-large
                      color="#ffff"/>
              </v-btn>

            </template>
            <span>Restart Simulator</span>
          </v-tooltip>

          <v-tooltip v-else bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-on="on"
                  v-bind="attrs"
                  color="#eb3434"
                  class="ma-2 white--text"
                  @click="emergencyStop">
                <Icon icon="bi:sign-stop"
                      class="emergency-stop-icon"
                      x-large
                      color="#ffff"/>
              </v-btn>
            </template>
            <span>  Emergency Stop</span>
          </v-tooltip>

          <!-- Excel download button -->

          <download-excel :data="downloadedData" :name="currentMethod.name + '.xls'">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    color="#1dc249"
                    class="white--text"
                >
                  <v-icon color="#FFFFFF">mdi-tray-arrow-down</v-icon>
                  <v-icon color="#FFFFFF">mdi-file-excel</v-icon>
                </v-btn>
              </template>
              <span>Download method in Excel format</span>
            </v-tooltip>
          </download-excel>

          <!-- Json download button -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-on="on"
                  v-bind="attrs"
                  color="#965408"
                  class="ma-2 white--text"
                  @click="downLoadJson">

                <v-icon color="#FFFFFF">mdi-tray-arrow-down</v-icon>
                <v-icon color="#FFFFFF">mdi-code-json</v-icon>
              </v-btn>
            </template>
            <span>Download method in Json format</span>
          </v-tooltip>

          <!-- Refresh button -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-on="on"
                  v-bind="attrs"
                  color="primary"
                  class="ma-2 white--text"
                  @click="loadModulesData()"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>Refresh data</span>
          </v-tooltip>

        </v-card-title>
      </v-card>
    </div>

    <!-- Method data -->

    <vue-scroll-snap style="width:100%; overflow: hidden;" :horizontal="true">

      <!--Steps -->

      <v-card elevation="0">
        <v-card-title class="justify-center module-title-color"> Step</v-card-title>
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

                            >
                              <div v-if="header.value.includes('v')">
                                <span v-if="item[header.value]==='Closed'" style="color: red">
                                  {{ item[header.value] }}
                                </span>
                                <span v-if="item[header.value]==='Opened'" style="color: green">
                                  {{ item[header.value] }}
                                </span>

                              </div>
                              <div v-else>
                                {{ item[header.value] }}
                              </div>
                              <template v-slot:input>
                                <table
                                    v-if="header.value ==='displayedSP1Info'|| header.value ==='displayedSP2Info' || header.value ==='displayedSP3Info'">
                                  <tr>
                                    <td>
                                      <v-select :items="liquidDispenserModule.items"
                                                v-model="liquidDispenserModule.update.selectedSyringePositionOption"/>
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
                                <table v-else-if="header.value ==='pumP1S'">

                                  <tr>
                                    <td>
                                      <v-text-field
                                          :rules="[speedRulesForPump.acceptedValues]"
                                          v-model="liquidDispenserModule.update.selectedSpeedValue"
                                          label="Speed in rpm"/>

                                    </td>

                                  </tr>
                                </table>
                                <table v-else-if="header.value.includes('v')">
                                  <tr>
                                    <td>
                                      <v-select :items="liquidDispenserModule.items2"
                                                v-model="liquidDispenserModule.update.selectedPinchValveOption"/>
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
                      min-width="150"
                      @click="duplicateLine(item.line)"
                  >
                    mdi-content-duplicate
                  </v-icon>
                </template>
                <span>Duplicate step</span>
              </v-tooltip>

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

    <PlatFormCard mode="config" @lastLineLoaded="loadLastLine" @lineSaved="SaveLine" ref="plateForm"
                  key="configComponent"/>

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

import VueHorizontal from "vue-horizontal";
import PlatFormCard from '@/components/Auras/V2/PlatformCard_V2.vue'
import VueScrollSnap from "vue-scroll-snap";
import axios from "axios";
import Vue from "vue";
import JsonExcel from "vue-json-excel";
import {Icon} from '@iconify/vue2';


export default {
  name: 'AurasConfigMethodViewV2',
  components: {
    PlatFormCard,
    VueScrollSnap,
    VueHorizontal,
    Icon,
  },

  data: () => ({

    lineNumber: 0,
    currentMethod: '',
    allModulesList: [],
    aurasModules: [],
    currentStep: 0,
    duplicatedLine: -1,
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
      items: ['None', 'Pause', 'Timeout'],
      instrumentOptionSelected: false,
      timeoutOptionSelected: false,
      selectedInstrument: '',
      selectedWaitingCondition: 'Pause',
      timeoutValue: '',
      timeoutOldValue: 0,
    },

    downloadedData: [],
    downloadedJsonData: [],

    stepModule: {
      name: '',
      columns: [
        {
          text: 'Step',
          value: 'step',
          align: 'center',
          width: 82,
          sortable: false,
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
      items: ['Idle position', 'Ready position', 'Migration'],
      columns: [
        {text: 'Position', value: 'description', width: 150, sortable: false, align: 'center'},
      ],
      data: [],
      update: {
        selectedOption: ''
      },
    },

    phMeterModule: {
      name: '',
      items: ['Buffer Low', 'Buffer High', 'KCl', 'Rinsing', 'Measure', 'Init'],
      columns: [
        {text: 'Position', value: 'position', width: 100, sortable: false, align: 'center'},
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
      items2: ['Opened', 'Closed'],
      columns: [
        {text: "v11", value: "v11Info", width: 82, sortable: false, align: 'center'},
        {text: "v12", value: "v12Info", width: 82, sortable: false, align: 'center'},
        {text: "v13", value: "v13Info", width: 82, sortable: false, align: 'center'},
        {text: "v14", value: "v14Info", width: 82, sortable: false, align: 'center'},
        {text: "v21", value: "v21Info", width: 82, sortable: false, align: 'center'},
        {text: "v22", value: "v22Info", width: 82, sortable: false, align: 'center'},
        {text: "v23", value: "v23Info", width: 82, sortable: false, align: 'center'},
        {text: "v24", value: "v24Info", width: 82, sortable: false, align: 'center'},
        {text: "v31", value: "v31Info", width: 82, sortable: false, align: 'center'},
        {text: "v32", value: "v32Info", width: 82, sortable: false, align: 'center'},
        {text: "v33", value: "v33Info", width: 82, sortable: false, align: 'center'},
        {text: "v34", value: "v34Info", width: 82, sortable: false, align: 'center'},
        {text: "v41", value: "v41Info", width: 82, sortable: false, align: 'center'},
        {text: "v42", value: "v42Info", width: 82, sortable: false, align: 'center'},
        {text: "v43", value: "v43Info", width: 82, sortable: false, align: 'center'},
        {text: "v44", value: "v44Info", width: 82, sortable: false, align: 'center'},
        {text: "v51", value: "v51Info", width: 82, sortable: false, align: 'center'},
        {text: "v52", value: "v52Info", width: 82, sortable: false, align: 'center'},
        {text: "v53", value: "v53Info", width: 82, sortable: false, align: 'center'},
        {text: "v54", value: "v54Info", width: 82, sortable: false, align: 'center'},
        {text: "v61", value: "v61Info", width: 82, sortable: false, align: 'center'},
        {text: "v62", value: "v62Info", width: 82, sortable: false, align: 'center'},
        {text: "v63", value: "v63Info", width: 82, sortable: false, align: 'center'},
        {text: "v64", value: "v64Info", width: 82, sortable: false, align: 'center'},
        {text: "v71", value: "v71Info", width: 82, sortable: false, align: 'center'},
        {text: "v72", value: "v72Info", width: 82, sortable: false, align: 'center'},
        {text: "v73", value: "v73Info", width: 82, sortable: false, align: 'center'},
        {text: "v74", value: "v74Info", width: 82, sortable: false, align: 'center'},
        {text: "SP1 Quantity", value: "displayedSP1Info", width: 150, sortable: false, align: 'center'},
        {text: "SP1 Speed (µL/s)", value: "sP1S", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Quantity", value: "displayedSP2Info", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Speed (µL/s)", value: "sP2S", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Quantity", value: "displayedSP3Info", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Speed (µL/s)", value: "sP3S", width: 150, sortable: false, align: 'center'},
        {text: "Rotations pump", value: "pumP1P", width: 150, sortable: false, align: 'center'},
        {text: "Speed pump (rpm)", value: "pumP1S", width: 150, sortable: false, align: 'center'},
      ],
      data: [],
      update: {
        selectedSyringePositionOption: '',
        selectedPinchValveOption: '',
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
    modulesHeight: 0,
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

        if (this.updateWaitingCondition.selectedOption.toLowerCase() === 'gina') {
          this.updateWaitingCondition.instrumentOptionSelected = true;
          this.updateWaitingCondition.timeoutOptionSelected = false;

          this.updateWaitingCondition.selectedInstrument = this.updateWaitingCondition.selectedWaitingCondition;
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
    'liquidDispenserModule.update.selectedSyringePositionOption'() {

      this.liquidDispenserModule.update.selectedSyringePositionOption.toLowerCase().includes('volume') ?
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
     * Create data to be downloaded in excel
     * ------------------------------------------------------------------------*/
    setDownloadedData() {

      for (let i = 0; i < this.stepModule.data.length; i++) {

        let concatenatedData = {};
        concatenatedData.step = this.liquidDispenserModule.data[i].step;
        concatenatedData.v11 = this.liquidDispenserModule.data[i].v11;
        concatenatedData.v12 = this.liquidDispenserModule.data[i].v12;
        concatenatedData.v13 = this.liquidDispenserModule.data[i].v13;
        concatenatedData.v14 = this.liquidDispenserModule.data[i].v14;

        concatenatedData.v21 = this.liquidDispenserModule.data[i].v21;
        concatenatedData.v22 = this.liquidDispenserModule.data[i].v22;
        concatenatedData.v23 = this.liquidDispenserModule.data[i].v23;
        concatenatedData.v24 = this.liquidDispenserModule.data[i].v24;

        concatenatedData.v31 = this.liquidDispenserModule.data[i].v31;
        concatenatedData.v32 = this.liquidDispenserModule.data[i].v32;
        concatenatedData.v33 = this.liquidDispenserModule.data[i].v33;
        concatenatedData.v34 = this.liquidDispenserModule.data[i].v34;

        concatenatedData.v41 = this.liquidDispenserModule.data[i].v41;
        concatenatedData.v42 = this.liquidDispenserModule.data[i].v42;
        concatenatedData.v43 = this.liquidDispenserModule.data[i].v43;
        concatenatedData.v44 = this.liquidDispenserModule.data[i].v44;

        concatenatedData.v51 = this.liquidDispenserModule.data[i].v51;
        concatenatedData.v52 = this.liquidDispenserModule.data[i].v52;
        concatenatedData.v53 = this.liquidDispenserModule.data[i].v53;
        concatenatedData.v54 = this.liquidDispenserModule.data[i].v54;

        concatenatedData.v61 = this.liquidDispenserModule.data[i].v61;
        concatenatedData.v62 = this.liquidDispenserModule.data[i].v62;
        concatenatedData.v63 = this.liquidDispenserModule.data[i].v63;
        concatenatedData.v64 = this.liquidDispenserModule.data[i].v64;

        concatenatedData.v71 = this.liquidDispenserModule.data[i].v71;
        concatenatedData.v72 = this.liquidDispenserModule.data[i].v72;
        concatenatedData.v73 = this.liquidDispenserModule.data[i].v73;
        concatenatedData.v74 = this.liquidDispenserModule.data[i].v74;

        concatenatedData.sp1P = this.liquidDispenserModule.data[i].sP1P;
        concatenatedData.sp1S = this.liquidDispenserModule.data[i].sP1S;
        concatenatedData.sp2P = this.liquidDispenserModule.data[i].sP2P;
        concatenatedData.sp2S = this.liquidDispenserModule.data[i].sP2S;
        concatenatedData.sp3P = this.liquidDispenserModule.data[i].sP3P;
        concatenatedData.sp3S = this.liquidDispenserModule.data[i].sP3S;
        concatenatedData.pump1p = this.liquidDispenserModule.data[i].pumP1P;
        concatenatedData.pump1S = this.liquidDispenserModule.data[i].pumP1S;

        concatenatedData.dropDispenser = this.dropDispenserModule.data[i].description;
        concatenatedData.tlcMigration = this.tlcMigrationModule.data[i].description;
        concatenatedData.phMeter = this.phMeterModule.data[i].description;

        this.downloadedData.splice(i, 0, JSON.parse(JSON.stringify(concatenatedData)));
      }

    },

    /*------------------------------------------------------------------------
     * Create data to be downloaded in Json
     * ------------------------------------------------------------------------*/
    setDownloadedJsonData() {

      for (let i = 0; i < this.stepModule.data.length; i++) {

        let concatenatedData = {};
        concatenatedData.step = i;
        concatenatedData.v11 = this.liquidDispenserModule.data[i].v11;
        concatenatedData.v12 = this.liquidDispenserModule.data[i].v12;
        concatenatedData.v13 = this.liquidDispenserModule.data[i].v13;
        concatenatedData.v14 = this.liquidDispenserModule.data[i].v14;

        concatenatedData.v21 = this.liquidDispenserModule.data[i].v21;
        concatenatedData.v22 = this.liquidDispenserModule.data[i].v22;
        concatenatedData.v23 = this.liquidDispenserModule.data[i].v23;
        concatenatedData.v24 = this.liquidDispenserModule.data[i].v24;

        concatenatedData.v31 = this.liquidDispenserModule.data[i].v31;
        concatenatedData.v32 = this.liquidDispenserModule.data[i].v32;
        concatenatedData.v33 = this.liquidDispenserModule.data[i].v33;
        concatenatedData.v34 = this.liquidDispenserModule.data[i].v34;

        concatenatedData.v41 = this.liquidDispenserModule.data[i].v41;
        concatenatedData.v42 = this.liquidDispenserModule.data[i].v42;
        concatenatedData.v43 = this.liquidDispenserModule.data[i].v43;
        concatenatedData.v44 = this.liquidDispenserModule.data[i].v44;

        concatenatedData.v51 = this.liquidDispenserModule.data[i].v51;
        concatenatedData.v52 = this.liquidDispenserModule.data[i].v52;
        concatenatedData.v53 = this.liquidDispenserModule.data[i].v53;
        concatenatedData.v54 = this.liquidDispenserModule.data[i].v54;

        concatenatedData.v61 = this.liquidDispenserModule.data[i].v61;
        concatenatedData.v62 = this.liquidDispenserModule.data[i].v62;
        concatenatedData.v63 = this.liquidDispenserModule.data[i].v63;
        concatenatedData.v64 = this.liquidDispenserModule.data[i].v64;

        concatenatedData.v71 = this.liquidDispenserModule.data[i].v71;
        concatenatedData.v72 = this.liquidDispenserModule.data[i].v72;
        concatenatedData.v73 = this.liquidDispenserModule.data[i].v73;
        concatenatedData.v74 = this.liquidDispenserModule.data[i].v74;

        concatenatedData.sp1P = this.liquidDispenserModule.data[i].sP1P;
        concatenatedData.sp1S = this.liquidDispenserModule.data[i].sP1S;
        concatenatedData.sp2P = this.liquidDispenserModule.data[i].sP2P;
        concatenatedData.sp2S = this.liquidDispenserModule.data[i].sP2S;
        concatenatedData.sp3P = this.liquidDispenserModule.data[i].sP3P;
        concatenatedData.sp3S = this.liquidDispenserModule.data[i].sP3S;
        concatenatedData.pump1p = this.liquidDispenserModule.data[i].pumP1P;
        concatenatedData.pump1s = this.liquidDispenserModule.data[i].pumP1S;

        concatenatedData.dropDispenser = this.dropDispenserModule.data[i].value;
        concatenatedData.tlcMigration = this.tlcMigrationModule.data[i].position;
        concatenatedData.phMeter = this.phMeterModule.data[i].position;
        concatenatedData.description = this.commentModule.data[i].content;

        this.downloadedJsonData.splice(i, 0, JSON.stringify(concatenatedData));
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

    downLoadJson() {

      this.setDownloadedJsonData();

      let text = "[" + this.downloadedJsonData + "]";
      let filename = this.currentMethod.name + '.json';
      let element = document.createElement('a');
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);

    },
    /*------------------------------------------------------------------------
      * Function to set LiquidDispenserModule's update info
      * ------------------------------------------------------------------------*/
    loadLiquidDispenserUpdateInfo() {

      this.liquidDispenserModule.data.forEach(function (line) {

        !isNaN(parseInt(line.sP1P)) ? line.displayedSP1Info = 'Volume: ' + line.sP1P + ' µL' : line.displayedSP1Info = line.sP1P;
        !isNaN(parseInt(line.sP2P)) ? line.displayedSP2Info = 'Volume: ' + line.sP2P + ' µL' : line.displayedSP2Info = line.sP2P;
        !isNaN(parseInt(line.sP3P)) ? line.displayedSP3Info = 'Volume: ' + line.sP3P + ' µL' : line.displayedSP3Info = line.sP3P;

        line.v11Info = line.v11 === 0 ? 'Closed' : 'Opened';
        line.v12Info = line.v12 === 0 ? 'Closed' : 'Opened';
        line.v13Info = line.v13 === 0 ? 'Closed' : 'Opened';
        line.v14Info = line.v14 === 0 ? 'Closed' : 'Opened';

        line.v21Info = line.v21 === 0 ? 'Closed' : 'Opened';
        line.v22Info = line.v22 === 0 ? 'Closed' : 'Opened';
        line.v23Info = line.v23 === 0 ? 'Closed' : 'Opened';
        line.v24Info = line.v24 === 0 ? 'Closed' : 'Opened';

        line.v31Info = line.v31 === 0 ? 'Closed' : 'Opened';
        line.v32Info = line.v32 === 0 ? 'Closed' : 'Opened';
        line.v33Info = line.v33 === 0 ? 'Closed' : 'Opened';
        line.v34Info = line.v34 === 0 ? 'Closed' : 'Opened';

        line.v41Info = line.v41 === 0 ? 'Closed' : 'Opened';
        line.v42Info = line.v42 === 0 ? 'Closed' : 'Opened';
        line.v43Info = line.v43 === 0 ? 'Closed' : 'Opened';
        line.v44Info = line.v44 === 0 ? 'Closed' : 'Opened';

        line.v51Info = line.v51 === 0 ? 'Closed' : 'Opened';
        line.v52Info = line.v52 === 0 ? 'Closed' : 'Opened';
        line.v53Info = line.v53 === 0 ? 'Closed' : 'Opened';
        line.v54Info = line.v54 === 0 ? 'Closed' : 'Opened';

        line.v61Info = line.v61 === 0 ? 'Closed' : 'Opened';
        line.v62Info = line.v62 === 0 ? 'Closed' : 'Opened';
        line.v63Info = line.v63 === 0 ? 'Closed' : 'Opened';
        line.v64Info = line.v64 === 0 ? 'Closed' : 'Opened';

        line.v71Info = line.v71 === 0 ? 'Closed' : 'Opened';
        line.v72Info = line.v72 === 0 ? 'Closed' : 'Opened';
        line.v73Info = line.v73 === 0 ? 'Closed' : 'Opened';
        line.v74Info = line.v74 === 0 ? 'Closed' : 'Opened';

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
            this.waitingConditionModule.data[i].description.toLowerCase() === 'pause' ? 'Pause' : '';

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

      switch (col) {

        case 0:
          this.liquidDispenserModule.data[line].v11 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 1:
          this.liquidDispenserModule.data[line].v12 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 2:
          this.liquidDispenserModule.data[line].v13 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 3:
          this.liquidDispenserModule.data[line].v14 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;

        case 4:
          this.liquidDispenserModule.data[line].v21 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 5:
          this.liquidDispenserModule.data[line].v22 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 6:
          this.liquidDispenserModule.data[line].v23 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 7:
          this.liquidDispenserModule.data[line].v24 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;

        case 8:
          this.liquidDispenserModule.data[line].v31 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 9:
          this.liquidDispenserModule.data[line].v32 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 10:
          this.liquidDispenserModule.data[line].v33 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 11:
          this.liquidDispenserModule.data[line].v34 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;

        case 12:
          this.liquidDispenserModule.data[line].v41 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 13:
          this.liquidDispenserModule.data[line].v42 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 14:
          this.liquidDispenserModule.data[line].v43 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 15:
          this.liquidDispenserModule.data[line].v44 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;

        case 16:
          this.liquidDispenserModule.data[line].v51 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 17:
          this.liquidDispenserModule.data[line].v52 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 18:
          this.liquidDispenserModule.data[line].v53 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 19:
          this.liquidDispenserModule.data[line].v54 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;

        case 20:
          this.liquidDispenserModule.data[line].v61 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 21:
          this.liquidDispenserModule.data[line].v62 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 22:
          this.liquidDispenserModule.data[line].v63 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 23:
          this.liquidDispenserModule.data[line].v64 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;

        case 24:
          this.liquidDispenserModule.data[line].v71 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 25:
          this.liquidDispenserModule.data[line].v72 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 26:
          this.liquidDispenserModule.data[line].v73 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;
        case 27:
          this.liquidDispenserModule.data[line].v74 = this.liquidDispenserModule.update.selectedPinchValveOption.toLowerCase().includes('opened') ? 1 : 0;
          break;

        case 28:
          if (this.liquidDispenserModule.update.selectedSyringePositionOption.toLowerCase().includes('volume'))
            this.liquidDispenserModule.data[line].sP1P = this.liquidDispenserModule.update.selectedVolumeValue;
          else
            this.liquidDispenserModule.data[line].sP1P = this.liquidDispenserModule.update.selectedSyringePositionOption;
          break;

        case 29:
          if (this.liquidDispenserModule.update.selectedSpeedValue >= 1 && this.liquidDispenserModule.update.selectedSpeedValue <= 200)
            this.liquidDispenserModule.data[line].sP1S = this.liquidDispenserModule.update.selectedSpeedValue;
          break;

        case 30:
          if (this.liquidDispenserModule.update.selectedSyringePositionOption.toLowerCase().includes('volume'))
            this.liquidDispenserModule.data[line].sP2P = this.liquidDispenserModule.update.selectedVolumeValue;
          else
            this.liquidDispenserModule.data[line].sP2P = this.liquidDispenserModule.update.selectedSyringePositionOption;
          break;

        case 31:
          if (this.liquidDispenserModule.update.selectedSpeedValue >= 1 && this.liquidDispenserModule.update.selectedSpeedValue <= 200)
            this.liquidDispenserModule.data[line].sP2S = this.liquidDispenserModule.update.selectedSpeedValue;

          break;

        case 32:
          if (this.liquidDispenserModule.update.selectedSyringePositionOption.toLowerCase().includes('volume'))
            this.liquidDispenserModule.data[line].sP3P = this.liquidDispenserModule.update.selectedVolumeValue;
          else
            this.liquidDispenserModule.data[line].sP3P = this.liquidDispenserModule.update.selectedSyringePositionOption;
          break;

        case 33:
          if (this.liquidDispenserModule.update.selectedSpeedValue >= 1 && this.liquidDispenserModule.update.selectedSpeedValue <= 200)
            this.liquidDispenserModule.data[line].sP3S = this.liquidDispenserModule.update.selectedSpeedValue;

          break;

        case 35:
          if (this.liquidDispenserModule.update.selectedSpeedValue >= 1 && this.liquidDispenserModule.update.selectedSpeedValue <= 500)
            this.liquidDispenserModule.data[line].pumP1S = this.liquidDispenserModule.update.selectedSpeedValue;
          break;

      }

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
        case "Migration":
          this.tlcMigrationModule.data[line].position = 2;
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

      this.phMeterModule.data[line].position = this.phMeterModule.data[line].description = this.phMeterModule.update.selectedOption; // Position has changed from int to string

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
      } else if (this.updateWaitingCondition.selectedOption.toLowerCase().includes('pause')) {

        this.waitingConditionModule.data[line].description = 'Pause';
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
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v11Info;
      if (col === 1)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v12Info;
      if (col === 2)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v13Info;
      if (col === 3)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v14Info;

      if (col === 4)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v21Info;
      if (col === 5)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v22Info;
      if (col === 6)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v23Info;
      if (col === 7)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v24Info;

      if (col === 8)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v31Info;
      if (col === 9)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v32Info;
      if (col === 10)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v33Info;
      if (col === 11)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v34Info;

      if (col === 12)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v41Info;
      if (col === 13)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v42Info;
      if (col === 14)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v43Info;
      if (col === 15)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v44Info;

      if (col === 16)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v51Info;
      if (col === 17)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v52Info;
      if (col === 18)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v53Info;
      if (col === 19)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v54Info;

      if (col === 20)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v61Info;
      if (col === 21)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v62Info;
      if (col === 22)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v63Info;
      if (col === 23)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v64Info;

      if (col === 24)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v71Info;
      if (col === 25)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v72Info;
      if (col === 26)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v73Info;
      if (col === 27)
        this.liquidDispenserModule.update.selectedPinchValveOption = this.liquidDispenserModule.data[line].v74Info;

      if (col === 28)
        volume = this.liquidDispenserModule.data[line].sP1P;
      if (col === 29)
        speed = this.liquidDispenserModule.data[line].sP1S;
      if (col === 30)
        volume = this.liquidDispenserModule.data[line].sP2P;
      if (col === 31)
        speed = this.liquidDispenserModule.data[line].sP2S;
      if (col === 32)
        volume = this.liquidDispenserModule.data[line].sP3P;
      if (col === 33)
        speed = this.liquidDispenserModule.data[line].sP3S;
      if (col === 35)
        speed = this.liquidDispenserModule.data[line].pumP1S;


      if (col === 29 || col === 31 || col === 33 || col === 35) {

        this.liquidDispenserModule.update.selectedSpeedValue = speed;

      } else if (col === 28 || col === 30 || col === 32) {

        if (value.toLowerCase().includes("volume")) {

          this.liquidDispenserModule.update.selectedSyringePositionOption = "Volume";
          this.liquidDispenserModule.update.volumeSelected = true;
          this.liquidDispenserModule.update.selectedVolumeValue = volume;

        } else {
          this.liquidDispenserModule.update.selectedSyringePositionOption = value;
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
        this.updateWaitingCondition.selectedWaitingCondition = 'Pause';
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
      this.modulesHeight = document.getElementById('navCard').offsetHeight;

      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.tlcMigrationModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
      this.commentModule.name = this.$store.state.commentModuleName;
      this.stepModule.name = 'MethodStep';
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
    saveTlcMigrationModuleLine(methodStepId) {

      let tlcMMStep = JSON.parse(JSON.stringify(this.$refs.plateForm.tlcMigrationModuleConfig.data[0]));
      tlcMMStep.methodStepId = methodStepId;
      tlcMMStep.description = JSON.parse(JSON.stringify(this.$refs.plateForm.tlcMigrationModuleConfig.selectedOption));
      this.postStep(tlcMMStep, this.tlcMigrationModule.name);
    },
    /*------------------------------------------------------------------------
      * Function used to extract phMeterModule step data
      * ------------------------------------------------------------------------*/
    savePhMeterModuleLine(methodStepId) {

      let phMeterStep = JSON.parse(JSON.stringify(this.$refs.plateForm.phMeterModuleConfig.data[0]));

      phMeterStep.methodStepId = methodStepId;
      phMeterStep.position = phMeterStep.description = JSON.parse(JSON.stringify(this.$refs.plateForm.phMeterModuleConfig.selectedOption)); // position has changed from int to string


      this.postStep(phMeterStep, this.phMeterModule.name);
    },
    /*------------------------------------------------------------------------
    * Function used to extract liquidDispenserModule step data
    * ------------------------------------------------------------------------*/
    saveDropDispenserModuleLine(methodStepId) {
      let dropDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.dropDispenserModuleConfig.data[0]));

      dropDispenserStep.methodStepId = methodStepId;
      dropDispenserStep.description = JSON.parse(JSON.stringify(this.$refs.plateForm.dropDispenserModuleConfig.selectedOption));

      this.postStep(dropDispenserStep, this.dropDispenserModule.name);
    },

    /*------------------------------------------------------------------------
     * Function used to extract dropDispenserModule step data
     * ------------------------------------------------------------------------*/
    saveLiquidDispenserLine(methodStepId) {

      let liquidDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModuleConfig.data[0]));

      liquidDispenserStep.displayedSP1Info = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModuleConfig.selectedSP1));
      liquidDispenserStep.displayedSP2Info = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModuleConfig.selectedSP2));
      liquidDispenserStep.displayedSP3Info = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModuleConfig.selectedSP3));

      liquidDispenserStep.displayedSP1Info.includes('Volume') ? liquidDispenserStep.displayedSP1Info += ': ' + liquidDispenserStep.sP1P + ' µL' : '';
      liquidDispenserStep.displayedSP2Info.includes('Volume') ? liquidDispenserStep.displayedSP2Info += ': ' + liquidDispenserStep.sP2P + ' µL' : '';
      liquidDispenserStep.displayedSP3Info.includes('Volume') ? liquidDispenserStep.displayedSP3Info += ': ' + liquidDispenserStep.sP3P + ' µL' : '';

      liquidDispenserStep.methodStepId = methodStepId;

      liquidDispenserStep.v11 = liquidDispenserStep.v11 === true ? 1 : 0;
      liquidDispenserStep.v12 = liquidDispenserStep.v12 === true ? 1 : 0;
      liquidDispenserStep.v13 = liquidDispenserStep.v13 === true ? 1 : 0;
      liquidDispenserStep.v14 = liquidDispenserStep.v14 === true ? 1 : 0;

      liquidDispenserStep.v21 = liquidDispenserStep.v21 === true ? 1 : 0;
      liquidDispenserStep.v22 = liquidDispenserStep.v22 === true ? 1 : 0;
      liquidDispenserStep.v23 = liquidDispenserStep.v23 === true ? 1 : 0;
      liquidDispenserStep.v24 = liquidDispenserStep.v24 === true ? 1 : 0;

      liquidDispenserStep.v31 = liquidDispenserStep.v31 === true ? 1 : 0;
      liquidDispenserStep.v32 = liquidDispenserStep.v32 === true ? 1 : 0;
      liquidDispenserStep.v33 = liquidDispenserStep.v33 === true ? 1 : 0;
      liquidDispenserStep.v34 = liquidDispenserStep.v34 === true ? 1 : 0;

      liquidDispenserStep.v41 = liquidDispenserStep.v41 === true ? 1 : 0;
      liquidDispenserStep.v42 = liquidDispenserStep.v42 === true ? 1 : 0;
      liquidDispenserStep.v43 = liquidDispenserStep.v43 === true ? 1 : 0;
      liquidDispenserStep.v44 = liquidDispenserStep.v44 === true ? 1 : 0;

      liquidDispenserStep.v51 = liquidDispenserStep.v51 === true ? 1 : 0;
      liquidDispenserStep.v52 = liquidDispenserStep.v52 === true ? 1 : 0;
      liquidDispenserStep.v53 = liquidDispenserStep.v53 === true ? 1 : 0;
      liquidDispenserStep.v54 = liquidDispenserStep.v54 === true ? 1 : 0;

      liquidDispenserStep.v61 = liquidDispenserStep.v61 === true ? 1 : 0;
      liquidDispenserStep.v62 = liquidDispenserStep.v62 === true ? 1 : 0;
      liquidDispenserStep.v63 = liquidDispenserStep.v63 === true ? 1 : 0;
      liquidDispenserStep.v64 = liquidDispenserStep.v64 === true ? 1 : 0;

      liquidDispenserStep.v71 = liquidDispenserStep.v71 === true ? 1 : 0;
      liquidDispenserStep.v72 = liquidDispenserStep.v72 === true ? 1 : 0;
      liquidDispenserStep.v73 = liquidDispenserStep.v73 === true ? 1 : 0;
      liquidDispenserStep.v74 = liquidDispenserStep.v74 === true ? 1 : 0;


      liquidDispenserStep.sP1P = liquidDispenserStep.sP1P.toString();
      liquidDispenserStep.sP2P = liquidDispenserStep.sP2P.toString();
      liquidDispenserStep.sP3P = liquidDispenserStep.sP3P.toString();
      liquidDispenserStep.sP1S = parseInt(liquidDispenserStep.sP1S);
      liquidDispenserStep.sP2S = parseInt(liquidDispenserStep.sP2S);
      liquidDispenserStep.sP3S = parseInt(liquidDispenserStep.sP3S);
      liquidDispenserStep.pumP1P = parseFloat(liquidDispenserStep.pumP1P);

      this.postStep(liquidDispenserStep, this.liquidDispenserModule.name);
    },

    /*------------------------------------------------------------------------
    * Function used to extract waiting condition step data
    * ------------------------------------------------------------------------*/
    saveWaitingConditionLine(methodStepId) {


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

      waitingConditionStep.methodStepId = methodStepId;
      waitingConditionStep.type = this.$refs.plateForm.waitingConditionConfig.selectedOption

      this.postStep(waitingConditionStep, this.waitingConditionModule.name);

      // for UI displaying purpose
      if (this.$refs.plateForm.waitingConditionConfig.selectedOption === 'Timeout')
        waitingConditionStep.description += ': ' + waitingConditionStep.value + ' ms';


    },

    /*------------------------------------------------------------------------
    * Function used to extract Comment step data
    * ------------------------------------------------------------------------*/
    saveCommentModuleLine(methodStepId) {

      let commentStep = {
        content: this.$refs.plateForm.stepDescription,
        methodStepId: methodStepId
      };

      this.postStep(commentStep, this.commentModule.name);
    },

    loadLastLine() {

      let data = this.setStepDataObject();

      this.$refs.plateForm.sendToWebsocket(data);

    },
    /*------------------------------------------------------------------------
    * Function to add a step in the currently created method
    * ------------------------------------------------------------------------*/
    async SaveLine() {

      this.extractStepModuleLine();

      let data = {
        MethodId: this.currentMethod.id,
        Number: this.currentStep
      }

      this.postStep(data, this.stepModule.name, 'create');
    },

    /*------------------------------------------------------------------------
    * Function to duplicate a given step of the current method
    * ------------------------------------------------------------------------*/
    duplicateLine(line) {

      this.duplicatedLine = line;
      this.extractStepModuleLine();

      let data = {
        MethodId: this.currentMethod.id,
        Number: this.currentStep
      }

      this.postStep(data, this.stepModule.name, 'duplicate');

    },

    /*------------------------------------------------------------------------
    * Create each module new step
    * ------------------------------------------------------------------------*/
    saveAllModules(methodStepId) {

      this.saveTlcMigrationModuleLine(methodStepId);
      this.savePhMeterModuleLine(methodStepId);
      this.saveDropDispenserModuleLine(methodStepId);
      this.saveLiquidDispenserLine(methodStepId);
      this.saveWaitingConditionLine(methodStepId);
      this.saveCommentModuleLine(methodStepId);

      setTimeout(() => this.loadModulesData(), 1000);

      this.$refs.plateForm.resetPlatformTables();

      this.currentStep++;

      let data = {stepCreated: true}
      this.$refs.plateForm.sendToWebsocket(data);
    },

    /*------------------------------------------------------------------------
    * Duplicates all modules' given step
    * ------------------------------------------------------------------------*/
    duplicateAllModules(methodStepId) {

      this.duplicateTlcMigrationStep(methodStepId);
      this.duplicatePhMeterStep(methodStepId);
      this.duplicateDropDispenserStep(methodStepId);
      this.duplicateLiquidDispenserStep(methodStepId);
      this.duplicateWaitingConditionStep(methodStepId);
      this.duplicateCommentStep(methodStepId);

      setTimeout(() => this.loadModulesData(), 1000);
      this.currentStep++;

      let data = {stepCreated: true}
      this.$refs.plateForm.sendToWebsocket(data);
    },

    /*------------------------------------------------------------------------
    * Duplicates TlcMigration module's given step
    * ------------------------------------------------------------------------*/
    duplicateTlcMigrationStep(methodStepId) {

      let data = {
        methodStepId: methodStepId,
        description: this.tlcMigrationModule.data[this.duplicatedLine].description,
        position: this.tlcMigrationModule.data[this.duplicatedLine].position
      }
      this.postStep(data, this.tlcMigrationModule.name);
    },

    /*------------------------------------------------------------------------
    * Duplicates PhMeter module's given step
    * ------------------------------------------------------------------------*/
    duplicatePhMeterStep(methodStepId) {

      let data = {
        methodStepId: methodStepId,
        description: this.phMeterModule.data[this.duplicatedLine].description,
        position: this.phMeterModule.data[this.duplicatedLine].position
      }
      this.postStep(data, this.phMeterModule.name);
    },

    /*------------------------------------------------------------------------
    * Duplicates DropDispenser module's given step
    * ------------------------------------------------------------------------*/
    duplicateDropDispenserStep(methodStepId) {

      let data = {
        methodStepId: methodStepId,
        description: this.dropDispenserModule.data[this.duplicatedLine].description,
        value: this.dropDispenserModule.data[this.duplicatedLine].value
      }
      this.postStep(data, this.dropDispenserModule.name);
    },

    /*------------------------------------------------------------------------
    * Duplicates LiquidDispenser module's given step
    * ------------------------------------------------------------------------*/
    duplicateLiquidDispenserStep(methodStepId) {

      let data = {
        methodStepId: methodStepId,
        pumP1P: this.liquidDispenserModule.data[this.duplicatedLine].pumP1P,
        pumP1S: this.liquidDispenserModule.data[this.duplicatedLine].pumP1S,
        sP1P: this.liquidDispenserModule.data[this.duplicatedLine].sP1P,
        sP1S: this.liquidDispenserModule.data[this.duplicatedLine].sP1S,
        sP2P: this.liquidDispenserModule.data[this.duplicatedLine].sP2P,
        sP2S: this.liquidDispenserModule.data[this.duplicatedLine].sP2S,
        sP3P: this.liquidDispenserModule.data[this.duplicatedLine].sP3P,
        sP3S: this.liquidDispenserModule.data[this.duplicatedLine].sP3S,

        v11: this.liquidDispenserModule.data[this.duplicatedLine].v11,
        v12: this.liquidDispenserModule.data[this.duplicatedLine].v12,
        v13: this.liquidDispenserModule.data[this.duplicatedLine].v13,
        v14: this.liquidDispenserModule.data[this.duplicatedLine].v14,

        v21: this.liquidDispenserModule.data[this.duplicatedLine].v21,
        v22: this.liquidDispenserModule.data[this.duplicatedLine].v22,
        v23: this.liquidDispenserModule.data[this.duplicatedLine].v23,
        v24: this.liquidDispenserModule.data[this.duplicatedLine].v24,

        v31: this.liquidDispenserModule.data[this.duplicatedLine].v31,
        v32: this.liquidDispenserModule.data[this.duplicatedLine].v32,
        v33: this.liquidDispenserModule.data[this.duplicatedLine].v33,
        v34: this.liquidDispenserModule.data[this.duplicatedLine].v34,

        v41: this.liquidDispenserModule.data[this.duplicatedLine].v41,
        v42: this.liquidDispenserModule.data[this.duplicatedLine].v42,
        v43: this.liquidDispenserModule.data[this.duplicatedLine].v43,
        v44: this.liquidDispenserModule.data[this.duplicatedLine].v44,

        v51: this.liquidDispenserModule.data[this.duplicatedLine].v51,
        v52: this.liquidDispenserModule.data[this.duplicatedLine].v52,
        v53: this.liquidDispenserModule.data[this.duplicatedLine].v53,
        v54: this.liquidDispenserModule.data[this.duplicatedLine].v54,

        v61: this.liquidDispenserModule.data[this.duplicatedLine].v61,
        v62: this.liquidDispenserModule.data[this.duplicatedLine].v62,
        v63: this.liquidDispenserModule.data[this.duplicatedLine].v63,
        v64: this.liquidDispenserModule.data[this.duplicatedLine].v64,

        v71: this.liquidDispenserModule.data[this.duplicatedLine].v71,
        v72: this.liquidDispenserModule.data[this.duplicatedLine].v72,
        v73: this.liquidDispenserModule.data[this.duplicatedLine].v73,
        v74: this.liquidDispenserModule.data[this.duplicatedLine].v74,

      }
      this.postStep(data, this.liquidDispenserModule.name);
    },

    /*------------------------------------------------------------------------
    * Duplicates WaitingCondition module's given step
    * ------------------------------------------------------------------------*/
    duplicateWaitingConditionStep(methodStepId) {

      let data = {
        methodStepId: methodStepId,
        description: this.waitingConditionModule.data[this.duplicatedLine].description,
        type: this.waitingConditionModule.data[this.duplicatedLine].type,
        value: this.waitingConditionModule.data[this.duplicatedLine].value

      }
      this.postStep(data, this.waitingConditionModule.name);
    },

    /*------------------------------------------------------------------------
    * Duplicates Comment module's given step
    * ------------------------------------------------------------------------*/
    duplicateCommentStep(methodStepId) {

      let data = {
        methodStepId: methodStepId,
        content: this.commentModule.data[this.duplicatedLine].content
      }
      this.postStep(data, this.commentModule.name);
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
        OldValue: this.deletedIndex,
        methodId: this.currentMethod.id
      };

      this.updateModule(data, 'methods/deleteStep');
      this.deleteMethodStep();
      this.clearAllArrays();

      setTimeout(() => this.loadModulesData(), 1000);
    },

    deleteMethodStep() {

      axios.delete(this.$aurasApiV2 + 'api/MethodSteps/' + this.currentMethod.id, this.deletedIndex)
          .then(
              (response) => {
                if (response.status === 204) {
                  this.fetchMethods();
                }
              })
          .catch(
              (error) => {
                console.log(error.data);
              });

    },

    clearAllArrays() {

      this.liquidDispenserModule.data = [];
      this.tlcMigrationModule.data = [];
      this.dropDispenserModule.data = [];
      this.phMeterModule.data = [];
      this.waitingConditionModule.data = [];
      this.commentModule.data = [];
    },
    /*------------------------------------------------------------------------
     * Function to fetch current method data
     * ------------------------------------------------------------------------*/
    fetchMethod() {

      axios
          .get(this.$aurasApiV2 + 'api/Methods/' + this.$route.params.idMethod)
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
          .get(this.$aurasApiV2 + 'api/Modules')
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
          .get(this.$aurasApiV2 + 'api/' + uri + this.$route.params.idMethod)
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
    async postStep(moduleData, moduleName, action) {
      let url = this.getModuleUri(moduleName);

      axios.post(this.$aurasApiV2 + "api/" + url, moduleData)
          .then(
              (response) => {

                if (response.status === 200 || response.status === 201 || response.status === 204) {

                  if (moduleName === this.stepModule.name) {
                    let data = response.data;
                    if (action === 'duplicate')
                      this.duplicateAllModules(data.id);
                    if (action === 'create')
                      this.saveAllModules(data.id);
                  } else
                    this.snackbar.message = "Step created correctly";

                } else {

                  this.snackbar.message = "Could not create the step";
                }

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
          .put(this.$aurasApiV2 + url + data.id, data)
          .then((response) => {

            if (response.status === 200 || response.status === 201 || response.status === 204) {
              //this.snackbar.color = 'black';
              if (name.toLowerCase().includes('delete'))
                this.snackbar.message = "Step deleted successfully"
              else
                this.snackbar.message = "Step updated successfully";

              this.loadModulesData();
            } else {
              this.snackbar.message = response.data.message;
              this.snackbar.color = 'error';
            }

            this.snackbar.show = true;
          });

    },

    /*--------------------------------------------------------------------------
  * Loads only steps that have changed in a method
  * -------------------------------------------------------------------------*/
    setStepDataObject() {

      let Master = {};
      let SP1 = {};
      let SP2 = {};
      let SP3 = {};

      if (this.liquidDispenserModule.data[this.currentStep - 1].sP1P === 'QC sample drop') {
        Master.Sp1 = 'QC sample drop';
      } else if (this.liquidDispenserModule.data[this.currentStep - 1].sP1P === 'Fill LAL cartridge') {
        Master.Sp1 = 'Fill LAL cartridge';
      } else {
        SP1.MoveTo = !isNaN(this.liquidDispenserModule.data[this.currentStep - 1].sP1P) ? this.liquidDispenserModule.data[this.currentStep - 1].sP1P * 1000 : '';
        SP1.SetMaxSpeed = this.liquidDispenserModule.data[this.currentStep - 1].sP1S * 1000;
      }

      if (this.liquidDispenserModule.data[this.currentStep - 1].sP2P === 'QC sample drop') {
        Master.Sp2 = 'QC sample drop';
      } else if (this.liquidDispenserModule.data[this.currentStep - 1].sP2P === 'Fill LAL cartridge') {
        Master.Sp2 = 'Fill LAL cartridge';
      } else {
        SP2.MoveTo = !isNaN(this.liquidDispenserModule.data[this.currentStep - 1].sP2P) ? this.liquidDispenserModule.data[this.currentStep - 1].sP2P * 1000 : '';
        SP2.SetMaxSpeed = this.liquidDispenserModule.data[this.currentStep - 1].sP2S * 1000;
      }

      if (this.liquidDispenserModule.data[this.currentStep - 1].sP3P === 'QC sample drop') {
        Master.Sp3 = 'QC sample drop';
      } else if (this.liquidDispenserModule.data[this.currentStep - 1].sP3P === 'Fill LAL cartridge') {
        Master.Sp3 = 'Fill LAL cartridge';
      } else {
        SP3.MoveTo = !isNaN(this.liquidDispenserModule.data[this.currentStep - 1].sP3P) ? this.liquidDispenserModule.data[this.currentStep - 1].sP3P * 1000 : '';
        SP3.SetMaxSpeed = this.liquidDispenserModule.data[this.currentStep - 1].sP3S * 1000;
      }

      return {
        stage: 'runStep',
        MethodName: this.currentMethod.name,
        NumberOfSteps: this.stepModule.totalOfSteps,
        CurrentStep: this.currentStep - 1,

        TlcMigration: {
          MoveTo: this.tlcMigrationModule.data[this.currentStep - 1].position
        },
        PhMeter: {
          MoveTo: this.phMeterModule.data[this.currentStep - 1].position
        },
        DropDispenser: {
          MoveTo: this.dropDispenserModule.data[this.currentStep - 1].value
        },

        V11: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v11
        },
        V12: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v12
        },
        V13: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v13
        },
        V14: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v14
        },

        V21: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v21
        },
        V22: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v22
        },
        V23: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v23
        },
        V24: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v24
        },

        V31: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v31
        },
        V32: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v32
        },
        V33: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v33
        },
        V34: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v34
        },

        V41: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v41
        },
        V42: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v42
        },
        V43: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v43
        },
        V44: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v44
        },

        V51: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v51
        },
        V52: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v52
        },
        V53: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v53
        },
        V54: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v54
        },

        V61: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v61
        },
        V62: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v62
        },
        V63: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v63
        },
        V64: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v64
        },

        V71: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v71
        },
        V72: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v72
        },
        V73: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v73
        },
        V74: {
          Switch: this.liquidDispenserModule.data[this.currentStep - 1].v74
        },

        Sp1: SP1,
        Sp2: SP2,
        Sp3: SP3,
        PUMP1: {
          Move: (this.liquidDispenserModule.data[this.currentStep - 1].pumP1P * 360).toFixed(2),
          SetMaxSpeed: this.liquidDispenserModule.data[this.currentStep - 1].pumP1S * 6
        },
        Master: Master

      };
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

.emergency-stop-icon {
  width: 30px;
  height: auto;
}

.horizontal >>> .v-hl-btn svg {
  opacity: 0.50;

}

.horizontal >>> .v-hl-btn-next svg {
  background-color: red;
  top: 250px;
  position: sticky;
}

.visibleTop {
  position: sticky;
  top: v-bind(contentHeight);
  width: 100%;
  z-index: 4;
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