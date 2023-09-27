<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="methods"
        sort-by="calories"
        class="elevation-1"
    >
      <!-- Table header-->

      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-spacer/>
          <v-toolbar-title><h2>Auras: list of all methods</h2></v-toolbar-title>
          <v-spacer/>

          <!-- Create Method Dialog-->

          <v-dialog
              v-model="dialogRename"
              max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
              >
                New Method
              </v-btn>
            </template>

            <!-- Create method form -->

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.name"
                          label="Method name"
                          aria-required="true"
                      ></v-text-field>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary"
                       @click="dialogRename=false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    @click="save"
                >
                  Save
                </v-btn>

                <!-- Waiting progress -->

                <div v-if="loading === true">
                  <v-progress-circular
                      :size="30"
                      color="primary"
                      indeterminate
                  />
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Message banner -->

          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ displayedMessage }}
          </v-snackbar>
        </v-toolbar>

      </template>

      <!-- Line custom date -->

      <template v-slot:[`item.date`]="{ item }">
        <span>{{ new Date(item.date).toLocaleString() }}</span>
      </template>

      <!-- Line custom actions -->

      <template v-slot:[`item.rename`]="{ item }">

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary"
                   small
                   v-on="on"
                   v-bind="attrs"
                   @click="renameMethod(item)">
              <v-icon small class="mr-2">
                mdi-form-textbox
              </v-icon>
            </v-btn>
          </template>
          Rename method
        </v-tooltip>

      </template>

      <template v-slot:[`item.delete`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="error"
                   small
                   v-on="on"
                   v-bind="attrs"
                   @click="deleteConfirmation(item.id)"
            >
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          Delete method
        </v-tooltip>
      </template>

      <template v-slot:[`item.duplicate`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="blue-grey"
                   small
                   v-on="on"
                   v-bind="attrs"
                   @click="duplicateMethod(item)">
              <v-icon color="white" small>
                mdi-content-duplicate
              </v-icon>
            </v-btn>
          </template>
          Duplicate Method
        </v-tooltip>
      </template>

      <template v-slot:[`item.config`]="{ item }">

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#f29633"
                   small
                   v-on="on"
                   v-bind="attrs"
                   @click="redirectTo('ConfigAuras', item.id)">
              <v-icon small>
                mdi-cog-outline
              </v-icon>
            </v-btn>
          </template>
          Edit method
        </v-tooltip>
      </template>

      <template v-slot:[`item.run`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success"
                   small
                   v-on="on"
                   v-bind="attrs"
                   @click="redirectTo('RunAuras', item.id)">
              <v-icon small>
                mdi-play-circle-outline
              </v-icon>
            </v-btn>
          </template>
          Run method
        </v-tooltip>
      </template>

    </v-data-table>

    <!--    Delete confirmation dialog-->

    <v-dialog v-model="dialogDelete" max-width="800px">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="secondary" @click="dialogDelete = false">
            Cancel
          </v-btn>
          <v-btn color="error" @click="deleteMethod()">
            Delete
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "IndexAuras",
  data: () => ({

    dialogRename: false,
    dialogDelete: false,
    loading: false,
    snackbar: false,
    timeout: 2000,
    displayedMessage: '',
    deletedMethodId: '',

    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: true,
        value: 'id',
        width: '5%'
      },
      {text: 'Creation Date', value: 'date', width: '15%'},
      {text: 'Method Name', value: 'name', width: '40%'},
      {text: 'Rename', value: 'rename', sortable: false, width: '5%'},
      {text: 'Duplicate', value: 'duplicate', sortable: false, width: '5%'},
      {text: 'Delete', value: 'delete', sortable: false, width: '10%'},
      {text: 'Configuration', value: 'config', sortable: false, width: '5%'},
      {text: 'Run', value: 'run', sortable: false, width: '10%'},
    ],
    methods: [],
    editedIndex: -1,

    createdMethod: {},
    duplicatedMethod: {},

    editedItem: {
      name: ''
    },
    defaultItem: {
      name: ''
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Method' : 'Rename Method'
    },
  },

  mounted() {
    this.fetchMethods();
  },


  methods: {

    /*--------------------------------------------------------------------------
     * Used to create a method into the database
     * -------------------------------------------------------------------------*/
    createMethod() {

      if (this.editedItem.name !== "" && typeof this.editedItem.name !== undefined) {
        this.loading = true;
        this.error = false;

        let params = {
          'Name': this.editedItem.name
        }


        axios.post(this.$aurasApi + "api/Methods", params)
            .then(
                (response) => {

                  if (response.status === 201) {

                    this.displayedMessage = "Method created correctly";
                    this.createdMethod = response.data;
                    this.fetchMethods();
                    this.dialogRename = false;

                  } else {

                    this.displayedMessage = "Could not create the method";
                  }
                })

            .catch(
                (error) => {
                  if (error.response.data.status === 400) {
                    this.displayedMessage = "Method name already exists";
                  }
                });

      } else {
        this.displayedMessage = "Please enter a name";
      }

      this.loading = false;
      this.snackbar = true;
      this.removeFocusToAll();
    },

    /*--------------------------------------------------------------------------
     * Used to update a method into the database
     * -------------------------------------------------------------------------*/
    updateMethod(item) {

      axios.put(this.$aurasApi + "api/Methods/" + item.id, item)
          .then(
              (response) => {
                if (response.status === 204) {

                  this.displayedMessage = "Method updated correctly";
                  this.dialogRename = false;

                } else {

                  this.displayedMessage = "Could not create the method";
                }
              })

          .catch(
              (error) => {
                console.log(error.response.data);
              })
      this.snackbar = true;
    },
    /*--------------------------------------------------------------------------
     * Used to create a method into the database
     * -------------------------------------------------------------------------*/
    fetchMethods() {

      axios.get(this.$aurasApi + "api/Methods")
          .then(
              (response) => {
                if (response.status === 200) {
                  this.methods = response.data;
                }
              })
          .catch(
              (error) => {
                console.log(error.data)
              });
    },


    /*--------------------------------------------------------------------------
    * Delete method
    * -------------------------------------------------------------------------*/
    deleteMethod() {

      axios.delete(this.$aurasApi + 'api/Methods/' + this.deletedMethodId)
          .then(
              (response) => {
                if (response.status === 204) {
                  this.displayedMessage = "Method deleted correctly";
                  this.fetchMethods();
                }
              })
          .catch(
              (error) => {
                this.displayedMessage = "Error deleting method";
                console.log(error.data);
              });
      this.snackbar = true;
      this.dialogDelete = false;
      this.removeFocusToAll();
    },

    /*--------------------------------------------------------------------------
    * Delete method
    * -------------------------------------------------------------------------*/
    getTotalSteps(id) {

      axios.get(this.$aurasApi + 'api/Methods/NumberOfSteps/' + id)
          .then(
              (response) => {
                if (response.status === 200) {
                  this.$store.state.totalOfSteps = response.data;
                }
              })

    },


    /*--------------------------------------------------------------------------
     * Delete confirmation
     * -------------------------------------------------------------------------*/
    deleteConfirmation(idMethod) {
      this.dialogDelete = true;
      this.deletedMethodId = idMethod;
    },

    /*--------------------------------------------------------------------------
     * Edit Method name
     * -------------------------------------------------------------------------*/
    renameMethod(item) {
      this.editedIndex = this.methods.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogRename = true
      this.removeFocusToAll();

    },

    /*--------------------------------------------------------------------------
     * Removes focus from all items
     * -------------------------------------------------------------------------*/
    removeFocusToAll() {
      document.activeElement.blur();
    },

    /*--------------------------------------------------------------------------
     * Duplicate data of a newly created method
     * -------------------------------------------------------------------------*/
    duplicateMethodData() {

      axios.put(this.$aurasApi + 'api/Methods/duplicate/' + this.createdMethod.id, this.duplicatedMethod)
          .then(
              (response) => {
                if (response.status === 200) {
                  this.displayedMessage = "Method correctly duplicated";
                  this.fetchMethods();
                }
              })
          .catch(
              (error) => {
                this.displayedMessage = "Error deleting method";
                console.log(error.data);
              });
      this.snackbar = true;
    },


    /*--------------------------------------------------------------------------
     * Duplicates a method with name
     * -------------------------------------------------------------------------*/
    duplicateMethod(item) {

      this.duplicatedMethod = item;
      let params = {
        'Name': item.name + '_duplicated'
      }

      axios.post(this.$aurasApi + "api/Methods", params)
          .then(
              (response) => {

                if (response.status === 201) {
                  this.createdMethod = response.data;
                  this.duplicateMethodData();
                }
              })

          .catch(
              (error) => {
                if (error.response.data.status === 400) {
                  this.displayedMessage = "Sorry could not duplicate method";
                }
              });


    },
    /*--------------------------------------------------------------------------
     * Close dialog and reset editedItem
     * -------------------------------------------------------------------------*/
    close() {
      this.dialogRename = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    /*--------------------------------------------------------------------------
     * Save and edit method
     * -------------------------------------------------------------------------*/
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.methods[this.editedIndex], this.editedItem);
        this.updateMethod(this.editedItem);
      } else {

        this.createMethod();
      }
      this.close()
    },


    /*--------------------------------------------------------------------------
     * Redirection to another page
     * -------------------------------------------------------------------------*/
    redirectTo(route, idMethod) {
      this.getTotalSteps(idMethod);
      this.$router.push({name: route, params: {idMethod: idMethod}});
    }


  }

}
</script>

<style scoped>

</style>