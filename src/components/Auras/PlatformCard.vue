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
      {{ overflowDialog.message }}
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

        <!--        pinch valves-->

        <img ID="liquid-dispenser-body" src="../../assets/Liquid Dispenser Images/Assemblage_210504.png" alt=""/>

        <img @click="rotate('ldS1')" class="pinch" ID="ldS1" alt=""
             src="../../assets/Liquid Dispenser Images/pinch25a.png"/>

        <img @click="rotate('ldS2')" class="pinch" ID="ldS2" alt=""
             src="../../assets/Liquid Dispenser Images/pinch25a.png"/>

        <img @click="rotate('ldS3')" class="pinch" ID="ldS3" alt=""
             src="../../assets/Liquid Dispenser Images/pinch25a.png"/>

        <img @click="rotate('ldS4')" class="pinch" ID="ldS4" alt=""
             src="../../assets/Liquid Dispenser Images/pinch25a.png"/>

        <div id="wheelDiv">
          <img v-if="rotateRight" id="wheelRight" alt="" src="../../assets/Liquid Dispenser Images/Pump1R.png"/>
          <img v-if="rotateLeft" id="wheelLeft" alt="" src="../../assets/Liquid Dispenser Images/Pump1L.png"/>
          <img v-if="noRotation" id="noWheel" alt="" src="../../assets/Liquid Dispenser Images/NoPump.png"/>

        </div>

        <!--        PS-->
        <select id="select-sp1" v-model="liquidDispenserModule.selectedSP1">
          <option v-for="item in liquidDispenserModule.items" :value="item" :key="item">{{ item }}</option>
        </select>


        <button :disabled="!liquidDispenserModule.sp1VolumeSelected"
                id="volumeSp1Up"
                @mousedown="movePS('sp1Up','mousedown')"
                @mouseup="movePS('sp1Up','mouseup')"
                class="button">
          Up
        </button>
        <button :disabled="!liquidDispenserModule.sp1VolumeSelected"
                id="volumeSp1Down"
                @mousedown="movePS('sp1Down','mousedown')"
                @mouseup="movePS('sp1Down','mouseup')"
                class="button">
          Down
        </button>
        <input type="text"
               v-model="liquidDispenserModule.sp1Quantity"
               :disabled="!liquidDispenserModule.sp1VolumeSelected"
               @change="event => setModulePhysicalPosition(liquidDispenserModule, event.target.value,'volumeSp1Input')"
               class="input-text"
               id="volumeSp1Input"
        />


        <input type="range" id="ps1SpeedRange" min="1" max="500"
               @input="event => setModulePhysicalPosition(liquidDispenserModule, event.target.value,'ps1SpeedRange')"
               list="tickMarks">
        <textarea readonly id="ps1SpeedLabel"></textarea>

        <select id="select-sp2" v-model="liquidDispenserModule.selectedSP2">
          <option v-for="item in liquidDispenserModule.items" :value="item" :key="item">{{ item }}</option>
        </select>


        <button :disabled="!liquidDispenserModule.sp2VolumeSelected"
                class="button"
                id="volumeSp2Up"
                @mousedown="movePS('sp2Up','mousedown')"
                @mouseup="movePS('sp2Up','mouseup')">
          Up
        </button>
        <button :disabled="!liquidDispenserModule.sp2VolumeSelected"
                class="button"
                id="volumeSp2Down"
                @mousedown="movePS('sp2Down','mousedown')"
                @mouseup="movePS('sp2Down','mouseup')">
          Down
        </button>
        <input type="text"
               :disabled="!liquidDispenserModule.sp2VolumeSelected"
               class="input-text"
               id="volumeSp2Input"
               @change="event => setModulePhysicalPosition(liquidDispenserModule, event.target.value,'volumeSp2Input')"/>


        <input type="range" id="ps2SpeedRange" min="1" max="500"
               @input="event => setModulePhysicalPosition(liquidDispenserModule, event.target.value,'ps2SpeedRange')"
               list="tickMarks">
        <textarea readonly id="ps2SpeedLabel"></textarea>


        <select id="select-sp3" v-model="liquidDispenserModule.selectedSP3">
          <option v-for="item in liquidDispenserModule.items" :value="item" :key="item">{{ item }}</option>
        </select>

        <button :disabled="!liquidDispenserModule.sp3VolumeSelected"
                class="button"
                id="volumeSp3Up"
                @mousedown="movePS('sp3Up','mousedown')"
                @mouseup="movePS('sp3Up','mouseup')">
          Up
        </button>
        <button :disabled="!liquidDispenserModule.sp3VolumeSelected"
                class="button"
                id="volumeSp3Down"
                @mousedown="movePS('sp3Down','mousedown')"
                @mouseup="movePS('sp3Down','mouseup')">
          Down
        </button>
        <input type="text"
               :disabled="!liquidDispenserModule.sp3VolumeSelected"
               class="input-text"
               id="volumeSp3Input"
               @change="event => setModulePhysicalPosition(liquidDispenserModule,  event.target.value,'volumeSp3Input')"/>

        <input type="range" id="ps3SpeedRange" min="1" max="500"
               @input="event =>  setModulePhysicalPosition(liquidDispenserModule, event.target.value,'ps3SpeedRange')"
               list="tickMarks">
        <textarea readonly id="ps3SpeedLabel"></textarea>

        <!--        Pump-->
        <button id="pumpLeft"
                class="button"
                @mousedown="movePS('pumpLeft','mousedown')"
                @mouseup="movePS('pumpLeft','mouseup')">
          Left
        </button>
        <button id="pumpRight"
                class="button"
                @mousedown="movePS('pumpRight','mousedown')"
                @mouseup="movePS('pumpRight','mouseup')">
          Right
        </button>
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

        <div class="progressbar-wrapper" id="PS3PProgressbar">
          <div id="ps3AbsolutePosition" title="ps3AbsolutePosition" v-bind:style="{ width: computedWidthSp3 }"
               class="progressbar">
          </div>
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
          sP1PAbsolutePosition: 0,
          sP2PAbsolutePosition: 0,
          sP3PAbsolutePosition: 0,
          sp1Quantity: 0,
          sp2Quantity: 0,
          sp3Quantity: 0,
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
              sP1S: 1,
              sP2P: 0,
              sP2S: 0,
              sP3P: 0,
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
    }
    ,
    computedWidthSp2: function () {
      return this.sp2Width;
    }
    ,
    computedWidthSp3: function () {
      return this.sp3Width;
    }
    ,

  }
  ,
  /*------------------------------------------------------------------------
  * Loads data when this page (component) is mounted
  * ------------------------------------------------------------------------*/
  mounted() {
    this.fetchNetworkByName('Auras');
    this.initialization();
  }
  ,

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

    }
    ,
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

      this.liquidDispenserModule.sp1Quantity = this.liquidDispenserModule.data[0].sP1P = 0;
      this.liquidDispenserModule.sp1VolumeSelected = false;

      if (this.liquidDispenserModule.selectedSP1 === 'Volume') {

        this.liquidDispenserModule.sp1VolumeSelected = true;
        document.getElementById("volumeSp1Input").value = this.liquidDispenserModule.data[0].sP1P;
      } else if (this.liquidDispenserModule.selectedSP1 === 'QC sample drop')
        this.liquidDispenserModule.data[0].sP1P = -1;

      else if (this.liquidDispenserModule.selectedSP1 === 'Fill LAL cartridge')
        this.liquidDispenserModule.data[0].sP1P = -2;

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

      else if (this.liquidDispenserModule.selectedSP2 === 'QC sample drop')
        this.liquidDispenserModule.data[0].sP2P = -1;

      else if (this.liquidDispenserModule.selectedSP2 === 'Fill LAL cartridge')
        this.liquidDispenserModule.data[0].sP2P = -2;

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

      else if (this.liquidDispenserModule.selectedSP3 === 'QC sample drop')
        this.liquidDispenserModule.data[0].sP3P = -1;

      else if (this.liquidDispenserModule.selectedSP3 === 'Fill LAL cartridge')
        this.liquidDispenserModule.data[0].sP3P = -2;

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
      this.liquidDispenserModule.data[0].sP1P = 0;
      this.liquidDispenserModule.data[0].sP2P = 0;
      this.liquidDispenserModule.data[0].sP3P = 0;

      if (this.liquidDispenserModule.sp1Quantity !== 0) {
        let data = {
          stage: 'config',
          type: 'move',
          move: {
            sP1P: this.liquidDispenserModule.sp1Quantity
          }
        }
        this.sendToWebsocket(data);
        this.liquidDispenserModule.sp1Quantity = 0;
      }
      if (this.liquidDispenserModule.sp2Quantity !== 0) {
        let data = {
          stage: 'config',
          type: 'move',
          move: {
            sP2P: this.liquidDispenserModule.sp2Quantity
          }
        }
        this.sendToWebsocket(data);
        this.liquidDispenserModule.sp2Quantity = 0;
      }

      if (this.liquidDispenserModule.sp3Quantity !== 0) {
        let data = {
          stage: 'config',
          type: 'move',
          move: {
            sP3P: this.liquidDispenserModule.sp3Quantity
          }
        }
        this.sendToWebsocket(data);
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
      else if (angle === 45)
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

      if (document.getElementById(id).style.transform !== '')
        this.angle = parseInt(document.getElementById(id).style.transform.match(/\d+/)[0]);

      this.angle >= 90 ? this.angle = 0 : this.angle += 45;

      this.setModulePhysicalPosition(this.liquidDispenserModule, this.angle, id);

    }
    ,
    /*--------------------------------------------------------------------------
    * Extracts info from received Json
    * -------------------------------------------------------------------------*/
    extractDataSentFromSocket(data) {

      const obj = JSON.parse(data);
      if (obj === null) return;

      if (obj.tlcMigration !== undefined)
        this.tlcMigrationModule.selectedOption = this.tlcMigrationModule.items[obj.tlcMigration];

      if (obj.phMeter !== undefined)
        this.phMeterModule.selectedOption = this.phMeterModule.items[obj.phMeter];

      if (obj.dropDispenser !== undefined)
        this.dropDispenserModule.selectedOption = this.dropDispenserModule.items[obj.dropDispenser];

      if (obj.ldS1 !== undefined) {
        this.setStepValues(obj.ldS1, 'ldS1');
        document.getElementById('ldS1').style.transform = 'rotate(' + obj.ldS1 + 'deg)';
      }


      if (obj.ldS2 !== undefined) {
        this.setStepValues(obj.ldS2, 'ldS2');
        document.getElementById('ldS2').style.transform = 'rotate(' + obj.ldS2 + 'deg)';
      }


      if (obj.ldS3 !== undefined) {
        this.setStepValues(obj.ldS3, 'ldS3');
        document.getElementById('ldS3').style.transform = 'rotate(' + obj.ldS3 + 'deg)';
      }

      if (obj.ldS4 !== undefined) {
        this.setStepValues(obj.ldS4, 'ldS4');
        document.getElementById('ldS4').style.transform = 'rotate(' + obj.ldS4 + 'deg)';
      }

      /*      if (obj.ldS5 !== undefined){
              this.setStepValues(obj.ldS5, 'ldS5');
              document.getElementById('ldS5').style.transform = 'rotate(' + obj.ldS5 + 'deg;
            }

            if (obj.ldS6 !== undefined){
              this.setStepValues(obj.ldS6, 'ldS6');
              document.getElementById('ldS6').style.transform = 'rotate(' + obj.ldS6 + 'deg)';
            }

            if (obj.ldS7 !== undefined){
              this.setStepValues(obj.ldS7, 'ldS7');
              document.getElementById('ldS7').style.transform = 'rotate(' + obj.ldS7 + 'deg)';
            }

            if (obj.ldS8 !== undefined){
              this.setStepValues(obj.ldS8, 'ldS8');
              document.getElementById('ldS8').style.transform = 'rotate(' + obj.ldS8 + 'deg)';
            }

            if (obj.ldS9 !== undefined){
              this.setStepValues(obj.ldS9, 'ldS9');
              document.getElementById('ldS9').style.transform = 'rotate(' + obj.ldS9 + 'deg)';
            }*/

      if (obj.sP1P !== undefined) {
        this.liquidDispenserModule.sP1PAbsolutePosition = obj.sP1P;
        // document.getElementById("volumeSp1Input").value = obj.sP1P;
        document.getElementById("ps1AbsolutePosition").innerText = obj.sP1P;
        this.sp1Width = obj.sP1P / 10 + '%';
      }

      if (obj.sP1S !== undefined) {
        this.liquidDispenserModule.data[0].sP1S = obj.sP1S;
        document.getElementById("ps1SpeedRange").value = obj.sP1S;
        document.getElementById("ps1SpeedLabel").innerText = "PS1 Speed: " + obj.sP1S + " µL/sec";
      }

      if (obj.sP2P !== undefined) {
        this.liquidDispenserModule.sP2PAbsolutePosition = obj.sP2P;
        // document.getElementById("volumeSp2Input").value = obj.sP2P;
        document.getElementById("ps2AbsolutePosition").innerText = obj.sP2P;
        this.sp2Width = obj.sP2P / 10 + '%';
      }


      if (obj.sP2S !== undefined) {
        this.liquidDispenserModule.data[0].sP2S = obj.sP2S;
        document.getElementById("ps2SpeedRange").value = obj.sP2S;
        document.getElementById("ps2SpeedLabel").innerText = "PS2 Speed: " + obj.sP2S + " µL/sec";
      }

      if (obj.sP3P !== undefined) {

        this.liquidDispenserModule.sP3PAbsolutePosition = obj.sP3P;
        // document.getElementById("volumeSp3Input").value = obj.sP3P;
        document.getElementById("ps3AbsolutePosition").innerText = obj.sP3P;
        this.sp3Width = obj.sP3P / 10 + '%';

      }

      if (obj.sP3S !== undefined) {
        this.liquidDispenserModule.data[0].sP3S = obj.sP3S;
        document.getElementById("ps3SpeedRange").value = obj.sP3S;
        document.getElementById("ps3SpeedLabel").innerText = "PS3 Speed: " + obj.sP3S + " µL/sec";
      }

      if (obj.pumP1P !== undefined) {
        this.liquidDispenserModule.data[0].pumP1P = obj.pumP1P;
      }

      if (obj.pumP1S !== undefined) {
        this.liquidDispenserModule.data[0].pumP1S = obj.pumP1S;
        document.getElementById("pumSpeed").value = obj.pumP1S;
        document.getElementById("pumpsLabel").innerText = "Pump Speed: " + obj.pumP1S + " RPM";

      }
      console.log('received: ', data);
    }
    ,

    /*--------------------------------------------------------------------------
    * Set the position of a given module
    * -------------------------------------------------------------------------*/
    setModulePhysicalPosition(module, value, componentId) {

      let data = {
        stage: 'config',
        type: 'position',
        moveTo: {}
      }
      if (module.name.toLowerCase().includes('tlc'))
        data.moveTo.tlcMigration = module.items.indexOf(value);

      if (module.name.toLowerCase().includes('ph'))
        data.moveTo.phMeter = module.items.indexOf(value);

      if (module.name.toLowerCase().includes('drop'))
        data.moveTo.dropDispenser = module.items.indexOf(value);

      if (module.name.toLowerCase().includes('liquid')) {

        if (componentId !== undefined && componentId !== '') {

          data.type = 'value';

          switch (componentId) {
            case 'ldS1':
              data.moveTo.ldS1 = value;
              break;
            case 'ldS2':
              data.moveTo.ldS2 = value;
              break;
            case 'ldS3':
              data.moveTo.ldS3 = value;
              break;
            case 'ldS4':
              data.moveTo.ldS4 = value;
              break;
            case 'ldS5':
              data.moveTo.ldS5 = value;
              break;
            case 'ldS6':
              data.moveTo.ldS6 = value;
              break;
            case 'ldS7':
              data.moveTo.ldS7 = value;
              break;
            case 'ldS8':
              data.moveTo.ldS8 = value;
              break;
            case 'ldS9':
              data.moveTo.ldS9 = value;
              break;
            case 'volumeSp1Input':
              this.liquidDispenserModule.sp1Quantity = parseInt(value);
              console.log(this.liquidDispenserModule.sp1Quantity)

              if ((this.liquidDispenserModule.sp1Quantity < 0
                      && this.liquidDispenserModule.sP1PAbsolutePosition + this.liquidDispenserModule.sp1Quantity < 0)
                  || this.liquidDispenserModule.sp1Quantity > 0
                  && this.liquidDispenserModule.sP1PAbsolutePosition + this.liquidDispenserModule.sp1Quantity > 1000) {
                this.overflowDialog.message = "The limit has been exceeded";
                this.overflowDialog.open = true;
                this.liquidDispenserModule.sp1Quantity = 0;
              } else {
                this.liquidDispenserModule.data[0].sP1P = this.liquidDispenserModule.sp1Quantity;
              }
              return;
            case
            'ps1SpeedRange'
            :
              data.moveTo.sP1S = value;
              break;
            case
            'volumeSp2Input'
            :
              data.move.sP2P = value;
              break;
            case
            'ps2SpeedRange'
            :
              data.moveTo.sP2S = value;
              break;
            case
            'volumeSp3Input'
            :
              data.move.sP3P = value;
              break;
            case
            'ps3SpeedRange'
            :
              data.moveTo.sP3S = value;
              break;
            case
            'pumSpeed'
            :
              data.moveTo.pumP1S = value;
              break;
          }
        }
      }
      this.sendToWebsocket(data)
      // module.selectedOption = value;
    }
    ,

    /*------------------------------------------------------------------------
    * Moves the PS up or down
    * ------------------------------------------------------------------------*/
    movePS(id, click) {

      let data = {
        stage: 'config',
        type: 'moveTo',
        moveTo: {}
      }
      this.noRotation = true;

      switch (id) {
        case 'sp1Up':
          data.moveTo.sP1PUp = click === 'mousedown';
          break;
        case 'sp1Down':
          data.moveTo.sP1PDown = click === 'mousedown';
          break;
        case 'sp2Up':
          data.moveTo.sP2PUp = click === 'mousedown';
          break;
        case 'sp2Down':
          data.moveTo.sP2PDown = click === 'mousedown';
          break;
        case 'sp3Up':
          data.moveTo.sP3PUp = click === 'mousedown';
          break;
        case 'sp3Down':
          data.moveTo.sP3PDown = click === 'mousedown';
          break;
        case 'pumpLeft':
          if (click === 'mousedown') {
            this.rotateLeft = true;
            this.rotateRight = false;
            this.noRotation = false;
          } else {
            this.rotateLeft = false;
            this.rotateRight = false;
            this.noRotation = true;
          }
          data.moveTo.pumpLeft = click === 'mousedown';
          break;
        case 'pumpRight':
          if (click === 'mousedown') {
            this.rotateLeft = false;
            this.rotateRight = true;
            this.noRotation = false;
          } else {
            this.rotateLeft = false;
            this.rotateRight = false;
            this.noRotation = true;
          }
          data.moveTo.pumpRight = click === 'mousedown';
          break;
        default:
          break;
      }
      this.sendToWebsocket(data);
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
  margin-left: 200px;
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
  margin-left: -600px;
  margin-top: 100px;

}

