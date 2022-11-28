<template>

  <div id="platform">
    <!--Tables-->

    <v-card style="padding: 20px">
      <v-card-title class="justify-center">Define a step</v-card-title>
      <vue-horizontal scroll snap="center">
        <table>
          <tr>
            <!-- Tray -->
            <td>
              <v-card height="255">
                <v-card-title class="justify-center">{{ trayModule.name }}</v-card-title>
                <v-data-table
                    :headers="trayModule.columns"
                    :items="trayModule.data"
                    :hide-default-footer="true"
                />
              </v-card>
            </td>

            <!-- Liquid Dispenser -->
            <td>
              <v-card height="255">
                <v-card-title class="justify-center">{{ liquidDispenserModule.name }}</v-card-title>
                <v-data-table
                    :headers="liquidDispenserModule.columns"
                    :items="liquidDispenserModule.data"
                    :hide-default-footer="true"
                />
              </v-card>
            </td>

            <!-- Drop Dispenser -->
            <td>
              <v-card height="255">
                <v-card-title class="justify-center">{{ dropDispenserModule.name }}</v-card-title>
                <v-data-table
                    :headers="dropDispenserModule.columns"
                    :items="dropDispenserModule.data"
                    :hide-default-footer="true"
                >
                  <template v-slot:[`item.PS1P`]="{ item }">
                    <table>
                      <tr>
                        <td>
                          <v-select
                              v-model="PSElement.selectedPS1Option"
                              :items="item.PS1P"
                          >

                          </v-select>
                        </td>
                      </tr>
                      <tr>
                        <td v-if="PSElement.PS1Position">
                          <v-text-field
                              label="volume in µL"
                              v-model="PSElement.PS1PositionValue"
                          />
                        </td>
                        <td v-if="!PSElement.PS1Position">
                          <v-select
                              required
                              label="choose instrument"
                              v-model="PSElement.PS1StopContractor"
                              :items="instrumentsList"
                          >

                          </v-select>
                        </td>
                      </tr>
                    </table>
                  </template>

                  <template v-slot:[`item.PS2P`]="{ item }">
                    <table>
                      <tr>
                        <td>
                          <v-select
                              v-model="PSElement.selectedPS2Option"
                              :items="item.PS2P"
                          >

                          </v-select>
                        </td>
                      </tr>
                      <tr>
                        <td v-if="PSElement.PS2Position">
                          <v-text-field
                              label="volume in µL"
                              v-model="PSElement.PS2PositionValue"
                          />
                        </td>
                        <td v-if="!PSElement.PS2Position">
                          <v-select
                              required
                              label="choose instrument"
                              v-model="PSElement.PS2StopContractor"
                              :items="instrumentsList"
                          >

                          </v-select>
                        </td>
                      </tr>
                    </table>

                  </template>

                </v-data-table>
              </v-card>
            </td>

            <!-- TLC Migration Module -->
            <td>
              <v-card height="255">
                <v-card-title class="justify-center">{{ tlcModule.name }}</v-card-title>
                <v-data-table
                    :headers="tlcModule.columns"
                    :items="tlcModule.data"
                    :hide-default-footer="true"
                />
              </v-card>
            </td>

            <!-- PH Meter -->
            <td>
              <v-card height="255">
                <v-card-title class="justify-center">{{ phMeterModule.name }}</v-card-title>
                <v-data-table
                    :headers="phMeterModule.columns"
                    :items="phMeterModule.data"
                    :hide-default-footer="true"
                />
              </v-card>
            </td>

            <!--Waiting condition-->
            <td>
              <v-card height="255" width="230" style="padding: 20px">
                <v-card-title class="justify-center"> Waiting condition</v-card-title>
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
              <v-card height="255" style="padding: 20px">
                <v-card-title class="justify-center"> Comment</v-card-title>
                <v-text-field label="Enter a comment" v-model="comment"/>
              </v-card>
            </td>

          </tr>
        </table>
      </vue-horizontal>

      <v-card-actions class="justify-center">
        <v-btn color="primary"
               style="margin-top: 20px"
               @click="$emit('lineSaved')">
          Save step
        </v-btn>
      </v-card-actions>
    </v-card>

    <!--Image    -->

    <div id="image-container">
      <vue-horizontal scroll>
        <v-img ID="img-machine" src="../assets/Assemblage_210504.png"/>
        <v-img @click="rotate('img-pinch1')" class="pinch" ID="img-pinch1" src="../assets/pinch25a.png"/>
        <v-img @click="rotate('img-pinch2')" class="pinch" ID="img-pinch2" src="../assets/pinch25b.png"/>
        <v-img @click="rotate('img-pinch3')" class="pinch" ID="img-pinch3" src="../assets/pinch25c.png"/>
        <v-img @click="rotate('img-pinch4')" class="pinch" ID="img-pinch4" src="../assets/pinch25d.png"/>
        <!--<v-img @click="rotate('img-pinch5')" class="pinch" ID="img-pinch5" src="../assets/pinch25a.png"/>
        <v-img @click="rotate('img-pinch6')" class="pinch" ID="img-pinch6" src="../assets/pinch25a.png"/>
        <v-img @click="rotate('img-pinch7')" class="pinch" ID="img-pinch7" src="../assets/pinch25a.png"/>
        <v-img @click="rotate('img-pinch8')" class="pinch" ID="img-pinch8" src="../assets/pinch25a.png"/>
        <v-img class="pinch" ID="img-Pump1R" src="../assets/Pump1R.png"/>
        <v-img class="pinch" ID="img-Pump1L" src="../assets/Pump1L.png"/>-->
      </vue-horizontal>
    </div>

  </div>
