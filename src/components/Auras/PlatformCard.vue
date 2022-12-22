<template>

  <div id="platform">

    <!--Actions-->

    <v-card class="table">
      <v-card-title class="justify-center">
        Define a step
        <v-spacer/>
        <v-btn style="background-color: dodgerblue; color: white;"
               @click="$emit('lineSaved')">
          Save step
        </v-btn>
      </v-card-title>

      <!--Tables-->
      <v-card-text style="padding-left: 20px; padding-right: 20px">
        <vue-scroll-snap :horizontal="true">
          <table>
            <tr>
              <!-- TLC Migration Module -->
              <td>
                <v-card height="265" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color">
                    {{ tlcMigrationModule.name }}
                  </v-card-title>
                  <v-select
                      v-model="tlcMigrationModule.selectedOption"
                      :items="tlcMigrationModule.items"/>
                </v-card>
              </td>

              <!-- PH Meter -->

              <td>
                <v-card height="265" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color">
                    {{ phMeterModule.name }}
                  </v-card-title>
                  <v-select
                      v-model="phMeterModule.selectedOption"
                      :items="phMeterModule.items"/>

                </v-card>
              </td>

              <!-- Drop Dispenser -->

              <td>
                <v-card height="265" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color">
                    {{ dropDispenserModule.name }}
                  </v-card-title>
                  <v-select
                      v-model="dropDispenserModule.selectedOption"
                      :items="dropDispenserModule.items"/>

                </v-card>
              </td>

              <!-- Liquid Dispenser -->

              <td>
                <v-card height="265">
                  <v-card-title class="justify-center module-title-color">
                    {{ liquidDispenserModule.name }}
                  </v-card-title>
                  <v-data-table
                      :headers="liquidDispenserModule.columns"
                      :items="liquidDispenserModule.data"
                      :hide-default-footer="true"
                  >
                    <template v-slot:[`item.sP1P`]="{item}">
                      <table>
                        <tr>
                          <td class="text-center">
                            <v-select
                                v-model="liquidDispenserModule.selectedSP1"
                                :items="liquidDispenserModule.items"
                            />

                          </td>
                        </tr>
                        <tr>
                          <td v-if="liquidDispenserModule.sp1VolumeSelected">
                            <v-text-field
                                label="volume in µL"
                                v-model="item.sP1P"
                            />
                          </td>
                        </tr>
                      </table>
                    </template>

                    <template v-slot:[`item.sP2P`]="{item}">
                      <table>
                        <tr>
                          <td>
                            <v-select
                                v-model="liquidDispenserModule.selectedSP2"
                                :items="liquidDispenserModule.items"
                            />

                          </td>
                        </tr>
                        <tr>
                          <td v-if="liquidDispenserModule.sp2VolumeSelected">
                            <v-text-field
                                label="volume in µL"
                                v-model="item.sP2P"
                            />
                          </td>
                        </tr>
                      </table>

                    </template>

                    <template v-slot:[`item.sP3P`]="{item}">
                      <table>
                        <tr>
                          <td>
                            <v-select
                                v-model="liquidDispenserModule.selectedSP3"
                                :items="liquidDispenserModule.items"
                            />

                          </td>
                        </tr>
                        <tr>
                          <td v-if="liquidDispenserModule.sp3VolumeSelected">
                            <v-text-field
                                label="volume in µL"
                                v-model="item.sP3P"
                            />
                          </td>

                        </tr>
                      </table>

                    </template>

                  </v-data-table>
                </v-card>
              </td>

              <!--Waiting condition-->

              <td>
                <v-card height="265" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color"> Waiting condition</v-card-title>
                  <table>
                    <tr>
                      <td>
                        <v-select
                            v-model="waitingCondition.selectedOption"
                            :items="waitingCondition.items"/>
                      </td>
                    </tr>
                    <tr>
                      <td v-if="waitingCondition.timeoutOptionSelected">
                        <v-text-field
                            label="timeout in ms"
                            v-model="waitingCondition.timeoutValue"
                        />
                      </td>
                    </tr>
                  </table>
                </v-card>
              </td>

              <!-- Comments -->

              <td>
                <v-card height="265" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color"> Comment</v-card-title>
                  <v-text-field label="Enter a comment" v-model="comment"/>
                </v-card>
              </td>

            </tr>
          </table>
        </vue-scroll-snap>

      </v-card-text>
    </v-card>

    <!--Image    -->

    <div id="image-container">
      <vue-scroll-snap :horizontal="true">
        <v-img ID="img-machine" src="../../assets/Liquid Dispenser Images/Assemblage_210504.png"/>
        <v-img @click="rotate('img-pinch1')" class="pinch" ID="img-pinch1"
               src="../../assets/Liquid Dispenser Images/pinch25a.png"/>
        <v-img @click="rotate('img-pinch2')" class="pinch" ID="img-pinch2"
               src="../../assets/Liquid Dispenser Images/pinch25b.png"/>
        <v-img @click="rotate('img-pinch3')" class="pinch" ID="img-pinch3"
               src="../../assets/Liquid Dispenser Images/pinch25c.png"/>
        <v-img @click="rotate('img-pinch4')" class="pinch" ID="img-pinch4"
               src="../../assets/Liquid Dispenser Images/pinch25d.png"/>
        <!--<v-img @click="rotate('img-pinch5')" class="pinch" ID="img-pinch5" src="../assets/pinch25a.png"/>
        <v-img @click="rotate('img-pinch6')" class="pinch" ID="img-pinch6" src="../assets/pinch25a.png"/>
        <v-img @click="rotate('img-pinch7')" class="pinch" ID="img-pinch7" src="../assets/pinch25a.png"/>
        <v-img @click="rotate('img-pinch8')" class="pinch" ID="img-pinch8" src="../assets/pinch25a.png"/>
        <v-img class="pinch" ID="img-Pump1R" src="../assets/Pump1R.png"/>
        <v-img class="pinch" ID="img-Pump1L" src="../assets/Pump1L.png"/>-->
      </vue-scroll-snap>
    </div>

  </div>
