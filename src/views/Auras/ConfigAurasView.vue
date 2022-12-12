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
                                             @save="updateLine(item[header.Value], key, dropDispenserModule.name, idx)"
                                             @cancel="cancelLineUpdate"
                                             @open="open"
                                             @close="close"

                              > {{ item[header.value] }}
                                <template v-slot:input>
                                  <table>
                                    <tr>
                                      <td>
                                        <v-select
                                            v-model="SPElements.selectedSpDdOption"
                                            :items="SPElements.ddOptions"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <v-select
                                            v-model="SPElements.selectedSpDdSubOption"
                                            :items="SPElements.ldOptions"
                                        />
                                      </td>
                                      <td v-if="SPElements.DdSpPositionMode">
                                        <v-text-field
                                            label="µL"
                                            v-model.number="item.value"
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
                                      v-if="header.value ==='sP1P' || header.value ==='sP2P' || header.value ==='sP3P'">
                                    <tr>
                                      <td class="text-center">
                                        <v-select
                                            v-model="SPElements.selectedSpLdOption"
                                            :items="SPElements.ldOptions"
                                        />

                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <v-text-field
                                            label="volume in µL"
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
                        @click="confirmDelete(item.step)"
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
  name: 'AurasConfigView',
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

    //Modules variables

    SPElements: {
      selectedSpLdOption: '',
      selectedSpDdSubOption: '',
      DdSpPositionMode: '',
      ldSpPositionValue: 0,
      ldSpOldValue: 0,
      ldSpNewValue: 0,
      ddOptions: ['Standards', 'QC sample'],
      ldOptions: ['Position', 'Drop detected']
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
        {text: "SP1 Target", value: "sP1P", width: 150, sortable: false, align: 'center'},
        {text: "SP1 Speed", value: "sP1", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Target", value: "sP2P", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Speed", value: "sP2", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Target", value: "sP3P", width: 150, sortable: false, align: 'center'},
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

    waitingCondition: {
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

      this.snackbar.message = 'Step deleted';
      this.snackbar.show = true;
      this.dialogDelete = false;
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

      this.fetchData(this.trayModule);
      this.fetchData(this.tlcMigrationModule);
      this.fetchData(this.phMeterModule);
      this.fetchData(this.dropDispenserModule);
      this.fetchData(this.liquidDispenserModule);
      this.fetchData(this.waitingCondition);
      this.fetchData(this.commentModule);
    },

    /*------------------------------------------------------------------------
      * Function to set LiquidDispenserModule's update info
      * ------------------------------------------------------------------------*/
    loadLiquidDispenserUpdateInfo() {

      this.liquidDispenserModule.data.forEach(function (line) {

        line.sP1P >= 0 ? line.selectedSpLd1Option = 'Position' : line.selectedSpLd1Option = 'Drop detected';
        line.sP2P >= 0 ? line.selectedSpLd2Option = 'Position' : line.selectedSpLd2Option = 'Drop detected';
        line.sP3P >= 0 ? line.selectedSpLd3Option = 'Position' : line.selectedSpLd3Option = 'Drop detected';

        line.sP1P >= 0 ? line.ldSp1PositionMode = true : line.ldSp1PositionMode = false;
        line.sP2P >= 0 ? line.ldSp2PositionMode = true : line.ldSp2PositionMode = false;
        line.sP3P >= 0 ? line.ldSp3PositionMode = true : line.ldSp3PositionMode = false;

      });


    },

    /*------------------------------------------------------------------------
    * Function load number of actual steps
    * ------------------------------------------------------------------------*/
    loadDropDispenserDisplayedInfo() {

      for (let i = 0; i < this.dropDispenserModule.data.length; i++) {
        this.dropDispenserModule.data[i].displayedInfo = this.dropDispenserModule.data[i].type +
            ': ' +
            this.dropDispenserModule.data[i].value;
      }
    },

    /*------------------------------------------------------------------------
    * Function to load the number of actual steps
    * ------------------------------------------------------------------------*/
    loadWCDisplayedInfo() {

      for (let i = 0; i < this.waitingCondition.data.length; i++) {
        let info = '';

        if (this.waitingCondition.data[i].type.toLowerCase() === 'instrument') {

          info = this.modulesList.find(l => l.id === this.waitingCondition.data[i].instrumentId)
          info = ': ' + info['name']

        } else if (this.waitingCondition.data[i].type.toLowerCase() === 'timeout') {

          info = ': ' + this.waitingCondition.data[i].value
        }
        this.waitingCondition.data[i].displayedInfo = this.waitingCondition.data[i].type + info;
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
    updateModule(data, stepNr, name) {

      let url = this.getModuleUri(name);
      url = 'api/' + url + '/';

      axios
          .put('http://' + this.$aurasApi + url + data.id, data)
          .then((response) => {

            console.log(response)
            if (response.status === 204) {
              this.snackbar.message = "Step updated successfully";

            } else {
              this.snackbar.message = response.data.message;
              this.snackbar.color = 'error';
            }
          });
      this.snackbar.show = true;

      console.log('data: ' + data.id);
      console.log('step Nr: ' + stepNr);
      console.log('name: ' + name);

    },

    /*------------------------------------------------------------------------
    * Function to retrieve updated line and module
    * ------------------------------------------------------------------------*/
    updateLine(value, col, name, line) {

      switch (name) {

        case this.trayModule.name:
          this.updateModule(this.trayModule.data[line], line, name);
          break;

        case this.dropDispenserModule.name:
          this.updateModule(this.dropDispenserModule.data[line], line, name);
          break;

        case this.liquidDispenserModule.name:
          this.updateModule(this.liquidDispenserModule.data[line], line, name);
          break;

        case this.tlcMigrationModule.name:
          this.updateModule(this.tlcMigrationModule.data[line], line, name);
          break;

        case this.phMeterModule.name:
          this.updateModule(this.phMeterModule.data[line], line, name);
          break;

        case this.waitingCondition.name:
          this.updateModule(this.waitingCondition.data[line], line, name);
          break;

        case this.commentModule.name:
          this.updateModule(this.commentModule.data[line], line, name);
          break;

        case this.stepModule.name:

          if (this.checkStepNumberValidity(value)) {

            this.stepModule.updateStep[0].stepToUpdate = true;
            //this.updateModule(this.stepModule.data[line], line, name);

          }
          break;

        default:
          break;
      }


    },

    cancelLineUpdate() {
    },

    /*------------------------------------------------------------------------
     * Function called when one edits a line
     * ------------------------------------------------------------------------*/
    open(value, col, name, line) {

      if (name === this.stepModule.name)
        this.stepModule.updateStep[0].oldValue = this.stepModule.data[line].step;

      if (name === this.liquidDispenserModule.name) {
        this.SPElements.selectedSpLdOption = this.liquidDispenserModule.data[line].selectedSpLd1Option;
        this.SPElements.ldSpPositionValue =this.SPElements.ldSpOldValue = value;

        console.log(this.SPElements.selectedSpLdOption)
      }
    },

    /*------------------------------------------------------------------------
     * Function called when one closes the edit line
     * ------------------------------------------------------------------------*/
    close(value, col, name, line) {

      if (name === this.stepModule.name && this.stepModule.updateStep[0].stepToUpdate === false) {
        this.stepModule.data[line].step = this.stepModule.updateStep[0].oldValue;
        this.snackbar.message = 'The step must be > 0 and < ' + this.stepModule.data.length;
        this.snackbar.color = 'error'
        this.snackbar.show = true;
      }
      this.stepModule.updateStep[0].stepToUpdate = false;
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

      this.waitingCondition.data.push(waitingConditionStep);
      this.postStep(waitingConditionStep, this.waitingCondition.name);

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