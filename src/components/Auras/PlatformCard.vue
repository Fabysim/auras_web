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
        <input type="range" id="ps3SpeedRange" min="1" max="200"
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
        <input type="range" id="ps1SpeedRange" min="1" max="200"
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
        <input type="range" id="ps2SpeedRange" min="1" max="200"
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
               @change="event => setModulePhysicalPosition(liquidDispenserModule, event.target.value,'pump1Input')"/>

        <input type="range" id="pump1Speed" min="1" max="500"
               @input="event =>  setModulePhysicalPosition(liquidDispenserModule, event.target.value,'pump1Speed')"
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

          <img id="wheelRight" alt="" src="../../assets/LiquidDispenserImages/Pump1R.png"/>
          <img id="wheelLeft" alt="" src="../../assets/LiquidDispenserImages/Pump1L.png"/>

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

        rotateRight: false,
        rotateLeft: false,
        noRotation: true,
        totalOfSteps: 0,
        readOnly: false,
        sp1Width: '10%',
        sp2Width: '10%',
        sp3Width: '10%',
        wheelSpeed: '5',
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
          items: ['Volume', 'QC sample drop', 'Fill LAL cartridge'],
          selectedSP1: 'Volume',
          selectedSP2: 'Volume',
          selectedSP3: 'Volume',
          sp1VolumeSelected: true,
          sp2VolumeSelected: true,
          sp3VolumeSelected: true,
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
          pump1MaxSpeed: 0,
          sp1CurrentSpeed: 0,
          sp2CurrentSpeed: 0,
          sp3CurrentSpeed: 0,
          pump1CurrentSpeed: 0,

          pump1Quantity: 0,
          columns: [
            {text: "LDS1", value: "ldS1Info", width: 82, align: 'center'},
            {text: "LDS2", value: "ldS2Info", width: 82, align: 'center'},
            {text: "LDS3", value: "ldS3Info", width: 82, align: 'center'},
            {text: "LDS4", value: "ldS4Info", width: 82, align: 'center'},
            {text: "LDS5", value: "ldS5Info", width: 82, align: 'center'},
            {text: "LDS6", value: "ldS6Info", width: 82, align: 'center'},
            {text: "LDS7", value: "ldS7Info", width: 82, align: 'center'},
            {text: "LDS8", value: "ldS8Info", width: 82, align: 'center'},
            {text: "LDS9", value: "ldS9Info", width: 82, align: 'center'},
            {text: "LDS10", value: "ldS10Info", width: 82, sortable: false, align: 'center'},
            {text: "LDS11", value: "ldS11Info", width: 82, sortable: false, align: 'center'},
            {text: "LDS12", value: "ldS12Info", width: 82, sortable: false, align: 'center'},
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
              ldS1Info: '',
              ldS1: 0,
              ldS2Info: '',
              ldS2: 0,
              ldS3Info: '',
              ldS3: 0,
              ldS4Info: '',
              ldS4: 0,
              ldS5Info: '',
              ldS5: 0,
              ldS6Info: '',
              ldS6: 0,
              ldS7Info: '',
              ldS7: 0,
              ldS8Info: '',
              ldS8: 0,
              ldS9Info: '',
              ldS9: 0,
              ldS10Info: '',
              ldS10: 0,
              ldS11Info: '',
              ldS11: 0,
              ldS12Info: '',
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

    },
  },

  methods: {

    loadInitData() {
      let data = {
        sendData: true
      }
      this.sendToWebsocket(data);
    },

    /*------------------------------------------------------------------------
    * Method to reset tables after a step is set
    * ------------------------------------------------------------------------*/
    resetPlatformTables() {

      this.waitingCondition.selectedOption = 'None';
      this.comment = '';
    },

    /*------------------------------------------------------------------------
    * LiquidDispenser: Method used to set each pinch valve value
    * ------------------------------------------------------------------------*/
    setStepValues(angle, servoKey, displayedInfo) {

      this.liquidDispenserModule.data[0][servoKey] = parseInt(angle);

      if (angle === 0)
        this.liquidDispenserModule.data[0][displayedInfo] = 0;
      else if (angle > 0)
        this.liquidDispenserModule.data[0][displayedInfo] = 'Right';
      else
        this.liquidDispenserModule.data[0][displayedInfo] = 'Left';
    },

    /*------------------------------------------------------------------------
    * Method used to load modules names
    * ------------------------------------------------------------------------*/
    initialization() {

      if (this.mode === 'run') {

        document.getElementById('volumeSp1Input').disabled = true;
        document.getElementById('volumeSp2Input').disabled = true;
        document.getElementById('volumeSp3Input').disabled = true;
        document.getElementById('volumeSp1Up').disabled = true;
        document.getElementById('volumeSp2Up').disabled = true;
        document.getElementById('volumeSp3Up').disabled = true;
        document.getElementById('volumeSp1Down').disabled = true;
        document.getElementById('volumeSp2Down').disabled = true;
        document.getElementById('volumeSp3Down').disabled = true;
        document.getElementById('select-sp1').disabled = true;
        document.getElementById('select-sp2').disabled = true;
        document.getElementById('select-sp3').disabled = true;
        document.getElementById('ps1SpeedRange').disabled = true;
        document.getElementById('ps2SpeedRange').disabled = true;
        document.getElementById('ps3SpeedRange').disabled = true;
        document.getElementById('pumpLeft').disabled = true;
        document.getElementById('pumpRight').disabled = true;
        document.getElementById('pump1Speed').disabled = true;
        document.getElementById('pump1Input').disabled = true;

      }




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

    },

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
    },
    /*--------------------------------------------------------------------------
    * Connection to websocket
    * -------------------------------------------------------------------------*/
    connectToWebSocket() {

      try {
        if (this.$store.state.connectionWS === null) {

          console.log("Starting connection to WebSocket Server");

          this.$store.state.connectionWS = new WebSocket('ws://' + this.webSocket.ipAddress);
          this.$store.state.connectionWS.onmessage = (event) => {
            this.extractDataSentFromSocket(event.data);
          }
          this.$store.state.connectionWS.onopen = function (event) {
            console.log(event);
            console.log("Successfully connected to the ESP32 websocket server!");
            setTimeout(this.loadInitData, 1000);

          }
          this.$store.state.connectionWS.onclose = function (event) {
            console.log(event);
            console.log("Disconnected from websocket");

            // connection closed, discard old websocket and create a new one in 1s
            this.$store.state.connectionWS = null;
            setTimeout(this.connectToWebSocket, 1000);
          }
          this.$store.state.connectionWS.onerror = function (event) {
            console.log(event);
            console.log("Error connecting to websocket");
          }
        } else {

          this.loadInitData();
        }
      } catch (Exception) {
        console.log(Exception.message)
      }
    },

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

    },

    /*------------------------------------------------------------------------
    * Method used to rotate pinch valves physically
    * ------------------------------------------------------------------------*/
    manageRunStages(data) {
      const obj = JSON.parse(data);


      if (obj.status === 'success') {


        document.getElementById('wheelRight').hidden = true;
        document.getElementById('wheelLeft').hidden = true;


        switch (obj.stage) {

          case 'init':
            this.setDefaultSettings();
            break;

          case 'runMethod':
            if (obj.stepNumber === this.totalOfSteps - 1)
              this.$parent.stopMethodRun();
            else
              this.$parent.manageWaitingCondition();
            break;
          case 'runStep':

            break;

          case 'end':
            // End run
            // Initialize data
            break;
        }
        console.log('received:', obj);
      }
    },

    /*--------------------------------------------------------------------------
    * Extracts info from received Json
    * -------------------------------------------------------------------------*/
    extractDataSentFromSocket(data) {


      if (data === '') return;
      if (data === undefined) return;

      const obj = JSON.parse(data);
      if (obj === null) return;

      if (obj.stage !== undefined) {

        if (obj.stage === 'init') {
          this.setDefaultSettings();
        } else {

          this.manageRunStages(data);
          return;
        }
      }

      //TLCMigration
      if (obj.TLCMigration !== undefined)
        this.tlcMigrationModule.selectedOption = this.tlcMigrationModule.items[obj.TLCMigration];

      //PHMeter
      if (obj.PHMeter !== undefined)
        this.phMeterModule.selectedOption = this.phMeterModule.items[obj.PHMeter];

      //DropDispenser
      if (obj.DropDispenser !== undefined)
        this.dropDispenserModule.selectedOption = this.dropDispenserModule.items[obj.DropDispenser];

      //LDS
      if (obj.LDS1CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS1CurrentPosition, 'ldS1', 'ldS1Info');
        document.getElementById('ldS1').style.transform = 'rotate(' + obj.LDS1CurrentPosition + 'deg)';
      }

      if (obj.LDS2CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS2CurrentPosition, 'ldS2', 'ldS2Info');
        document.getElementById('ldS2').style.transform = 'rotate(' + obj.LDS2CurrentPosition + 'deg)';
      }

      if (obj.LDS3CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS3CurrentPosition, 'ldS3', 'ldS3Info');
        document.getElementById('ldS3').style.transform = 'rotate(' + obj.LDS3CurrentPosition + 'deg)';
      }

      if (obj.LDS4CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS4CurrentPosition, 'ldS4', 'ldS4Info');
        document.getElementById('ldS4').style.transform = 'rotate(' + obj.LDS4CurrentPosition + 'deg)';
      }

      if (obj.LDS5CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS5CurrentPosition, 'ldS5', 'ldS5Info');
        document.getElementById('ldS5').style.transform = 'rotate(' + obj.LDS5CurrentPosition + 'deg)';
      }

      if (obj.LDS6CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS6CurrentPosition, 'ldS6', 'ldS6Info');
        document.getElementById('ldS6').style.transform = 'rotate(' + obj.LDS6CurrentPosition + 'deg)';
      }

      if (obj.LDS7CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS7CurrentPosition, 'ldS7', 'ldS7Info');
        document.getElementById('ldS7').style.transform = 'rotate(' + obj.LDS7CurrentPosition + 'deg)';
      }

      if (obj.LDS8CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS8CurrentPosition, 'ldS8', 'ldS8Info');
        document.getElementById('ldS8').style.transform = 'rotate(' + obj.LDS8CurrentPosition + 'deg)';
      }

      if (obj.LDS9CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS9CurrentPosition, 'ldS9', 'ldS9Info');
        document.getElementById('ldS9').style.transform = 'rotate(' + obj.LDS9CurrentPosition + 'deg)';
      }

      if (obj.LDS10CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS10CurrentPosition, 'ldS10', 'ldS10Info');
        document.getElementById('ldS10').style.transform = 'rotate(' + obj.LDS10CurrentPosition + 'deg)';
      }

      if (obj.LDS11CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS11CurrentPosition, 'ldS11', 'ldS11Info');
        document.getElementById('ldS11').style.transform = 'rotate(' + obj.LDS11CurrentPosition + 'deg)';
      }

      if (obj.LDS12CurrentPosition !== undefined) {
        this.setStepValues(obj.LDS12CurrentPosition, 'ldS12', 'ldS12Info');
        document.getElementById('ldS12').style.transform = 'rotate(' + obj.LDS12CurrentPosition + 'deg)';
      }

      // SP1 Absolute position
      if (obj.SP1CurrentPosition !== undefined) {

        let value = parseInt(obj.SP1CurrentPosition) / 1000;
        document.getElementById("ps1AbsolutePosition").innerText = value.toFixed(0);
        this.liquidDispenserModule.data[0].sP1P = document.getElementById("volumeSp1Input").value = value.toFixed(0);
        this.liquidDispenserModule.sP1PAbsolutePosition = value;
        this.sp1Width = value / 10 + '%';


      }

      // SP1 Relative position
      if (obj.SP1CurrentRelativePosition !== undefined) {
        let value = parseInt(obj.SP1CurrentRelativePosition) / 1000;
        this.liquidDispenserModule.data[0].sP1P = document.getElementById("volumeSp1Input").value = value.toFixed(0);
      }

      // SP1 Max speed
      if (obj.SP1MaxSpeed !== undefined) {
        let maxSpeed = parseInt(obj.SP1MaxSpeed) / 1000;
        this.liquidDispenserModule.data[0].sP1S = maxSpeed;
        this.liquidDispenserModule.sp1MaxSpeed = maxSpeed;
        document.getElementById("ps1SpeedLabel").innerText = "Max Speed: " + maxSpeed + " µL/s";
        document.getElementById("ps1SpeedLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModule.sp1CurrentSpeed + " µL/s";

        //Init max speed range
        document.getElementById("ps1SpeedRange").value = maxSpeed;
      }

      // SP1 Current Speed
      if (obj.SP1Speed !== undefined) {
        let currentSpeed = parseInt(obj.SP1Speed) / 1000;
        this.liquidDispenserModule.sp1CurrentSpeed = currentSpeed;
        currentSpeed = currentSpeed.toFixed(0);
        document.getElementById("ps1SpeedLabel").innerText = "Max Speed: " + this.liquidDispenserModule.sp1MaxSpeed + " µL/s";
        document.getElementById("ps1SpeedLabel").innerHTML += "\nCurrent Speed: " + currentSpeed + " µL/s";
      }

      // SP2 Absolute position
      if (obj.SP2CurrentPosition !== undefined) {

        let value = parseInt(obj.SP2CurrentPosition) / 1000;
        document.getElementById("ps2AbsolutePosition").innerText = value.toFixed(0);
        this.liquidDispenserModule.data[0].sP2P = document.getElementById("volumeSp2Input").value = value.toFixed(0);
        this.liquidDispenserModule.sP2PAbsolutePosition = value;
        this.sp2Width = value / 10 + '%';


        // Init PS Absolute position
        this.liquidDispenserModule.sP2PAbsolutePosition = value;

      }

      // SP2 Relative position
      if (obj.SP2CurrentRelativePosition !== undefined) {
        let value = parseInt(obj.SP2CurrentRelativePosition) / 1000;
        this.liquidDispenserModule.data[0].sP2P = document.getElementById("volumeSp2Input").value = value.toFixed(0);

      }

      // SP2 Max speed
      if (obj.SP2MaxSpeed !== undefined) {
        let maxSpeed = parseInt(obj.SP2MaxSpeed) / 1000;
        this.liquidDispenserModule.data[0].sP2S = maxSpeed;
        this.liquidDispenserModule.sp2MaxSpeed = maxSpeed;
        document.getElementById("ps2SpeedLabel").innerText = "Max Speed: " + maxSpeed + " µL/s";
        document.getElementById("ps2SpeedLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModule.sp2CurrentSpeed + " µL/s";

        // Init max speed range
        document.getElementById("ps2SpeedRange").value = maxSpeed;
      }

      // SP2 Current speed
      if (obj.SP2Speed !== undefined) {
        let currentSpeed = parseInt(obj.SP2Speed) / 1000;
        currentSpeed = currentSpeed.toFixed(0);
        this.liquidDispenserModule.sp2CurrentSpeed = currentSpeed;
        document.getElementById("ps2SpeedLabel").innerText = "Max Speed: " + this.liquidDispenserModule.sp2MaxSpeed + " µL/s";
        document.getElementById("ps2SpeedLabel").innerHTML += "\nCurrent Speed: " + currentSpeed + " µL/s";
      }

      // SP3 Absolute position
      if (obj.SP3CurrentPosition !== undefined) {

        let value = parseInt(obj.SP3CurrentPosition) / 1000;
        document.getElementById("ps3AbsolutePosition").innerText = value.toFixed(0);
        this.liquidDispenserModule.data[0].sP3P = document.getElementById("volumeSp3Input").value = value.toFixed(0);
        this.liquidDispenserModule.sP3PAbsolutePosition = value;
        this.sp3Width = value / 10 + '%';

        // Init PS Absolute position
        this.liquidDispenserModule.sP3PAbsolutePosition = value;

      }

      // SP3 Relative position
      if (obj.SP3CurrentRelativePosition !== undefined) {
        let value = parseInt(obj.SP3CurrentRelativePosition) / 1000;
        this.liquidDispenserModule.data[0].sP3P = document.getElementById("volumeSp3Input").value = value.toFixed(0);
      }

      // SP3 Max speed
      if (obj.SP3MaxSpeed !== undefined) {
        let maxSpeed = parseInt(obj.SP3MaxSpeed) / 1000;
        this.liquidDispenserModule.data[0].sP3S = maxSpeed;
        this.liquidDispenserModule.sp3MaxSpeed = maxSpeed;
        document.getElementById("ps3SpeedLabel").innerText = "Max Speed: " + maxSpeed + " µL/s";
        document.getElementById("ps3SpeedLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModule.sp3CurrentSpeed + " µL/s";

        // Init max speed range
        document.getElementById("ps3SpeedRange").value = maxSpeed;
      }

      // SP3 Current speed
      if (obj.SP3Speed !== undefined) {
        let currentSpeed = parseInt(obj.SP3Speed) / 1000;
        currentSpeed = currentSpeed.toFixed(1);
        this.liquidDispenserModule.sp3CurrentSpeed = currentSpeed;
        document.getElementById("ps3SpeedLabel").innerText = "Max Speed: " + this.liquidDispenserModule.sp3MaxSpeed + " µL/s";
        document.getElementById("ps3SpeedLabel").innerHTML += "\nCurrent Speed: " + currentSpeed + " µL/s";
      }

      // PUMP1 Absolute position
      if (obj.PUMP1CurrentPosition !== undefined) {

        let value = parseInt(obj.PUMP1CurrentPosition) / 360;
        value = value.toFixed(1);

        this.liquidDispenserModule.data[0].pumP1P = value;
        document.getElementById("pump1Input").value = value;

        // Display turning wheel if method is running

        if (this.mode === 'run' && obj.stage !== 'init') {

          if (parseInt(value) > 0) {

            document.getElementById('wheelRight').hidden = false;
            document.getElementById('wheelLeft').hidden = true;

          } else if (parseInt(value) < 0) {
            document.getElementById('wheelRight').hidden = true;
            document.getElementById('wheelLeft').hidden = false;
          } else {
            document.getElementById('wheelRight').hidden = true;
            document.getElementById('wheelLeft').hidden = true;
          }


        }
      }
      // PUMP1 Max speed
      if (obj.PUMP1MaxSpeed !== undefined) {
        let value = parseInt(obj.PUMP1MaxSpeed) / 6;
        this.liquidDispenserModule.pump1MaxSpeed = value.toFixed(1);
        document.getElementById("pumpsLabel").innerHTML = "Max Speed: " + this.liquidDispenserModule.pump1MaxSpeed + " RPM";
        document.getElementById("pumpsLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModule.pump1CurrentSpeed + " RPM";
        this.liquidDispenserModule.data[0].pumP1S = parseInt(value);

        document.getElementById("pump1Speed").value = value;

      }

      // PUMP1 Current speed
      if (obj.PUMP1Speed !== undefined) {
        let value = parseInt(obj.PUMP1Speed) / 6;
        this.liquidDispenserModule.pump1CurrentSpeed = value.toFixed(1);
        document.getElementById("pumpsLabel").innerHTML = "Max Speed: " + this.liquidDispenserModule.pump1MaxSpeed + " RPM";
        document.getElementById("pumpsLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModule.pump1CurrentSpeed + " RPM";

        document.getElementById("pump1Speed").value = value;

      }


      console.log('received: ', data);
    },

    /*--------------------------------------------------------------------------
    * Set the position of a given module
    * -------------------------------------------------------------------------*/
    setModulePhysicalPosition(module, value, componentId) {

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

            let newValue = parseInt(value);

            if (newValue < 0 || newValue > 1000) {
              this.overflowDialog.message = "The limit has been exceeded";
              this.overflowDialog.open = true
              document.getElementById('volumeSp1Input').value = this.liquidDispenserModule.data[0].sP1P;

            } else {
              let data = {SP1: {MoveTo: parseInt(value) * 1000}};
              this.liquidDispenserModule.data[0].sP1P = parseInt(value);
              this.liquidDispenserModule.sp1VolumeUsed = true;
              this.sendToWebsocket(data);
            }
          }

          if (componentId === 'volumeSp2Input') {

            let newValue = parseInt(value);

            if (newValue < 0 || newValue > 1000) {

              this.overflowDialog.message = "The limit has been exceeded";
              this.overflowDialog.open = true;
              document.getElementById('volumeSp2Input').value = this.liquidDispenserModule.data[0].sP2P;
            } else {
              let data = {SP2: {MoveTo: parseInt(value) * 1000}};
              this.liquidDispenserModule.data[0].sP2P = parseInt(value);
              this.liquidDispenserModule.sp2VolumeUsed = true;
              this.sendToWebsocket(data);
            }
          }

          if (componentId === 'volumeSp3Input') {
            let newValue = parseInt(value);

            if (newValue < 0 || newValue > 1000) {

              this.overflowDialog.message = "The limit has been exceeded";
              this.overflowDialog.open = true;
              document.getElementById('volumeSp3Input').value = this.liquidDispenserModule.data[0].sP3P;

            } else {
              let data = {SP3: {MoveTo: parseInt(value) * 1000}};
              this.liquidDispenserModule.data[0].sP3P = parseInt(value);
              this.liquidDispenserModule.sp3VolumeUsed = true;
              this.sendToWebsocket(data);
            }
          }

          if (componentId === 'pump1Input') {
            // this.liquidDispenserModule.sp3Quantity = parseInt(value);
            let data = {PUMP1: {PUMP1TargetPosition: parseFloat(value) * 360}};
            this.liquidDispenserModule.data[0].pumP1P = parseFloat(value);
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

          if (componentId === 'pump1Speed') {
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
            let data = {SP1: {MoveTo: 2000000}};
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
            let data = {SP2: {MoveTo: 2000000}};
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
            let data = {SP3: {MoveTo: 2000000}};
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

          if (click === 'mousedown') {
            document.getElementById('wheelRight').hidden = true;
            document.getElementById('wheelLeft').hidden = false;

          } else if (click === 'mouseup') {

            document.getElementById('wheelRight').hidden = true;
            document.getElementById('wheelLeft').hidden = true;
          }

          if (click === 'mousedown') {
            let data = {PUMP1: {MoveTo: -3000000}};
            this.sendToWebsocket(data);
          } else {
            let data = {PUMP1: {Stop: true}};
            this.sendToWebsocket(data);
          }
          break;

        case 'pumpRight':

          if (click === 'mousedown') {
            document.getElementById('wheelRight').hidden = false;
            document.getElementById('wheelLeft').hidden = true;

          } else if (click === 'mouseup') {

            document.getElementById('wheelRight').hidden = true;
            document.getElementById('wheelLeft').hidden = true;
          }

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
      this.$store.state.connectionWS.send(JSON.stringify(data));
      console.log('sent:', data)
    }
    ,

    setDefaultSettings() {

      document.getElementById('wheelLeft').hidden = true;
      document.getElementById('wheelRight').hidden = true;
    }
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

#pump1Speed {
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
  margin-top: 520px;
  margin-left: -655px;
}

#wheelRight {
  height: 15%;
  max-width: 15%;
  -webkit-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
  visibility: hidden;
}


#wheelLeft {
  height: 15%;
  max-width: 15%;
  -webkit-animation: spin1 3s linear infinite;
  animation: spin1 3s linear infinite;
  visibility: hidden;
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