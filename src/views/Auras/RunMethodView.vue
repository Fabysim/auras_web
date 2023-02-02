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
                 v-if="runningStep.runStarted"
          >
            <v-row v-if="!runningStep.paused">
              <v-icon small>
                mdi-pause
              </v-icon>
              Pause run
            </v-row>
            <v-row v-else>
              <v-icon small>
                mdi-play-outline
              </v-icon>
              Continue run
            </v-row>

          </v-btn>

          <v-btn color="success"
                 class="ma-2 white--text"
                 @click="initMethodRun"
                 v-if="!runningStep.paused"
          >
            <v-icon small>
              mdi-play-outline
            </v-icon>
            Start Run
          </v-btn>

          <v-btn color="success"
                 class="ma-2 white--text"
                 @click="initMethodRun"
                 v-else
          >
            <v-icon small>
              mdi-play-outline
            </v-icon>
            Restart Run
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
                        :item-class="itemRowBackground">

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
                <span>Run step {{ item.line }}</span>
              </v-tooltip>

            </template>

          </v-data-table>
        </v-card-text>
      </v-card>

    </vue-scroll-snap>

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
        v-model="blockingDialog"
        persistent
        max-width="630px"
    >
      <v-card>
        <v-card-title class="justify-center module-title-color">Click on ok button to continue</v-card-title>
        <v-card-text class="justify-center">
          <v-btn color="red"
                 class="ma-2 white--text"
                 @click="unBlockDialog">
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

