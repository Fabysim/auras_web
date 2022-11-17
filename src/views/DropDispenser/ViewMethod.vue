<template>
  <div>
    <h3>Method name : {{ method_name }}</h3>

    <v-dialog v-model="modulesConfigDialog">
      <v-container>
        <v-card>
          <v-card-title class="headline">
            <span>{{ configLabel }}</span>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              @click="modulesConfigDialog = false"
              text
            >
              Close
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              dense
              :headers="configHeaders"
              :items="connectedModules"
              disable-pagination
              hide-default-footer
            >
            </v-data-table>
            <v-card-actions> </v-card-actions>
            <v-banner elevation="19" v-if="configBanner" center>
              <v-row>
                <v-col>
                  <v-icon large color="green darken-2">
                    mdi-shield-check
                  </v-icon>
                  End of the configuration
                </v-col>
              </v-row>
            </v-banner>
          </v-card-text>
        </v-card>
      </v-container>
    </v-dialog>
    <v-card>
      <v-card-title>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              color="primary"
              min-width="150"
              class="white--text"
              @click="redirection('RunMethod')"
            >
              <v-icon>mdi-format-list-bulleted</v-icon>
              <span>All methods</span>
            </v-btn>
          </template>
          <span>List of all methods</span>
        </v-tooltip>

        <v-spacer />

        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              min-width="150"
              color="#fa7373"
              class="white&#45;&#45;text"
              @click="RunUniqueMethod()"
            >
              <v-icon>mdi-play-circle-outline</v-icon>
              <span>Run step {{ count1 }}</span>
            </v-btn>
          </template>
          <span>Run 1 step at a time</span>
        </v-tooltip>

        <v-spacer />

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              v-if="autoTransmission"
              min-width="150"
              color="red"
              class="white--text"
              @click="stopTransmission"
            >
              <v-icon>mdi-stop-circle-outline</v-icon>
              <span>Stop Method</span>
            </v-btn>
          </template>
          <span>Stop the method</span>
        </v-tooltip>

        <v-spacer />
        <v-btn
          v-if="autoTransmission"
          min-width="150"
          color="yellow"
          class="white--text"
          @click="pauseTransmission"
        >
          <v-icon>mdi-pause-circle-outline</v-icon>
          <span>Pause Method</span>
        </v-btn>

        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              min-width="150"
              color="success"
              class="white--text"
              @click="AutomaticTransmission"
            >
              <v-icon>mdi-play-circle-outline</v-icon>
              <span>Run Method</span>
            </v-btn>
          </template>
          <span>Run the whole method</span>
        </v-tooltip>
      </v-card-title>

      <!---------------------------------  Table     -------------------------------------------------->

      <v-data-table
        dense
        :headers="headers"
        :items="method_details"
        item-key="id_method"
        class="elevation-1"
        disable-pagination
        :hide-default-footer="true"
      >
      </v-data-table>
    </v-card>

    <v-container align="center">
      <iframe
        src="http://10.10.14.106:3000/iframe_mecatech.html"
        height="1500"
        width="2000"
        id="innerFrame"
        frameborder="0"
        ref="iframe"
      />
    </v-container>

    <v-dialog v-model="dialogPause" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Please click on 'OK' to continue</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="AutomaticTransmission"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewMethod",
  components: {},
  data() {
    return {
      /*---------------------- Communication with NODE MCU variables ----------------------------*/

      dialogPause: false,
      modulesConfigDialog: false,
      connectedModules: [],
      nodeMcuConnected: false,
      endOfTransmission: false,
      transmissionState: false,
      stepNumber: "",
      configBanner: false,
      unitsList: [1, 2],
      unitsListCheck: [],
      unitIDs: [],
      resultsDialog: false,
      unitNumber: 0,
      unitID: 0,
      count: -1,
      count1: 0,
      indexResults: 0,
      measures1: [],
      measures2: [],
      measures3: [],
      measures4: [],

      /*----------------------         Global   Data variables             ----------------------------*/

      total: "",
      processLabel: "Results of the process",
      configLabel: "Configuration",
      connection: null,
      last_step: "",
      token: "",
      loading: false,
      message: "",
      method_list: "",
      progress: 0,
      warningSignal: 0,
      stepData: [],
      results: [],
      method_details: [],
      step_details: [],
      wait_conditions: [],
      signal_types: [],
      operations: [],

      error: false,

      /*---------------------- Form values ----------------------------*/
      rank: "",
      step: "",
      S1: "",
      S2: "",
      S3: "",
      S4: "",
      S5: "",
      S6: "",
      S7: "",
      S8: "",
      PS1P: "",
      PS1S: "",
      PS2P: "",
      PS2S: "",
      PUMP1P: "",
      PUMP1S: "",
      Pause: 0,
      Delay: 0,
      oven: "",
      lifter: "",
      threshold_value: "",
      measurement: "",
      Description: "",
      timeout_value: "",
      id_waiting_condition: 1,
      id_method_waiting_condition: "",
      id_signal_type: 2,
      id_operation: 1,
      id_step: "",
      id_method_list: "",
      method_names: [],
      method_name: "",
      firstStep: 0,
      runButton: "Run Method",
      inPause: false,
      stopped: false,

      /*---------------------- Table: Data values ----------------------------*/
      headers: [
        { text: "Step", align: "start", sortable: true, value: "step" },
        { text: "S1", value: "S1" },
        { text: "S2", value: "S2" },
        { text: "S3", value: "S3" },
        { text: "S4", value: "S4" },
        { text: "S5", value: "S5" },
        { text: "S6", value: "S6" },
        { text: "S7", value: "S7" },
        { text: "S8", value: "S8" },
        { text: "Position PS1", value: "PS1P" },
        { text: "Speed PS1", value: "PS1S" },
        { text: "Position PS2", value: "PS2P" },
        { text: "Speed PS2", value: "PS2S" },
        { text: "Rotations PUMP1S", value: "PUMP1P" },
        { text: "Speed PUMP1S(rpm)", value: "PUMP1S" },
        { text: "Delay (s)", value: "Delay" },
        { text: "Pause", value: "Pause" },
        { text: "Description", value: "description" },
      ],

      /*---------------------- Table: results values ----------------------------*/
      resultsHeaders: [
        { text: "Date", align: "start", sortable: true, value: "date" },
        { text: "Step", sortable: true, value: "step" },
        { text: "Status", sortable: true, value: "status" },
        { text: "Position S1", value: "positionS1" },
        { text: "Position S2", value: "positionS2" },
        { text: "Position S3", value: "positionS3" },
        { text: "Position S4", value: "positionS4" },
        { text: "Position S5", value: "positionS5" },
        { text: "Position S6", value: "positionS6" },
        { text: "Position S7", value: "positionS7" },
        { text: "Position S9", value: "positionS8" },
        { text: "Position PS1", value: "positionPS1" },
        { text: "Position PS2", value: "positionPS2" },
      ],

      /*---------------------- Table: Connected modules state ----------------------------*/
      configHeaders: [
        { text: "Unit ID", align: "start", sortable: true, value: "unitId" },
        { text: "State", sortable: true, value: "state" },
        { text: "Action", sortable: true, value: "action" },
      ],

      iframeWin: {},
      autoTransmission: false,
      nextStep: 0,
    };
  },

  created() {
    this.fetchAllMethodData();
    this.fetchMethodName();

    this.count = -1;
    console.log("Step: ", this.count);
    console.log("Next Step: ", this.count1);
    console.log("total: ", this.total);
  },

  mounted() {
    document.title = "Execute Method";
    this.count = -1;
    window.addEventListener("message", this.handleMessage);
    this.iframeWin = this.$refs.iframe.contentWindow;

    setTimeout(() => {
      this.iframeWin.postMessage(
        { ESP_IP: this.$store.state.esp32_Ip, Execution: "true" },
        "*"
      );
    }, 1000);
  },

  methods: {
    handleMessage(event) {
      const JSONobj = JSON.parse(event.data);
      console.log(JSONobj);
      if (typeof JSONobj.stepFinished !== "undefined") {
        this.nextStep = JSONobj.stepFinished + 1;

        //If there is a pause after this finshed step
        if (this.Pause == 1) {
          this.pauseTransmission();
          this.DisplayPauseAlert();
        }

        if (this.Delay > 0) {
          setTimeout(() => {
            if (this.autoTransmission === true) {
              this.AutomaticTransmission();
            }
          }, this.Delay * 1000);
        } else {
          if (this.autoTransmission === true) {
            this.AutomaticTransmission();
          }
        }
      }
    },

    DisplayPauseAlert() {
      let text = "Press OK to resume the process";
      if (confirm(text) == true) {
        this.AutomaticTransmission();
      } else {
        this.stopTransmission();
      }
    },

    /* --------------      Stop the transmission    ----------- */
    stopTransmission() {
      this.autoTransmission = false;
      this.count1 = 0;
      this.count = -1;
      this.nextStep = 0;
      this.stopped = true;
      console.log("In autoTransmission :", this.autoTransmission);
    },

    pauseTransmission() {
      this.inPause = true;
      this.autoTransmission = false;
    },
    RunUniqueMethod() {
      if (this.count === this.total - 1) this.count = -1;
      this.count++;
      console.log("Step: ", this.count);
      this.getStepData(this.count);

      this.count1 = this.count + 1;

      if (this.count1 === this.total) this.count1 = 0;
    },

    AutomaticTransmission() {
      if (this.stopped === true) {
        this.nextStep = 0;
      }
      console.log("auto next step :", this.nextStep);
      console.log("In count1 :", this.count1);
      console.log("In total :", this.total);
      console.log("In pause :", this.inPause);
      console.log("In autoTransmission :", this.autoTransmission);

      this.inPause = false;
      this.stopped = false;
      if (this.count1 == this.total) {
        this.count1 = 0;
        this.count = -1;
        this.nextStep = 0;
        this.autoTransmission = false;
      } else {
        this.autoTransmission = true;
        if (!this.inPause) {
          this.getStepData(this.nextStep);
        }

        this.count1 = this.nextStep + 1;
      }
    },

    /* --------------      Retrieves a step's data from the webserver    ----------- */
    getStepData(step) {
      const params = {
        step: step,
      };

      axios
        .put(this.$api + "run/" + this.$store.state.id_method_list, params)
        .then((response) => {
          console.log("api : ", response);
          if (response.data.status === "success") {
            this.stepData = response.data.content;

            this.stepData = response.data.content;
            this.step = this.stepData[0]["step"];
            this.S1 = this.stepData[0]["S1"];
            this.S2 = this.stepData[0]["S2"];
            this.S3 = this.stepData[0]["S3"];
            this.S4 = this.stepData[0]["S4"];
            this.S5 = this.stepData[0]["S5"];
            this.S6 = this.stepData[0]["S6"];
            this.S7 = this.stepData[0]["S7"];
            this.S8 = this.stepData[0]["S8"];
            this.PS1P = this.stepData[0]["PS1P"];
            this.PS1S = this.stepData[0]["PS1S"];
            this.PS2P = this.stepData[0]["PS2P"];
            this.PS2S = this.stepData[0]["PS2S"];
            this.PUMP1P = this.stepData[0]["PUMP1P"];
            this.PUMP1S = this.stepData[0]["PUMP1S"];
            this.Pause = this.stepData[0]["Pause"];
            this.Delay = this.stepData[0]["Delay"];
            this.Description = this.stepData[0]["description"];
            this.postDataToESP();
          }
        });
    },

    /* --------------      Transmits the data to ESP    ----------- */
    postDataToESP() {
      if (this.total === this.step + 1) {
        this.endOfTransmission = true;
      } else {
        this.endOfTransmission = false;
      }
      this.loading = true;
      const params = JSON.stringify({
        step: this.step,
        S1: this.S1,
        S2: this.S2,
        S3: this.S3,
        S4: this.S4,
        S5: this.S5,
        S6: this.S6,
        S7: this.S7,
        S8: this.S8,
        PS1PTarget: this.PS1P,
        PS1S: this.PS1S,
        PS2PTarget: this.PS2P,
        PS2S: this.PS2S,
        PUMP1PTarget: this.PUMP1P,
        PUMP1S: this.PUMP1S,
        Pause: this.Pause,
        Delay: this.Delay,
        methodName: this.method_name,
        totalSteps: this.total,
        endOfTransmission: this.endOfTransmission,
      });

      this.iframeWin.postMessage(params, "*");
    },

    dismissResults() {
      this.resultsDialog = false;
      this.results.splice(0, this.results.length);
    },

    /* -----------------------------------------------------------------------------------------------------/
     * Loads a step's data from the webservice (database)
     * Parameters : id_step = the desired step's id
     *  ---------------------------------------------------------------------------------------------------- */
    loadData(id_step) {
      this.id_step = id_step;
      this.id_method_list = this.$route.params.id_method_list;

      const params = {
        id_step: this.id_step,
        id_method_list: this.id_method_list,
      };

      axios
        .patch(
          this.$api + "methods/" + this.$store.state.id_method_list,
          params
        )
        .then((response) => {
          if (response.data.status === "success") {
            this.stepData = response.data.content;
            this.S1 = this.stepData[0]["S1"];
            this.S2 = this.stepData[0]["S2"];
            this.S3 = this.stepData[0]["S3"];
            this.S4 = this.stepData[0]["S4"];
            this.S5 = this.stepData[0]["S5"];
            this.S6 = this.stepData[0]["S6"];
            this.S7 = this.stepData[0]["S7"];
            this.S8 = this.stepData[0]["S8"];
            this.PS1P = this.stepData[0]["PS1P"];
            this.PS1S = this.stepData[0]["PS1S"];
            this.PS2P = this.stepData[0]["PS2P"];
            this.PS2S = this.stepData[0]["PS2S"];
            this.PUMP1P = this.stepData[0]["PUMP1P"];
            this.PUMP1S = this.stepData[0]["PUMP1S"];
            this.D = this.stepData[0]["D"];
            this.step = this.stepData[0]["step"];
          } else {
            this.message = response.data.message;
          }
        });
    },
    /* -----------------------------------------------------------------------------------------------------/
     * Redirection to specified route name
     * Parameters : name = route's name
     *  ---------------------------------------------------------------------------------------------------- */

    redirection(name) {
      this.$router.push({ name: name });
    },

    /* -------------- Loads all method's data from the webserver  -------------- */

    fetchAllMethodData() {
      this.id_method_list = this.$route.params.id_method_list;
      this.$store.state.id_method_list = this.$route.params.id_method_list;

      axios
        .get(this.$api + "methods/" + this.$route.params.id_method_list)
        .then((response) => {
          if (response.data.status === "success") {
            this.method_details = response.data.content;
            this.total = response.data.count[0]["total"];
            this.message = response.data.message;
          } else {
            this.message = response.data.message;
          }
        });
    },

    /* -------------- Loads all method's name from the webserver  -------------- */

    fetchMethodName() {
      axios
        .get(this.$api + "config/" + this.$route.params.id_method_list)
        .then((response) => {
          if (response.data.status === "success") {
            this.method_names = response.data.content;
            this.method_name = this.method_names[0]["method_name"];
          } else {
            this.message = response.data.message;
          }
        });
    },

    /* -------------- Loads the current state of the application's config  -------------- */

    reloadConfig() {
      console.log(this.connection.readyState);
      if (this.connection.readyState !== 1) {
        this.results.splice(0, this.results.length);
      }

      this.modulesConfigDialog = true;
    },

    /* --------------       Creates and returns an objet date       -------------- */
    setDate() {
      let date1 = new Date();
      let date =
        date1.getFullYear() +
        "-" +
        (date1.getMonth() + 1) +
        "-" +
        date1.getDate();
      let hours =
        date1.getHours() +
        ":" +
        date1.getMinutes() +
        ":" +
        date1.getSeconds() +
        ":" +
        date1.getMilliseconds();
      return date + " " + hours;
    },
  },
};
</script>

<style scoped>
.warning {
  background-color: darkred;
  color: white;
}
</style>