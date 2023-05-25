<template>
  <div>

    <!--Method action-->
    <div style="min-height: 100px" class="visibleTop">
      <v-card id="navCard">
        <v-card-title class="justify-center">
          Method: {{ currentMethod.name }}

          <v-spacer/>
          <v-btn color="#a83248"
                 class="white--text"
                 width="150"
                 @click="redirectTo('IndexAuras')"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
            All Methods
          </v-btn>
          <v-btn color="primary"
                 width="150"
                 class="ma-2 white--text"
                 @click="redirectTo('ConfigAuras')"
          >
            <v-icon small color="blue-grey-darken-2">
              mdi-cog-outline
            </v-icon>
            <span class="mr-2">Edit method</span>
          </v-btn>

          <v-spacer/>
          <v-btn color="error"
                 class="ma-2 white--text"
                 justify="end"
                 @click="stopMethodRun('stopped')"
                 v-if="currentStep.running"
          >
            Stop Run
            <v-icon>
              mdi-stop-circle-outline
            </v-icon>
          </v-btn>

          <v-btn color="success"
                 class="ma-2 white--text"
                 justify="end"
                 width="150"
                 @click="initMethodRun"
                 v-if="!currentStep.running"
          >
            Start Run
            <v-icon>
              mdi-play-circle-outline
            </v-icon>
          </v-btn>

          <v-btn color="success"
                 width="150"
                 class="white--text"
                 @click="pauseMethodRun"
                 v-else
          >
            <v-row v-if="!currentStep.paused">
              Pause run
              <v-icon>
                mdi-pause-circle-outline
              </v-icon>
            </v-row>
            <v-row
                v-else
            >
              Continue
              <v-icon small>
                mdi-play-circle-outline
              </v-icon>
            </v-row>
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
                        disable-pagination
                        v-simple-table-sticky
          >

          </v-data-table>
        </v-card-text>
      </v-card>

      <!--Module tables-->

      <v-card elevation="0" style="width:82%">

        <vue-horizontal scroll snap="none" responsive :displacement="0.5">

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
                        :item-class="itemRowBackground"
                        v-simple-table-sticky
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
                        v-simple-table-sticky
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
                        v-simple-table-sticky
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
                        v-simple-table-sticky
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
                        v-simple-table-sticky
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
                        v-simple-table-sticky
                    >
                    </v-data-table>

                  </v-card-text>
                </v-card>
              </td>
            </tr>
          </table>

        </vue-horizontal>

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
            <template v-slot:[`item.runStep`]="{ item }">

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                      v-on="on"
                      v-bind="attrs"
                      color="success"
                      min-width="150"
                      @click="runStep(item.line)"
                  >
                    mdi-play-outline
                  </v-icon>
                </template>
                <span>Run step {{ item.line }}</span>
              </v-tooltip>

            </template>
            <template v-slot:[`item.runMethod`]="{ item }">

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                      v-on="on"
                      v-bind="attrs"
                      color="red"
                      min-width="150"
                      @click="runMethodFromStep(item.line)"
                  >
                    mdi-motion-play-outline
                  </v-icon>
                </template>
                <span>Run Method from step {{ item.line }}</span>
              </v-tooltip>

            </template>

          </v-data-table>
        </v-card-text>
      </v-card>

    </vue-scroll-snap>

    <PlatFormCard mode="run" ref="plateForm"/>

    <!--Timeout dialog-->

    <v-dialog
        v-model="timeoutDialog"
        persistent
        max-width="630px"
    >
      <v-card>
        <v-card-title class="justify-center module-title-color">Please wait</v-card-title>
        <v-card-text class="justify-center">
          <CountDown v-if="timeoutDialog" v-bind:deadline="timeoutValue"/>
        </v-card-text>
      </v-card>

    </v-dialog>

    <!--Gina dialog-->

    <v-dialog
        v-model="blockingDialog.state"
        persistent
        max-width="630px"
    >
      <v-card>
        <v-card-title class="justify-center module-title-color">{{ blockingDialog.text }}</v-card-title>
        <v-card-text class="justify-center">
          <v-btn color="red"
                 class="ma-2 white--text"
                 @click="unBlockWaitingConditionDialog">
            ok
          </v-btn>
        </v-card-text>
      </v-card>

    </v-dialog>
  </div>

</template>