</template>

<script>

import VueScrollSnap from "vue-scroll-snap";

export default {
  name: "PlatFormCard",
  components: {
    VueScrollSnap
  },
  props: ['name'],

  data: () => ({

    angle: 45,

    //Modules
    tlcMigrationModule: {
      name: '',
      items: ['Idle position', 'Ready position', 'Cycle', 'Redeposit tab'],
      selectedOption: 'Idle position',
      data: [
        {
          position: 0,
        }]
    },

    dropDispenserModule: {
      name: '',
      items: ['None', 'Standards'],
      selectedOption: 'None',
      data: [
        {
          value: 0,
        },
      ]
    },


    phMeterModule: {
      name: '',
      items: ['Idle position', 'QC sample', 'Rinsing', 'Tempo 1', 'Tempo 2', 'Lift'],
      selectedOption: 'Idle position',
      columns: [
        {text: 'Position', value: 'position', width: 150, align: 'center'},

      ],
      data: [
        {
          position: 0,
        }]
    },

    liquidDispenserModule: {
      name: '',
      items: ['None', 'Volume', 'QC sample drop', 'Fill LAL cartridge'],
      selectedSP1: 'None',
      selectedSP2: 'None',
      selectedSP3: 'None',
      sp1VolumeSelected: false,
      sp2VolumeSelected: false,
      sp3VolumeSelected: false,
      columns: [
        {text: "LDS1", value: "ldS1", width: 82, align: 'center'},
        {text: "LDS2", value: "ldS2", width: 82, align: 'center'},
        {text: "LDS3", value: "ldS3", width: 82, align: 'center'},
        {text: "LDS4", value: "ldS4", width: 82, align: 'center'},
        {text: "LDS5", value: "ldS5", width: 82, align: 'center'},
        {text: "LDS6", value: "ldS6", width: 82, align: 'center'},
        {text: "LDS7", value: "ldS7", width: 82, align: 'center'},
        {text: "LDS8", value: "ldS8", width: 82, align: 'center'},
        {text: "LDS9", value: "ldS9", width: 82, align: 'center'},
        {text: "SP1 Target", value: "sP1P", width: 150, align: 'center'},
        {text: "SP1 Speed", value: "sP1S", width: 150, align: 'center'},
        {text: "SP2 Target", value: "sP2P", width: 150, align: 'center'},
        {text: "SP2 Speed", value: "sP2S", width: 150, align: 'center'},
        {text: "SP3 Target", value: "sP3P", width: 150, align: 'center'},
        {text: "SP3 Speed", value: "sP3S", width: 150, align: 'center'},
        {text: "Rotations pump", value: "pumP1P", width: 150, align: 'center'},
        {text: "Speed pump (rpm)", value: "pumP1S", width: 150, align: 'center'},
      ],
      data: [
        {
          ldS1: 0,
          ldS2: 0,
          ldS3: 0,
          ldS4: 0,
          ldS5: 0,
          ldS6: 0,
          ldS7: 0,
          ldS8: 0,
          ldS9: 0,
          sP1P: 0,
          sP1S: 0,
          sP2P: 0,
          sP2S: 0,
          sP3P: 0,
          sP3S: 0,
          pumP1P: 0,
          pumP1S: 0,
        }
      ]
    },

    //Waiting Condition

    waitingCondition: {
      items: ['None', 'Gina', 'Timeout'],
      selectedOption: 'None',
      timeoutOptionSelected: false,
      timeoutValue: 0,
      data: [
        {
          type: '',
          value: 0,
          step: ''
        }
      ],
    },

    // Comments

    comment: '',

    // Other Modules

    ginaModule: {
      name: '',
      columns: [],
      data: []
    },

    aurasModule: {
      name: '',
      columns: [],
      data: []
    },


  }),

  mounted() {
    this.initialization();
  },

  watch: {
    waitingConditionsType() {
      this.waitingConditionsType === 'timeout' ? this.timeoutSelected = true : this.timeoutSelected = false;
    },

    'waitingCondition.selectedOption'() {
      this.waitingCondition.selectedOption === 'Timeout' ?
          this.waitingCondition.timeoutOptionSelected = true : this.waitingCondition.timeoutOptionSelected = false;

      if (this.waitingCondition.selectedOption === 'Timeout')
        this.waitingCondition.data[0].value = this.waitingCondition.timeoutValue;
      else if (this.waitingCondition.selectedOption === 'None')
        this.waitingCondition.data[0].value = 0;
      else this.waitingCondition.data[0].value = 1;

    },

    'dropDispenserModule.selectedOption'() {
      this.dropDispenserModule.selectedOption === 'None' ? this.dropDispenserModule.data[0].value = 0 : this.dropDispenserModule.data[0].value = 1;
    },

    'liquidDispenserModule.selectedSP1'() {
      this.liquidDispenserModule.selectedSP1 === 'Volume' ? this.liquidDispenserModule.sp1VolumeSelected = true : this.liquidDispenserModule.sp1VolumeSelected = false;
      this.liquidDispenserModule.selectedSP1 === 'QC sample drop' ? this.liquidDispenserModule.data[0].sP1P = -1 : '';
      this.liquidDispenserModule.selectedSP1 === 'Fill LAL cartridge' ? this.liquidDispenserModule.data[0].sP1P = -2 : '';
    },

    'liquidDispenserModule.selectedSP2'() {
      this.liquidDispenserModule.selectedSP2 === 'Volume' ? this.liquidDispenserModule.sp2VolumeSelected = true : this.liquidDispenserModule.sp2VolumeSelected = false;
      this.liquidDispenserModule.selectedSP2 === 'QC sample drop' ? this.liquidDispenserModule.data[0].sP2P = -1 : '';
      this.liquidDispenserModule.selectedSP2 === 'Fill LAL cartridge' ? this.liquidDispenserModule.data[0].sP2P = -2 : '';
    },

    'liquidDispenserModule.selectedSP3'() {
      this.liquidDispenserModule.selectedSP3 === 'Volume' ? this.liquidDispenserModule.sp3VolumeSelected = true : this.liquidDispenserModule.sp3VolumeSelected = false;
      this.liquidDispenserModule.selectedSP3 === 'QC sample drop' ? this.liquidDispenserModule.data[0].sP3P = -1 : '';
      this.liquidDispenserModule.selectedSP3 === 'Fill LAL cartridge' ? this.liquidDispenserModule.data[0].sP3P = -2 : '';
    },

    'tlcModule.selectedOption'() {

      switch (this.tlcMigrationModule.selectedOption) {
        case "Idle position":
          this.tlcMigrationModule.data[0].position = 0;
          break;
        case "Ready position":
          this.tlcMigrationModule.data[0].position = 1;
          break;
        case "Cycle":
          this.tlcMigrationModule.data[0].position = 2;
          break;
        case "Redeposit tab":
          this.tlcMigrationModule.data[0].position = 3;
          break;
        default:
          this.tlcMigrationModule.data[0].position = 0;
          break;
      }
    },

    'phMeterModule.selectedOption'() {

      switch (this.phMeterModule.selectedOption) {
        case "Idle position":
          this.phMeterModule.data[0].position = 0;
          break;
        case "QC sample":
          this.phMeterModule.data[0].position = 1;
          break;
        case "Rinsing":
          this.phMeterModule.data[0].position = 2;
          break;
        case "Tempo 1":
          this.phMeterModule.data[0].position = 3;
          break;
        case "Tempo 2":
          this.phMeterModule.data[0].position = 4;
          break;
        case "Lift":
          this.phMeterModule.data[0].position = 5;
          break;
        default:
          this.phMeterModule.data[0].position = 0;
          break;
      }
    },

  },

  methods: {
    /*------------------------------------------------------------------------
    * Method to reset tables after a step is set
    * ------------------------------------------------------------------------*/
    resetPlatformTables() {

      this.waitingCondition.selectedOption = 'None';
      this.comment = '';

    },


    /*------------------------------------------------------------------------
    * Method used to rotate pinch valves physically
    * ------------------------------------------------------------------------*/
    rotate(id) {

      this.angle = 45;
      let currentAngle = 0;

      if (document.getElementById(id).style.transform !== '')
        currentAngle = parseInt(document.getElementById(id).style.transform.match(/\d+/)[0]);

      if (currentAngle === 0) {
        document.getElementById(id).style.transform = 'rotate(' + this.angle + 'deg)';
      } else if (parseInt(document.getElementById(id).style.transform.match(/\d+/)[0]) === 45) {
        this.angle += 45;
        document.getElementById(id).style.transform = 'rotate(' + this.angle + 'deg)';
      } else {
        this.angle = 0;
        document.getElementById(id).style.transform = 'rotate(' + this.angle + 'deg)';
      }

      this.setTableValues(id, this.angle);
    },


    /*------------------------------------------------------------------------
    * Method used to manage all pinch valves values
    * ------------------------------------------------------------------------*/
    setTableValues(id, angle) {

      switch (id) {
        case 'img-pinch1':
          this.setStepValues(angle, 'ldS1');
          break;

        case 'img-pinch2':
          this.setStepValues(angle, 'ldS2');
          break;

        case 'img-pinch3':
          this.setStepValues(angle, 'ldS3');
          break;

        case 'img-pinch4':
          this.setStepValues(angle, 'ldS4');
          break;


      }
    },

    /*------------------------------------------------------------------------
    * LiquidDispenser: Method used to set each pinch valve value
    * ------------------------------------------------------------------------*/
    setStepValues(angle, StepNr) {
      if (angle === 0)
        this.liquidDispenserModule.data[0][StepNr] = 0;
      else if (angle === 45)
        this.liquidDispenserModule.data[0][StepNr] = 1;
      else
        this.liquidDispenserModule.data[0][StepNr] = 2;
    },

    /*------------------------------------------------------------------------
    * Method used to load modules names
    * ------------------------------------------------------------------------*/
    initialization() {

      // Initialize names
      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.tlcMigrationModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
      this.ginaModule.name = this.$store.state.ginaModuleName;
      this.aurasModule.name = this.$store.state.aurasModuleName;


      //Initialize default waitingCondition instrument
      this.waitingCondition.instrumentSelected = this.ginaModule.name;


    }
  }
}
</script>

