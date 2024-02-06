<template>
  <div>

    <v-data-table
        :headers="headers"
        :items="methods"
        sort-by="['version']"
        class="elevation-1"
        group-by="guid"
        :footer-props="{'items-per-page-options': [10, 20, 30, 40, 50]}"
        :items-per-page="30"

    >
      <template v-slot:[`group.header`]="{items, isOpen, toggle}">
        <th colspan="11">
          <v-icon @click="toggle"
          >{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
          </v-icon>
          {{ items[0].name }}
        </th>
      </template>

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
              v-model="dialogCreateMethod"
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
                          v-model="createdItem.name"
                          label="Method name"
                          aria-required="true"
                          @keydown.enter.prevent="save"
                      ></v-text-field>
                    </v-col>

                  </v-row>
                  <v-row>
                    <v-col
                        cols="12"
                    >
                      <v-textarea
                          v-model="createdItem.description"
                          label="Description"
                          aria-required="true"
                          @keydown.enter.prevent="save"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary"
                       @click="dialogCreateMethod=false"
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

          <v-snackbar v-model="snackbar.value" :color="snackbar.color" :timeout="timeout">
            {{ displayedMessage }}
          </v-snackbar>
        </v-toolbar>

      </template>

      <!-- Line custom completed -->

      <template v-slot:[`item.completed`]="{ item }">
        <v-chip
            :color="getColor(item.completed)"
            dark
        >
          <div v-if="item.completed ===false">Open</div>
          <div v-else>Completed</div>
        </v-chip>
      </template>

      <!-- Line custom name -->

      <template v-slot:[`item.name`]="{ item }">
        <v-edit-dialog
            :return-value.sync="item.name"
            large
            @save="save('name', item)"
            @cancel="cancel"
            @close="close"
        >
          {{ item.name }}
          <template v-slot:input>
            <v-text-field
                v-model="item.name"
                label="Edit"
                single-line
                counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- Line custom name -->
      <template v-slot:[`item.description`]="{ item }">
        <v-edit-dialog
            :return-value.sync="item.description"
            large
            @save="save('description',item)"
            @cancel="cancel"
            @close="close"
        >
          {{ item.description }}
          <template v-slot:input>
            <v-text-field
                v-model="item.description"
                label="Edit"
                single-line
                counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- Line custom date -->

      <template v-slot:[`item.date`]="{ item }">
        <span>{{ new Date(item.date).toLocaleString() }}</span>
      </template>

      <!-- Line custom actions -->

      <template v-slot:[`item.complete`]="{ item }">

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green"
                   small
                   v-on="on"
                   v-bind="attrs"
                   @click="completeMethod(item)">
              <v-icon small
                      color="white">
                mdi-checkbox-marked-circle-outline
              </v-icon>
            </v-btn>
          </template>
          Complete method
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
                   @click="redirectTo('ConfigAurasV2', item.id)">
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
            <v-btn color="primary"
                   small
                   v-on="on"
                   v-bind="attrs"
                   @click="redirectTo('RunAurasV2', item.id)">
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
          <v-btn color="error" @click="deleteMethodManager()">
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

  name: "IndexAurasV2",
  data: () => ({
    formTitle: 'New Method',
    oldMethodName: '',
    dialogCreateMethod: false,
    dialogDelete: false,
    loading: false,
    snackbar: {
      value: false,
      color: 'black'
    },
    timeout: 2000,
    displayedMessage: '',
    deletedMethodId: '',

    headers: [
      {text: '', align: 'start', value: '', width: '5%'},
      {text: 'Creation Date', align: 'start', value: 'date', width: '15%'},
      {text: 'Completed', value: 'completed', width: '7%'},
      {text: 'Version', value: 'version', width: '7%'},
      {text: 'Method Name', value: 'name', width: '30%'},
      {text: 'Description', value: 'description', width: '40%'},
      {text: 'Complete', value: 'complete', sortable: false, width: '5%'},
      {text: 'Duplicate', value: 'duplicate', sortable: false, width: '5%'},
      {text: 'Delete', value: 'delete', sortable: false, width: '10%'},
      {text: 'Configuration', value: 'config', sortable: false, width: '5%'},
      {text: 'Run', value: 'run', sortable: false, width: '10%'},
    ],
    methods: [],
    editedIndex: -1,

    createdMethod: {},
    duplicatedMethod: {},

    createdItem: {
      name: '',
      description: ''
    },
    defaultItem: {
      name: ''
    },
  }),


  mounted() {
    this.fetchMethods();
  },

  watch: {

    dialogCreateMethod() {
      if (this.dialogCreateMethod === false) {
        this.formTitle = 'New Method';
        this.createdItem = '';
        this.editedIndex = -1
      }
    }
  },


  methods: {

    /*--------------------------------------------------------------------------
     * Used to create a method into the database
     * -------------------------------------------------------------------------*/
    createMethod() {

      if (this.createdItem.name !== "" && typeof this.createdItem.name !== undefined) {
        this.loading = true;
        this.error = false;

        let params = {
          'Name': this.createdItem.name,
          'Description': this.createdItem.description,
          'Version': 1
        }


        axios.post(this.$aurasApiV2 + "api/Methods", params)
            .then(
                (response) => {

                  if (response.status === 201) {

                    this.displayedMessage = "Method created correctly";
                    this.snackbar.color = 'black';
                    this.createdMethod = response.data;
                    this.fetchMethods();
                    this.dialogCreateMethod = false;

                  } else {

                    this.displayedMessage = "Could not create the method";
                    this.snackbar.color = 'error';
                  }
                })

            .catch(
                (error) => {
                  if (error.response.data.status === 400) {
                    this.displayedMessage = "Method name already exists";
                    this.snackbar.color = 'error';
                  }
                });

      } else {
        this.displayedMessage = "Please enter a name";
      }

      this.loading = false;
      this.snackbar.value = true;
      this.removeFocusToAll();
    },

    /*--------------------------------------------------------------------------
     * Used to update a method into the database
     * -------------------------------------------------------------------------*/


    async checkNameExists(item) {


      await axios.put(this.$aurasApiV2 + "api/Methods/CheckIfNameExists/" + item.id, item)
          .then(
              (response) => {
                if (response.status === 200 || response.status === 201 || response.status === 204) {

                  if (response.data === false)
                    this.updateMethod(item);
                  else {
                    this.displayedMessage = "Method name already exists";
                    this.snackbar.color = 'error';
                    this.snackbar.value = true;
                  }
                }
              })
          .catch(() => {
            this.displayedMessage = "Could not rename the method";
          });


    },

    async updateMethod(item) {


      await axios.put(this.$aurasApiV2 + "api/Methods/" + item.id, item)
          .then(
              (response) => {
                if (response.status === 204) {

                  this.displayedMessage = "Method updated correctly";
                  this.snackbar.color = 'black';
                  this.dialogCreateMethod = false;

                } else {

                  this.displayedMessage = "Could not update the method";
                  this.snackbar.color = 'error';
                }
              })

          .catch(
              (error) => {
                if (error.response.data.status === 400) {
                  this.displayedMessage = "Method name already exists";
                  this.snackbar.color = 'error';
                }
              });
      this.snackbar.value = true;
    },
    /*--------------------------------------------------------------------------
     * Used to retrieve list of methods from database
     * -------------------------------------------------------------------------*/
    fetchMethods() {

      axios.get(this.$aurasApiV2 + "api/Methods")
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

    deleteMethodManager() {

      this.deleteMethod("api/Methods/deleteMethodData/", 0);

    },

    /*--------------------------------------------------------------------------
    * Delete method
    * -------------------------------------------------------------------------*/
    deleteMethod(url, index) {

      axios.delete(this.$aurasApiV2 + url + this.deletedMethodId)
          .then(
              (response) => {
                if (response.status === 204) {
                  if (index === 0)
                    this.deleteMethod("api/Methods/deleteMethodSteps/", 1);

                  if (index === 1)
                    this.deleteMethod("api/Methods/", 2);

                  else {
                    this.displayedMessage = "Method deleted correctly";
                    this.fetchMethods();
                  }
                }
              })
          .catch(
              (error) => {
                this.displayedMessage = "Error deleting method";
                console.log(error.data);
              });
      this.snackbar.value = true;
      this.dialogDelete = false;
      this.removeFocusToAll();
    },


    /*--------------------------------------------------------------------------
    * Delete method
    * -------------------------------------------------------------------------*/
    getTotalSteps(id) {

      axios.get(this.$aurasApiV2 + 'api/Methods/NumberOfSteps/' + id)
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
    completeMethod(item) {

      item.completed = true;
      this.updateMethod(item);

    },

    /*--------------------------------------------------------------------------
     * Removes focus from all items
     * -------------------------------------------------------------------------*/
    removeFocusToAll() {
      document.activeElement.blur();
    },

    duplicateMethodStep() {

      let params = {
        'MethodId': this.createdMethod.id,
      }

      axios.put(this.$aurasApiV2 + 'api/MethodSteps/duplicate/' + this.duplicatedMethod.id, params)
          .then(
              (response) => {

                if (response.status === 200) {
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
     * Duplicate data of a newly created method
     * -------------------------------------------------------------------------*/
    duplicateMethodData() {

      axios.put(this.$aurasApiV2 + 'api/Methods/duplicate/' + this.createdMethod.id, this.duplicatedMethod)
          .then(
              (response) => {
                if (response.status === 200) {
                  this.displayedMessage = "Method correctly duplicated";
                  this.snackbar.color = 'black';
                  this.fetchMethods();
                }
              })
          .catch(
              (error) => {
                this.displayedMessage = "Error deleting method";
                this.snackbar.color = 'error';
                console.log(error.data);
              });
      this.snackbar.value = true;
    },


    /*--------------------------------------------------------------------------
     * Duplicates a method with name
     * -------------------------------------------------------------------------*/
    duplicateMethod(item) {

      this.duplicatedMethod = item;

      let params = {
        'Name': item.name,
        'Description': item.description,
        'Guid': item.guid
      }


      axios.post(this.$aurasApiV2 + "api/Methods/DuplicateMethod", params)
          .then(
              (response) => {

                if (response.status === 201) {
                  this.createdMethod = response.data;
                  this.duplicateMethodStep();
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
      this.dialogCreateMethod = false
      this.$nextTick(() => {
        this.createdItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },


    open(item) {

      this.oldMethodName = item.name
    },

    /*--------------------------------------------------------------------------
     * Save and edit method
     * -------------------------------------------------------------------------*/
    save(action, item) {

      if (item !== undefined) {

        if (action === 'name') {
          this.checkNameExists(item);

          return;
        }

        this.updateMethod(item);

      } else {

        this.createMethod();
      }
      this.close();

    },
    cancel() {
    },

    /*--------------------------------------------------------------------------
     * Redirection to another page
     * -------------------------------------------------------------------------*/
    redirectTo(route, idMethod) {
      this.getTotalSteps(idMethod);
      this.$router.push({name: route, params: {idMethod: idMethod}});
    },
    getColor(completed) {
      if (completed === true) return 'green'
      else return 'orange'
    },

  }

}
</script>

<style scoped>

</style>