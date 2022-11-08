<template>
  <div class="home">
    <!-- Tables -->
    <v-card>
      <table>
        <tr>
          <td>
            <v-card>
              <v-card-title>Module 1</v-card-title>
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
              <v-card-title>Module 2</v-card-title>
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
              <v-card-title>Module 3</v-card-title>
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
              <v-card-title>Module 4</v-card-title>
              <v-card-text>
                <v-data-table
                    :headers="module4"
                    :items="module4Data"
                    :hide-default-footer="true"
                />

              </v-card-text>
            </v-card>
          </td>
          <td style="padding-left: 50px">
            <v-btn style="background-color: dodgerblue; color: white"
                   @click="SaveMethod">
              Save Method
            </v-btn>
          </td>
        </tr>
      </table>
    </v-card>


    <v-btn style="background-color: dodgerblue; color: white"
           @click="SaveLine">
      Save step
    </v-btn>

    <!-- PlatForms -->
    <horizontal-scroll onwheel="null" class="platforms">
      <table>
        <tr>
          <td>
            <PlatForm ref="plateForm1"/>
          </td>
          <td>
            <PlatForm ref="plateForm2"/>
          </td>
          <td>
            <PlatForm ref="plateForm3"/>
          </td>
          <td>
            <PlatForm ref="plateForm4"/>
          </td>
        </tr>
      </table>
    </horizontal-scroll>
  </div>
</template>

<script>
// @ is an alias to /src
import PlatForm from '@/components/Platform.vue'
import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'


export default {
  name: 'AurasConfigView',
  components: {
    PlatForm,
    HorizontalScroll
  },
  data: () => ({
    lineNumber: 0,
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
  }),

  methods: {
    SaveLine() {

      let copy1 = JSON.parse(JSON.stringify(this.$refs.plateForm1.moduleData[0]))
      let copy2 = JSON.parse(JSON.stringify(this.$refs.plateForm2.moduleData[0]))
      let copy3 = JSON.parse(JSON.stringify(this.$refs.plateForm3.moduleData[0]))
      let copy4 = JSON.parse(JSON.stringify(this.$refs.plateForm4.moduleData[0]))

      copy1['Step'] = this.lineNumber++;
      copy2['Step'] = this.lineNumber++;
      copy3['Step'] = this.lineNumber++;
      copy4['Step'] = this.lineNumber++;

      this.$data.module1Data.push(copy1);
      this.$data.module2Data.push(copy2);
      this.$data.module3Data.push(copy3);
      this.$data.module4Data.push(copy4);

    },
    SaveMethod() {
      this.$data.module1Data = [];
      this.$data.module2Data = [];
      this.$data.module3Data = [];
      this.$data.module4Data = [];
    }
  }
}
</script>


<style scoped>
.platforms{
  height: 768px ;
}

</style>