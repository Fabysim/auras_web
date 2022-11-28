<template>
  <div id="home">

    <!-- Modules' tables -->

    <v-card style="padding: 20px">
      <v-card-title class="justify-center">
        Method: {{ currentMethod.name }}
        <v-spacer/>

        <download-excel :data="downloadedData" :name="currentMethod.name + '.xls'">
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
        <v-spacer/>
        <v-btn color="#9e42f5"
               @click="redirectTo('IndexAuras')"
        >
          All Methods
        </v-btn>


      </v-card-title>
      <vue-horizontal scroll snap="end">
        <table>
          <tr>
            <!--Tray module-->

            <td>
              <v-card>
                <v-card-title class="justify-center text-color">{{ trayModule.name }}</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="trayModule.columns"
                      :items="trayModule.data"
                      :hide-default-footer="true"
                      disable-pagination
                  />

                </v-card-text>
              </v-card>
            </td>

            <!--Liquid dispenser module-->

            <td>
              <v-card>
                <v-card-title class="justify-center text-color">
                  {{ liquidDispenserModule.name }}
                </v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="liquidDispenserModule.columns"
                      :items="liquidDispenserModule.data"
                      :hide-default-footer="true"
                      disable-pagination
                  />
                </v-card-text>
              </v-card>
            </td>

            <!--Drop dispenser module-->

            <td>
              <v-card>
                <v-card-title class="justify-center text-color" style="color: dodgerblue">
                  {{ dropDispenserModule.name }}
                </v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="dropDispenserModule.columns"
                      :items="dropDispenserModule.data"
                      :hide-default-footer="true"
                      disable-pagination
                  />

                </v-card-text>
              </v-card>
            </td>

            <!--TLC Module-->

            <td>
              <v-card>
                <v-card-title class="justify-center text-color">{{ tlcMigrationModule.name }}</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="tlcMigrationModule.columns"
                      :items="tlcMigrationModule.data"
                      :hide-default-footer="true"
                      disable-pagination
                  />

                </v-card-text>
              </v-card>
            </td>

            <!--PH Meter Module-->

            <td>
              <v-card>
                <v-card-title class="justify-center text-color">{{ phMeterModule.name }}</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="phMeterModule.columns"
                      :items="phMeterModule.data"
                      :hide-default-footer="true"
                      disable-pagination
                  />

                </v-card-text>
              </v-card>
            </td>

            <!--Comments-->

            <td>
              <v-card>
                <v-card-title class="justify-center text-color">Comment</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="commentModule.columns"
                      :items="commentModule.data"
                      :hide-default-footer="true"
                      disable-pagination
                  >
                    <template v-slot:body="{ items, headers }">
                      <tbody v-if="items.length > 0">
                      <tr v-for="(item,idx) in items" :key="idx">
                        <td v-for="(header,key) in headers" :key="key">
                          <v-edit-dialog
                              :return-value.sync="item[header.value]"
                              @save="save"
                              @cancel="cancel"
                              @open="open"
                              @close="close"

                          > {{ item[header.value] }}
                            <template v-slot:input>
                              <v-text-field
                                  v-model="item[header.value]"
                                  label="Edit"
                                  single-line
                              ></v-text-field>
                            </template>
                          </v-edit-dialog>
                        </td>
                      </tr>
                      </tbody>
                      <tbody v-else>
                      <tr>
                        <td :colspan="headers.length" style="text-align: center; color: gray; opacity: 0.6;">
                          No data available
                        </td>
                      </tr>
                      </tbody>
                    </template>

                  </v-data-table>

                </v-card-text>
              </v-card>
            </td>

          </tr>
        </table>
      </vue-horizontal>
      <v-card-actions class="justify-center">
        <v-btn style="background-color: dodgerblue; color: white;"
               @click="SaveMethod">
          Save Method
        </v-btn>
      </v-card-actions>

    </v-card>

    <!-- PlatForms -->
    <PlatFormCard @lineSaved="SaveLine" ref="plateForm1"/>

  </div>
</template>