<style scoped>

.table {
  z-index: 2;
}

.module-title-color {
  color: dodgerblue;
}

#platform {
  position: relative;
}

#image-container {
  position: absolute;
  width: 1000px;
  left: 500px;
  top: 290px;
  z-index: 1;
}

#img-machine {
  height: 760px;
  width: 800px;

}

.pinch {
  height: 60px;
  width: 60px;
  display: inline-block;
}

#img-pinch1 {
  position: absolute;
  left: 130px;
  top: 270px;
  display: inline-block;
}

#img-pinch2 {
  position: absolute;
  left: 130px;
  top: 340px;
  display: inline-block;
}

#img-pinch3 {
  position: absolute;
  left: 130px;
  top: 420px;
  display: inline-block;
}

#img-pinch4 {
  position: absolute;
  left: 130px;
  top: 500px;
  display: inline-block;
}

/*
#img-pinch5 {
  position: absolute;
  left: 275px;
  top: 1005px;
}

#img-pinch6 {
  position: absolute;
  left: 395px;
  top: 920px;
}

#img-pinch7 {
  position: absolute;
  left: 496px;
  top: 920px;
}

#img-pinch8 {
  position: absolute;
  left: 639px;
  top: 980px;

}

#img-Pump1R {
  position: absolute;
  top: 776px;
  left: 440px;
}

#img-Pump1L {
  position: absolute;
  top: 776px;
  left: 440px;
}*/
</style>