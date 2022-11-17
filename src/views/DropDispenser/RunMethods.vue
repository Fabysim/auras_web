
<template>
  <div>
    <v-container> </v-container>
    <v-container>
      <v-card>
        <v-card-title> Choose a method to run </v-card-title>
        <v-data-table
          dense
          :headers="headers"
          :items="methodsList"
          item-key="id_method_name"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  v-on="on"
                  v-bind="attrs"
                  min-width="80"
                  class="white--text"
                  color="primary"
                  @click="redirect('ViewMethod', item.id_method_list)"
                >
                <v-icon>mdi-power</v-icon>
                  Start
                </v-btn>
              </template>
              <span>Run this method</span>
            </v-tooltip>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogDelete = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteMethod(item.id_method_list)"
                    >Delete</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RunMethod",
  components: {},

  /*---------------------- All variables ----------------------------*/

  data() {
    return {
      dialogDelete: false,
      snackbar: false,
      text: "",
      esp8266: [],
      timeout: 1500,
      method_name: "",
      method_id: "",
      token: null,
      loading: false,
      message: "",
      methodsList: [],
      error: false,
      headers: [
        {
          text: "Date",
          align: "start",
          sortable: true,
          value: "creation_date",
        },
        { text: "Method name", sortable: true, value: "method_name" },
        { text: "ID", value: "id_method_list" },
        { text: " ", value: "actions" },
      ],
    };
  },
  created() {
    this.fetchMethods();
    this.loadESP8266Network();
  },
  mounted() {
    document.title = "List of Methods to run";
  },
  methods: {
    /*---------------------- Retrieves node MCU's IP and port from database ----------------------------*/

    loadESP8266Network() {
      axios.get(this.$api + "network/1").then((response) => {
        if (response.data.status === "success") {
          this.esp8266 = response.data.content;
          this.$store.state.esp8266_Ip = this.esp8266[0]["IP"];
          this.$store.state.esp8266_name = this.esp8266[0]["network_name"];
          this.$store.state.esp8266_port = this.esp8266[0]["port"];
        }
      });
    },

    /*---------------------- Creates a method in the database ----------------------------*/

    createMethod() {
      if (this.method_name !== "" && typeof this.method_name !== undefined) {
        this.loading = true;
        this.error = false;

        const params = new URLSearchParams();
        params.append("method_name", this.method_name);

        axios.post(this.$api + "methods", params).then((response) => {
          if (response.data.status === "success") {
            this.text = "Method created correctly";
            this.loading = false;
            this.snackbar = true;
            this.fetchMethods();
          } else {
            this.text = "Couldn't create method";
            this.loading = false;
            this.snackbar = true;
          }
        });
      } else {
        this.text = "Please enter a name";
        this.loading = false;
        this.snackbar = true;
      }
    },

    /*---------------------- Retrieves the list of all methods ----------------------------*/

    fetchMethods() {
      axios.get(this.$api + "methods").then((response) => {
        if (response.data.status === "success") {
          this.methodsList = response.data.content;
        } else {
          this.message = response.data.message;
        }
      });
    },

    /*----------------------------------------------------------------------------------------------------------
     * Deletes a method: id given in parameters
     *                        Parameters : id of the method
     * --------------------------------------------------------------------------------------------------------*/
    deleteMethod(id_method_list) {
      this.loading = true;
      axios.delete(this.$api + "methods/" + id_method_list).then((response) => {
        if (response.data.status === "success") {
          this.loading = false;
          this.text = "Method deleted";
          this.dialogDelete = false;
          this.snackbar = true;
          this.fetchMethods();
        } else {
          this.message = response.data.message;
        }
      });
    },

    /*----------------------------------------------------------------------------------------------------------
     *  Redirects towards another page
     *  Parameters : route = route's name
     *               id = id of the method
     * --------------------------------------------------------------------------------------------------------*/
    redirect(route, id) {
      this.$router.push({ name: route, params: { id_method_list: id } });
    },
  },
};
</script>

<style scoped>
</style>