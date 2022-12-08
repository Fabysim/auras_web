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
              <!-- Tray -->
              <td>
                <v-card height="265">
                  <v-card-title class="justify-center module-title-color">{{ trayModule.name }}</v-card-title>
                  <v-data-table
                      :headers="trayModule.columns"
                      :items="trayModule.data"
                      :hide-default-footer="true"
                  />
                </v-card>
              </td>

              <!-- TLC Migration Module -->

              <td>
                <v-card height="265">
                  <v-card-title class="justify-center module-title-color">{{ tlcModule.name }}</v-card-title>
                  <v-data-table
                      :headers="tlcModule.columns"
                      :items="tlcModule.data"
                      :hide-default-footer="true"
                  />
                </v-card>
              </td>

              <!-- PH Meter -->

              <td>
                <v-card height="265">
                  <v-card-title class="justify-center module-title-color">{{ phMeterModule.name }}</v-card-title>
                  <v-data-table
                      :headers="phMeterModule.columns"
                      :items="phMeterModule.data"
                      :hide-default-footer="true"
                  />
                </v-card>
              </td>

              <!-- Drop Dispenser -->

              <td>
                <v-card height="265">
                  <v-card-title class="justify-center module-title-color">
                    <!--{{ dropDispenserModule.name }}-->
                    DD
                  </v-card-title>
                  <v-card-text class="justify-center">
                    <v-data-table
                        :headers="dropDispenserModule.columns"
                        :items="dropDispenserModule.data"
                        :hide-default-footer="true"
                    >
                      <template v-slot:[`item.value`]="{ item }">
                        <table>
                          <tr>
                            <td>
                              <v-select
                                  v-model="SPElements.selectedSpDdOption"
                                  :items="SPElements.options"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <v-select
                                  v-model="SPElements.selectedSpDdSubOption"
                                  :items="SPElements.subOptions"
                              />
                            </td>
                            <td v-if="SPElements.DdSpPositionMode">
                              <v-text-field
                                  label="µL"
                                  v-model.number="item.value"
                              />
                            </td>
                          </tr>
                        </table>

                      </template>

                    </v-data-table>
                  </v-card-text>
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
                    <template v-slot:[`item.sP1P`]="{ item }">
                      <table>
                        <tr>
                          <td class="text-center">
                            <v-select
                                v-model="SPElements.selectedSpLd1Option"
                                :items="item.sP1P"
                            />

                          </td>
                        </tr>
                        <tr>
                          <td v-if="SPElements.LdSp1PositionMode">
                            <v-text-field
                                label="volume in µL"
                                v-model="SPElements.LdSp1PositionValue"
                            />
                          </td>
                        </tr>
                      </table>
                    </template>

                    <template v-slot:[`item.sP2P`]="{ item }">
                      <table>
                        <tr>
                          <td>
                            <v-select
                                v-model="SPElements.selectedSpLd2Option"
                                :items="item.sP2P"
                            />

                          </td>
                        </tr>
                        <tr>
                          <td v-if="SPElements.LdSp2PositionMode">
                            <v-text-field
                                label="volume in µL"
                                v-model="SPElements.LdSp2PositionValue"
                            />
                          </td>
                        </tr>
                      </table>

                    </template>

                    <template v-slot:[`item.sP3P`]="{ item }">
                      <table>
                        <tr>
                          <td>
                            <v-select
                                v-model="SPElements.selectedSpLd3Option"
                                :items="item.sP3P"
                            />

                          </td>
                        </tr>
                        <tr>
                          <td v-if="SPElements.LdSp3PositionMode">
                            <v-text-field
                                label="volume in µL"
                                v-model="SPElements.LdSp3PositionValue"
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
                            :items="waitingCondition.items"
                        >

                        </v-select>
                      </td>
                    </tr>
                    <tr>
                      <td v-if="waitingCondition.instrumentOptionSelected">
                        <v-select
                            label="choose instrument"
                            v-model="waitingCondition.instrumentSelected"
                            :items="instrumentsList"
                        />
                      </td>
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
        <v-img ID="img-machine" src="../assets/Liquid Dispenser Images/Assemblage_210504.png"/>
        <v-img @click="rotate('img-pinch1')" class="pinch" ID="img-pinch1"
               src="../assets/Liquid Dispenser Images/pinch25a.png"/>
        <v-img @click="rotate('img-pinch2')" class="pinch" ID="img-pinch2"
               src="../assets/Liquid Dispenser Images/pinch25b.png"/>
        <v-img @click="rotate('img-pinch3')" class="pinch" ID="img-pinch3"
               src="../assets/Liquid Dispenser Images/pinch25c.png"/>
        <v-img @click="rotate('img-pinch4')" class="pinch" ID="img-pinch4"
               src="../assets/Liquid Dispenser Images/pinch25d.png"/>
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

    //PS selection

    SPElements: {
      selectedSpLd1Option: 'Position',
      selectedSpLd2Option: 'Position',
      selectedSpLd3Option: 'Position',
      selectedSpDdOption: 'Standards',
      selectedSpDdSubOption: 'Position',
      LdSp1PositionMode: true,
      LdSp2PositionMode: true,
      LdSp3PositionMode: true,
      DdSpPositionMode: true,
      LdSp1PositionValue: 0,
      LdSp2PositionValue: 0,
      LdSp3PositionValue: 0,
      DdSpPositionValue: 0,
      options: ['Standards', 'QC sample'],
      subOptions: ['Position', 'Drop detected']
    },

    instrumentsList: [],

    //Modules

    trayModule: {
      name: '',
      columns: [

        {text: 'Value', value: 'value', width: 82, align: 'center'},
      ],
      data: [
        {
          value: 0
        }
      ]
    },

    dropDispenserModule: {
      name: '',
      columns: [
        {text: 'Value', value: 'value', width: 250, align: 'center'},
      ],
      data: [
        {
          value: 0,
        },
      ]
    },

    tlcModule: {
      name: '',
      columns: [
        {text: 'Position', value: 'position', width: 170, align: 'center'},
      ],
      data: [
        {
          position: 0,
        }]
    },

    phMeterModule: {
      name: '',
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
        {text: "SP1 Speed", value: "sP1", width: 150, align: 'center'},
        {text: "SP2 Target", value: "sP2P", width: 150, align: 'center'},
        {text: "SP2 Speed", value: "sP2", width: 150, align: 'center'},
        {text: "SP3 Target", value: "sP3P", width: 150, align: 'center'},
        {text: "SP3 Speed", value: "sP3", width: 150, align: 'center'},
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
          sP1P: ['Position', 'Drop detected'],
          sP1: 0,
          sP2P: ['Position', 'Drop detected'],
          sP2: 0,
          sP3P: ['Position', 'Drop detected'],
          sP3: 0,
          pumP1P: 0,
          pumP1S: 0,
        }
      ]
    },

    //Waiting Condition

    waitingCondition: {
      items: ['None', 'Instrument', 'Timeout'],
      selectedOption: 'None',
      noItemSelected: true,
      instrumentOptionSelected: false,
      timeoutOptionSelected: false,
      timeoutValue: 0,
      instrumentSelected: '',
      data: [
        {
          Type: '',
          Value: 0,
          Step: ''
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
      this.waitingCondition.selectedOption === 'Instrument' ? this.waitingCondition.instrumentOptionSelected = true : this.waitingCondition.instrumentOptionSelected = false;
      this.waitingCondition.selectedOption === 'Timeout' ? this.waitingCondition.timeoutOptionSelected = true : this.waitingCondition.timeoutOptionSelected = false;
    },

    'SPElements.selectedSpLd1Option'() {
      this.SPElements.selectedSpLd1Option !== 'Position' ? this.SPElements.LdSp1PositionMode = false : this.SPElements.LdSp1PositionMode = true;

    },
    'SPElements.selectedSpLd2Option'() {
      this.SPElements.selectedSpLd2Option !== 'Position' ? this.SPElements.LdSp2PositionMode = false : this.SPElements.LdSp2PositionMode = true;
    },
    'SPElements.selectedSpLd3Option'() {
      this.SPElements.selectedSpLd3Option !== 'Position' ? this.SPElements.LdSp3PositionMode = false : this.SPElements.LdSp3PositionMode = true;
    },
    'SPElements.selectedSpDdSubOption'() {
      this.SPElements.selectedSpDdSubOption !== 'Position' ? this.SPElements.DdSpPositionMode = false : this.SPElements.DdSpPositionMode = true;
      this.SPElements.selectedSpDdSubOption !== 'Position' ? this.dropDispenserModule.data[0].Value = -1 : this.dropDispenserModule.data[0].Value = 0;

    }

  },

  methods: {
    /*------------------------------------------------------------------------
    * Method to reset tables after a step is set
    * ------------------------------------------------------------------------*/
    resetPlatformTables() {
      this.waitingCondition.timeoutValue =
          this.SPElements.LdSp1PositionValue =
              this.SPElements.LdSp2PositionValue =
                  this.SPElements.LdSp3PositionValue =
                      this.SPElements.DdSpPositionValue = 0;


      this.waitingCondition.selectedOption = 'None';
      this.SPElements.selectedSpLd1Option =
          this.SPElements.selectedSpLd2Option =
              this.SPElements.selectedSpLd3Option = 'Position';

      this.SPElements.selectedSpDdOption = 'Standards';

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

      this.SetTableValues(id, this.angle);
    },


    /*------------------------------------------------------------------------
    * Method used to manage all pinch valves values
    * ------------------------------------------------------------------------*/
    SetTableValues(id, angle) {

      switch (id) {
        case 'img-pinch1':
          this.setStepValues(angle, 'LDS1');
          break;

        case 'img-pinch2':
          this.setStepValues(angle, 'LDS2');
          break;

        case 'img-pinch3':
          this.setStepValues(angle, 'LDS3');
          break;

        case 'img-pinch4':
          this.setStepValues(angle, 'LDS4');
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
      this.trayModule.name = this.$store.state.trayModuleName;
      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.tlcModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
      this.ginaModule.name = this.$store.state.ginaModuleName;
      this.aurasModule.name = this.$store.state.aurasModuleName;

      // Initialize all modules default instrument
      this.SPElements.SP1StopContractor =
          this.SPElements.SP2StopContractor =
              this.SPElements.SP3StopContractor =
                  this.SPElements.StdStopContractor = this.dropDispenserModule.name;

      //Initialize default waitingCondition instrument
      this.waitingCondition.instrumentSelected = this.ginaModule.name;

      // Initialize instruments list
      this.instrumentsList.push(
          this.ginaModule.name,
          this.aurasModule.name
      );
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