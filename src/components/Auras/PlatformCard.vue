<template>

  <div id="platform">


    <!--Actions-->

    <v-card class="table"
            v-if="mode==='config'">
      <v-card-title class="justify-center">
        Define a step
        <v-spacer/>
      </v-card-title>

      <!--Tables-->
      <v-card-text v-if="mode==='config'"
                   style="padding-left: 20px;
                    padding-right: 20px">
        <vue-scroll-snap :horizontal="true">
          <table>
            <tr>
              <!-- TLC Migration Module -->
              <td>
                <v-card height="200" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color">
                    {{ tlcMigrationModule.name }}
                  </v-card-title>
                  <v-card-text class="card-text">
                    {{ tlcMigrationModule.selectedOption }}
                  </v-card-text>

                </v-card>
              </td>

              <!-- PH Meter -->

              <td>
                <v-card height="200" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color">
                    {{ phMeterModule.name }}
                  </v-card-title>
                  <v-card-text class="card-text">
                    {{ phMeterModule.selectedOption }}
                  </v-card-text>
                </v-card>
              </td>

              <!-- Drop Dispenser -->

              <td>
                <v-card height="200" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color">
                    {{ dropDispenserModule.name }}
                  </v-card-title>
                  <v-card-text class="card-text">
                    {{ dropDispenserModule.selectedOption }}
                  </v-card-text>
                </v-card>
              </td>

              <!-- Liquid Dispenser -->

              <td>
                <v-card height="200">
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
                          <td v-if="liquidDispenserModule.sp1VolumeSelected">Volume: {{ item.sP1P }} µL</td>
                          <td v-else> {{ liquidDispenserModule.selectedSP1 }}</td>
                        </tr>
                      </table>
                    </template>

                    <template v-slot:[`item.sP2P`]="{item}">
                      <table>

                        <tr>
                          <td v-if="liquidDispenserModule.sp2VolumeSelected">Volume: {{ item.sP2P }} µL</td>
                          <td v-else>{{ liquidDispenserModule.selectedSP2 }}</td>
                        </tr>
                      </table>

                    </template>

                    <template v-slot:[`item.sP3P`]="{item}">
                      <table>
                        <tr>
                          <td v-if="liquidDispenserModule.sp3VolumeSelected">Volume: {{ item.sP3P }} µL</td>
                          <td v-else>{{ liquidDispenserModule.selectedSP3 }}</td>
                        </tr>
                      </table>

                    </template>

                  </v-data-table>
                </v-card>
              </td>

              <!--Waiting condition-->

              <td>
                <v-card height="200" width="230" style="padding: 20px">
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
                <v-card height="200" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color"> Comment</v-card-title>
                  <v-text-field label="Enter a comment" v-model="comment"/>
                </v-card>
              </td>

            </tr>
          </table>
        </vue-scroll-snap>

      </v-card-text>

      <v-btn style="background-color: dodgerblue; color: white;"
             @click="$emit('lineSaved')">
        Save step
      </v-btn>
    </v-card>

    <v-dialog v-model="overflowDialog.open" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 red lighten-2">
          {{ overflowDialog.message }}
        </v-card-title>

        <v-card-text>
          The amount of liquid you can take out or put into the syringe has been reached
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="overflowDialog.open = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

    <!--Image    -->

    <div id="image-container">
      <vue-scroll-snap :horizontal="true" id="scroll-snap-container">

        <!--TLC Migration-->

        <label id="tlc_title" class="module-title-color">{{ tlcMigrationModule.name }}</label>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="tlc_btn_0"
                @click="setModulePhysicalPosition(tlcMigrationModule, tlcMigrationModule.items[0])"
            >
              mdi-numeric-0-circle-outline
            </v-icon>
          </template>
          <span>{{ tlcMigrationModule.items[0] }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="tlc_btn_1"
                @click="setModulePhysicalPosition(tlcMigrationModule, tlcMigrationModule.items[1])"
            >
              mdi-numeric-1-circle-outline
            </v-icon>
          </template>
          <span>{{ tlcMigrationModule.items[1] }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="tlc_btn_2"
                @click="setModulePhysicalPosition(tlcMigrationModule, tlcMigrationModule.items[2])"
            >
              mdi-numeric-2-circle-outline
            </v-icon>
          </template>
          <span>{{ tlcMigrationModule.items[2] }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="tlc_btn_3"
                @click="setModulePhysicalPosition(tlcMigrationModule, tlcMigrationModule.items[3])"
            >
              mdi-numeric-3-circle-outline
            </v-icon>
          </template>
          <span>{{ tlcMigrationModule.items[3] }}</span>
        </v-tooltip>

        <!--Ph Meter-->

        <label id="ph_title" class="module-title-color">{{ phMeterModule.name }}</label>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="phm_btn_0"
                @click="setModulePhysicalPosition(phMeterModule, phMeterModule.items[0])"
            >
              mdi-numeric-0-circle-outline
            </v-icon>
          </template>
          <span>{{ phMeterModule.items[0] }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="phm_btn_1"
                @click="setModulePhysicalPosition(phMeterModule, phMeterModule.items[1])"
            >
              mdi-numeric-1-circle-outline
            </v-icon>
          </template>
          <span>{{ phMeterModule.items[1] }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="phm_btn_2"
                @click="setModulePhysicalPosition(phMeterModule, phMeterModule.items[2])"
            >
              mdi-numeric-2-circle-outline
            </v-icon>
          </template>
          <span>{{ phMeterModule.items[2] }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="phm_btn_3"
                @click="setModulePhysicalPosition(phMeterModule, phMeterModule.items[3])"
            >
              mdi-numeric-3-circle-outline
            </v-icon>
          </template>
          <span>{{ phMeterModule.items[3] }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="phm_btn_4"
                @click="setModulePhysicalPosition(phMeterModule, phMeterModule.items[4])"
            >
              mdi-numeric-4-circle-outline
            </v-icon>
          </template>
          <span>{{ phMeterModule.items[4] }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="phm_btn_5"
                @click="setModulePhysicalPosition(phMeterModule, phMeterModule.items[5])"
            >
              mdi-numeric-5-circle-outline
            </v-icon>
          </template>
          <span>{{ phMeterModule.items[5] }}</span>
        </v-tooltip>

        <!--Drop Dispenser-->
        <label id="dd_title" class="module-title-color">{{ dropDispenserModule.name }}</label>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="dd_btn_0"
                @click="setModulePhysicalPosition(dropDispenserModule, dropDispenserModule.items[0])"
            >
              mdi-numeric-0-circle-outline
            </v-icon>
          </template>
          <span>{{ dropDispenserModule.items[0] }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-on="on"
                v-bind="attrs"
                color="black"
                large
                id="dd_btn_1"
                @click="setModulePhysicalPosition(dropDispenserModule,dropDispenserModule.items[1])"
            >
              mdi-numeric-1-circle-outline
            </v-icon>
          </template>
          <span>{{ dropDispenserModule.items[1] }}</span>
        </v-tooltip>

        <!--Liquid Dispenser-->

        <!--        Title-->
        <label id="ld_title" class="module-title-color">{{ liquidDispenserModule.name }}</label>

        <!--        Main images-->

        <img ID="liquid-dispenser-body" src="../../assets/LiquidDispenserImages/LDF18vide.png" alt=""/>

        <!--        PS3 control-->

        <select id="select-sp3" class="firstLineComponent" v-model="liquidDispenserModule.selectedSP3">
          <option v-for="item in liquidDispenserModule.items" :value="item" :key="item">{{ item }}</option>
        </select>

        <button :disabled="!liquidDispenserModule.sp3VolumeSelected"
                class="button firstLineComponent"
                id="volumeSp3Up"
                @mousedown="moveStepperMotors('sp3Up','mousedown')"
                @mouseup="moveStepperMotors('sp3Up','mouseup')">
          Up
        </button>
        <button :disabled="!liquidDispenserModule.sp3VolumeSelected"
                class="button firstLineComponent"
                id="volumeSp3Down"
                @mousedown="moveStepperMotors('sp3Down','mousedown')"
                @mouseup="moveStepperMotors('sp3Down','mouseup')">
          Down
        </button>
        <input type="text"
               :disabled="!liquidDispenserModule.sp3VolumeSelected"
               id="volumeSp3Input"
               class="input-text"
               @change="event => setModulePhysicalPosition(liquidDispenserModule,  event.target.value,'volumeSp3Input')"/>

        <textarea readonly id="ps3SpeedLabel"></textarea>
        <input type="range" id="ps3SpeedRange" min="1" max="500"
               @input="event =>  setModulePhysicalPosition(liquidDispenserModule, event.target.value,'ps3SpeedRange')"
               list="tickMarks">

        <!--        PS1 control-->
        <select id="select-sp1" class="firstLineComponent" v-model="liquidDispenserModule.selectedSP1">
          <option v-for="item in liquidDispenserModule.items" :value="item" :key="item">{{ item }}</option>
        </select>


        <button :disabled="!liquidDispenserModule.sp1VolumeSelected"
                id="volumeSp1Up"
                class="button firstLineComponent"
                @mousedown="moveStepperMotors('sp1Up','mousedown')"
                @mouseup="moveStepperMotors('sp1Up','mouseup')">
          Up
        </button>
        <button :disabled="!liquidDispenserModule.sp1VolumeSelected"
                id="volumeSp1Down"
                class="button firstLineComponent"
                @mousedown="moveStepperMotors('sp1Down','mousedown')"
                @mouseup="moveStepperMotors('sp1Down','mouseup')">
          Down
        </button>
        <input type="text"
               :disabled="!liquidDispenserModule.sp1VolumeSelected"
               @change="event => setModulePhysicalPosition(liquidDispenserModule, event.target.value,'volumeSp1Input')"
               class="input-text"
               id="volumeSp1Input"
        />

        <textarea readonly id="ps1SpeedLabel"></textarea>
        <input type="range" id="ps1SpeedRange" min="1" max="500"
               @input="event => setModulePhysicalPosition(liquidDispenserModule, event.target.value,'ps1SpeedRange')"
               list="tickMarks">

        <!--        PS2 control-->

        <select id="select-sp2" class="firstLineComponent" v-model="liquidDispenserModule.selectedSP2">
          <option v-for="item in liquidDispenserModule.items" :value="item" :key="item">{{ item }}</option>
        </select>
        <button :disabled="!liquidDispenserModule.sp2VolumeSelected"
                id="volumeSp2Up"
                class="button firstLineComponent"
                @mousedown="moveStepperMotors('sp2Up','mousedown')"
                @mouseup="moveStepperMotors('sp2Up','mouseup')">
          Up
        </button>
        <button :disabled="!liquidDispenserModule.sp2VolumeSelected"
                id="volumeSp2Down"
                class="button firstLineComponent"
                @mousedown="moveStepperMotors('sp2Down','mousedown')"
                @mouseup="moveStepperMotors('sp2Down','mouseup')">
          Down
        </button>
        <input type="text"
               :disabled="!liquidDispenserModule.sp2VolumeSelected"
               class="input-text"
               id="volumeSp2Input"
               @change="event => setModulePhysicalPosition(liquidDispenserModule, event.target.value,'volumeSp2Input')"/>

        <textarea readonly id="ps2SpeedLabel"></textarea>
        <input type="range" id="ps2SpeedRange" min="1" max="500"
               @input="event => setModulePhysicalPosition(liquidDispenserModule, event.target.value,'ps2SpeedRange')"
               list="tickMarks">


        <!--        Pump control-->

        <button id="pumpLeft"
                class="button"
                @mousedown="moveStepperMotors('pumpLeft','mousedown')"
                @mouseup="moveStepperMotors('pumpLeft','mouseup')">
          Left
        </button>
        <button id="pumpRight"
                class="button"
                @mousedown="moveStepperMotors('pumpRight','mousedown')"
                @mouseup="moveStepperMotors('pumpRight','mouseup')">
          Right
        </button>
        <input type="text"
               class="input-text"
               id="pump1Input"
               @change="event => setModulePhysicalPosition(liquidDispenserModule, event.target.value,'volumeSp2Input')"/>

        <input type="range" id="pumSpeed" min="1" max="500"
               @input="event =>  setModulePhysicalPosition(liquidDispenserModule, event.target.value,'pumSpeed')"
               list="tickMarks">
        <textarea readonly id="pumpsLabel"></textarea>
        <datalist id="tickMarks">
          <option value="1"/>
          <option value="5"/>
          <option value="10"/>
          <option value="20"/>
          <option value="30"/>
          <option value="40"/>
          <option value="50"/>
          <option value="75"/>
          <option value="100"/>
          <option value="125"/>
          <option value="150"/>
          <option value="200"/>
          <option value="250"/>
          <option value="300"/>
          <option value="400"/>
          <option value="500"/>
        </datalist>


        <!--    PS ranges -->

        <div class="progressbar-wrapper" id="PS3PProgressbar">
          <div id="ps3AbsolutePosition" title="ps3AbsolutePosition" v-bind:style="{ width: computedWidthSp3 }"
               class="progressbar">
          </div>
        </div>
        <div class="progressbar-wrapper" id="PS1PProgressbar">
          <div id="ps1AbsolutePosition" title="ps1AbsolutePosition" v-bind:style="{ width: computedWidthSp1 }"
               class="progressbar ">
          </div>
        </div>

        <div class="progressbar-wrapper" id="PS2PProgressbar">
          <div id="ps2AbsolutePosition" title="ps2AbsolutePosition" v-bind:style="{ width: computedWidthSp2 }"
               class="progressbar">
          </div>
        </div>


        <!--        pinch valves images-->


        <img @click="rotate('ldS1')" class="pinch" ID="ldS1" alt=""
             src="../../assets/LiquidDispenserImages/pinch25b.png"/>

        <img @click="rotate('ldS2')" class="pinch" ID="ldS2" alt=""
             src="../../assets/LiquidDispenserImages/pinch25b.png"/>

        <img @click="rotate('ldS3')" class="pinch" ID="ldS3" alt=""
             src="../../assets/LiquidDispenserImages/pinch25b.png"/>

        <img @click="rotate('ldS4')" class="pinch" ID="ldS4" alt=""
             src="../../assets/LiquidDispenserImages/pinch25b.png"/>

        <img @click="rotate('ldS5')" class="pinch" ID="ldS5" alt=""
             src="../../assets/LiquidDispenserImages/pinch25b.png"/>

        <img @click="rotate('ldS6')" class="pinch" ID="ldS6" alt=""
             src="../../assets/LiquidDispenserImages/pinch25b.png"/>

        <img @click="rotate('ldS7')" class="pinch" ID="ldS7" alt=""
             src="../../assets/LiquidDispenserImages/pinch25e.png"/>

        <img @click="rotate('ldS8')" class="pinch" ID="ldS8" alt=""
             src="../../assets/LiquidDispenserImages/pinch25e.png"/>

        <img @click="rotate('ldS9')" class="pinch" ID="ldS9" alt=""
             src="../../assets/LiquidDispenserImages/pinch25c.png"/>

        <img @click="rotate('ldS10')" class="pinch" ID="ldS10" alt=""
             src="../../assets/LiquidDispenserImages/pinch25a.png"/>

        <img @click="rotate('ldS11')" class="pinch" ID="ldS11" alt=""
             src="../../assets/LiquidDispenserImages/pinch25c.png"/>

        <img @click="rotate('ldS12')" class="pinch" ID="ldS12" alt=""
             src="../../assets/LiquidDispenserImages/pinch25c.png"/>

        <!--  Pump  images -->
        <div id="wheelDiv">
          <img v-if="rotateRight" id="wheelRight" alt="" src="../../assets/LiquidDispenserImages/Pump1R.png"/>
          <img v-if="rotateLeft" id="wheelLeft" alt="" src="../../assets/LiquidDispenserImages/Pump1L.png"/>
          <img v-if="noRotation" id="noWheel" alt="" src="../../assets/LiquidDispenserImages/NoPump.png"/>

        </div>


      </vue-scroll-snap>
    </div>

  </div>
</template>

<script>

import VueScrollSnap from "vue-scroll-snap";
import axios from "axios";

export default {
  name: "PlatFormCard",
  components: {
    VueScrollSnap
  },
  props: ['mode'],

  data: () => ({

        sp1Width: '10%',
        sp2Width: '10%',
        sp3Width: '10%',
        rotateRight: false,
        rotateLeft: false,
        noRotation: true,
        overflowDialog: {
          open: false,
          message: ''
        },
        angle: 45,
        connection: '',
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
          sp1VolumeUsed: false,
          sp2VolumeUsed: false,
          sp3VolumeUsed: false,
          sP1PAbsolutePosition: 0,
          sP2PAbsolutePosition: 0,
          sP3PAbsolutePosition: 0,
          sp1Quantity: 0,
          sp2Quantity: 0,
          sp3Quantity: 0,
          sp1MaxSpeed: 0,
          sp2MaxSpeed: 0,
          sp3MaxSpeed: 0,
          sp1CurrentSpeed: 0,
          sp2CurrentSpeed: 0,
          sp3CurrentSpeed: 0,
          pump1Quantity: 0,
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
            {text: "LDS10", value: "ldS10", width: 82, sortable: false, align: 'center'},
            {text: "LDS11", value: "ldS11", width: 82, sortable: false, align: 'center'},
            {text: "LDS12", value: "ldS12", width: 82, sortable: false, align: 'center'},
            {text: "SP1 Quantity", value: "sP1P", width: 150, align: 'center'},
            {text: "SP1 Speed", value: "sP1S", width: 82, align: 'center'},
            {text: "SP2 Quantity", value: "sP2P", width: 150, align: 'center'},
            {text: "SP2 Speed", value: "sP2S", width: 82, align: 'center'},
            {text: "SP3 Quantity", value: "sP3P", width: 150, align: 'center'},
            {text: "SP3 Speed", value: "sP3S", width: 82, align: 'center'},
            {text: "Rotations pump", value: "pumP1P", width: 82, align: 'center'},
            {text: "Speed pump (rpm)", value: "pumP1S", width: 82, align: 'center'},
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
              ldS10: 0,
              ldS11: 0,
              ldS12: 0,
              sP1P: '0',
              sP1S: 1,
              sP2P: '0',
              sP2S: 0,
              sP3P: '0',
              sP3S: 0,
              pumP1P: 0,
              pumP1S: 0,
            },

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
        webSocket: {
          connected: false,
          ipAddress: '',
          connection: '',
        }

      }
  ),

  computed: {
    computedWidthSp1: function () {
      return this.sp1Width;
    },
    computedWidthSp2: function () {
      return this.sp2Width;
    },
    computedWidthSp3: function () {
      return this.sp3Width;
    },


  },
  /*------------------------------------------------------------------------
  * Loads data when this page (component) is mounted
  * ------------------------------------------------------------------------*/
  mounted() {
    this.fetchNetworkByName('Auras');
    this.initialization();
  },

  watch: { // Listeners

    /*------------------------------------------------------------------------
   * Listener: to waitingConditionsType
   * ------------------------------------------------------------------------*/
    waitingConditionsType() {
      this.waitingConditionsType === 'timeout' ? this.timeoutSelected = true : this.timeoutSelected = false;
    }
    ,

    /*------------------------------------------------------------------------
    * Listener: to waitingCondition.selectedOption
    * ------------------------------------------------------------------------*/
    'waitingCondition.selectedOption'() {
      this.waitingCondition.data[0].value = 0;
      this.waitingCondition.selectedOption === 'Timeout' ?
          this.waitingCondition.timeoutOptionSelected = true : this.waitingCondition.timeoutOptionSelected = false;

      if (this.waitingCondition.selectedOption === 'Timeout')
        this.waitingCondition.data[0].value = this.waitingCondition.timeoutValue;
      else if (this.waitingCondition.selectedOption === 'Gina')
        this.waitingCondition.data[0].value = -1;

    },

    /*------------------------------------------------------------------------
    * Listener: to dropDispenserModule.selectedOption
    * ------------------------------------------------------------------------*/
    'dropDispenserModule.selectedOption'() {
      this.dropDispenserModule.selectedOption === 'None' ?
          this.dropDispenserModule.data[0].value = 0 : this.dropDispenserModule.data[0].value = 1;

    }
    ,
    /*------------------------------------------------------------------------
    * Listener: to liquidDispenserModule.selectedSP1
    * ------------------------------------------------------------------------*/
    'liquidDispenserModule.selectedSP1'() {

      this.liquidDispenserModule.sp1Quantity = 0;
      this.liquidDispenserModule.sp1VolumeSelected = false;

      if (this.liquidDispenserModule.selectedSP1 === 'Volume')
        this.liquidDispenserModule.sp1VolumeSelected = true;
      else
        this.liquidDispenserModule.data[0].sP1P = this.liquidDispenserModule.selectedSP1;


      document.getElementById('volumeSp1Input').value = 0;
    }
    ,
    /*------------------------------------------------------------------------
    * Listener: to liquidDispenserModule.selectedSP2
    * ------------------------------------------------------------------------*/
    'liquidDispenserModule.selectedSP2'() {

      this.liquidDispenserModule.data[0].sP2P = 0;
      this.liquidDispenserModule.sp2VolumeSelected = false;

      if (this.liquidDispenserModule.selectedSP2 === 'Volume')
        this.liquidDispenserModule.sp2VolumeSelected = true;
      else
        this.liquidDispenserModule.data[0].sP2P = this.liquidDispenserModule.selectedSP2;

      document.getElementById('volumeSp2Input').value = 0;
    }
    ,
    /*------------------------------------------------------------------------
    * Listener: to liquidDispenserModule.selectedSP3
    * ------------------------------------------------------------------------*/
    'liquidDispenserModule.selectedSP3'() {

      this.liquidDispenserModule.data[0].sP3P = 0;
      this.liquidDispenserModule.sp3VolumeSelected = false;

      if (this.liquidDispenserModule.selectedSP3 === 'Volume')
        this.liquidDispenserModule.sp3VolumeSelected = true;
      else
        this.liquidDispenserModule.data[0].sP3P = this.liquidDispenserModule.selectedSP3;

      document.getElementById('volumeSp3Input').value = 0;
    }
    ,
    /*------------------------------------------------------------------------
    * Listener: to tlcMigrationModule.selectedOption
    * ------------------------------------------------------------------------*/
    'tlcMigrationModule.selectedOption'() {

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
    }
    ,
    /*------------------------------------------------------------------------
    * Listener: to phMeterModule.selectedOption
    * ------------------------------------------------------------------------*/
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

    }
    ,

  }
  ,

  methods: {

    /*------------------------------------------------------------------------
    * Method to reset tables after a step is set
    * ------------------------------------------------------------------------*/
    resetPlatformTables() {

      this.waitingCondition.selectedOption = 'None';
      this.comment = '';

      document.getElementById('volumeSp1Input').value = 0;
      document.getElementById('volumeSp2Input').value = 0;
      document.getElementById('volumeSp3Input').value = 0;
      if (this.liquidDispenserModule.sp1Quantity !== 0) {

        this.liquidDispenserModule.sp1Quantity = 0;
      }
      if (this.liquidDispenserModule.sp2Quantity !== 0) {

        this.liquidDispenserModule.sp2Quantity = 0;
      }

      if (this.liquidDispenserModule.sp3Quantity !== 0) {

        this.liquidDispenserModule.sp3Quantity = 0;
      }

    }
    ,

    /*------------------------------------------------------------------------
    * LiquidDispenser: Method used to set each pinch valve value
    * ------------------------------------------------------------------------*/
    setStepValues(angle, servoKey) {
      angle = parseInt(angle);
      if (angle === 0)
        this.liquidDispenserModule.data[0][servoKey] = 0;
      else if (angle === 15)
        this.liquidDispenserModule.data[0][servoKey] = 1;
      else
        this.liquidDispenserModule.data[0][servoKey] = 2;
    }
    ,

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

      // Initialize the PS positions
      this.liquidDispenserModule.sP1PAbsolutePosition = document.getElementById('ps1AbsolutePosition').value;

    }
    ,

    /*--------------------------------------------------------------------------
    * Retrieves all Ip addresses from database
    * --------------------------------------------------------------------------*/
    fetchNetworkByName(name) {
      axios
          .get('http://' + this.$aurasApi + "api/networks/byName?name=" + name)
          .then(
              (response) => {
                if (response.status === 200) {
                  let network = response.data;
                  this.webSocket.ipAddress = network['ipAddress'];
                  this.connectToWebSocket();
                }
              })
          .catch(
              (error) => {
                console.log(error.data)
              });
    }
    ,
    /*--------------------------------------------------------------------------
    * Connection to websocket
    * -------------------------------------------------------------------------*/
    connectToWebSocket() {

      console.log("Starting connection to WebSocket Server");

      try {
        this.connection = new WebSocket('ws://' + this.webSocket.ipAddress);
      } catch (Exception) {
        console.log(Exception.message)
      }

      this.connection.onmessage = (event) => {
        this.extractDataSentFromSocket(event.data);
      }
      this.connection.onopen = function (event) {
        console.log(event);
        console.log("Successfully connected to the ESP32 websocket server!");
      }
      this.connection.onclose = function (event) {
        console.log(event);
        console.log("Disconnected from websocket");
      }
      this.connection.onerror = function (event) {
        console.log(event);
        console.log("Error connecting to websocket");
      }
    }
    ,

    /*------------------------------------------------------------------------
        * Method used to rotate pinch valves physically
        * ------------------------------------------------------------------------*/
    rotate(id) {

      if (this.mode !== 'config') return;

      this.angle = 0;
      if (document.getElementById(id).style.transform !== '')
        this.angle = parseInt(document.getElementById(id).style.transform.match(/\d+/)[0]);

      if (id === 'ldS7' || id === 'ldS8') {

        if (this.angle === 0) this.angle = 50;
        else if (this.angle === 50) this.angle = -50;
        if (document.getElementById(id).style.transform.includes('-')) this.angle = 0;

      } else {
        if (this.angle === 0) this.angle = 15;
        else if (this.angle === 15) this.angle = -20;
        if (document.getElementById(id).style.transform.includes('-')) this.angle = 0;

      }

      this.setModulePhysicalPosition(this.liquidDispenserModule, this.angle, id);

    }
    ,
    /*--------------------------------------------------------------------------
    * Extracts info from received Json
    * -------------------------------------------------------------------------*/
    extractDataSentFromSocket(data) {

      if (data === '') return;
      if (data === undefined) return;

      const obj = JSON.parse(data);
      if (obj === null) return;

      //LDS

      if (obj.tlcMigration !== undefined)
        this.tlcMigrationModule.selectedOption = this.tlcMigrationModule.items[obj.tlcMigration];

      if (obj.phMeter !== undefined)
        this.phMeterModule.selectedOption = this.phMeterModule.items[obj.phMeter];

      if (obj.dropDispenser !== undefined)
        this.dropDispenserModule.selectedOption = this.dropDispenserModule.items[obj.dropDispenser];

      if (obj.LDS1 !== undefined) {
        this.setStepValues(obj.LDS1, 'ldS1');
        document.getElementById('ldS1').style.transform = 'rotate(' + obj.LDS1 + 'deg)';
      }

      if (obj.LDS2 !== undefined) {
        this.setStepValues(obj.LDS2, 'ldS2');
        document.getElementById('ldS2').style.transform = 'rotate(' + obj.LDS2 + 'deg)';
      }

      if (obj.LDS3 !== undefined) {
        this.setStepValues(obj.LDS3, 'ldS3');
        document.getElementById('ldS3').style.transform = 'rotate(' + obj.LDS3 + 'deg)';
      }

      if (obj.LDS4 !== undefined) {
        this.setStepValues(obj.LDS1, 'ldS4');
        document.getElementById('ldS4').style.transform = 'rotate(' + obj.LDS4 + 'deg)';
      }

      if (obj.LDS5 !== undefined) {
        this.setStepValues(obj.LDS5, 'ldS5');
        document.getElementById('ldS5').style.transform = 'rotate(' + obj.LDS5 + 'deg)';
      }

      if (obj.LDS6 !== undefined) {
        this.setStepValues(obj.LDS6, 'ldS6');
        document.getElementById('ldS6').style.transform = 'rotate(' + obj.LDS6 + 'deg)';
      }

      if (obj.LDS7 !== undefined) {
        this.setStepValues(obj.LDS7, 'ldS7');
        document.getElementById('ldS7').style.transform = 'rotate(' + obj.LDS7 + 'deg)';
      }

      if (obj.LDS8 !== undefined) {
        this.setStepValues(obj.LDS8, 'ldS8');
        document.getElementById('ldS8').style.transform = 'rotate(' + obj.LDS8 + 'deg)';
      }

      if (obj.LDS9 !== undefined) {
        this.setStepValues(obj.LDS9, 'ldS9');
        document.getElementById('ldS9').style.transform = 'rotate(' + obj.LDS9 + 'deg)';
      }

      if (obj.LDS10 !== undefined) {
        this.setStepValues(obj.LDS10, 'ldS10');
        document.getElementById('ldS10').style.transform = 'rotate(' + obj.LDS10 + 'deg)';
      }

      if (obj.LDS11 !== undefined) {
        this.setStepValues(obj.LDS11, 'ldS11');
        document.getElementById('ldS11').style.transform = 'rotate(' + obj.LDS11 + 'deg)';
      }

      if (obj.LDS12 !== undefined) {
        this.setStepValues(obj.LDS1, 'ldS12');
        document.getElementById('ldS12').style.transform = 'rotate(' + obj.LDS12 + 'deg)';
      }

      //PS
      if (obj.SP1CurrentPosition !== undefined) {

        let value = parseInt(parseInt(obj.SP1CurrentPosition) / 1000);
        document.getElementById("ps1AbsolutePosition").innerText = value;
        this.sp1Width = value / 10 + '%';
        this.liquidDispenserModule.sP1PAbsolutePosition = value;

        if (obj.stage !== undefined && obj.stage === 'init') {

          this.liquidDispenserModule.sP1PAbsolutePosition = value;
          console.log('sP1PAbsolutePosition :', (this.liquidDispenserModule.sP1PAbsolutePosition));

        } else {
          if (!this.liquidDispenserModule.sp1VolumeUsed) {
            let quantity = value - this.liquidDispenserModule.sP1PAbsolutePosition;
            this.liquidDispenserModule.data[0].sP1P = document.getElementById("volumeSp1Input").value = quantity;
          }

        }

      }

      if (obj.SP1MaxSpeed !== undefined) {
        let maxSpeed = parseInt(obj.SP1MaxSpeed) / 1000;
        this.liquidDispenserModule.data[0].sP1S = maxSpeed;
        this.liquidDispenserModule.sp1MaxSpeed = maxSpeed;
        document.getElementById("ps1SpeedLabel").innerText = "Max Speed: " + maxSpeed + " µL/s";
        document.getElementById("ps1SpeedLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModule.sp1CurrentSpeed + " µL/s";

        //Init max speed range
        if (obj.stage !== undefined && obj.stage === 'init')
          document.getElementById("ps1SpeedRange").value = maxSpeed;
      }

      if (obj.SP1Speed !== undefined) {
        let currentSpeed = parseInt(obj.SP1Speed) / 1000;
        this.liquidDispenserModule.sp1CurrentSpeed = currentSpeed;
        currentSpeed = currentSpeed.toFixed(0);
        document.getElementById("ps1SpeedLabel").innerText = "Max Speed: " + this.liquidDispenserModule.sp1MaxSpeed + " µL/s";
        document.getElementById("ps1SpeedLabel").innerHTML += "\nCurrent Speed: " + currentSpeed + " µL/s";
      }

      if (obj.SP2CurrentPosition !== undefined) {

        let value = parseInt(parseInt(obj.SP2CurrentPosition) / 1000);
        document.getElementById("ps2AbsolutePosition").innerText = value;
        this.liquidDispenserModule.sP2PAbsolutePosition = value;
        this.sp2Width = value / 10 + '%';

        if (!this.liquidDispenserModule.sp2VolumeUsed) {
          let quantity = value - this.liquidDispenserModule.sP2PAbsolutePosition;
          this.liquidDispenserModule.data[0].sP2P = document.getElementById("volumeSp2Input").value = quantity;

        }

        // Init PS Absolute position
        if (obj.stage !== undefined && obj.stage === 'init') {
          this.liquidDispenserModule.sP2PAbsolutePosition = value;
        }
      }

      if (obj.SP2MaxSpeed !== undefined) {
        let maxSpeed = parseInt(obj.SP2MaxSpeed) / 1000;
        this.liquidDispenserModule.data[0].sP2S = maxSpeed;
        this.liquidDispenserModule.sp2MaxSpeed = maxSpeed;
        document.getElementById("ps2SpeedLabel").innerText = "Max Speed: " + maxSpeed + " µL/s";
        document.getElementById("ps2SpeedLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModule.sp2CurrentSpeed + " µL/s";

        // Init max speed range
        if (obj.stage !== undefined && obj.stage === 'init')
          document.getElementById("ps2SpeedRange").value = maxSpeed;
      }

      if (obj.SP2Speed !== undefined) {
        let currentSpeed = parseInt(obj.SP2Speed) / 1000;
        currentSpeed = currentSpeed.toFixed(0);
        this.liquidDispenserModule.sp2CurrentSpeed = currentSpeed;
        document.getElementById("ps2SpeedLabel").innerText = "Max Speed: " + this.liquidDispenserModule.sp2MaxSpeed + " µL/s";
        document.getElementById("ps2SpeedLabel").innerHTML += "\nCurrent Speed: " + currentSpeed + " µL/s";
      }

      if (obj.SP3CurrentPosition !== undefined) {

        let value = parseInt(parseInt(obj.SP3CurrentPosition) / 1000);
        document.getElementById("ps3AbsolutePosition").innerText = value;
        this.liquidDispenserModule.sP3PAbsolutePosition = value;
        this.sp3Width = value / 10 + '%';

        if (!this.liquidDispenserModule.sp3VolumeUsed)
          this.liquidDispenserModule.data[0].sP3P = document.getElementById("volumeSp3Input").value = value - this.liquidDispenserModule.sP3PAbsolutePosition;

        // Init PS Absolute position
        if (obj.stage !== undefined && obj.stage === 'init') {
          this.liquidDispenserModule.sP3PAbsolutePosition = value;
          console.log('sP3PAbsolutePosition :', (this.liquidDispenserModule.sP3PAbsolutePosition));
        }
      }

      if (obj.SP3MaxSpeed !== undefined) {
        let maxSpeed = parseInt(obj.SP3MaxSpeed) / 1000;
        this.liquidDispenserModule.data[0].sP3S = maxSpeed;
        this.liquidDispenserModule.sp3MaxSpeed = maxSpeed;
        document.getElementById("ps3SpeedLabel").innerText = "Max Speed: " + maxSpeed + " µL/s";
        document.getElementById("ps3SpeedLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModule.sp3CurrentSpeed + " µL/s";

        // Init max speed range
        if (obj.stage !== undefined && obj.stage === 'init')
          document.getElementById("ps3SpeedRange").value = maxSpeed;
      }

      if (obj.SP3Speed !== undefined) {
        let currentSpeed = parseInt(obj.SP3Speed) / 1000;
        currentSpeed = currentSpeed.toFixed(0);
        this.liquidDispenserModule.sp3CurrentSpeed = currentSpeed;
        document.getElementById("ps3SpeedLabel").innerText = "Max Speed: " + this.liquidDispenserModule.sp3MaxSpeed + " µL/s";
        document.getElementById("ps3SpeedLabel").innerHTML += "\nCurrent Speed: " + currentSpeed + " µL/s";
      }

      if (obj.PUMP1CurrentPosition !== undefined) {
        let value = parseInt(obj.PUMP1CurrentPosition / 360).toFixed(1);
        this.liquidDispenserModule.data[0].pumP1P = value;
        document.getElementById("pump1Input").value = value;
      }

      if (obj.PUMP1MaxSpeed !== undefined) {
        let value = parseInt(obj.PUMP1MaxSpeed / 6).toFixed(0);
        document.getElementById("pumpsLabel").innerText = "Pump Speed: " + value + " RPM";
        this.liquidDispenserModule.data[0].pumP1S = value;
        if (obj.stage !== undefined && obj.stage === 'init')
          document.getElementById("pumSpeed").value = value;

      }

      console.log('received: ', data);
    },

    /*--------------------------------------------------------------------------
    * Set the position of a given module
    * -------------------------------------------------------------------------*/
    setModulePhysicalPosition(module, value, componentId) {

      if (this.mode !== 'config') return;

      if (module.name.toLowerCase().includes('tlc')) {
        let data = {TLCMigration: {MoveTo: parseInt(module.items.indexOf(value))}};
        this.sendToWebsocket(data);
      }
      if (module.name.toLowerCase().includes('ph')) {
        let data = {PHMeter: {MoveTo: parseInt(module.items.indexOf(value))}};
        this.sendToWebsocket(data);
      }
      if (module.name.toLowerCase().includes('drop')) {
        let data = {DropDispenser: {MoveTo: parseInt(module.items.indexOf(value))}};
        this.sendToWebsocket(data);
      }
      if (module.name.toLowerCase().includes('liquid')) {

        if (componentId !== undefined && componentId !== '') {

          if (componentId === 'ldS1') {
            let data = {LDS1: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS2') {
            let data = {LDS2: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS3') {
            let data = {LDS3: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS3') {
            let data = {LDS3: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS4') {
            let data = {LDS4: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS5') {
            let data = {LDS5: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS6') {
            let data = {LDS6: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS7') {
            let data = {LDS7: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS8') {
            let data = {LDS8: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS9') {
            let data = {LDS9: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS10') {
            let data = {LDS10: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS11') {
            let data = {LDS11: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ldS12') {
            let data = {LDS12: {MoveTo: parseInt(value)}};
            this.sendToWebsocket(data);
          }

          if (componentId === 'volumeSp1Input') {
            this.liquidDispenserModule.sp1Quantity = parseInt(value);

            if ((this.liquidDispenserModule.sp1Quantity < 0 && this.liquidDispenserModule.sP1PAbsolutePosition + this.liquidDispenserModule.sp1Quantity < 0)
                || this.liquidDispenserModule.sp1Quantity > 0 && this.liquidDispenserModule.sP1PAbsolutePosition + this.liquidDispenserModule.sp1Quantity > 1000) {

              this.overflowDialog.message = "The limit has been exceeded";
              this.overflowDialog.open = true;
              this.liquidDispenserModule.sp1Quantity = 0;
              document.getElementById('volumeSp1Input').value = 0;

            } else {
              let data = {SP1: {MoveTo: parseInt(value)}};
              this.liquidDispenserModule.data[0].sP1P = parseInt(value);
              this.liquidDispenserModule.sp1VolumeUsed = true;
              this.sendToWebsocket(data);
            }
          }

          if (componentId === 'volumeSp2Input') {

            this.liquidDispenserModule.sp2Quantity = parseInt(value);

            if ((this.liquidDispenserModule.sp2Quantity < 0 && this.liquidDispenserModule.sP2PAbsolutePosition + this.liquidDispenserModule.sp2Quantity < 0)
                || this.liquidDispenserModule.sp2Quantity > 0 && this.liquidDispenserModule.sP2PAbsolutePosition + this.liquidDispenserModule.sp2Quantity > 1000) {

              this.overflowDialog.message = "The limit has been exceeded";
              this.overflowDialog.open = true;
              this.liquidDispenserModule.sp2Quantity = 0;
              document.getElementById('volumeSp2Input').value = 0;
            } else {
              let data = {SP2: {MoveTo: parseInt(value)}};
              this.liquidDispenserModule.data[0].sP2P = parseInt(value);
              this.liquidDispenserModule.sp2VolumeUsed = true;
              this.sendToWebsocket(data);
            }
          }

          if (componentId === 'volumeSp3Input') {
            this.liquidDispenserModule.sp3Quantity = parseInt(value);

            if ((this.liquidDispenserModule.sp3Quantity < 0 && this.liquidDispenserModule.sP3PAbsolutePosition + this.liquidDispenserModule.sp3Quantity < 0)
                || this.liquidDispenserModule.sp3Quantity > 0 && this.liquidDispenserModule.sP3PAbsolutePosition + this.liquidDispenserModule.sp3Quantity > 1000) {

              this.overflowDialog.message = "The limit has been exceeded";
              this.overflowDialog.open = true;
              this.liquidDispenserModule.sp3Quantity = 0;
              document.getElementById('volumeSp3Input').value = 0;

            } else {
              let data = {SP3: {MoveTo: parseInt(value)}};
              this.liquidDispenserModule.data[0].sP3P = parseInt(value);
              this.liquidDispenserModule.sp3VolumeUsed = true;
              this.sendToWebsocket(data);
            }
          }
          if (componentId === 'pump1Input') {
            this.liquidDispenserModule.sp3Quantity = parseInt(value);
            let data = {PUMP1: {PUMP1TargetPosition: parseInt(value) * 360}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ps1SpeedRange') {
            let data = {SP1: {SetMaxSpeed: parseInt(value) * 1000}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ps2SpeedRange') {
            let data = {SP2: {SetMaxSpeed: parseInt(value) * 1000}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'ps3SpeedRange') {
            let data = {SP3: {SetMaxSpeed: parseInt(value) * 1000}};
            this.sendToWebsocket(data);
          }
          if (componentId === 'pumSpeed') {
            let data = {PUMP1: {SetMaxSpeed: parseInt(value) * 6}};
            this.sendToWebsocket(data);
          }
        }
      }
    },

    /*------------------------------------------------------------------------
    * Moves the PS up or down
    * ------------------------------------------------------------------------*/
    moveStepperMotors(id, click) {

      this.noRotation = true;
      this.liquidDispenserModule.sp3VolumeUsed = false;
      this.liquidDispenserModule.sp2VolumeUsed = false;
      this.liquidDispenserModule.sp1VolumeUsed = false;

      switch (id) {

        case 'sp1Up':
          if (click === 'mousedown') {

            let data = {SP1: {MoveTo: 1000000}};
            this.sendToWebsocket(data);

          } else {
            let data = {SP1: {Stop: true}};
            this.sendToWebsocket(data);
          }
          break;

        case 'sp1Down':
          if (click === 'mousedown') {
            let data = {SP1: {MoveTo: -3000000}};
            this.sendToWebsocket(data);
          } else {
            let data = {SP1: {Stop: true}};
            this.sendToWebsocket(data);
          }
          break;

        case 'sp2Up':

          if (click === 'mousedown') {
            let data = {SP2: {MoveTo: 1000000}};
            this.sendToWebsocket(data);
          } else {
            let data = {SP2: {Stop: true}};
            this.sendToWebsocket(data);
          }
          break;

        case 'sp2Down':
          if (click === 'mousedown') {
            let data = {SP2: {MoveTo: -3000000}};
            this.sendToWebsocket(data);
          } else {
            let data = {SP2: {Stop: true}};
            this.sendToWebsocket(data);
          }
          break;

        case 'sp3Up':
          if (click === 'mousedown') {
            let data = {SP3: {MoveTo: 1000000}};
            this.sendToWebsocket(data);
          } else {
            let data = {SP3: {Stop: true}};
            this.sendToWebsocket(data);
          }
          break;

        case 'sp3Down':
          if (click === 'mousedown') {
            let data = {SP3: {MoveTo: -3000000}};
            this.sendToWebsocket(data);
          } else {
            let data = {SP3: {Stop: true}};
            this.sendToWebsocket(data);
          }
          break;

        case 'pumpLeft':

          this.rotateLeft = click === 'mousedown';
          this.noRotation = click !== 'mousedown';

          if (click === 'mousedown') {
            let data = {PUMP1: {MoveTo: -3000000}};
            this.sendToWebsocket(data);
          } else {
            let data = {PUMP1: {Stop: true}};
            this.sendToWebsocket(data);
          }
          break;

        case 'pumpRight':
          this.rotateRight = click === 'mousedown';
          this.noRotation = click !== 'mousedown';

          if (click === 'mousedown') {
            let data = {PUMP1: {MoveTo: 3000000}};
            this.sendToWebsocket(data);
          } else {
            let data = {PUMP1: {Stop: true}};
            this.sendToWebsocket(data);
          }
          break;

        default:
          break;
      }

    }
    ,
    /*--------------------------------------------------------------------------
     * Sends Json to websocket
     * -------------------------------------------------------------------------*/
    sendToWebsocket(data) {
      this.connection.send(JSON.stringify(data));
      console.log('sent:', data)
    }
    ,


  }
}
</script>

<style scoped>

/*general tags*/
.table {
  z-index: 2;
}

div:disabled {
  display: none;
}

select {
  border: 1px solid black;
  border-radius: 3px;
  height: fit-content;
  width: fit-content;
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
}

.button {
  background-color: #0394fc;
  border-radius: 3px;
  height: fit-content;
  width: 50px;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
}

.input-text {
  height: fit-content;
  width: 100px;
  border: 1px solid black;
  border-radius: 4px;

}

*:disabled {
  background-color: white !important;
  color: white !important;
  border-color: white !important;
}

.module-title-color {
  color: dodgerblue;
}

.card-text {
  color: black !important;
  font-size: 18px;
  margin-top: 20px;
}

#platform {
  position: relative;
}

#scroll-snap-container {
  height: auto;
}

#image-container {
  position: absolute;
  min-width: 100%;

}

/*module titles*/

#tlc_title {
  height: fit-content;
  margin-left: 20px;
  margin-top: 20px;
}

#ph_title {
  height: fit-content;
  margin-top: 20px;
  margin-left: 200px;

}

#dd_title {
  height: fit-content;
  margin-top: 20px;
  margin-left: 50px;
}

#ld_title {
  height: fit-content;
  margin-top: 20px;
  margin-left: 400px;
}

/*modules*/

/*TLC Migration*/
#tlc_btn_0 {
  height: fit-content;
  margin-top: 200px;
  margin-left: -100px;
}

#tlc_btn_1 {
  height: fit-content;
  margin-top: 200px;
  margin-left: -0px;
}

#tlc_btn_2 {
  height: fit-content;
  margin-top: 200px;
  margin-left: 5px;
}

#tlc_btn_3 {
  height: fit-content;
  margin-top: 200px;
  margin-left: 10px;
}

/*PH Meter*/


#phm_btn_0 {
  height: fit-content;
  margin-top: 200px;
  margin-left: -150px;
}

#phm_btn_1 {
  height: fit-content;
  margin-top: 200px;
  margin-left: -0px;
}

#phm_btn_2 {
  height: fit-content;
  margin-top: 200px;
  margin-left: 5px;
}

#phm_btn_3 {
  height: fit-content;
  margin-top: 200px;
  margin-left: 10px;
}

#phm_btn_4 {
  height: fit-content;
  margin-top: 200px;
  margin-left: 15px;
}

#phm_btn_5 {
  height: fit-content;
  margin-top: 200px;
  margin-left: 20px;
}

/*Drop Dispenser*/


#dd_btn_0 {
  height: fit-content;
  margin-top: 200px;
  margin-left: -100px;
}

#dd_btn_1 {
  height: fit-content;
  margin-top: 200px;
  margin-left: -0px;
}

/* Liquid Dispenser */

#liquid-dispenser-body {
  height: 700px;
  width: 1200px;
  margin-left: -480px;
  margin-top: 180px;


}

/* syringes */

#select-sp3 {
  margin-left: -1000px;
  z-index: 1;
}

#volumeSp3Up {
  margin-left: 20px;
}

#volumeSp3Down {
  margin-left: 5px;
  background-color: #e07b39;
}

#volumeSp3Input {
  margin-left: -102px;
  margin-top: 130px;
}