</template>

<script>
import VueHorizontal from "vue-horizontal";

export default {
  name: "PlatFormCard",
  components: {
    VueHorizontal
  },
  props: ['name'],

  data: () => ({

    angle: 45,

    //PS selection

    PSElement: {
      selectedPS1Option: 'Position',
      selectedPS2Option: 'Position',
      PS1Position: true,
      PS2Position: true,
      PS1PositionValue: 0,
      PS2PositionValue: 0,
      PS1StopContractor: '',
      PS2StopContractor: '',
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

        {text: 'Value1', value: 'Step1', align: 'start', width: 82},
        {text: 'Value2', value: 'Step2', width: 82},
        {text: 'Value3', value: 'Step3', width: 82},
        {text: 'Value4', value: 'Step4', width: 82},
      ],
      data: [
        {
          Step1: 0,
          Step2: 0,
          Step3: 0,
          Step4: 0
        }
      ]
    },

    liquidDispenserModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Step1', width: 82},
        {text: 'Value2', value: 'Step2', width: 82},
        {text: 'Value3', value: 'Step3', width: 82},
        {text: 'Value4', value: 'Step4', width: 82},
      ],
      data: [
        {
          Step1: 0,
          Step2: 0,
          Step3: 0,
          Step4: 0,
        }
      ]
    },

    dropDispenserModule: {
      name: '',
      columns: [
        {text: "S1", value: "S1", width: 82},
        {text: "S2", value: "S2", width: 82},
        {text: "S3", value: "S3", width: 82},
        {text: "S4", value: "S4", width: 82},
        {text: "S5", value: "S5", width: 82},
        {text: "S6", value: "S6", width: 82},
        {text: "S7", value: "S7", width: 82},
        {text: "S8", value: "S8", width: 82},
        {text: "PS1 Target", value: "PS1P", width: 150},
        {text: "PS1 Speed", value: "PS1S", width: 82},
        {text: "PS2 Target", value: "PS2P", width: 150},
        {text: "PS2 Speed", value: "PS2S", width: 82},
        {text: "Rotations pump", value: "PUMP1P", width: 82},
        {text: "Speed pump (rpm)", value: "PUMP1S", width: 82},
      ],
      data: [
        {
          S1: 0,
          S2: 0,
          S3: 0,
          S4: 0,
          S5: 0,
          S6: 0,
          S7: 0,
          S8: 0,
          PS1P: ['Position', 'Stopped by'],
          PS1S: 0,
          PS2P: ['Position', 'Stopped by'],
          PS2S: 0,
          PUMP1P: 0,
          PUMP1S: 0
        }
      ]
    },

    tlcModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Step1', width: 82},
        {text: 'Value2', value: 'Step2', width: 82},
        {text: 'Value3', value: 'Step3', width: 82},
        {text: 'Value4', value: 'Step4', width: 82},
      ],
      data: [
        {
          Step1: 0,
          Step2: 0,
          Step3: 0,
          Step4: 0,
        }]
    },

    phMeterModule: {
      name: '',
      columns: [
        {text: 'Value1', value: 'Step1', width: 82},
        {text: 'Value2', value: 'Step2', width: 82},
        {text: 'Value3', value: 'Step3', width: 82},
        {text: 'Value4', value: 'Step4', width: 82},
      ],
      data: [
        {
          Step1: 0,
          Step2: 0,
          Step3: 0,
          Step4: 0,
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
      this.PSElement.selectedPS1Option !== 'Position' ? this.PSElement.PS1Position = false : this.PSElement.PS1Position = true;

    },
    'PSElement.selectedPS2Option'() {
      this.PSElement.selectedPS2Option !== 'Position' ? this.PSElement.PS2Position = false : this.PSElement.PS2Position = true;
    }

  },

  methods: {
    /*------------------------------------------------------------------------
    * Method to reset tables after a step is set
    * ------------------------------------------------------------------------*/
    resetTables() {
      this.timeoutValue = 0;
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
          this.setStepValues(angle, 'S1');
          break;

        case 'img-pinch2':
          this.setStepValues(angle, 'S2');
          break;

        case 'img-pinch3':
          this.setStepValues(angle, 'S3');
          break;

        case 'img-pinch4':
          this.setStepValues(angle, 'S4');
          break;


      }
    },

    /*------------------------------------------------------------------------
    * DropDispenser: Method used to set each pinch valve value
    * ------------------------------------------------------------------------*/
    setStepValues(angle, StepNr) {

      if (angle === 0)
        this.dropDispenserStepData[0][StepNr] = 0;
      else if (angle === 45)
        this.dropDispenserStepData[0][StepNr] = 1;
      else
        this.dropDispenserStepData[0][StepNr] = 2;
    },

    /*------------------------------------------------------------------------
    * Method used to load modules names
    * ------------------------------------------------------------------------*/
    loadModulesNames() {

      this.trayModule.name = this.$store.state.trayModuleName;
      this.liquidDispenserModule.name = this.$store.state.liquidDispenserModuleName;
      this.dropDispenserModule.name = this.$store.state.dropDispenserModuleName;
      this.tlcModule.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModule.name = this.$store.state.phMeterModuleName;
      this.ginaModule.name = this.$store.state.GinaModuleName;

      this.instrumentsList.push(
          this.trayModule.name,
          this.liquidDispenserModule.name,
          this.dropDispenserModule.name,
          this.tlcModule.name,
          this.phMeterModule.name,
          this.ginaModule.name
      );
    }
  }
}
</script>

<style scoped>
#platform {
  position: relative;
}

#image-container {
  position: absolute;
  height: 800px;
  width: 1000px;
  left: 500px;
}

#img-machine {
  height: 800px;
  width: 800px;
}

.pinch {
  height: 60px;
  width: 60px;
  display: inline-block;
}

#img-pinch1 {
  position: absolute;
  left: 115px;
  top: 280px;
  display: inline-block;
}

#img-pinch2 {
  position: absolute;
  left: 115px;
  top: 360px;
  display: inline-block;
}

#img-pinch3 {
  position: absolute;
  left: 115px;
  top: 450px;
  display: inline-block;
}

#img-pinch4 {
  position: absolute;
  left: 115px;
  top: 530px;
  display: inline-block;
}

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
}
</style>