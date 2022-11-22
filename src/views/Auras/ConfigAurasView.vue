<template>
  <div id="home">

    <!-- Method Tables -->

    <v-card style="padding: 20px">
      <v-card-title class="justify-center">Entire method</v-card-title>
      <vue-horizontal scroll snap="end">
        <table>
          <tr>
            <td>
              <v-card>
                <v-card-title class="justify-center text-color">{{ module1Name }}</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="trayHeader"
                      :items="trayMethodData"
                      :hide-default-footer="true"
                      disable-pagination
                  />

                </v-card-text>
              </v-card>
            </td>
            <td>
              <v-card>
                <v-card-title class="justify-center text-color">
                  {{ module2Name }}
                </v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="liquidDispenserHeader"
                      :items="liquidDispenserMethodData"
                      :hide-default-footer="true"
                      disable-pagination
                  />
                </v-card-text>
              </v-card>
            </td>
            <td>
              <v-card>
                <v-card-title class="justify-center text-color" style="color: dodgerblue">
                  {{ module3Name }}
                </v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="dropDispenserHeader"
                      :items="dropDispenserMethodData"
                      :hide-default-footer="true"
                      disable-pagination
                  />

                </v-card-text>
              </v-card>
            </td>
            <td>
              <v-card>
                <v-card-title class="justify-center text-color">{{ module4Name }}</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="TLCMMHeader"
                      :items="tlcMMMethodData"
                      :hide-default-footer="true"
                      disable-pagination
                  />

                </v-card-text>
              </v-card>
            </td>
            <td>
              <v-card>
                <v-card-title class="justify-center text-color">Comment</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="moduleComment"
                      :items="moduleCommentData"
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
                        <td :colspan="headers.length" style="text-align: center; color: gray; opacity: 0.6;">No data
                          available
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


export default {
  name: 'AurasConfigView',
  components: {
    PlatFormCard,
    VueHorizontal
  },

  data: () => ({
    lineNumber: 0,

    //Modules Names
    module1Name: '',
    module2Name: '',
    module3Name: '',
    module4Name: '',

    // Modules tables
    trayHeader: [

      {text: 'Step', value: 'Step', align: 'start', width: 82, sortable: true},
      {text: 'Value1', value: 'Step1', width: 82, sortable: false},
      {text: 'Value2', value: 'Step2', width: 82, sortable: false},
      {text: 'Value3', value: 'Step3', width: 82, sortable: false},
      {text: 'Value4', value: 'Step4', width: 82, sortable: false},
    ],
    trayMethodData: [],
    trayStepData: [],

    liquidDispenserHeader: [
      {text: 'Value1', value: 'Step1', width: 82, sortable: false},
      {text: 'Value2', value: 'Step2', width: 82, sortable: false},
      {text: 'Value3', value: 'Step3', width: 82, sortable: false},
      {text: 'Value4', value: 'Step4', width: 82, sortable: false},
    ],
    liquidDispenserMethodData: [],
    liquidDispenserStepData: [],

    dropDispenserHeader: [
      {text: "S1", value: "S1", width: 82, sortable: false},
      {text: "S2", value: "S2", width: 82, sortable: false},
      {text: "S3", value: "S3", width: 82, sortable: false},
      {text: "S4", value: "S4", width: 82, sortable: false},
      {text: "S5", value: "S5", width: 82, sortable: false},
      {text: "S6", value: "S6", width: 82, sortable: false},
      {text: "S7", value: "S7", width: 82, sortable: false},
      {text: "S8", value: "S8", width: 82, sortable: false},
      {text: "Position PS1", value: "PS1P", width: 82, sortable: false},
      {text: "Speed PS1", value: "PS1S", width: 82, sortable: false},
      {text: "Position PS2", value: "PS2P", width: 82, sortable: false},
      {text: "Speed PS2", value: "PS2S", width: 82, sortable: false},
      {text: "Rotations pump", value: "PUMP1P", width: 82, sortable: false},
      {text: "Speed pump (rpm)", value: "PUMP1S", width: 82, sortable: false},
    ],
    dropDispenserMethodData: [],
    dropDispenserStepData: [],

    TLCMMHeader: [
      {text: 'Value1', value: 'Step1', width: 82, sortable: false},
      {text: 'Value2', value: 'Step2', width: 82, sortable: false},
      {text: 'Value3', value: 'Step3', width: 82, sortable: false},
      {text: 'Value4', value: 'Step4', width: 82, sortable: false},
    ],
    tlcMMMethodData: [],
    TLCMMStepData: [],


    moduleComment: [
      {text: 'Comment', value: 'Comment', width: 82, sortable: false},
    ],
    moduleCommentData: [],
  }),

  beforeMount() {

    this.loadModulesNames();
  },


  methods: {

    /*------------------------------------------------------------------------
    * Method used to add a step in the currently created method
    * ------------------------------------------------------------------------*/
    SaveLine() {

      let dropDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm1.dropDispenserStepData[0]));
      let trayStepStep = JSON.parse(JSON.stringify(this.$refs.plateForm1.trayStepData[0]));
      let tlcMMStep = JSON.parse(JSON.stringify(this.$refs.plateForm1.tlcMMStepData[0]));
      let liquidDispenserStep = JSON.parse(JSON.stringify(this.$refs.plateForm1.liquidDispenserStepData[0]));

      let comment = {Comment: this.$refs.plateForm1.comment};

      this.$data.dropDispenserMethodData.push(dropDispenserStep);
      this.$data.trayMethodData.push(trayStepStep);
      this.$data.tlcMMMethodData.push(tlcMMStep);
      this.$data.liquidDispenserMethodData.push(liquidDispenserStep);

      this.$data.moduleCommentData.push(comment);

      this.$refs.plateForm1.resetTables();

    },

    /*------------------------------------------------------------------------
    * Method used to save a method into the database
    * ------------------------------------------------------------------------*/
    SaveMethod() {
      this.$data.trayMethodData.clear();
      this.$data.liquidDispenserMethodData = [];
      this.$data.dropDispenserMethodData = [];
      this.$data.tlcMMMethodData = [];
      this.$data.moduleCommentData = [];
    },

    save() {
    },
    cancel() {
    },
    open() {
    },
    close() {
    },

    /*------------------------------------------------------------------------
    * Method used to load all modules names
    * ------------------------------------------------------------------------*/
    loadModulesNames() {

      this.module1Name = this.$store.state.module1Name;
      this.module2Name = this.$store.state.module2Name;
      this.module3Name = this.$store.state.module3Name;
      this.module4Name = this.$store.state.module4Name;
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