#ps3SpeedLabel {
  margin-left: -270px;
  font-size: 12px;
  margin-top: 120px;
  height: fit-content;
  width: 160px;
  resize: none;
}

#ps3SpeedRange {
  margin-left: -150px;
  margin-top: 160px;
  height: fit-content;
}


#select-sp1 {
  margin-left: 200px;
  z-index: 1;
}

#volumeSp1Up {
  margin-left: 20px;
  z-index: 2;
}

#volumeSp1Down {
  margin-left: 5px;
  background-color: #e07b39;
}

#volumeSp1Input {
  margin-left: -102px;
  margin-top: 130px;
}

#ps1SpeedRange {
  margin-left: -150px;
  margin-top: 160px;
  height: fit-content;
}

#ps1SpeedLabel {
  margin-left: -260px;
  font-size: 12px;
  margin-top: 120px;
  height: fit-content;
  width: 150px;
  resize: none;
}

#select-sp2 {
  margin-left: 220px;
  z-index: 1;
}

#volumeSp2Up {
  margin-left: 20px;
}

#volumeSp2Down {
  margin-left: 5px;
  background-color: #e07b39;
}

#volumeSp2Input {
  margin-left: -102px;
  margin-top: 130px;
}

#ps2SpeedRange {
  margin-left: -150px;
  margin-top: 160px;
  height: fit-content;
}