/* syringes */

#select-sp1 {
  margin-left: -620px;
  margin-top: 100px;
}

#volumeSp1Up {
  margin-left: 20px;
  margin-top: 100px;
}

#volumeSp1Down {
  margin-left: 5px;
  margin-top: 100px;
  background-color: #e07b39;
}


#volumeSp1Input {
  margin-left: -102px;
  margin-top: 130px;
}

#ps1SpeedRange {
  margin-left: -260px;
  margin-top: 150px;
  height: fit-content;
}

#ps1SpeedLabel {
  margin-left: -130px;
  margin-top: 180px;
  font-size: 12px;
  height: fit-content;
  width: 150px;
  resize: none;
}

#select-sp2 {
  margin-left: 400px;
  margin-top: 100px;
}

#volumeSp2Up {
  margin-left: 20px;
  margin-top: 100px;
}

#volumeSp2Down {
  margin-left: 5px;
  margin-top: 100px;
  background-color: #e07b39;
}

#volumeSp2Input {
  margin-left: -102px;
  margin-top: 130px;
}

#ps2SpeedRange {
  margin-left: -260px;
  margin-top: 150px;
  height: fit-content;
}

#ps2SpeedLabel {
  margin-left: -130px;
  margin-top: 180px;
  font-size: 12px;
  height: fit-content;
  width: 150px;
  resize: none;
}

