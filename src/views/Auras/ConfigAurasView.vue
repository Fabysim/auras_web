<template>
  <div class="home">
    <!-- Tables -->

    <v-card>
      <vue-horizontal scroll class="horizontal">
        <table>
          <tr>
            <td>
              <v-card>
                <v-card-title class="justify-center text-color">{{ module1Name }}</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="module1"
                      :items="module1Data"
                      :hide-default-footer="true"
                  />

                </v-card-text>
              </v-card>
            </td>
            <td>
              <v-card>
                <v-card-title class="justify-center text-color">{{ module2Name }}</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="module2"
                      :items="module2Data"
                      :hide-default-footer="true"
                  />
                </v-card-text>
              </v-card>
            </td>
            <td>
              <v-card>
                <v-card-title class="justify-center text-color" style="color: dodgerblue">{{
                    module3Name
                  }}
                </v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="module3"
                      :items="module3Data"
                      :hide-default-footer="true"
                  />

                </v-card-text>
              </v-card>
            </td>
            <td>
              <v-card>
                <v-card-title class="justify-center text-color">{{ module4Name }}</v-card-title>
                <v-card-text>
                  <v-data-table
                      :headers="module4"
                      :items="module4Data"
                      :hide-default-footer="true"
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
                        <td :colspan="headers.length" style="text-align: center; color: gray; opacity: 0.6;">No data available</td>
                      </tr>
                      </tbody>
                    </template>

                  </v-data-table>

                </v-card-text>
              </v-card>
            </td>
            <td style="padding-left: 50px">
              <v-btn style="background-color: dodgerblue; color: white;"
                     @click="SaveMethod">
                Save Method
              </v-btn>
            </td>
          </tr>
        </table>
      </vue-horizontal>
    </v-card>

    <v-btn color="primary"
           @click="SaveLine">
      Save step
    </v-btn>

    <!-- PlatForms -->
    <vue-horizontal responsive snap="end" class="platforms">
      <table>
        <tr>
          <td>
            <PlatFormCard v-bind:name="module1Name" ref="plateForm1"/>
          </td>
          <td>
            <PlatFormCard v-bind:name="module2Name" ref="plateForm2"/>
          </td>
          <td>
            <PlatFormCard v-bind:name="module3Name" ref="plateForm3"/>
          </td>
          <td>
            <PlatFormCard v-bind:name="module4Name" ref="plateForm4"/>
          </td>
        </tr>
      </table>
    </vue-horizontal>
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
    module1Name: 'Tray',
    module2Name: 'Liquid Dispenser',
    module3Name: 'Drop Dispenser',
    module4Name: 'TLC Migration Module',

    module1: [

      {text: 'Step', value: 'Step', align: 'start', width: 82},
      {text: 'Value1', value: 'Step1', width: 82},
      {text: 'Value2', value: 'Step2', width: 82},
      {text: 'Value3', value: 'Step3', width: 82},
      {text: 'Value4', value: 'Step4', width: 82},
    ],
    module1Data: [],
    module2: [
      {text: 'Value1', value: 'Step1', width: 82},
      {text: 'Value2', value: 'Step2', width: 82},
      {text: 'Value3', value: 'Step3', width: 82},
      {text: 'Value4', value: 'Step4', width: 82},
    ],
    module2Data: [],
    module3: [
      {text: 'Value1', value: 'Step1', width: 82},
      {text: 'Value2', value: 'Step2', width: 82},
      {text: 'Value3', value: 'Step3', width: 82},
      {text: 'Value4', value: 'Step4', width: 82},
    ],
    module3Data: [],
    module4: [
      {text: 'Value1', value: 'Step1', width: 82},
      {text: 'Value2', value: 'Step2', width: 82},
      {text: 'Value3', value: 'Step3', width: 82},
      {text: 'Value4', value: 'Step4', width: 82},
    ],
    module4Data: [],
    moduleComment: [
      {text: 'Comment', value: 'Comment', width: 82},
    ],
    moduleCommentData: [],
  }),

  methods: {
    SaveLine() {

      let copy1 = JSON.parse(JSON.stringify(this.$refs.plateForm1.moduleData[0]));
      let copy2 = JSON.parse(JSON.stringify(this.$refs.plateForm2.moduleData[0]));
      let copy3 = JSON.parse(JSON.stringify(this.$refs.plateForm3.moduleData[0]));
      let copy4 = JSON.parse(JSON.stringify(this.$refs.plateForm4.moduleData[0]));
      let comment = {Comment: ''};

      copy1['Step'] = this.lineNumber++;
      copy2['Step'] = this.lineNumber++;
      copy3['Step'] = this.lineNumber++;
      copy4['Step'] = this.lineNumber++;

      this.$data.module1Data.push(copy1);
      this.$data.module2Data.push(copy2);
      this.$data.module3Data.push(copy3);
      this.$data.module4Data.push(copy4);
      this.$data.moduleCommentData.push(comment);

    },
    SaveMethod() {
      this.$data.module1Data = [];
      this.$data.module2Data = [];
      this.$data.module3Data = [];
      this.$data.module4Data = [];

      console.log(this.$data.moduleCommentData);
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


  }
}
</script>


<style scoped>
.platforms {
  height: 768px;
  margin: 25px;
}

.text-color {
  color: dodgerblue;
}

.horizontal >>> .v-hl-btn svg {
  margin-left: 60px;

}

</style>