#ps2SpeedLabel {
  margin-left: -270px;
  font-size: 12px;
  margin-top: 120px;
  height: fit-content;
  width: 160px;
  resize: none;
}


/*pump*/

#pumpLeft {
  margin-left: -360px;
  margin-top: 350px;
}

#pumpRight {
  margin-left: 5px;
  margin-top: 350px;
  background-color: #e07b39;
}

#pump1Input {
  margin-left: 25px;
  margin-top: 350px;
}

#pumSpeed {
  margin-left: -230px;
  margin-top: 430px;
  height: fit-content;
}

#pumpsLabel {
  margin-left: -130px;
  margin-top: 380px;
  font-size: 12px;
  height: fit-content;
  width: 150px;
  resize: none;
}

/*pinch valves*/

.pinch {
  height: 60px;
  width: 60px;
  display: inline-block;
}

#ldS1 {
  margin-left: -785px;
  margin-top: 350px;
  display: inline-block;

}

#ldS2 {
  margin-left: -60px;
  margin-top: 435px;
  display: inline-block;
}

#ldS3 {
  margin-left: -60px;
  margin-top: 520px;
  display: inline-block;
}

#ldS4 {
  margin-left: -60px;
  margin-top: 605px;
  display: inline-block;
}

#ldS5 {
  margin-left: -60px;
  margin-top: 690px;
  display: inline-block;
}

