<template>
  <div>

    <!--Method action-->
    <div style="min-height: 100px" class="visibleTop">
      <v-card id="navCard">
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
                 width="150"
                 @click="redirectTo('IndexAuras')"
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
            All Methods
          </v-btn>
          <v-btn color="primary"
                 width="150"
                 class="ma-2 white--text"
                 @click="redirectTo('ConfigAurasV2')"
          >
            <v-icon small color="blue-grey-darken-2">
              mdi-cog-outline
            </v-icon>
            <span class="mr-2">Edit method</span>
          </v-btn>

          <v-spacer/>
          <v-btn color="#eb3434"
                 class="ma-2 white--text"
                 @click="emergencyStop">
            Emergency Stop
          </v-btn>
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

        <vue-horizontal ref="horizontal" :button="false" scroll snap="none" responsive :displacement="0.5">

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
import PlatFormCard from "@/components/Auras/V2/PlatformCard_V2";
import VueHorizontal from "vue-horizontal";
import Vue from "vue";

export default {
  name: "RunAurasViewV2",
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
        v11: '',
        v12: '',
        v13: '',
        v14: '',
        v21: '',
        v22: '',
        v23: '',
        v24: '',
        v31: '',
        v32: '',
        v33: '',
        v34: '',
        v41: '',
        v42: '',
        v43: '',
        v44: '',
        v51: '',
        v52: '',
        v53: '',
        v54: '',
        v61: '',
        v62: '',
        v63: '',
        v64: '',
        v71: '',
        v72: '',
        v73: '',
        v74: '',
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
        {text: 'Position', value: 'position', width: 120, align: 'center'},
      ],
      data: []
    },

    liquidDispenserModule: {
      name: '',
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
        {text: "SP3 Quantity", value: "displayedSP3Info", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Speed (µL/s)", value: "sP3S", width: 150, sortable: false, align: 'center'},
        {text: "SP1 Quantity", value: "displayedSP1Info", width: 150, sortable: false, align: 'center'},
        {text: "SP1 Speed (µL/s)", value: "sP1S", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Quantity", value: "displayedSP2Info", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Speed (µL/s)", value: "sP2S", width: 150, sortable: false, align: 'center'},
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
    },
    prev:String,
  }),

  mounted() {
    this.fetchNetworkByName(this.$aurasVersionV2 );
    this.fetchMethod();
    this.initialization();
    this.fetchModulesList();
    this.loadModulesData();

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
      if(vm.prevRoute.path !=='/')
        location.reload();
    });
  },
  computed: {
    prevRoutePath() {return this.prevRoute ? this.prevRoute.path : '/'},
  },

  watch: {

    '$route': {
      handler: function() {
        this.prev =  this.prevRoutePath;
      },
      deep: true,
      immediate: true
    },

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

    emergencyStop(){
      this.$refs.plateForm.sendToWebsocket({"EmergencyStop ": true});
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
    * Manage Waiting Condition after each step
    * -------------------------------------------------------------------------*/
    manageWaitingCondition() {

      if (this.currentStep.paused) return;

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

        V11:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v11
        },
        V12:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v12
        },
        V13:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v13
        },
        V14:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v14
        },

        V21:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v21
        },
        V22:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v22
        },
        V23:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v23
        },
        V24:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v24
        },

        V31:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v31
        },
        V32:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v32
        },
        V33:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v33
        },
        V34:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v34
        },

        V41:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v41
        },
        V42:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v42
        },
        V43:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v43
        },
        V44:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v44
        },

        V51:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v51
        },
        V52:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v52
        },
        V53:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v53
        },
        V54:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v54
        },

        V61:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v61
        },
        V62:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v62
        },
        V63:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v63
        },
        V64:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v64
        },

        V71:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v71
        },
        V72:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v72
        },
        V73:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v73
        },
        V74:{
          Switch:this.liquidDispenserModule.data[this.currentStep.number].v74
        },

        SP1: SP1,
        SP2: SP2,
        SP3: SP3,
        PUMP1: {
          Move: (this.liquidDispenserModule.data[this.currentStep.number].pumP1P * 360).toFixed(2),
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
          .get(this.$aurasApiV2 + "api/networks/byName?name=" + name)
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
        this.$router.push({name: route, params: {idMethod: this.$route.params.idMethod}});
      else
        this.$router.push({name: route});
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
          .get(this.$aurasApiV2 + 'api/' + uri + this.$route.params.idMethod)
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