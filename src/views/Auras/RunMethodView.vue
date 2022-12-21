<template>
  <div>

    <!--Method action-->
    <div style="min-height: 100px">
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
          <v-btn color="primary"
                 class=" ma-2 white--text"
                 @click="redirectTo('ConfigAuras')"
          >
            Edit method
          </v-btn>

          <v-spacer/>
          <v-btn color="#e28743"
                 class="white--text"
                 @click="pauseMethodRun"
          >
            <v-icon small v-if="!currentStep.paused">
              mdi-pause
            </v-icon>
            <v-icon small v-else>
              mdi-play-outline
            </v-icon>
            Pause run
          </v-btn>
          <v-btn color="success"
                 class="ma-2 white--text"
                 @click="runMethod"
          >
            <v-icon small>
              mdi-play-outline
            </v-icon>
            Run method
          </v-btn>
        </v-card-title>


      </v-card>
    </div>

    <!--Tables-->

    <vue-scroll-snap style="width:100%; overflow: hidden" :horizontal="true">

      <!--Steps -->

      <v-card elevation="0">
        <v-card-title class="justify-center module-title-color">{{ stepModule.name }}</v-card-title>
        <v-card-text>
          <v-data-table :headers="stepModule.columns"
                        :items="stepModule.data"
                        :hide-default-footer="true"
                        :item-class="itemRowBackground"
                        disable-pagination>

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
                        :item-class="itemRowBackground"
                    >

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
                        :item-class="itemRowBackground"
                    >

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
                        :item-class="itemRowBackground"
                    >

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
                        :item-class="itemRowBackground"
                    >
                    </v-data-table>
                  </v-card-text>

                </v-card>
              </td>

              <!--Liquid dispenser module-->

              <td>
                <v-card>
                  <v-card-title class="justify-center module-title-color">
                    {{ liquidDispenserModule.name }}
                  </v-card-title>

                  <v-card-text>
                    <v-data-table
                        :headers="liquidDispenserModule.columns"
                        :items="liquidDispenserModule.data"
                        :hide-default-footer="true"
                        disable-pagination
                        :item-class="itemRowBackground"
                    >
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </td>

              <!--Lal condition-->

              <td>
                <v-card>
                  <v-card-title class="justify-center module-title-color">
                    {{ lalModule.name }}
                  </v-card-title>
                  <v-card-text>
                    <v-data-table
                        :headers="lalModule.columns"
                        :items="lalModule.data"
                        :hide-default-footer="true"
                        disable-pagination
                        :item-class="itemRowBackground"
                    >

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
                        :item-class="itemRowBackground"
                    >
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
                        :item-class="itemRowBackground"
                    >
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
                      color="success"
                      min-width="150"
                      @click="runStep(item.line)"
                  >
                    mdi-motion-play-outline
                  </v-icon>
                </template>
                <span>Run step</span>
              </v-tooltip>

            </template>

          </v-data-table>
        </v-card-text>
      </v-card>

    </vue-scroll-snap>


  </div>
</template>

<script>
import axios from "axios";
import VueScrollSnap from "vue-scroll-snap";