#select-sp3 {
  margin-left: -140px;
  margin-top: 400px;
}

#volumeSp3Up {
  margin-left: 20px;
  margin-top: 400px;
}

#volumeSp3Down {
  margin-left: 5px;
  margin-top: 400px;
  background-color: #e07b39;
}

#volumeSp3Input {
  margin-left: -102px;
  margin-top: 450px;
}

#ps3SpeedRange {
  margin-left: -260px;
  margin-top: 450px;
  height: fit-content;
}

#ps3SpeedLabel {
  margin-left: -120px;
  margin-top: 480px;
  font-size: 12px;
  height: fit-content;
  width: 150px;
  resize: none;
}

/*pump*/

#pumpLeft {
  margin-left: -460px;
  margin-top: 340px;
}

#pumpRight {
  margin-left: 5px;
  margin-top: 340px;
  background-color: #e07b39;
}

#pumSpeed {
  margin-left: -110px;
  margin-top: 380px;
  height: fit-content;
}

#pumpsLabel {
  margin-left: -130px;
  margin-top: 410px;
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
  margin-left: -940px;
  margin-top: 340px;
  display: inline-block;

}

#ldS2 {
  margin-left: -60px;
  margin-top: 410px;
  display: inline-block;
}

#ldS3 {
  margin-left: -60px;
  margin-top: 490px;
  display: inline-block;
}

#ldS4 {
  margin-left: -60px;
  margin-top: 560px;
  display: inline-block;
}

#PS1PProgressbar {
  width: 155px;
  height: 15px;
  margin-top: 510px;
  margin-left: -302px;;
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
  margin-top: 510px;
  margin-left: 128px;
}

#PS3PProgressbar {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
  width: 155px;
  height: 15px;
  margin-top: 600px;
}

#wheelDiv {
  height: fit-content;
  margin-top: 470px;
  margin-left: -0px;
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