#ldS6 {
  margin-left: -338px;
  margin-top: 690px;
  display: inline-block;
}

#ldS7 {
  margin-left: 75px;
  margin-top: 738px;
  height: 120px;
  width: 120px;
  display: inline-block;
}

#ldS8 {
  margin-left: 200px;
  margin-top: 738px;
  height: 120px;
  width: 120px;
  display: inline-block;
}

#ldS9 {
  margin-left: 21px;
  margin-top: 690px;
  display: inline-block;
}

#ldS10 {
  margin-left: 50px;
  margin-top: 680px;
  display: inline-block;
}

#ldS11 {
  margin-left: 75px;
  margin-top: 750px;
  display: inline-block;
}

#ldS12 {
  margin-left: 90px;
  margin-top: 750px;
  display: inline-block;
}

#PS1PProgressbar {
  width: 155px;
  height: 15px;
  margin-top: 570px;
  margin-left: 165px;
}


.progressbar-wrapper {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
  background-color: lightgray;
  color: white;
  border-radius: 5px;
  font-size: 12px;
}

.progressbar {
  background-color: red;
  height: 15px;
  border-radius: 5px;
}


#PS2PProgressbar {
  width: 155px;
  height: 15px;
  margin-top: 570px;
  margin-left: 317px;
}

#PS3PProgressbar {
  width: 155px;
  height: 15px;
  margin-top: 570px;
  margin-left: -635px;
  z-index: 1;

}

#wheelDiv {
  height: fit-content;
  margin-top: 530px;
  margin-left: -650px;
}

#wheelRight {
  height: 15%;
  max-width: 15%;
  -webkit-animation: spin 5s linear infinite;
  animation: spin 5s linear infinite;
}

#wheelLeft {
  height: 15%;
  max-width: 15%;
  -webkit-animation: spin1 5s linear infinite;
  animation: spin1 5s linear infinite;
}

#noWheel {
  height: 15%;
  max-width: 15%;

}


/* for Safari browser  */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.firstLineComponent {
  margin-top: 80px;
}

/* for Safari browser  */
@-webkit-keyframes spin1 {
  0% {
    -webkit-transform: rotate(360deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
  }
}

@keyframes spin1 {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>