export default {
  name: "RunAurasView",
  components: {
    VueScrollSnap
  },
  data: () => ({
    stepDialog: false,
    currentMethod: '',

    allModulesList: [],

    currentStep: {
      runPosition: -1,
      pausePosition: '',
      paused: false,
      runAllMethod: true
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

    lalModule: {
      name: '',
      columns: [
        {text: 'Way out', value: 'sp', width: 100, align: 'center'},
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

    actionsModule: {
      name: '',
      columns: [
        {text: 'Actions', value: 'actions', align: 'center', width: 82, sortable: false},
        {text: 'Step', value: 'step', align: ' d-none', width: 82, sortable: false},
      ],
      data: []
    },

    webSocket: {
      connected: false,
      ipAddress: ''
    }
  }),

  mounted() {
    this.fetchNetworkByName('Auras');
    this.fetchMethod();
    this.initialization();
    this.fetchModulesList();
    this.loadModulesData();
  },
  computed: {},

  watch: {
    'currentStep.runPosition'() {

      if (!this.currentStep.paused &&
          this.stepModule.data.length > 0 &&
          this.currentStep.runPosition <= this.stepModule.data.length &&
          this.currentStep.runAllMethod
      )
        setTimeout(() => this.currentStep.runPosition++, 2000);

    }
  },
  methods: {

    /*--------------------------------------------------------------------------
    * Connection to websocket
    * -------------------------------------------------------------------------*/
    connectToWebSocket() {

      console.log("Starting connection to WebSocket Server");
      this.connection = new WebSocket('ws://' + this.espIP);

      this.connection.onmessage = (event) => {

        try {
          const json = JSON.parse(event.data);

          this.setChartData(json);
          this.setFilters(json);

        } catch (Exception) {
          console.log(Exception.message)
        }
      }
      this.connection.onopen = function (event) {
        console.log(event);
        console.log("Successfully connected to the ESP32 websocket server!");
        this.webSocket.connected = true;

        console.log(this.webSocket.connected);
      }

      this.connection.onclose = function (event) {
        console.log(event);
        console.log("Disconnected from websocket");
      }
    },

    /*--------------------------------------------------------------------------
    * Retrieves all Ip addresses from database
    * --------------------------------------------------------------------------*/
    fetchNetworkByName(name) {
      axios
          .get('http://' + this.$aurasApi + "api/networks/byName?name=" + name)
          .then(
              (response) => {
                if (response.status === 200) {
                  let network = response.data;
                  this.webSocket.ipAddress = network['ipAddress'];
                }
              })
          .catch(
              (error) => {
                console.log(error.data)
              });
    },
    /*--------------------------------------------------------------------------
    *  Run a given step
    * -------------------------------------------------------------------------*/
    runStep(step) {
      this.currentStep.runAllMethod = false;
      this.currentStep.runPosition = step;
    },
    /*--------------------------------------------------------------------------
    *  Run the whole method
    * -------------------------------------------------------------------------*/
    runMethod() {
      this.currentStep.runAllMethod = true;
      this.currentStep.runPosition = 0;
    },

    /*--------------------------------------------------------------------------
    *  Pause the run of a method
    * -------------------------------------------------------------------------*/
    pauseMethodRun() {
      this.currentStep.paused = !this.currentStep.paused;
      if (this.currentStep.paused)
        this.currentStep.pausePosition = this.currentStep.runPosition;
      else
        this.currentStep.runPosition = this.currentStep.pausePosition;

    },
    /*--------------------------------------------------------------------------
    *  Redirection to another page
    * -------------------------------------------------------------------------*/
    redirectTo(route) {
      if (route.includes('ConfigAuras')) {
        console.log('here')
        this.$router.push({name: route, params: {idMethod: this.currentMethod.id}});
      } else
        this.$router.push({name: route});
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
     * Function used to load all modules names
     * ------------------------------------------------------------------------*/
    initialization() {

      this.trayModule.name = this.$store.state.trayModuleName;
      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.tlcMigrationModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
      this.commentModule.name = this.$store.state.commentModuleName;
      this.lalModule.name = this.$store.state.lalModuleName;
      this.stepModule.name = 'Steps';
      this.actionsModule.name = 'Actions';

      this.allModulesList.push(
          this.trayModule,
          this.dropDispenserModule,
          this.phMeterModule,
          this.liquidDispenserModule,
          this.tlcMigrationModule,
          this.commentModule,
          this.waitingConditionModule,
          this.lalModule);
    },

    /*------------------------------------------------------------------------
     * Function used to load all modules data
     * ------------------------------------------------------------------------*/
    async fetchData(module) {

      let uri = this.getModuleUri(module.name);

      await axios
          .get('http://' + this.$aurasApi + 'api/' + uri+ this.$route.params.idMethod)
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
    * Function to update method's data to database
    * ------------------------------------------------------------------------*/
    getModuleUri(moduleName) {
      return moduleName.replace(/ +/g, "") + 's/';
    },

    /*------------------------------------------------------------------------
   * Function load number of actual steps
   * ------------------------------------------------------------------------*/
    loadStepsAndActions(length) {

      for (let i = 0; i < length; i++) {

        let step = {step: JSON.parse(JSON.stringify(this.currentStep.runPosition))};
        this.$data.stepModule.data.push(step);
        let line = {line: JSON.parse(JSON.stringify(this.currentStep.runPosition))};
        this.$data.actionsModule.data.push(line);
        this.currentStep.runPosition++;

      }
    },

    /*------------------------------------------------------------------------
    * Function to load all method's data
    * ------------------------------------------------------------------------*/
    async loadModulesData() {
      this.stepCount = 0;
      this.currentStep.runPosition = 0;
      this.stepModule.data = [];
      this.actionsModule.data = [];

      this.allModulesList.forEach(m => this.fetchData(m));

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

          info = ': ' + this.allModulesList.find(l => l.id === this.waitingConditionModule.data[i].instrumentId).name;

        } else if (this.waitingConditionModule.data[i].type.toLowerCase() === 'timeout') {

          info = ': ' + this.waitingConditionModule.data[i].value
        }
        this.waitingConditionModule.data[i].displayedInfo = this.waitingConditionModule.data[i].type + info;
      }
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
      * Function to to set highlighted step style
      * ------------------------------------------------------------------------*/
    itemRowBackground: function (item) {

      return item.step === this.currentStep.runPosition ? 'style-1' : 'style-2'

    }

  }
}
</script>

<style>

.module-title-color {
  color: dodgerblue
}

.style-1 {
  color: white;
  background-color: #f7bc99;
}


</style>