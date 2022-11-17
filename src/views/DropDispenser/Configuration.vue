<template>
  <div>
    <v-container>
      <div align="right">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              class="primary"
              @click="networkDialog()"
            >
              <v-icon>mdi-wifi-settings</v-icon>
              <span className="mr-2">Network</span>
            </v-btn>
          </template>
          <span>Configure machine's network</span>
        </v-tooltip>
      </div>
      <v-dialog v-model="netDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline"> Network settings</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="esp_name"
                label="Engine"
                aria-required="true"
              ></v-text-field>
              <v-text-field
                v-model="esp_ip"
                label="IP Address"
                aria-required="true"
              ></v-text-field>
              <v-text-field
                v-model="esp32_port"
                label="Port"
                aria-required="true"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="netDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="updateNetwork()"
              >Update</v-btn
            >

            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card>
        <v-card-title> Create a method </v-card-title>
        <v-form>
          <v-text-field v-model="method_name" label="Method name" required>
          </v-text-field>
          {{ message }}
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-on="on"
                v-bind="attrs"
                color="primary"
                class="mr-4"
                @click="createMethod()"
              >
                <v-icon>mdi-open-in-new</v-icon>
                Create
              </v-btn>
            </template>
            <span>Create new method</span>
          </v-tooltip>

          <div v-if="loading === true">
            <v-progress-circular
              :size="30"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>

          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
          </v-snackbar>
        </v-form>
      </v-card>
    </v-container>

    <v-container>
      <v-card>
        <v-card-title> Edit a method </v-card-title>
        <v-data-table
          dense
          :headers="headers"
          :items="methods"
          item-key="id_method_name"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <div class="d-flex justify-space-around mb-0 col-lg-8">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green" v-on="on" v-bind="attrs">
                    <v-icon
                      color="white"
                      @click="SetMethodRename(item.id_method_list)"
                    >
                      mdi-rename-box
                    </v-icon>
                  </v-btn>
                </template>
                <span>Rename</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="blue-grey" v-on="on" v-bind="attrs">
                    <v-icon
                      color="white"
                      @click="Duplicate(item.id_method_list)"
                    >
                      mdi-content-duplicate
                    </v-icon>
                  </v-btn>
                </template>
                <span>Duplicate</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" v-on="on" v-bind="attrs">
                    <v-icon
                      color="White"
                      @click="Redirect('ConfigMethod', item.id_method_list)"
                    >
                      mdi-table-edit
                    </v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="red" v-on="on" v-bind="attrs">
                    <v-icon
                      color="white"
                      @click="DeleteConfirmation(item.id_method_list)"
                      >mdi-delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <v-dialog v-model="updateName" max-width="800px">
      <v-card>
        <v-card-title class="headline">Please enter a new name</v-card-title>
        <v-text-field
          v-model="method_name"
          style="margin: 20px"
          label="Method name"
          required
        ></v-text-field>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="updateName = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="RenameMethod()">
            Rename
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="800px">
      <v-card>
        <v-card-title class="headline"
          >Please confirm the deletion</v-card-title
        >
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="DeleteMethod()">
            Delete
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Configuration",
  components: {},
  data() {
    return {
      netDialog: false,
      dialogDelete: false,
      updateName: false,
      snackbar: false,
      deletedId: "",
      text: "",
      esp_name: "",
      esp_ip: "",
      esp32_port: "",
      timeout: 2000,
      method_name: "",
      selectedMethodId: "",
      method_id: "",
      token: null,
      loading: false,
      message: "",
      methods: [],
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

    this.esp_name = this.$store.state.esp32_name;
    this.esp_ip = this.$store.state.esp32_Ip;
    this.esp32_port = this.$store.state.esp32_port;
    this.loadESPNetwork();
    console.log(this.$store.state.esp32_Ip);
  },
  mounted() {
    document.title = "Create Method";
  },

  methods: {
    networkDialog() {
      this.netDialog = true;
      this.loadESPNetwork();
    },
    updateNetwork() {
      const params = {
        network_name: this.esp_name,
        IP: this.esp_ip,
        port: this.esp32_port,
      };
      axios.put(this.$api + "network/1", params).then((response) => {
        if (response.data.status === "success") {
          this.text = "Successfully updated";
          this.loadESPNetwork();
          setTimeout(() => {
            this.text = "";
            this.netDialog = false;
          }, 1000);
        }
      });
    },

    loadESPNetwork() {
      axios.get(this.$api + "network/1").then((response) => {
        if (response.data.status === "success") {
          this.esp32 = response.data.content;
          this.$store.state.esp32_Ip = this.esp32[0]["IP"];
          this.$store.state.esp32_name = this.esp32[0]["network_name"];
          this.$store.state.esp32_port = this.esp32[0]["port"];
        }
      });
    },
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

    fetchMethods() {
      axios.get(this.$api + "methods").then((response) => {
        if (response.data.status === "success") {
          this.methods = response.data.content;
        } else {
          this.message = response.data.message;
        }
      });
    },

    DeleteConfirmation(id_method_list) {
      this.dialogDelete = true;
      this.deletedId = id_method_list;
    },

    DeleteMethod() {
      this.loading = true;
      axios.delete(this.$api + "methods/" + this.deletedId).then((response) => {
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

    SetMethodRename(id_method_list) {
      this.selectedMethodId = id_method_list;
      this.updateName = true;
    },

    Duplicate(id_method_list) {
      axios.get(this.$api + "editmethod/" + id_method_list).then((response) => {
        if (response.data.status === "success") {
          this.text = "Successfully updated";
          this.snackbar = true;
          this.fetchMethods();
        } else {
          this.text = "Couldn't duplicate method";
          this.loading = false;
          this.snackbar = true;
        }
      });
    },

    RenameMethod() {
      this.loading = true;
      if (this.method_name !== "" && typeof this.method_name !== undefined) {
        const params = {
          method_name: this.method_name,
        };

        axios
          .put(this.$api + "editmethod/" + this.selectedMethodId, params)
          .then((response) => {
            if (response.data.status === "success") {
              this.text = "Successfully updated";
              this.loading = false;
              this.snackbar = true;
              this.fetchMethods();
              setTimeout(() => {
                this.text = "";
                this.method_name = "";
                this.updateName = false;
              }, 1000);
            } else {
              this.text = "Couldn't create method";
              this.loading = false;
              this.snackbar = true;
              this.method_name = "";
            }
          });
      } else {
        this.text = "Please enter a name";
        this.loading = false;
        this.snackbar = true;
      }
    },

    Redirect(route, id) {
      this.$router.push({ name: route, params: { id_method_list: id } });
    },
  },
};
</script>

<style scoped>
</style>