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
        <v-btn color="primary"
               class="white--text"
               @click="loadModulesData()"
        >
          Refresh
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
                                             @save="updateLine(item[header.value], key, dropDispenserModule.name, idx)"
                                             @cancel="cancelLineUpdate"
                                             @open="open(item[header.value], key, dropDispenserModule.name, idx)"
                                             @close="close">
                                {{ item[header.value] }}
                                <template v-slot:input>
                                  <table>
                                    <tr>
                                      <td>
                                        <v-select
                                            v-model="SPElements.selectedInstrumentComponent"
                                            :items="SPElements.instrumentComponents"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <v-select
                                            v-model="SPElements.selectedSpDDTarget"
                                            :items="SPElements.spTargets"
                                        />
                                      </td>
                                      <td>
                                        <v-text-field
                                            v-if="isVisibleDD"
                                            label="µL"
                                            v-model.number="SPElements.ddSpPositionValue"
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
                                      <td class="text-center">
                                        <v-select
                                            v-model="SPElements.selectedSpLDTarget"
                                            :items="SPElements.spTargets"
                                        />

                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <v-text-field
                                            label="volume in µL"
                                            v-if="isVisibleLD"
                                            v-model="SPElements.ldSpPositionValue"
                                        />
                                      </td>
                                    </tr>
                                  </table>

                                  <v-text-field v-else
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
                                      <td v-if="updateWaitingCondition.instrumentOptionSelected">
                                        <v-select
                                            label="choose instrument"
                                            v-model="updateWaitingCondition.selectedInstrument"
                                            :items="updateWaitingCondition.instrumentsList"
                                        />
                                      </td>
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
    <v-snackbar v-model="snackbar.show" :timeout="timeout" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>

  </div>
</template>

<script>

import PlatFormCard from '@/components/PlatformCard.vue'

import VueScrollSnap from "vue-scroll-snap";
import axios from "axios";


