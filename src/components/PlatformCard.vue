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

                      <template v-slot:[`item.stdValue`]="{ item }">
                        <table>
                          <tr>
                            <td>
                              <v-select
                                  v-model="PSElement.selectedStdOption"
                                  :items="item.stdValue"
                              />

                            </td>
                          </tr>
                          <tr>
                            <td v-if="PSElement.StdPosition">
                              <v-text-field
                                  label="volume in µL"
                                  v-model="PSElement.StdPositionValue"
                              />
                            </td>
                            <td v-if="!PSElement.StdPosition">
                              <v-select
                                  required
                                  label="choose instrument"
                                  v-model="PSElement.StdStopContractor"
                                  :items="instrumentsList"
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
                  <v-card-title class="justify-center module-title-color">{{
                      liquidDispenserModule.name
                    }}
                  </v-card-title>
                  <v-data-table
                      :headers="liquidDispenserModule.columns"
                      :items="liquidDispenserModule.data"
                      :hide-default-footer="true"

                  >
                    <template v-slot:[`item.SP1P`]="{ item }">
                      <table>
                        <tr>
                          <td
                              class="text-center">
                            <v-select
                                v-model="PSElement.selectedPS1Option"
                                :items="item.SP1P"
                            />

                          </td>
                        </tr>
                        <tr>
                          <td v-if="PSElement.SP1Position">
                            <v-text-field
                                label="volume in µL"
                                v-model="PSElement.SP1PositionValue"
                            />
                          </td>
                          <td v-if="!PSElement.SP1Position">
                            <v-select
                                required
                                label="choose instrument"
                                v-model="PSElement.SP1StopContractor"
                                :items="instrumentsList"
                            />

                          </td>
                        </tr>
                      </table>
                    </template>

                    <template v-slot:[`item.SP2P`]="{ item }">
                      <table>
                        <tr>
                          <td>
                            <v-select
                                v-model="PSElement.selectedPS2Option"
                                :items="item.SP2P"
                            />

                          </td>
                        </tr>
                        <tr>
                          <td v-if="PSElement.SP2Position">
                            <v-text-field
                                label="volume in µL"
                                v-model="PSElement.SP2PositionValue"
                            />
                          </td>
                          <td v-if="!PSElement.SP2Position">
                            <v-select
                                required
                                label="choose instrument"
                                v-model="PSElement.SP2StopContractor"
                                :items="instrumentsList"
                            />
                          </td>
                        </tr>
                      </table>

                    </template>

                    <template v-slot:[`item.SP3P`]="{ item }">
                      <table>
                        <tr>
                          <td>
                            <v-select
                                v-model="PSElement.selectedPS3Option"
                                :items="item.SP3P"
                            />

                          </td>
                        </tr>
                        <tr>
                          <td v-if="PSElement.SP3Position">
                            <v-text-field
                                label="volume in µL"
                                v-model="PSElement.SP3PositionValue"
                            />
                          </td>
                          <td v-if="!PSElement.SP3Position">
                            <v-select
                                required
                                label="choose instrument"
                                v-model="PSElement.SP3StopContractor"
                                :items="instrumentsList"
                            />
                          </td>
                        </tr>
                      </table>

                    </template>

                  </v-data-table>
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

    PSElement: {
      selectedPS1Option: 'Position',
      selectedPS2Option: 'Position',
      selectedPS3Option: 'Position',
      selectedStdOption: 'Position',
      SP1Position: true,
      SP2Position: true,
      SP3Position: true,
      StdPosition: true,
      SP1PositionValue: 0,
      SP2PositionValue: 0,
      SP3PositionValue: 0,
      StdPositionValue: 0,
      SP1StopContractor: '',
      SP2StopContractor: '',
      SP3StopContractor: '',
      StdStopContractor: '',
    },

    instrumentsList: [],


    //Waiting Condition

    waitingCondition: {
      items: ['None', 'Instrument', 'Timeout'],
      selectedOption: 'None',
      noItemSelected: true,
      instrumentOptionSelected: false,
      timeoutOptionSelected: false,
      timeoutValue: 0,
      instrumentSelected: '',
    },

    //Modules

    trayModule: {
      name: '',
      columns: [

        {text: 'Value', value: 'value1', width: 82, align: 'center'},
      ],
      data: [
        {
          value1: 0,
        }
      ]
    },

    spModule: {
      name: '',
      columns: [

        {text: 'Syr', value: 'SyrValue', width: 82, align: 'center'},
      ],
      data: [
        {
          StdValue: 0,
        }
      ]
    },

    dropDispenserModule: {
      name: '',
      columns: [
        {text: 'Standards', value: 'stdValue', width: 150, align: 'center'},
      ],
      data: [
        {
          stdValue: ['Position', 'Stopped by'],
        }
      ]
    },

    liquidDispenserModule: {
      name: '',
      columns: [
        {text: "LDS1", value: "LDS1", width: 82, align: 'center'},
        {text: "LDS2", value: "LDS2", width: 82, align: 'center'},
        {text: "LDS3", value: "LDS3", width: 82, align: 'center'},
        {text: "LDS4", value: "LDS4", width: 82, align: 'center'},
        {text: "LDS5", value: "LDS5", width: 82, align: 'center'},
        {text: "LDS6", value: "LDS6", width: 82, align: 'center'},
        {text: "LDS7", value: "LDS7", width: 82, align: 'center'},
        {text: "LDS8", value: "LDS8", width: 82, align: 'center'},
        {text: "LDS9", value: "LDS9", width: 82, align: 'center'},
        {text: "SP1 Target", value: "SP1P", width: 150, align: 'center'},
        {text: "SP1 Speed", value: "SP1", width: 150, align: 'center'},
        {text: "SP2 Target", value: "SP2P", width: 150, align: 'center'},
        {text: "SP2 Speed", value: "SP2", width: 150, align: 'center'},
        {text: "SP3 Target", value: "SP3P", width: 150, align: 'center'},
        {text: "SP3 Speed", value: "SP3", width: 150, align: 'center'},
        {text: "Rotations pump", value: "PUMP1P", width: 150, align: 'center'},
        {text: "Speed pump (rpm)", value: "PUMP1S", width: 150, align: 'center'},
      ],
      data: [
        {
          LDS1: 0,
          LDS2: 0,
          LDS3: 0,
          LDS4: 0,
          LDS5: 0,
          LDS6: 0,
          LDS7: 0,
          LDS8: 0,
          LDS9: 0,
          SP1P: ['Position', 'Stopped by'],
          SP1: 0,
          SP2P: ['Position', 'Stopped by'],
          SP2: 0,
          SP3P: ['Position', 'Stopped by'],
          SP3: 0,
          PUMP1P: 0,
          PUMP1S: 0
        }
      ]
    },

    tlcModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Value1', width: 82, align: 'center'},
        {text: 'Value2', value: 'Value2', width: 82, align: 'center'},
        {text: 'Value3', value: 'Value3', width: 82, align: 'center'},
        {text: 'Value4', value: 'Value4', width: 82, align: 'center'},
      ],
      data: [
        {
          Value1: 0,
          Value2: 0,
          Value3: 0,
          Value4: 0,
        }]
    },

    phMeterModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Value1', width: 82, align: 'center'},
        {text: 'Value2', value: 'Value2', width: 82, align: 'center'},
        {text: 'Value3', value: 'Value3', width: 82, align: 'center'},
        {text: 'Value4', value: 'Value4', width: 82, align: 'center'},
      ],
      data: [
        {
          Value1: 0,
          Value2: 0,
          Value3: 0,
          Value4: 0,
        }]
    },

    ginaModule: {
      name: '',
      columns: [],
      data: []
    },

    // Comments

    comment: '',


  }),

  mounted() {
    this.loadModulesNames();
  },

  watch: {
    waitingConditionsType() {
      this.waitingConditionsType === 'timeout' ? this.timeoutSelected = true : this.timeoutSelected = false;
    },

    'waitingCondition.selectedOption'() {
      this.waitingCondition.selectedOption === 'Instrument' ? this.waitingCondition.instrumentOptionSelected = true : this.waitingCondition.instrumentOptionSelected = false;
      this.waitingCondition.selectedOption === 'Timeout' ? this.waitingCondition.timeoutOptionSelected = true : this.waitingCondition.timeoutOptionSelected = false;
    },

    'PSElement.selectedPS1Option'() {
      this.PSElement.selectedPS1Option !== 'Position' ? this.PSElement.SP1Position = false : this.PSElement.SP1Position = true;

    },
    'PSElement.selectedPS2Option'() {
      this.PSElement.selectedPS2Option !== 'Position' ? this.PSElement.SP2Position = false : this.PSElement.SP2Position = true;
    },
    'PSElement.selectedPS3Option'() {
      this.PSElement.selectedPS3Option !== 'Position' ? this.PSElement.SP3Position = false : this.PSElement.SP3Position = true;
    },
    'PSElement.selectedStdOption'() {
      this.PSElement.selectedStdOption !== 'Position' ? this.PSElement.StdPosition = false : this.PSElement.StdPosition = true;
    }

  },

  methods: {
    /*------------------------------------------------------------------------
    * Method to reset tables after a step is set
    * ------------------------------------------------------------------------*/
    resetPlatformTables() {
      this.waitingCondition.timeoutValue =
          this.PSElement.SP1PositionValue =
              this.PSElement.SP2PositionValue =
                  this.PSElement.SP3PositionValue =
                      this.PSElement.StdPositionValue = 0;


      this.waitingCondition.selectedOption = 'None';
      this.PSElement.selectedPS1Option =
          this.PSElement.selectedPS2Option =
              this.PSElement.selectedPS3Option =
                  this.PSElement.selectedStdOption = 'Position';

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
    loadModulesNames() {

      // Initialize names
      this.trayModule.name = this.$store.state.trayModuleName;
      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.tlcModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
      this.ginaModule.name = this.$store.state.GinaModuleName;

      // Initialize all modules default instrument
      this.PSElement.SP1StopContractor =
          this.PSElement.SP2StopContractor =
              this.PSElement.SP3StopContractor =
                  this.PSElement.StdStopContractor = this.dropDispenserModule.name;

      //Initialize default waitingCondition instrument
      this.waitingCondition.instrumentSelected = this.ginaModule.name;

      // Initialize instruments list
      this.instrumentsList.push(
          this.trayModule.name,
          this.dropDispenserModule.name,
          this.liquidDispenserModule.name,
          this.tlcModule.name,
          this.phMeterModule.name,
          this.ginaModule.name
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