<script>
// @ is an alias to /src
import PlatFormCard from '@/components/PlatformCard.vue'
import VueHorizontal from 'vue-horizontal'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import axios from "axios";


export default {
  name: 'AurasConfigView',
  components: {
    PlatFormCard,
    VueHorizontal
  },

  data: () => ({

    lineNumber: 0,
    downloadedData: [],
    currentMethod: '',
    currentStep: 0,

    trayModule: {
      name: '',
      columns: [
        {text: 'Step', value: 'Step', align: 'start', width: 82, sortable: true},
        {text: 'Value1', value: 'Step1', width: 82, sortable: false},
        {text: 'Value2', value: 'Step2', width: 82, sortable: false},
        {text: 'Value3', value: 'Step3', width: 82, sortable: false},
        {text: 'Value4', value: 'Step4', width: 82, sortable: false},
      ],
      data: []
    },

    liquidDispenserModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Step1', width: 82, sortable: false},
        {text: 'Value2', value: 'Step2', width: 82, sortable: false},
        {text: 'Value3', value: 'Step3', width: 82, sortable: false},
        {text: 'Value4', value: 'Step4', width: 82, sortable: false},
      ],
      data: []
    },

    dropDispenserModule: {
      name: '',
      columns: [
        {text: "S1", value: "S1", width: 82, sortable: false},
        {text: "S2", value: "S2", width: 82, sortable: false},
        {text: "S3", value: "S3", width: 82, sortable: false},
        {text: "S4", value: "S4", width: 82, sortable: false},
        {text: "S5", value: "S5", width: 82, sortable: false},
        {text: "S6", value: "S6", width: 82, sortable: false},
        {text: "S7", value: "S7", width: 82, sortable: false},
        {text: "S8", value: "S8", width: 82, sortable: false},
        {text: "PS1 Target", value: "PS1P", width: 82, sortable: false},
        {text: "PS1 Speed", value: "PS1S", width: 82, sortable: false},
        {text: "PS2 Target", value: "PS2P", width: 82, sortable: false},
        {text: "PS2 Speed", value: "PS2S", width: 100, sortable: false},
        {text: "Rotations pump", value: "PUMP1P", width: 82, sortable: false},
        {text: "Speed pump (rpm)", value: "PUMP1S", width: 82, sortable: false},
      ],
      data: []
    },

    tlcMigrationModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Step1', width: 82, sortable: false},
        {text: 'Value2', value: 'Step2', width: 82, sortable: false},
        {text: 'Value3', value: 'Step3', width: 82, sortable: false},
        {text: 'Value4', value: 'Step4', width: 82, sortable: false},
      ],
      data: []
    },

    phMeterModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Step1', width: 82, sortable: false},
        {text: 'Value2', value: 'Step2', width: 82, sortable: false},
        {text: 'Value3', value: 'Step3', width: 82, sortable: false},
        {text: 'Value4', value: 'Step4', width: 82, sortable: false},
      ],
      data: []
    },

    commentModule: {
      name: '',
      columns: [
        {text: 'Comment', value: 'Comment', width: 82, sortable: false},
      ],
      data: []
    },

    GinaModule: {
      name: '',
      columns: [
        {text: 'Comment', value: 'Comment', width: 82, sortable: false},
      ],
      data: []
    },

  }),

  mounted() {
    this.loadModulesNames();
    this.fetchMethodName();

  },


  methods: {

    /*------------------------------------------------------------------------
    * Method used to add a step in the currently created method
    * ------------------------------------------------------------------------*/
    SaveLine() {

      this.saveDropDispenserStep();
      this.saveTrayStep();
      this.saveLiquidDispenserStep();
      this.saveTlcMigrationStep();
      this.savePhMeterStep();
      this.saveCommentsStep();

      this.$refs.plateForm1.resetTables();

    },


    /*------------------------------------------------------------------------
    * Method used to extract Tray step data
    * ------------------------------------------------------------------------*/
    saveCommentsStep() {

      let comment = {Comment: this.$refs.plateForm1.comment};
      this.$data.commentModule.data.push(comment);
    },
    /*------------------------------------------------------------------------
    * Method used to extract phMeterModule step data
    * ------------------------------------------------------------------------*/
    savePhMeterStep() {
      let phMeterStep = JSON.parse(JSON.stringify(this.$refs.plateForm1.phMeterModule.data[0]));
      this.$data.phMeterModule.data.push(phMeterStep);

    },
    /*------------------------------------------------------------------------
    * Method used to extract liquidDispenserModule step data
    * ------------------------------------------------------------------------*/
    saveLiquidDispenserStep() {

      let liquidDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm1.liquidDispenserModule.data[0]));
      this.$data.liquidDispenserModule.data.push(liquidDispenserStep);
    },
    /*------------------------------------------------------------------------
    * Method used to extract tlcModule step data
    * ------------------------------------------------------------------------*/
    saveTlcMigrationStep() {
      let tlcMMStep = JSON.parse(JSON.stringify(this.$refs.plateForm1.tlcModule.data[0]));
      this.$data.tlcMigrationModule.data.push(tlcMMStep);
    },
    /*------------------------------------------------------------------------
    * Method used to extract trayModule step data
    * ------------------------------------------------------------------------*/
    saveTrayStep() {

      let trayStepStep = JSON.parse(JSON.stringify(this.$refs.plateForm1.trayModule.data[0]));

    /*  let step ={
        'Step': JSON.parse(JSON.stringify(this.currentStep))
      }*/

     console.log(trayStepStep)
      this.$data.trayModule.data.push(trayStepStep);

      this.currentStep++;
    },
    /*------------------------------------------------------------------------
    * Method used to extract dropDispenserModule step data
    * ------------------------------------------------------------------------*/
    saveDropDispenserStep() {

      let dropDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm1.dropDispenserModule.data[0]));

      if (this.$refs.plateForm1.PSElement.PS1Position === true)
        dropDispenserStep.PS1P = JSON.parse(JSON.stringify(this.$refs.plateForm1.PSElement.PS1PositionValue));
      else
        dropDispenserStep.PS1P = JSON.parse(JSON.stringify(this.$refs.plateForm1.PSElement.PS1StopContractor));

      if (this.$refs.plateForm1.PSElement.PS2Position === true)
        dropDispenserStep.PS2P = JSON.parse(JSON.stringify(this.$refs.plateForm1.PSElement.PS2PositionValue));
      else
        dropDispenserStep.PS2P = JSON.parse(JSON.stringify(this.$refs.plateForm1.PSElement.PS2StopContractor));

      this.$data.dropDispenserModule.data.push(dropDispenserStep);
    },

    /*------------------------------------------------------------------------
    * Method used to save a method into the database
    * ------------------------------------------------------------------------*/
    SaveMethod() {
      this.$data.trayModule.data = [];
      this.$data.liquidDispenserModule.data = [];
      this.$data.dropDispenserModule.data = [];
      this.$data.tlcMigrationModule.data = [];
      this.$data.commentModule.data = [];
    },

    save() {
    },
    cancel() {
    },
    open() {
    },
    close() {
    },

    fetchMethodName() {

      axios
          .get('http://' + this.$aurasApi + 'api/Methods/' + this.$route.params.idMethod)
          .then((response) => {
            if (response.status === 200) {
              this.currentMethod = response.data;
            } else {
              this.message = response.data.message;
            }
          });
    },
    /*------------------------------------------------------------------------
    * Method used to load all modules names
    * ------------------------------------------------------------------------*/
    loadModulesNames() {

      this.trayModule.name = this.$store.state.trayModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.tlcMigrationModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
    },
    /*--------------------------------------------------------------------------
      *  Redirection to another page
      * -------------------------------------------------------------------------*/
    redirectTo(route) {
      this.$router.push({name: route});
    }

  }
}
</script>


<style scoped>


.text-color {
  color: dodgerblue;
}

.horizontal >>> .v-hl-btn svg {
  margin-left: 60px;

}

</style>