export default {
  name: 'AurasConfigMethodView',
  components: {
    PlatFormCard,
    VueScrollSnap
  },

  data: () => ({

    lineNumber: 0,
    downloadedData: [],
    currentMethod: '',
    modulesList: [],
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

    SPElements: {
      selectedSpLDTarget: '',
      selectedSpDDTarget: '',
      selectedInstrumentComponent: '',
      ldSpPositionValue: 0,
      ddSpPositionValue: 0,
      ldSpOldValue: 0,
      ldSpNewValue: 0,
      ddSpOldValue: 0,
      ddSpNewValue: 0,
      instrumentComponents: ['Standards', 'QC sample'],
      spTargets: ['Position', 'Drop detected'],
    },

    updateWaitingCondition: {
      selectedOption: '',
      items: ['None', 'Instrument', 'Timeout'],
      instrumentOptionSelected: false,
      timeoutOptionSelected: false,
      selectedInstrument: '',
      selectedOldInstrument: 'Gina',
      timeoutValue: '',
      timeoutOldValue: 0,
      instrumentsList: ['Gina', 'Auras'],
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

    trayModule: {
      name: '',
      columns: [
        {text: 'Value', value: 'value', width: 82, sortable: false}
      ],
      data: []
    },

    dropDispenserModule: {
      name: '',
      columns: [
        {text: 'Value', value: 'displayedInfo', width: 150, sortable: false, align: 'center'},
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
        {text: "SP1 Speed", value: "sP1", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Target", value: "displayedSP2Info", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Speed", value: "sP2", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Target", value: "displayedSP3Info", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Speed", value: "sP3", width: 150, sortable: false, align: 'center'},
        {text: "Rotations pump", value: "pumP1P", width: 150, sortable: false, align: 'center'},
        {text: "Speed pump (rpm)", value: "pumP1S", width: 150, sortable: false, align: 'center'},
      ],
      data: []
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
      columns: [{text: 'Waiting condition', value: 'displayedInfo', width: 160, sortable: false}],
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
    this.initializeModulesNames();
    this.fetchMethod();
    this.fetchModulesList();
    this.loadModulesData();

  },

  watch: {

    /*------------------------------------------------------------------------
    * Function used to watch the changes in Liquid dispenser SP elements
    * ------------------------------------------------------------------------*/
    'SPElements.selectedSpLDTarget'() {

      if (this.SPElements.selectedSpLDTarget === 'Position') {
        this.isVisibleLD = true;
        this.SPElements.ldSpPositionValue = this.SPElements.ldSpOldValue;
        if (this.SPElements.ldSpPositionValue === -1)
          this.SPElements.ldSpPositionValue = 0;
      } else {
        this.isVisibleLD = false;
        this.SPElements.ldSpPositionValue = -1;
      }
    },
    /*------------------------------------------------------------------------
    * Function used to watch the changes in Drop dispenser SP elements
    * ------------------------------------------------------------------------*/
    'SPElements.selectedSpDDTarget'() {

      if (this.SPElements.selectedSpDDTarget === 'Position') {
        this.isVisibleDD = true;
        this.SPElements.ddSpPositionValue = this.SPElements.ddSpOldValue === -1 ? 0 : this.SPElements.ddSpOldValue;
      } else {
        this.isVisibleDD = false;
        this.SPElements.ddSpPositionValue = -1;
      }
    },

    /*------------------------------------------------------------------------
    * Function used to watch the changes in the waiting condition module
    * ------------------------------------------------------------------------*/
    'updateWaitingCondition.selectedOption'() {

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
    },

  },

  methods: {

    /*------------------------------------------------------------------------
    * Function used to add a step in the currently created method
    * ------------------------------------------------------------------------*/
    async SaveLine() {

      this.extractStepModuleLine();
      this.saveTrayModuleLine();
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
              this.modulesList = response.data;
            } else {
              this.snackbar.message = response.data.message;
            }
          });
    },

    /*------------------------------------------------------------------------
    * Function to load all method's data
    * ------------------------------------------------------------------------*/
    async loadModulesData() {
      this.stepCount = 0;
      this.currentStep = 0;
      this.stepModule.data = [];
      this.actionsModule.data = [];
      this.fetchData(this.trayModule);
      this.fetchData(this.tlcMigrationModule);
      this.fetchData(this.phMeterModule);
      this.fetchData(this.dropDispenserModule);
      this.fetchData(this.liquidDispenserModule);
      this.fetchData(this.waitingConditionModule);
      this.fetchData(this.commentModule);
    },

    /*------------------------------------------------------------------------
      * Function to set LiquidDispenserModule's update info
      * ------------------------------------------------------------------------*/
    loadLiquidDispenserUpdateInfo() {

      this.liquidDispenserModule.data.forEach(function (line) {

        line.sP1P >= 0 ? line.selectedSpLd1Target = 'Position' : line.selectedSpLd1Target = 'Drop detected';
        line.sP2P >= 0 ? line.selectedSpLd2Target = 'Position' : line.selectedSpLd2Target = 'Drop detected';
        line.sP3P >= 0 ? line.selectedSpLd3Target = 'Position' : line.selectedSpLd3Target = 'Drop detected';

        line.sP1P >= 0 ? line.ldSp1PositionSelected = true : line.ldSp1PositionSelected = false;
        line.sP2P >= 0 ? line.ldSp2PositionSelected = true : line.ldSp2PositionSelected = false;
        line.sP3P >= 0 ? line.ldSp3PositionSelected = true : line.ldSp3PositionSelected = false;

        line.sP1P >= 0 ? line.displayedSP1Info = line.selectedSpLd1Target + ': ' + line.sP1P : line.displayedSP1Info = line.selectedSpLd1Target;
        line.sP2P >= 0 ? line.displayedSP2Info = line.selectedSpLd2Target + ': ' + line.sP2P : line.displayedSP2Info = line.selectedSpLd2Target;
        line.sP3P >= 0 ? line.displayedSP3Info = line.selectedSpLd3Target + ': ' + line.sP3P : line.displayedSP3Info = line.selectedSpLd3Target;

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

        let info = '';
        if (this.waitingConditionModule.data[i].type.toLowerCase() === 'instrument') {

          info = ': ' + this.modulesList.find(l => l.id === this.waitingConditionModule.data[i].instrumentId).name;

        } else if (this.waitingConditionModule.data[i].type.toLowerCase() === 'timeout') {

          info = ': ' + this.waitingConditionModule.data[i].value
        }
        this.waitingConditionModule.data[i].displayedInfo = this.waitingConditionModule.data[i].type + info;
      }
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
          .get('http://' + this.$aurasApi + 'api/' + uri)
          .then(async (response) => {
            if (response.status === 200) {
              module.data = await response.data;

              //Set stepModule data and actions
              if (0 === this.stepCount++)
                this.loadStepsAndActions(module.data.length);

              // Set drop dispenser's displayed info
              if (module.name.toLowerCase().includes('drop'))
                this.loadDropDispenserDisplayedInfo();

              // Set liquid dispenser's displayed info
              if (module.name.toLowerCase().includes('liquid'))
                this.loadLiquidDispenserUpdateInfo();

              // Set waiting condition's displayed info
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
      return moduleName.replace(/ +/g, "") + 's';
    },

    /*------------------------------------------------------------------------
    * Function to update method's data to database
    * ------------------------------------------------------------------------*/
    updateModule(data, name) {

      let url = this.getModuleUri(name);
      url = 'api/' + url + '/';

      console.log('http://' + this.$aurasApi + url + data.id);
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

    /*------------------------------------------------------------------------
    * Function to extract Liquid Dispenser's updated data from the update dialog
    * ------------------------------------------------------------------------*/
    extractLiquidDispenserDataFromDialog(col, line) {

      if (this.SPElements.ldSpPositionValue !== 0 && this.SPElements.ldSpPositionValue !== this.SPElements.ldSpOldValue) {
        if (col === 9)
          this.liquidDispenserModule.data[line].sP1P = this.SPElements.ldSpPositionValue;
        if (col === 11)
          this.liquidDispenserModule.data[line].sP2P = this.SPElements.ldSpPositionValue;
        if (col === 13)
          this.liquidDispenserModule.data[line].sP3P = this.SPElements.ldSpPositionValue;
      }
    },

    /*------------------------------------------------------------------------
    * Function to extract Drop Dispenser's updated data from the update dialog
    * ------------------------------------------------------------------------*/
    extractDropDispenserDataFromDialog(line) {
      this.dropDispenserModule.data[line].type = this.SPElements.selectedInstrumentComponent;
      this.SPElements.selectedSpDDTarget === 'Position' ?
          this.dropDispenserModule.data[line].value = this.SPElements.ddSpPositionValue :
          this.dropDispenserModule.data[line].value = -1;

    },

    /*--------------------------------------------------------------------------------
    * Function to extract Waiting Condition's updated data from the update dialog
    * ------------------------------------------------------------------------------*/
    extractWaitingConditionDataFromDialog(line) {
      this.waitingConditionModule.data[line].type = this.updateWaitingCondition.selectedOption;
      if (this.updateWaitingCondition.selectedOption.toLowerCase() === 'instrument')
        this.waitingConditionModule.data[line].instrumentId = this.modulesList.find(m => m.name === this.updateWaitingCondition.selectedInstrument).id

      if (this.updateWaitingCondition.selectedOption.toLowerCase() === 'timeout')
        this.waitingConditionModule.data[line].value = this.updateWaitingCondition.timeoutValue;
    },

    /*---------------------------------------------------------------------------
    * Function to load selected load Liquid Dispenser's data into update dialog
    * --------------------------------------------------------------------------*/
    loadLiquidDispenserDataInDialog(value, col, line) {

      console.log('passe')

      if (col === 9)
        value = this.liquidDispenserModule.data[line].sP1P;
      if (col === 11)
        value = this.liquidDispenserModule.data[line].sP2P;
      if (col === 13)
        value = this.liquidDispenserModule.data[line].sP3P;

      this.SPElements.ldSpPositionValue = this.SPElements.ldSpOldValue = value;
      value >= 0 ? this.isVisibleLD = true : this.isVisibleLD = false;
      value >= 0 ? this.SPElements.selectedSpLDTarget = 'Position' : this.SPElements.selectedSpLDTarget = 'Drop detected';
    },

    /*----------------------------------------------------------------------------------
    * Function to load selected load Drop Dispenser's data into update dialog
    * ---------------------------------------------------------------------------------*/
    loadDropDispenserDataInDialog(value, line) {

      value = this.dropDispenserModule.data[line].value;
      this.SPElements.selectedInstrumentComponent = this.dropDispenserModule.data[line].type;
      this.SPElements.ddSpPositionValue = this.SPElements.ddSpOldValue = value;
      value >= 0 ? this.isVisibleDD = true : this.isVisibleDD = false;
      value >= 0 ? this.SPElements.selectedSpDDTarget = 'Position' : this.SPElements.selectedSpDDTarget = 'Drop detected';
    },

    /*----------------------------------------------------------------------------------
    * Function to load selected load Waiting Condition's data into update dialog
    * ---------------------------------------------------------------------------------*/
    loadWaitingConditionDataInDialog(value, line) {

      value = this.waitingConditionModule.data[line].type;

      this.updateWaitingCondition.selectedOption = value;
      this.updateWaitingCondition.timeoutOptionSelected = false;
      this.updateWaitingCondition.instrumentOptionSelected = false;

      if (value.toLowerCase() === 'instrument') {
        this.updateWaitingCondition.instrumentOptionSelected = true;
        this.updateWaitingCondition.timeoutOptionSelected = false;
        this.updateWaitingCondition.selectedInstrument = this.modulesList.find(i => i.id === this.waitingConditionModule.data[line].instrumentId).name
        this.updateWaitingCondition.selectedOldInstrument = this.updateWaitingCondition.selectedInstrument;
      }
      if (value.toLowerCase() === 'timeout') {
        this.updateWaitingCondition.timeoutOptionSelected = true;
        this.updateWaitingCondition.instrumentOptionSelected = false;
        this.updateWaitingCondition.timeoutOldValue = this.updateWaitingCondition.timeoutValue = this.waitingConditionModule.data[line].value;
      }
    },

    /*------------------------------------------------------------------------
    * Function to retrieve updated line and module
    * ------------------------------------------------------------------------*/
    updateLine(value, col, name, line) {

      switch (name) {

        case this.trayModule.name:
          this.updateModule(this.trayModule.data[line], name);
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

        case this.tlcMigrationModule.name:
          this.updateModule(this.tlcMigrationModule.data[line], name);
          break;

        case this.phMeterModule.name:
          this.updateModule(this.phMeterModule.data[line], name);
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

              this.stepModule.data[line].id = line;
              this.stepModule.data[line].newValue = this.stepModule.data[line].step;
              this.stepModule.data[line].oldValue = this.stepModule.updateStep[0].oldValue;
              this.stepModule.data[line].methodId = this.currentMethod.id;

              this.stepModule.updateStep[0].stepToUpdate = true;
              this.updateModule(this.stepModule.data[line], 'methods/editStep');
              this.stepCount = 0;

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

        case this.liquidDispenserModule.name:
          this.loadLiquidDispenserDataInDialog(value, col, line);
          break;

        case this.dropDispenserModule.name:
          this.loadDropDispenserDataInDialog(value, line);
          break;

        case this.waitingConditionModule.name:
          this.loadWaitingConditionDataInDialog(value, line);
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
      }
      this.stepModule.updateStep[0].stepToUpdate = false;

      // Reset waiting condition  values
      if (name === this.waitingConditionModule.name) {
        this.updateWaitingCondition.timeoutOldValue = 0;
        this.updateWaitingCondition.selectedOldInstrument = 'Gina';
      }

      //Reset SPElements values
      if (name === this.dropDispenserModule.name) {
        this.SPElements.ddSpOldValue = 0;
        this.SPElements.ddSpNewValue = 0;
      }

      if (name === this.liquidDispenserModule.name) {
        this.SPElements.ldSpNewValue = 0;
        this.SPElements.ldSpOldValue = 0;
        this.SPElements.ldSpPositionValue = 0
        this.SPElements.ldSpOldValue = 0;
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
    initializeModulesNames() {

      this.trayModule.name = this.$store.state.trayModuleName;
      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.tlcMigrationModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
      this.commentModule.name = this.$store.state.commentModuleName;
      this.stepModule.name = 'Steps';
      this.actionsModule.name = 'Actions';
    },

    /*--------------------------------------------------------------------------
     *  Redirection to another page
     * -------------------------------------------------------------------------*/
    redirectTo(route) {
      this.$router.push({name: route});
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
     * Function used to extract trayModule step data
     * ------------------------------------------------------------------------*/
    saveTrayModuleLine() {

      let trayModuleStep = JSON.parse(JSON.stringify(this.$refs.plateForm.trayModule.data[0]));

      trayModuleStep.step = this.currentStep;
      trayModuleStep.methodId = this.currentMethod.id;

      this.$data.trayModule.data.push(trayModuleStep);
      this.postStep(trayModuleStep, this.trayModule.name);

    },

    /*------------------------------------------------------------------------
    * Function used to extract tlcModule step data
    * ------------------------------------------------------------------------*/
    saveTlcMigrationModuleLine() {

      let tlcMMStep = JSON.parse(JSON.stringify(this.$refs.plateForm.tlcModule.data[0]));
      tlcMMStep.step = this.currentStep;
      tlcMMStep.methodId = this.currentMethod.id;

      this.$data.tlcMigrationModule.data.push(tlcMMStep);
      this.postStep(tlcMMStep, this.tlcMigrationModule.name);
    },

    /*------------------------------------------------------------------------
    * Function used to extract liquidDispenserModule step data
    * ------------------------------------------------------------------------*/
    saveDropDispenserModuleLine() {

      let dropDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.dropDispenserModule.data[0]));

      dropDispenserStep.type = this.$refs.plateForm.SPElements.selectedSpDdOption;
      dropDispenserStep.step = this.currentStep;
      dropDispenserStep.methodId = this.currentMethod.id;

      if (this.$refs.plateForm.SPElements.DdSpPositionMode === false)
        dropDispenserStep.value = -1;

      dropDispenserStep.displayedInfo = this.$refs.plateForm.SPElements.selectedSpDdOption + ': ' + dropDispenserStep.value;

      this.$data.dropDispenserModule.data.push(dropDispenserStep);
      this.postStep(dropDispenserStep, this.dropDispenserModule.name);
    },

    /*------------------------------------------------------------------------
     * Function used to extract dropDispenserModule step data
     * ------------------------------------------------------------------------*/
    saveLiquidDispenserLine() {

      let liquidDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm.liquidDispenserModule.data[0]));

      liquidDispenserStep.selectedSpLd1Option = '';
      liquidDispenserStep.selectedSpLd2Option = '';
      liquidDispenserStep.selectedSpLd3Option = '';

      if (this.$refs.plateForm.SPElements.LdSp1PositionMode === true) {
        liquidDispenserStep.sP1P = JSON.parse(JSON.stringify(this.$refs.plateForm.SPElements.LdSp1PositionValue));
        liquidDispenserStep.selectedSpLd1Option = 'Position';
      } else {

        liquidDispenserStep.sP1P = -1;
        liquidDispenserStep.selectedSpLd1Option = 'Drop detected';

      }

      if (this.$refs.plateForm.SPElements.LdSp2PositionMode === true) {
        liquidDispenserStep.sP2P = JSON.parse(JSON.stringify(this.$refs.plateForm.SPElements.LdSp2PositionValue));
        liquidDispenserStep.selectedSpLd2Option = 'Position';
      } else {

        liquidDispenserStep.sP2P = -1;
        liquidDispenserStep.selectedSpLd1Option = 'Drop detected';
      }

      if (this.$refs.plateForm.SPElements.LdSp3PositionMode === true) {
        liquidDispenserStep.sP3P = JSON.parse(JSON.stringify(this.$refs.plateForm.SPElements.LdSp3PositionValue));
        liquidDispenserStep.selectedSpLd2Option = 'Position';
      } else {
        liquidDispenserStep.sP3P = -1;
        liquidDispenserStep.selectedSpLd1Option = 'Drop detected';

      }
      liquidDispenserStep.step = this.currentStep;
      liquidDispenserStep.methodId = this.currentMethod.id;

      this.$data.liquidDispenserModule.data.push(liquidDispenserStep);
      this.postStep(liquidDispenserStep, this.liquidDispenserModule.name);
    },

    /*------------------------------------------------------------------------
    * Function used to extract phMeterModule step data
    * ------------------------------------------------------------------------*/
    savePhMeterModuleLine() {

      let phMeterStep = JSON.parse(JSON.stringify(this.$refs.plateForm.phMeterModule.data[0]));

      phMeterStep.step = this.currentStep;
      phMeterStep.methodId = this.currentMethod.id;
      this.$data.phMeterModule.data.push(phMeterStep);

      this.postStep(phMeterStep, this.phMeterModule.name);
    },
    /*------------------------------------------------------------------------
    * Function used to extract waiting condition step data
    * ------------------------------------------------------------------------*/
    saveWaitingConditionLine() {

      let waitingConditionStep = '';

      //DisplayedInfo is for UI displaying purpose
      if (this.$refs.plateForm.waitingCondition.selectedOption === 'None') {

        waitingConditionStep = {
          displayedInfo: this.$refs.plateForm.waitingCondition.selectedOption,
          Value: 0
        };

      } else if (this.$refs.plateForm.waitingCondition.selectedOption === 'Timeout') {

        waitingConditionStep = {
          displayedInfo: this.$refs.plateForm.waitingCondition.selectedOption + ': '
              + this.$refs.plateForm.waitingCondition.timeoutValue,
          Value: this.$refs.plateForm.waitingCondition.timeoutValue
        };

      } else {
        waitingConditionStep = {

          displayedInfo: this.$refs.plateForm.waitingCondition.selectedOption + ': '
              + this.$refs.plateForm.waitingCondition.instrumentSelected,
          Value: 0,
          InstrumentId: this.modulesList.find(l => l.name === this.$refs.plateForm.waitingCondition.instrumentSelected).id
        };
      }

      waitingConditionStep.step = this.currentStep;
      waitingConditionStep.methodId = this.currentMethod.id;
      waitingConditionStep.type = this.$refs.plateForm.waitingCondition.selectedOption

      this.waitingConditionModule.data.push(waitingConditionStep);
      this.postStep(waitingConditionStep, this.waitingConditionModule.name);

    },

    /*------------------------------------------------------------------------
    * Function used to extract Tray step data
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