<script>
import axios from "axios";
import VueScrollSnap from "vue-scroll-snap";
import CountDown from "@/components/CountDown";
import PlatFormCard from "@/components/Auras/PlatformCard";
import VueHorizontal from "vue-horizontal";
import Vue from "vue";

export default {
  name: "RunAurasView",
  components: {
    VueScrollSnap,
    PlatFormCard,
    CountDown,
    VueHorizontal
  },
  data: () => ({
    connection: null,
    stepDialog: false,
    currentMethod: '',
    timeoutDialog: false,
    blockingDialog: {
      state: false,
      text: ''
    },
    timeoutValue: '',

    allModulesList: [],

    currentStep: {
      number: -1,
      running: false,
      stage: '',
      start: 0,
      pausePosition: '',
      paused: false,
      runAllMethod: true,
      data: {
        tlcMigration: '',
        phMeter: '',
        dropDispenser: '',
        lds1: '',
        lds2: '',
        lds3: '',
        lds4: '',
        lds5: '',
        lds6: '',
        lds7: '',
        lds8: '',
        lds9: '',
        lds10: '',
        lds11: '',
        lds12: '',
        sp1p: '',
        sp2p: '',
        sp3p: '',
        sp1s: '',
        sp2s: '',
        sp3s: '',
        pump1p: '',
        pump1s: '',
      }
    },

    stepModule: {
      name: '',
      totalOfSteps: '',
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

    dropDispenserModule: {
      name: '',
      columns: [
        {text: 'Value', value: 'description', width: 120, sortable: false, align: 'center'},
      ],
      data: []
    },

    tlcMigrationModule: {
      name: '',
      columns: [
        {text: 'Position', value: 'description', width: 150, align: 'center'},
      ],
      data: []
    },

    phMeterModule: {
      name: '',
      columns: [
        {text: 'Position', value: 'description', width: 120, align: 'center'},
      ],
      data: []
    },

    liquidDispenserModule: {
      name: '',
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
        {text: "SP1 Quantity", value: "displayedSP1Info", width: 150, sortable: false, align: 'center'},
        {text: "SP1 Speed", value: "sP1S", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Quantity", value: "displayedSP2Info", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Speed", value: "sP2S", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Quantity", value: "displayedSP3Info", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Speed", value: "sP3S", width: 150, sortable: false, align: 'center'},
        {text: "Rotations pump", value: "pumP1P", width: 150, sortable: false, align: 'center'},
        {text: "Speed pump (rpm)", value: "pumP1S", width: 150, sortable: false, align: 'center'},
      ],
      data: []
    },

    masterModule: {
      name: 'Master',
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
      columns: [{text: 'Waiting condition', value: 'description', width: 160, sortable: false}],
      data: []
    },

    actionsModule: {
      name: '',
      columns: [
        {text: 'Run single step', value: 'runStep', align: 'center', width: 100, sortable: false},
        {text: 'Run method from', value: 'runMethod', align: 'center', width: 120, sortable: false},
        {text: 'Step', value: 'step', align: ' d-none', width: 82, sortable: false},
      ],
      data: []
    },

    webSocket: {
      connected: false,
      ipAddress: '',
      connection: '',
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

    'currentStep.number'() {
      if (
          this.currentStep.number !== -1            // Not initializing
          && this.stepModule.totalOfSteps > 0       // The step is not empty
          && this.currentStep.number < this.stepModule.totalOfSteps  // The Method has not finished
          && this.currentStep.runAllMethod        // The run concerns the whole method (not a single step)
      ) {
        this.runMethod();
      }
    }
  },
  methods: {
    /*--------------------------------------------------------------------------
     *  Sends initialization message
     * -------------------------------------------------------------------------*/
    initMethodRun() {

      this.currentStep.runAllMethod = true;
      this.currentStep.running = true;
      this.currentStep.paused = false;
      this.currentStep.number = 0;
      // setTimeout(() => this.runMethod(), 1000);
      this.runMethod();

    },

    /*--------------------------------------------------------------------------
    *  Stops running method
    * -------------------------------------------------------------------------*/
    stopMethodRun(stopped) {
      this.currentStep.running = false;
      this.currentStep.runAllMethod = false;
      this.currentStep.number = -1;

      if (stopped === undefined) {
        this.blockingDialog.state = true;
        this.blockingDialog.text = 'Run of method finished!';
      } else {
        let data = {
          stopMethod: true
        }
        this.sendToWebsocket(data);
      }

    },
    /*--------------------------------------------------------------------------
     *  Run a given step
     * -------------------------------------------------------------------------*/
    runStep(step) {
      this.currentStep.runAllMethod = false;
      this.currentStep.number = step;
      this.currentStep.stage = 'runStep';
      let stepToRun = this.setStepDataObject();


      stepToRun.stage = 'runStep';
      this.sendToWebsocket(stepToRun);
    },
    /*--------------------------------------------------------------------------
     *  Run a given step
     * -------------------------------------------------------------------------*/
    runMethodFromStep(step) {
      this.currentStep.runAllMethod = true;
      this.currentStep.running = true;
      this.currentStep.number = step;
      setTimeout(() => this.runMethod(), 1000);
    },

    /*--------------------------------------------------------------------------
    *  Pause the run of a method
    * -------------------------------------------------------------------------*/
    pauseMethodRun() {
      this.currentStep.paused = !this.currentStep.paused;

      if (!this.currentStep.paused) {
        this.currentStep.number++;
        this.runMethod();
      }

    },
    /*--------------------------------------------------------------------------
    *  Run the whole method
    * -------------------------------------------------------------------------*/
    runMethod() {

      this.currentStep.stage = 'runMethod';
      let stepToRun = this.setStepDataObject();
      this.sendToWebsocket(stepToRun);
    },

    /*--------------------------------------------------------------------------
     * Sends Json to websocket
     * -------------------------------------------------------------------------*/
    sendToWebsocket(stepToRun) {
      this.$refs.plateForm.sendToWebsocket(stepToRun);
    },

    /*--------------------------------------------------------------------------
     * Extracts info from received Json
     * -------------------------------------------------------------------------*/
    extractDataSentFromSocket(data) {

      const obj = JSON.parse(data);

      if (obj.status === 'success') {

        switch (obj.stage) {

          case 'init':
            setTimeout(() => this.runMethod(), 2000);
            break;

          case 'runMethod':
            if (obj.stepNumber === this.stepModule.totalOfSteps - 1)
              this.stopMethodRun();
            else
              this.manageWaitingCondition();
            break;

          case 'end':
            // End run
            // Initialize data
            break;
        }
      }
      console.log('received: ', data);
    },


    /*--------------------------------------------------------------------------
    * Manage Waiting Condition after each step
    * -------------------------------------------------------------------------*/
    manageWaitingCondition() {

      if (this.currentStep.paused) return;
      if (!this.currentStep.running) return;

      // Prevent from outbound steps
      if (this.currentStep.number > this.stepModule.totalOfSteps) {
        this.currentStep.running = false;
        this.currentStep.number = -1;
        return;
      }


      //Waiting conditions
      if (this.waitingConditionModule.data[this.currentStep.number].value > 0) {

        this.timeoutDialog = true;
        this.timeoutValue = new Date();
        this.timeoutValue = this.timeoutValue.setMilliseconds(this.timeoutValue.getMilliseconds() + this.waitingConditionModule.data[this.currentStep.number].value);
        setTimeout(() => this.setTimeoutDialog(), this.waitingConditionModule.data[this.currentStep.number].value);

      } else if (this.waitingConditionModule.data[this.currentStep.number].value < 0) {
        this.blockingDialog.state = true;
        this.blockingDialog.text = 'Click on ok button to continue';
      } else {
        this.currentStep.number++;
      }
    },
    /*--------------------------------------------------------------------------
    * Hide Gina blocking dialog
    * -------------------------------------------------------------------------*/
    unBlockWaitingConditionDialog() {
      this.blockingDialog.state = false;
      this.currentStep.number++;
    },
    /*--------------------------------------------------------------------------
    * Create custom data to be sent
    * -------------------------------------------------------------------------*/
    setTimeoutDialog() {
      this.timeoutDialog = false;
      this.currentStep.number++;
    },


    /*--------------------------------------------------------------------------
     * Loads only steps that have changed in a method
     * -------------------------------------------------------------------------*/
    setStepDataObject() {

      let Master = {};
      let SP1 = {};
      let SP2 = {};
      let SP3 = {};

      if (this.liquidDispenserModule.data[this.currentStep.number].sP1P === 'QC sample drop') {
        Master.SP1 = 'QC sample drop';
      } else if (this.liquidDispenserModule.data[this.currentStep.number].sP1P === 'Fill LAL cartridge') {
        Master.SP1 = 'Fill LAL cartridge';
      } else {
        SP1.MoveTo = !isNaN(this.liquidDispenserModule.data[this.currentStep.number].sP1P) ? this.liquidDispenserModule.data[this.currentStep.number].sP1P * 1000 : '';
        SP1.SetMaxSpeed = this.liquidDispenserModule.data[this.currentStep.number].sP1S * 1000;
      }

      if (this.liquidDispenserModule.data[this.currentStep.number].sP2P === 'QC sample drop') {
        Master.SP2 = 'QC sample drop';
      } else if (this.liquidDispenserModule.data[this.currentStep.number].sP2P === 'Fill LAL cartridge') {
        Master.SP2 = 'Fill LAL cartridge';
      } else {
        SP2.MoveTo = !isNaN(this.liquidDispenserModule.data[this.currentStep.number].sP2P) ? this.liquidDispenserModule.data[this.currentStep.number].sP2P * 1000 : '';
        SP2.SetMaxSpeed = this.liquidDispenserModule.data[this.currentStep.number].sP2S * 1000;
      }

      if (this.liquidDispenserModule.data[this.currentStep.number].sP3P === 'QC sample drop') {
        Master.SP3 = 'QC sample drop';
      } else if (this.liquidDispenserModule.data[this.currentStep.number].sP3P === 'Fill LAL cartridge') {
        Master.SP3 = 'Fill LAL cartridge';
      } else {
        SP3.MoveTo = !isNaN(this.liquidDispenserModule.data[this.currentStep.number].sP3P) ? this.liquidDispenserModule.data[this.currentStep.number].sP3P * 1000 : '';
        SP3.SetMaxSpeed = this.liquidDispenserModule.data[this.currentStep.number].sP3S * 1000;
      }

      return {
        stage: this.currentStep.stage,
        MethodName: this.currentMethod.name,
        NumberOfSteps: this.stepModule.totalOfSteps,
        CurrentStep: this.currentStep.number,

        TlcMigration: {
          MoveTo: this.tlcMigrationModule.data[this.currentStep.number].position
        },
        PhMeter: {
          MoveTo: this.phMeterModule.data[this.currentStep.number].position
        },
        DropDispenser: {
          MoveTo: this.dropDispenserModule.data[this.currentStep.number].value
        },
        LDS1: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS1
        },
        LDS2: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS2
        },
        LDS3: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS3
        },
        LDS4: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS4
        },
        LDS5: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS5
        },
        LDS6: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS6
        },
        LDS7: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS7
        },
        LDS8: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS8
        },
        LDS9: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS9
        },
        LDS10: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS10
        },
        LDS11: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS11
        },
        LDS12: {
          MoveTo: this.liquidDispenserModule.data[this.currentStep.number].ldS12
        },
        SP1: SP1,
        SP2: SP2,
        SP3: SP3,
        PUMP1: {
          Move: this.liquidDispenserModule.data[this.currentStep.number].pumP1P * 360,
          SetMaxSpeed: this.liquidDispenserModule.data[this.currentStep.number].pumP1S * 6
        },
        Master: Master

      };
    },


    /*--------------------------------------------------------------------------
    * Connection to websocket
    * -------------------------------------------------------------------------*/
    connectToWebSocket() {

      console.log("Starting connection to WebSocket Server");

      try {
        this.connection = new WebSocket('ws://' + this.webSocket.ipAddress);
      } catch (Exception) {
        console.log(Exception.message)
      }

      this.connection.onmessage = (event) => {
        this.extractDataSentFromSocket(event.data);
      }
      this.connection.onopen = function (event) {
        console.log(event);
        console.log("Successfully connected to the ESP32 websocket server!");
      }
      this.connection.onclose = function (event) {
        console.log(event);
        console.log("Disconnected from websocket");
      }
      this.connection.onerror = function (event) {
        console.log(event);
        console.log("Error connecting to websocket");
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
                  //this.connectToWebSocket();
                }
              })
          .catch(
              (error) => {
                console.log(error.data)
              });
    },

    /*--------------------------------------------------------------------------
    *  Redirection to another page
    * -------------------------------------------------------------------------*/
    redirectTo(route) {

      if (route.includes('ConfigAuras'))
        this.$router.push({name: route, params: {idMethod: this.currentMethod.id}});
      else
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

      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.tlcMigrationModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
      this.commentModule.name = this.$store.state.commentModuleName;
      this.stepModule.name = 'Steps';
      this.actionsModule.name = 'Actions';

      this.allModulesList.push(
          this.dropDispenserModule,
          this.phMeterModule,
          this.liquidDispenserModule,
          this.tlcMigrationModule,
          this.commentModule,
          this.waitingConditionModule);
    },

    /*------------------------------------------------------------------------
     * Function used to load all modules data
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
    * Function to load all method's data
    * ------------------------------------------------------------------------*/
    async loadModulesData() {
      this.stepCount = 0;
      this.currentStep.number = 0;
      this.stepModule.data = [];
      this.actionsModule.data = [];
      this.allModulesList.forEach(m => this.fetchData(m));
    },

    /*------------------------------------------------------------------------
   * Function load number of actual steps
   * ------------------------------------------------------------------------*/
    loadStepsAndActions(length) {

      for (let i = 0; i < length; i++) {
        let step = {step: JSON.parse(JSON.stringify(this.currentStep.start))};
        this.$data.stepModule.data.push(step);
        let line = {line: JSON.parse(JSON.stringify(this.currentStep.start))};
        this.$data.actionsModule.data.push(line);
        this.currentStep.start++;

        this.$refs.plateForm.totalOfSteps = this.stepModule.totalOfSteps = i + 1;

      }
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
        else if (line.ldS1 === 1) line.displayedLds1 = 'Right';
        else line.displayedLds1 = 'Left';

        if (line.ldS2 === 0) line.displayedLds2 = '0';
        else if (line.ldS2 === 1) line.displayedLds2 = 'Right';
        else line.displayedLds2 = 'Left';

        if (line.ldS3 === 0) line.displayedLds3 = '0';
        else if (line.ldS3 === 1) line.displayedLds3 = 'Right';
        else line.displayedLds3 = 'Left';

        if (line.ldS4 === 0) line.displayedLds4 = '0';
        else if (line.ldS4 === 1) line.displayedLds4 = 'Right';
        else line.displayedLds4 = 'Left';

        if (line.ldS5 === 0) line.displayedLds5 = '0';
        else if (line.ldS5 === 1) line.displayedLds5 = 'Right';
        else line.displayedLds5 = 'Left';

        if (line.ldS6 === 0) line.displayedLds6 = '0';
        else if (line.ldS6 === 1) line.displayedLds6 = 'Right';
        else line.displayedLds6 = 'Left';

        if (line.ldS7 === 0) line.displayedLds7 = '0';
        else if (line.ldS7 === 1) line.displayedLds7 = 'Right';
        else line.displayedLds7 = 'Left';

        if (line.ldS8 === 0) line.displayedLds8 = '0';
        else if (line.ldS8 === 1) line.displayedLds8 = 'Right';
        else line.displayedLds8 = 'Left';

        if (line.ldS9 === 0) line.displayedLds9 = '0';
        else if (line.ldS9 === 1) line.displayedLds9 = 'Right';
        else line.displayedLds9 = 'Left';

        if (line.ldS10 === 0) line.displayedLds10 = '0';
        else if (line.ldS10 === 1) line.displayedLds10 = 'Right';
        else line.displayedLds10 = 'Left';

        if (line.ldS11 === 0) line.displayedLds11 = '0';
        else if (line.ldS11 === 1) line.displayedLds11 = 'Right';
        else line.displayedLds11 = 'Left';

        if (line.ldS12 === 0) line.displayedLds12 = '0';
        else if (line.ldS12 === 1) line.displayedLds12 = 'Right';
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
        this.waitingConditionModule.data[i].description.toLowerCase() === 'timeout' ?
            this.waitingConditionModule.data[i].description += ': ' + this.waitingConditionModule.data[i].value + ' ms' :
            this.waitingConditionModule.data[i].description.toLowerCase() === 'gina' ? 'Gina' : '';

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
      return item.step === this.currentStep.number ? 'style-1' : 'style-2';
    }

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

        tableHeader.style.opacity = 1;
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

<style>

.module-title-color {
  color: dodgerblue
}


.no-opacity {
  opacity: 1;
}

.style-1 {
  color: white;
  background-color: #e07b39;
}

</style>

<style scoped>
.horizontal >>> .v-hl-btn svg {
  margin-left: 60px;
  background: lightsteelblue;
  opacity: 0.50;

}

.visibleTop {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;
  opacity: 1;
}
</style>