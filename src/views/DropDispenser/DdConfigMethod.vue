<template>
  <div>
    <v-card>
      <v-card-title>
        <h3>Method name : {{ method_name }}</h3>

        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#9e42f5"
              class="white--text"
              min-width="150"
              v-on="on"
              v-bind="attrs"
              @click="allMethodsRedirect"
            >
              <v-icon>mdi-format-list-bulleted</v-icon>
              <span class="mr-2">All methods</span>
            </v-btn>
          </template>
          <span>List of all methods</span>
        </v-tooltip>

        <v-spacer />
        <download-excel :data="downloaded_data" :name="method_name + '.xls'">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-on="on"
                v-bind="attrs"
                color="#1dc249"
                class="white--text"
                min-width="150"
              >
                <v-icon>mdi-file-excel</v-icon>
                <span class="mr-2">Download</span>
              </v-btn>
            </template>
            <span>Download method in Excel</span>
          </v-tooltip>
        </download-excel>

        <v-spacer />
      </v-card-title>

      <!---------------------------------  Table     -------------------------------------------------->

      <v-data-table
        dense
        :headers="headers"
        :items="method_details"
        item-key="id_method"
        class="elevation-1"
        :hide-default-footer="true"
        disable-pagination
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-row justify="center">
            <v-col min-width="500">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-on="on"
                    v-bind="attrs"
                    color="primary"
                    min-width="150"
                    @click="editData(item.id_method)"
                  >
                    mdi-square-edit-outline
                  </v-icon>
                </template>
                <span>Edit step</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="red"
                    v-on="on"
                    v-bind="attrs"
                    min-width="150"
                    @click="beforeDelete(item.id_method)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <span>Delete step</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="green"
                    v-on="on"
                    v-bind="attrs"
                    min-width="150"
                    @click="removeLevel(item.id_method)"
                  >
                    mdi-arrow-up-bold
                  </v-icon>
                </template>
                <span>Step up</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-on="on"
                    v-bind="attrs"
                    min-width="150"
                    @click="addLevel(item.id_method)"
                  >
                    mdi-arrow-down-bold
                  </v-icon>
                </template>
                <span>Step down</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteStep(deleteId)"
            >Delete</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
    </v-snackbar>
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
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

