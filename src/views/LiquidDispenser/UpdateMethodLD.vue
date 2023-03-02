<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Edit step : {{ step }}</span>
        <v-spacer />
        <span class="headline">Method: {{ method_name }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6" sm="2" md="2" value="0">
              <v-text-field label="S1" v-model="S1"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="S2" v-model="S2"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="S3" v-model="S3"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="S4" v-model="S4"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="S5" v-model="S5"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="S6" v-model="S6"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="S7" v-model="S7"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="S8" v-model="S8"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="Position PS1" v-model="PS1P"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="Speed PS1" v-model="PS1S"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="Position PS2" v-model="PS2P"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="Speed PS2" v-model="PS2S"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                label="Rotations Pump"
                v-model="PUMP1P"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="Speed pump" v-model="PUMP1S"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2"
              >Pause
              <v-switch v-model="Pause"></v-switch>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-text-field label="Delay" v-model="Delay"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Description"
                v-model="description"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>Empty fields will be filled with a 0</small>
        <div class="blue--text">
          {{ text }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="redirect('ConfigMethod', id_method_list)"
        >
          Return
        </v-btn>
        <v-btn color="blue darken-1" text @click="sendData"> Update </v-btn>
      </v-card-actions>
    </v-card>
    <!-- <v-dialog v-model="dialogUpdate" max-width="500px">
      <v-card>
        <v-card-title class="headline">Are you sure you want to save this data?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogUpdate = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="sendData">Update</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdateMethod",

  data() {
    return {
      stepData: null,
      dialogUpdate: false,
      returnedData: [],
      wait_conditions: [],
      signal_types: [],
      operations: [],
      text: "",
      step: "",
      S1: "",
      S2: "",
      S3: "",
      S4: "",
      A5: "",
      S5: "",
      S6: "",
      S7: "",
      S8: "",
      B5: "",
      PS1P: "",
      PS1S: "",
      PS2P: "",
      PS2S: "",
      PUMP1S: "",
      PUMP1P: "",
      Pause: "",
      pauseText: "true",
      Delay: "",
      description: "",
      id_method: "",
      id_method_list: "",
      method_name: "",
    };
  },

  created() {
    this.loadData();
  },
  mounted() {
    document.title = "Update Method";
  },
  methods: {
    sendData() {
      this.pauseText = this.Pause === true ? 1 : 0;

      const params = {
        id_method: this.id_method,
        id_method_list: this.id_method_list,
        step: this.step,
        S1: this.S1,
        S2: this.S2,
        S3: this.S3,
        S4: this.S4,
        S5: this.S5,
        S6: this.S6,
        S7: this.S7,
        S8: this.S8,
        PS1P: this.PS1P,
        PS1S: this.PS1S,
        PS2P: this.PS2P,
        PS2S: this.PS2S,
        PUMP1S: this.PUMP1S,
        PUMP1P: this.PUMP1P,
        Pause: this.pauseText,
        Delay: this.Delay,
        description: this.description,
        method_name: this.method_name,
      };

      axios
        .put(this.$api + "config/" + this.id_method_list, params)
        .then((response) => {

          if (response.data.status === "success") {
            this.text = "Step modified successfully";

            setTimeout(() => {
              this.redirect("ConfigMethod", this.id_method_list);
            }, 100);
          } else {
            this.message = response.data.message;
          }
        });
    },

    loadData() {
      this.id_method = this.$route.params.id_method;
      this.id_method_list = this.$store.state.id_method_list;

      const params = {
        id_method: this.id_method,
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
            this.PUMP1S = this.stepData[0]["PUMP1S"];
            this.PUMP1P = this.stepData[0]["PUMP1P"];
            this.Pause = this.stepData[0]["Pause"];
            this.Delay = this.stepData[0]["Delay"];
            this.method_name = this.stepData[0]["method_name"];
            this.description = this.stepData[0]["description"];
            this.step = this.stepData[0]["step"];

            this.pauseText = this.stepData[0]["Pause"] === 1 ? "true" : "";
          } else {
            this.message = response.data.message;
          }
          console.log(this.stepData);
        });
    },

    redirect(name, id_method_list) {
      this.$router.push({
        name: name,
        params: { id_method_list: id_method_list },
      });
    },
  },
};
</script>

<style scoped>
</style>