export default {
  name: "RunAurasView",
  components: {
    VueScrollSnap,
    CountDown
  },
  data: () => ({
    connection: null,
    stepDialog: false,
    currentMethod: '',
    timeoutDialog: false,
    blockingDialog: false,
    timeoutValue: '',

    allModulesList: [],

    runningStep: {
      number: -1,
      runStarted: false,
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
        {text: 'Value', value: 'description', width: 150, sortable: false, align: 'center'},
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
        {text: 'Position', value: 'description', width: 100, align: 'center'},
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
        {text: "SP1 Speed", value: "sP1S", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Target", value: "displayedSP2Info", width: 150, sortable: false, align: 'center'},
        {text: "SP2 Speed", value: "sP2S", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Target", value: "displayedSP3Info", width: 150, sortable: false, align: 'center'},
        {text: "SP3 Speed", value: "sP3S", width: 150, sortable: false, align: 'center'},
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
      columns: [{text: 'Waiting condition', value: 'description', width: 160, sortable: false}],
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

    'runningStep.number'() {

      if (!this.runningStep.paused &&
          this.stepModule.totalOfSteps > 0 &&
          this.runningStep.number <= this.stepModule.totalOfSteps &&
          this.runningStep.runAllMethod
      ) {
        if (this.runningStep.number === this.stepModule.data.length)
          this.stopMethodRun();
        setTimeout(() => this.runMethod(), 2000);
      }
    }
  },
  methods: {
    /*--------------------------------------------------------------------------
     *  Sends initialization message
     * -------------------------------------------------------------------------*/
    initMethodRun() {

      this.runningStep.runAllMethod = true;
      this.runningStep.runStarted = true;
      this.runningStep.number = 0;
      this.runningStep.stage = 'init';

      let init = {
        stage: this.runningStep.stage,
        methodName: this.currentMethod.name,
        NumberOfSteps: this.stepModule.totalOfSteps + 1
      };

      this.sendToWebsocket(init);
    },

    stopMethodRun() {

      this.runningStep.runAllMethod = false;
    },
    /*--------------------------------------------------------------------------
     *  Run a given step
     * -------------------------------------------------------------------------*/
    runStep(step) {
      this.runningStep.runAllMethod = false;
      this.runningStep.number = step;
      let stepToRun = this.loadOnlyNecessaryElementsOfStep();
      stepToRun.stage = 'runStep';
      this.sendToWebsocket(stepToRun);
    },

    /*--------------------------------------------------------------------------
    *  Pause the run of a method
    * -------------------------------------------------------------------------*/
    pauseMethodRun() {
      this.runningStep.paused = !this.runningStep.paused;

      if (this.runningStep.paused)
        this.runningStep.pausePosition = this.runningStep.number;
      else
        this.runningStep.number = this.runningStep.pausePosition;

    },
    /*--------------------------------------------------------------------------
    *  Run the whole method
    * -------------------------------------------------------------------------*/
    runMethod() {
      this.runningStep.stage = 'runMethod';
      let stepToRun = this.createRunningStepData();
      this.sendToWebsocket(stepToRun);
    },

    /*--------------------------------------------------------------------------
     * Sends Json to websocket
     * -------------------------------------------------------------------------*/
    sendToWebsocket(stepToRun) {
      this.connection.send(JSON.stringify(stepToRun));
      console.log('sent:', stepToRun)
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

      if (this.runningStep.number > this.stepModule.totalOfSteps){
        this.runningStep.runStarted = false;
        this.runningStep.number =-1;
      }


      if (this.waitingConditionModule.data[this.runningStep.number].value > 0) {

        this.timeoutDialog = true;
        this.timeoutValue = new Date();
        this.timeoutValue = this.timeoutValue.setMilliseconds(this.timeoutValue.getMilliseconds() + this.waitingConditionModule.data[this.runningStep.number].value);
        setTimeout(() => this.setTimeoutDialog(), this.waitingConditionModule.data[this.runningStep.number].value);

      } else if (this.waitingConditionModule.data[this.runningStep.number].value < 0) {
        this.blockingDialog = true;
      } else {
        this.runningStep.number++;
      }
    },
    /*--------------------------------------------------------------------------
    * Hide Gina blocking dialog
    * -------------------------------------------------------------------------*/
    unBlockDialog() {
      this.blockingDialog = false;
      this.runningStep.number++;
    },
    /*--------------------------------------------------------------------------
    * Create custom data to be sent
    * -------------------------------------------------------------------------*/
    setTimeoutDialog() {
      this.timeoutDialog = false;
      this.runningStep.number++;
    },
    /*--------------------------------------------------------------------------
     * Create custom data to be sent
     * -------------------------------------------------------------------------*/
    createRunningStepData() {

      let stepToRun = {
        stage: this.runningStep.stage,
        stepNumber: this.runningStep.number,
        moveTo: {}
      }

      if (this.runningStep.number === 0)
        stepToRun = this.loadFirstStepOfMethod();
      else
        stepToRun = this.loadOnlyNecessaryElementsOfStep();

      return stepToRun;
    },

    /*--------------------------------------------------------------------------
     * Loads only steps that have changed in a method
     * -------------------------------------------------------------------------*/
    loadOnlyNecessaryElementsOfStep() {

      let stepToRun = {
        stage: this.runningStep.stage,
        stepNumber: this.runningStep.number,
        moveTo: {}
      }
      this.runningStep.data.tlcMigration !== this.tlcMigrationModule.data[this.runningStep.number].position
          ? stepToRun.moveTo.tlcMigration = this.runningStep.data.tlcMigration = this.tlcMigrationModule.data[this.runningStep.number].position : '';

      this.runningStep.data.phMeter !== this.phMeterModule.data[this.runningStep.number].position
          ? stepToRun.moveTo.phMeter = this.runningStep.data.phMeter = this.phMeterModule.data[this.runningStep.number].position : '';

      this.runningStep.data.dropDispenser !== this.dropDispenserModule.data[this.runningStep.number].position
          ? stepToRun.moveTo.dropDispenser = this.runningStep.data.dropDispenser = this.dropDispenserModule.data[this.runningStep.number].value : '';

      this.runningStep.data.lds1 !== this.liquidDispenserModule.data[this.runningStep.number].ldS1
          ? stepToRun.moveTo.lds1 = this.runningStep.data.lds1 = this.liquidDispenserModule.data[this.runningStep.number].ldS1 : '';

      this.runningStep.data.lds2 !== this.liquidDispenserModule.data[this.runningStep.number].ldS2
          ? stepToRun.moveTo.lds2 = this.runningStep.data.lds2 = this.liquidDispenserModule.data[this.runningStep.number].ldS2 : '';

      this.runningStep.data.lds3 !== this.liquidDispenserModule.data[this.runningStep.number].ldS3
          ? stepToRun.moveTo.lds3 = this.runningStep.data.lds3 = this.liquidDispenserModule.data[this.runningStep.number].ldS3 : '';

      this.runningStep.data.lds4 !== this.liquidDispenserModule.data[this.runningStep.number].ldS4
          ? stepToRun.moveTo.lds4 = this.runningStep.data.lds4 = this.liquidDispenserModule.data[this.runningStep.number].ldS4 : '';

      this.runningStep.data.lds5 !== this.liquidDispenserModule.data[this.runningStep.number].ldS5
          ? stepToRun.moveTo.lds5 = this.runningStep.data.lds5 = this.liquidDispenserModule.data[this.runningStep.number].ldS5 : '';

      this.runningStep.data.lds6 !== this.liquidDispenserModule.data[this.runningStep.number].ldS6
          ? stepToRun.moveTo.lds6 = this.runningStep.data.lds6 = this.liquidDispenserModule.data[this.runningStep.number].ldS6 : '';

      this.runningStep.data.lds7 !== this.liquidDispenserModule.data[this.runningStep.number].ldS7
          ? stepToRun.moveTo.lds7 = this.runningStep.data.lds7 = this.liquidDispenserModule.data[this.runningStep.number].ldS7 : '';

      this.runningStep.data.lds8 !== this.liquidDispenserModule.data[this.runningStep.number].ldS8
          ? stepToRun.moveTo.lds8 = this.runningStep.data.lds8 = this.liquidDispenserModule.data[this.runningStep.number].ldS8 : '';

      this.runningStep.data.lds9 !== this.liquidDispenserModule.data[this.runningStep.number].ldS9
          ? stepToRun.moveTo.lds9 = this.runningStep.data.lds9 = this.liquidDispenserModule.data[this.runningStep.number].ldS9 : '';

      this.runningStep.data.sp1p !== this.liquidDispenserModule.data[this.runningStep.number].sP1P
          ? stepToRun.moveTo.sp1p = this.runningStep.data.sp1p = this.liquidDispenserModule.data[this.runningStep.number].sP1P : '';

      this.runningStep.data.sp1s !== this.liquidDispenserModule.data[this.runningStep.number].sP1S
          ? stepToRun.moveTo.sp1s = this.runningStep.data.sp1s = this.liquidDispenserModule.data[this.runningStep.number].sP1S : '';

      this.runningStep.data.sp2p !== this.liquidDispenserModule.data[this.runningStep.number].sP2P
          ? stepToRun.moveTo.sp2p = this.runningStep.data.sp2p = this.liquidDispenserModule.data[this.runningStep.number].sP2P : '';

      this.runningStep.data.sp2s !== this.liquidDispenserModule.data[this.runningStep.number].sP2S
          ? stepToRun.moveTo.sp2s = this.runningStep.data.sp2s = this.liquidDispenserModule.data[this.runningStep.number].sP2S : '';

      this.runningStep.data.sp3p !== this.liquidDispenserModule.data[this.runningStep.number].sP3P
          ? stepToRun.moveTo.sp3p = this.runningStep.data.sp3p = this.liquidDispenserModule.data[this.runningStep.number].sP3P : '';

      this.runningStep.data.sp3s !== this.liquidDispenserModule.data[this.runningStep.number].sP3S
          ? stepToRun.moveTo.sp3s = this.runningStep.data.sp3s = this.liquidDispenserModule.data[this.runningStep.number].sP3S : '';

      this.runningStep.data.pump1p !== this.liquidDispenserModule.data[this.runningStep.number].pumP1P
          ? stepToRun.moveTo.pump1p = this.runningStep.data.pump1p = this.liquidDispenserModule.data[this.runningStep.number].pumP1P : '';

      this.runningStep.data.pump1s !== this.liquidDispenserModule.data[this.runningStep.number].pumP1S
          ? stepToRun.moveTo.pump1s = this.runningStep.data.pump1s = this.liquidDispenserModule.data[this.runningStep.number].pumP1S : '';
      return stepToRun;
    },

    /*--------------------------------------------------------------------------
     * Loads the first line of the method
     * -------------------------------------------------------------------------*/
    loadFirstStepOfMethod() {

      let stepToRun = {
        stage: this.runningStep.stage,
        stepNumber: this.runningStep.number,
        moveTo: {}
      }
      stepToRun.moveTo.tlcMigration = this.runningStep.data.tlcMigration = this.tlcMigrationModule.data[this.runningStep.number].position;
      stepToRun.moveTo.phMeter = this.runningStep.data.phMeter = this.phMeterModule.data[this.runningStep.number].position;
      stepToRun.moveTo.dropDispenser = this.runningStep.data.dropDispenser = this.dropDispenserModule.data[this.runningStep.number].value;
      stepToRun.moveTo.lds1 = this.runningStep.data.lds1 = this.liquidDispenserModule.data[this.runningStep.number].ldS1;
      stepToRun.moveTo.lds2 = this.runningStep.data.lds2 = this.liquidDispenserModule.data[this.runningStep.number].ldS2;
      stepToRun.moveTo.lds3 = this.runningStep.data.lds3 = this.liquidDispenserModule.data[this.runningStep.number].ldS3;
      stepToRun.moveTo.lds4 = this.runningStep.data.lds4 = this.liquidDispenserModule.data[this.runningStep.number].ldS4;
      stepToRun.moveTo.lds5 = this.runningStep.data.lds5 = this.liquidDispenserModule.data[this.runningStep.number].ldS5;
      stepToRun.moveTo.lds6 = this.runningStep.data.lds6 = this.liquidDispenserModule.data[this.runningStep.number].ldS6;
      stepToRun.moveTo.lds7 = this.runningStep.data.lds7 = this.liquidDispenserModule.data[this.runningStep.number].ldS7;
      stepToRun.moveTo.lds8 = this.runningStep.data.lds8 = this.liquidDispenserModule.data[this.runningStep.number].ldS8;
      stepToRun.moveTo.lds9 = this.runningStep.data.lds9 = this.liquidDispenserModule.data[this.runningStep.number].ldS9;
      stepToRun.moveTo.sp1p = this.runningStep.data.sp1p = this.liquidDispenserModule.data[this.runningStep.number].sP1P;
      stepToRun.moveTo.sp1s = this.runningStep.data.sp1s = this.liquidDispenserModule.data[this.runningStep.number].sP1S;
      stepToRun.moveTo.sp2p = this.runningStep.data.sp2p = this.liquidDispenserModule.data[this.runningStep.number].sP2P;
      stepToRun.moveTo.sp2s = this.runningStep.data.sp2s = this.liquidDispenserModule.data[this.runningStep.number].sP2S;
      stepToRun.moveTo.sp3p = this.runningStep.data.sp3p = this.liquidDispenserModule.data[this.runningStep.number].sP3P;
      stepToRun.moveTo.sp3s = this.runningStep.data.sp3s = this.liquidDispenserModule.data[this.runningStep.number].sP3S;
      stepToRun.moveTo.pump1p = this.runningStep.data.pump1p = this.liquidDispenserModule.data[this.runningStep.number].pumP1P;
      stepToRun.moveTo.pump1s = this.runningStep.data.pump1s = this.liquidDispenserModule.data[this.runningStep.number].pumP1S;

      return stepToRun;
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
                  this.connectToWebSocket();
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
      this.runningStep.number = 0;
      this.stepModule.data = [];
      this.actionsModule.data = [];
      this.allModulesList.forEach(m => this.fetchData(m));
    },

    /*------------------------------------------------------------------------
   * Function load number of actual steps
   * ------------------------------------------------------------------------*/
    loadStepsAndActions(length) {

      for (let i = 0; i < length; i++) {
        let step = {step: JSON.parse(JSON.stringify(this.runningStep.start))};
        this.$data.stepModule.data.push(step);
        let line = {line: JSON.parse(JSON.stringify(this.runningStep.start))};
        this.$data.actionsModule.data.push(line);
        this.runningStep.start++;

        this.stepModule.totalOfSteps = i;
      }
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

        line.sP1P >= 0 ? line.displayedSP1Info = 'Volume: ' + line.sP1P + ' µL' : '';
        line.sP2P >= 0 ? line.displayedSP2Info = 'Volume: ' + line.sP2P + ' µL' : '';
        line.sP3P >= 0 ? line.displayedSP3Info = 'Volume: ' + line.sP3P + ' µL' : '';

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
      return item.step === this.runningStep.number ? 'style-1' : 'style-2';
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
  background-color: #e07b39;
}


</style>