export default {
  name: "DdConfigMethod",

  components: {},
  data() {
    return {
      deleteId: "",
      total: "",
      snackbar: false,
      dialogDelete: false,
      text: "Step created successfully",
      overlayTitle: "",
      overlayButton: "",
      timeout: 2000,
      last_step: "",
      token: "",
      loading: false,
      message: "",
      method_list: "",
      method_details: [],
      downloaded_data: [],
      step_details: [],
      wait_conditions: [],
      signal_types: [],
      operations: [],
      dialog: false,
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
      PUMP1R: "",
      PUMP1P: "",
      PUMP1S: "",
      lifter: "",
      Pause: "",
      iterat: 0,
      description: "",
      timeout_value: "",
      id_method: "",
      id_method_list: "",
      method_names: [],
      method_name: "",

      /*---------------------- Table values ----------------------------*/
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
        { text: "Rotations pump", value: "PUMP1P" },
        { text: "Speed pump (rpm)", value: "PUMP1S" },
        { text: "Pause", value: "Pause" },
        { text: "Delay", value: "Delay" },
        { text: "Description", value: "description" },
        { text: " ", value: "actions" },
      ],
      iframeWin: {},
    };
  },
  created() {
    this.fetchAllMethodData();
    this.fetchMethodName();
  },
  mounted() {
    document.title = "Configure Method";
    //Event Listener for Iframe
    window.addEventListener("message", this.iframeEvent, false);

    this.iframeWin = this.$refs.iframe.contentWindow;

    setTimeout(() => {
      this.iframeWin.postMessage(
        {
          ESP_IP: this.$store.state.esp32_Ip,
          Execution: "false",
          Id_method_list: this.$route.params.id_method_list,
        },
        "*"
      );
    }, 1000);
  },

  methods: {
    addStep() {
      this.snackbar = true;
      this.text = "Step added successfully";
    },
    iframeEvent(event) {
      //Verify App Domain

      const JSONobj = JSON.parse(event.data);

      if (typeof JSONobj.Update !== "undefined") {
        this.fetchAllMethodData();
      }
    },

    editData(id_method) {
      this.$router.push({
        name: "UpdateMethod",
        params: { id_method: id_method },
      });
    },

    allMethodsRedirect() {
      this.$router.push({ name: "Configuration" });
    },

    createData() {
      this.edit = false;
      this.init_data();
      this.overlayTitle = "Create step";
      this.overlayButton = "Create";
    },
    setDownloadedData() {
      this.downloaded_data = this.method_details.map(function (obj) {
        return {
          step: obj.step,
          S1: obj.S1,
          S2: obj.S2,
          S3: obj.S3,
          S4: obj.S4,
          S5: obj.S5,
          S6: obj.S6,
          S7: obj.S7,
          S8: obj.S8,
          PS1P: obj.PS1P,
          PS1S: obj.PS1S,
          PS2P: obj.PS2P,
          PS2S: obj.PS2S,
          PUMP1P: obj.PUMP1P,
          Pause: obj.Pause,
          Delay: obj.Delay,
          description: obj.description,
        };
      });

      console.log(this.downloaded_data);
    },

    fetchAllMethodData() {
      this.id_method_list = this.$route.params.id_method_list;
      this.$store.state.id_method_list = this.$route.params.id_method_list;

      axios
        .get('http://' + this.$ddApi + "methods/" + this.$route.params.id_method_list)
        .then((response) => {
          if (response.data.status === "success") {
            this.method_details = response.data.content;
            this.total = response.data.count[0]["total"];

            this.message = response.data.message;
            this.setDownloadedData();
          } else {
            this.message = response.data.message;
          }
        });
    },

    fetchMethodName() {
      axios
        .get('http://' + this.$ddApi + "config/" + this.$route.params.id_method_list)
        .then((response) => {
          if (response.data.status === "success") {
            this.method_names = response.data.content;
            this.method_name = this.method_names[0]["method_name"];
            this.message = response.data.message;
          } else {
            this.message = response.data.message;
          }
        });
    },

    closeOverlay() {
      this.dialog = false;
      this.edit = false;
      this.init_data();
    },

    deleteStep(id_method) {
      this.dialogDelete = false;
      const params = {
        id_method_list: this.$store.state.id_method_list,
      };

      axios.put('http://' + this.$ddApi + "methods/" + id_method, params).then((response) => {
        if (response.data.status === "success") {
          this.text = "Step deleted";
          this.fetchAllMethodData();
          this.snackbar = true;
        }
      });
    },
    beforeDelete(id_method) {
      this.dialogDelete = true;
      this.deleteId = id_method;
    },

    removeLevel(id_method) {
      let currentStep = this.method_details.find(
        (x) => x.id_method === id_method
      ).step;

      if (currentStep === 0) {
        this.text = "Already the first!";
        this.snackbar = true;
      } else {
        const params = {
          id_method: id_method,
          step: currentStep,
          direction: "down",
        };

        axios
          .patch(
            'http://' + this.$ddApi + "editmethod/" + this.$route.params.id_method_list,
            params
          )
          .then((response) => {
            if (response.data.status === "success") {
              this.fetchAllMethodData();
            }
          });
      }
    },

    addLevel(id_method) {
      let currentStep = this.method_details.find(
        (x) => x.id_method === id_method
      ).step;

      if (currentStep === this.total - 1) {
        this.text = "Already the last!";
        this.snackbar = true;
      } else {
        const params = {
          id_method: id_method,
          step: currentStep,
          direction: "plus",
        };

        axios
          .patch(
            'http://' + this.$ddApi + "editmethod/" + this.$route.params.id_method_list,
            params
          )
          .then((response) => {
            if (response.data.status === "success") {
              this.fetchAllMethodData();
            }
          });
      }
    },
  },
};
</script>

<style scoped>
</style>