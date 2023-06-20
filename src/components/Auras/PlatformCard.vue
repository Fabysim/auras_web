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
                    {{ tlcMigrationModuleConfig.name }}
                  </v-card-title>
                  <v-card-text class="card-text">
                    {{ tlcMigrationModuleConfig.selectedOption }}
                  </v-card-text>

                </v-card>
              </td>

              <!-- PH Meter -->

              <td>
                <v-card height="200" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color">
                    {{ phMeterModuleConfig.name }}
                  </v-card-title>
                  <v-card-text class="card-text">
                    {{ phMeterModuleConfig.selectedOption }}
                  </v-card-text>
                </v-card>
              </td>

              <!-- Drop Dispenser -->

              <td>
                <v-card height="200" width="230" style="padding: 20px">
                  <v-card-title class="justify-center module-title-color">
                    {{ dropDispenserModuleConfig.name }}
                  </v-card-title>
                  <v-card-text class="card-text">
                    {{ dropDispenserModuleConfig.selectedOption }}
                  </v-card-text>
                </v-card>
              </td>

              <!-- Liquid Dispenser -->

              <td>
                <v-card height="200">
                  <v-card-title class="justify-center module-title-color">
                    {{ liquidDispenserModuleConfig.name }}
                  </v-card-title>
                  <v-data-table
                      :headers="liquidDispenserModuleConfig.columns"
                      :items="liquidDispenserModuleConfig.data"
                      :hide-default-footer="true"
                  >
                    <template v-slot:[`item.sP1P`]="{item}">
                      <table>
                        <tr>
                          <td v-if="liquidDispenserModuleConfig.sp1VolumeSelected">Volume: {{ item.sP1P }} µL</td>
                          <td v-else> {{ liquidDispenserModuleConfig.selectedSP1 }}</td>
                        </tr>
                      </table>
                    </template>

                    <template v-slot:[`item.sP2P`]="{item}">
                      <table>

                        <tr>
                          <td v-if="liquidDispenserModuleConfig.sp2VolumeSelected">Volume: {{ item.sP2P }} µL</td>
                          <td v-else>{{ liquidDispenserModuleConfig.selectedSP2 }}</td>
                        </tr>
                      </table>

                    </template>

                    <template v-slot:[`item.sP3P`]="{item}">
                      <table>
                        <tr>
                          <td v-if="liquidDispenserModuleConfig.sp3VolumeSelected">Volume: {{ item.sP3P }} µL</td>
                          <td v-else>{{ liquidDispenserModuleConfig.selectedSP3 }}</td>
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
                            v-model="waitingConditionConfig.selectedOption"
                            :items="waitingConditionConfig.items"/>
                      </td>
                    </tr>
                    <tr>
                      <td v-if="waitingConditionConfig.timeoutOptionSelected">
                        <v-text-field
                            label="timeout in ms"
                            v-model="waitingConditionConfig.timeoutValue"
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
                  <v-text-field label="Enter a comment" v-model="commentConfig"/>
                </v-card>
              </td>

            </tr>
          </table>
        </vue-scroll-snap>

      </v-card-text>

      <v-card-actions>
        <v-btn color="error" @click="emergencyStop">Emergency Stop</v-btn>
        <v-spacer/>
        <v-btn style="background-color: dodgerblue; color: white;"
               @click="$emit('lineSaved')">
          Save step
        </v-btn>
        <v-spacer/>
        <div v-if="online">
          <v-icon color="success">mdi-power</v-icon>
          <span style="color: green"> Online</span>
        </div>
        <div v-else>
          <v-icon color="error">mdi-power</v-icon>
          <span style="color: red"> Offline</span>
        </div>
      </v-card-actions>
    </v-card>

    <!--    Values Overflow Dialog-->

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

    <div class="cover">
      <v-btn
          @click="leftScroll"
          class="ma-2 left"
          outlined
          small
          fab
          color="indigo"
      >
        <v-icon>mdi-chevron-left </v-icon>
      </v-btn>

      <div id="image-container">

        <!--TLC Migration-->

        <div id="tlcMigration-section">

          <label id="tlc_title" class="module-title-color">{{ tlcMigrationModuleConfig.name }}</label>

          <img id="tlcMigration-image" src="../../assets/LiquidDispenserImages/phMeter.png" alt=""/>

          <div id="tlcMigration-buttons">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    large
                    id="tlc_btn_0"
                    @click="setModulePhysicalPosition(tlcMigrationModuleConfig, tlcMigrationModuleConfig.items[0])"
                >
                  mdi-numeric-0-circle-outline
                </v-icon>
              </template>
              <span>{{ tlcMigrationModuleConfig.items[0] }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    large
                    id="tlc_btn_1"
                    @click="setModulePhysicalPosition(tlcMigrationModuleConfig, tlcMigrationModuleConfig.items[1])"
                >
                  mdi-numeric-1-circle-outline
                </v-icon>
              </template>
              <span>{{ tlcMigrationModuleConfig.items[1] }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    large
                    id="tlc_btn_2"
                    @click="setModulePhysicalPosition(tlcMigrationModuleConfig, tlcMigrationModuleConfig.items[2])"
                >
                  mdi-numeric-2-circle-outline
                </v-icon>
              </template>
              <span>{{ tlcMigrationModuleConfig.items[2] }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    large
                    id="tlc_btn_3"
                    @click="setModulePhysicalPosition(tlcMigrationModuleConfig, tlcMigrationModuleConfig.items[3])"
                >
                  mdi-numeric-3-circle-outline
                </v-icon>
              </template>
              <span>{{ tlcMigrationModuleConfig.items[3] }}</span>
            </v-tooltip>
          </div>
        </div>

        <!--Drop Dispenser-->

        <div id="dropDispenser-section">
          <label id="dd_title" class="module-title-color">{{ dropDispenserModuleConfig.name }}</label>
          <img ID="dropDispenser-image" src="../../assets/LiquidDispenserImages/phMeter.png" alt=""/>
          <div id="dropDispenser-buttons">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    large
                    id="dd_btn_0"
                    @click="setModulePhysicalPosition(dropDispenserModuleConfig, dropDispenserModuleConfig.items[0])"
                >
                  mdi-numeric-0-circle-outline
                </v-icon>
              </template>
              <span>{{ dropDispenserModuleConfig.items[0] }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    large
                    id="dd_btn_1"
                    @click="setModulePhysicalPosition(dropDispenserModuleConfig,dropDispenserModuleConfig.items[1])"
                >
                  mdi-numeric-1-circle-outline
                </v-icon>
              </template>
              <span>{{ dropDispenserModuleConfig.items[1] }}</span>
            </v-tooltip>
          </div>
        </div>

        <!--Ph Meter-->

        <div id="phMeter-section">
          <label id="ph_title" class="module-title-color">{{ phMeterModuleConfig.name }}</label>

          <img id="phMeter-image" src="../../assets/LiquidDispenserImages/phMeter.png" alt=""/>
          <img id="phSolutions-image" src="../../assets/LiquidDispenserImages/ph_solutions.png" alt=""/>
          <img id="phProbe-image" src="../../assets/LiquidDispenserImages/ph_probe.png" alt=""/>

          <div id="phMeters-buttons">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    fab
                    outlined
                    dark
                    large
                    color="black"
                    id="phm_btn_0"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[0])"
                >
                  <v-icon dark>
                    mdi-home
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ phMeterModuleConfig.items[0] }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    fab
                    outlined
                    dark
                    large
                    color="black"
                    id="phm_btn_1"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[1])"
                >
                  <v-icon dark>
                    mdi-ph
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ phMeterModuleConfig.items[1] }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    fab
                    outlined
                    dark
                    large
                    color="black"
                    id="phm_btn_2"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[2])"
                >
                  <v-icon dark>
                    mdi-waves
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ phMeterModuleConfig.items[2] }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    fab
                    outlined
                    dark
                    large
                    id="phm_btn_3"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[3])"
                >
                  <v-icon large>
                    mdi-water-thermometer-outline
                  </v-icon>
                  <v-icon>
                    mdi-numeric-1
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ phMeterModuleConfig.items[3] }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    fab
                    outlined
                    large
                    id="phm_btn_4"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[4])"
                >
                  <v-icon large>
                    mdi-water-thermometer-outline
                  </v-icon>
                  <v-icon>
                    mdi-numeric-2
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ phMeterModuleConfig.items[4] }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    large
                    fab
                    outlined
                    id="phm_btn_5"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[5])"
                >
                  <v-icon large>
                    mdi-transfer-up
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ phMeterModuleConfig.items[5] }}</span>
            </v-tooltip>
          </div>
        </div>

        <!--Liquid Dispenser--><!--Liquid Dispenser-->

        <div id="liquid-dispenser-section">
          <!--        Title-->
          <label id="ld_title" class="module-title-color">{{ liquidDispenserModuleConfig.name }}</label>

          <!--        Main images-->

          <img ID="liquid-dispenser-image" src="../../assets/LiquidDispenserImages/LD_F18_No_SP.png" alt=""/>
          <img ID="sp-plug3" src="../../assets/LiquidDispenserImages/SP-plug.png" alt=""/>
          <img ID="sp-plug1" src="../../assets/LiquidDispenserImages/SP-plug.png" alt=""/>
          <img ID="sp-plug2" src="../../assets/LiquidDispenserImages/SP-plug.png" alt=""/>

          <!--        PS3 control-->
          <div id="ps3">

            <select id="select-sp3" v-model="liquidDispenserModuleConfig.selectedSP3">
              <option v-for="item in liquidDispenserModuleConfig.items" :value="item" :key="item">{{ item }}</option>
            </select>

            <button :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                    class="button firstLineComponent"
                    id="razPs3"
                    @click="resetSp('sp3')">
              Empty
            </button>
            <button :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                    class="button firstLineComponent"
                    id="volumeSp3Up"
                    @mousedown="moveStepperMotors('sp3Up','mousedown')"
                    @mouseup="moveStepperMotors('sp3Up','mouseup')">
              Up
            </button>
            <button :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                    class="button firstLineComponent"
                    id="volumeSp3Down"
                    @mousedown="moveStepperMotors('sp3Down','mousedown')"
                    @mouseup="moveStepperMotors('sp3Down','mouseup')">
              Down
            </button>
            <input type="text"
                   :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                   id="volumeSp3Input"
                   class="input-text"
                   @change="event => setModulePhysicalPosition(liquidDispenserModuleConfig,  event.target.value,'volumeSp3Input')"/>

            <textarea readonly id="ps3SpeedLabel"></textarea>
            <input type="range" id="ps3SpeedRange" min="1" max="200"
                   @input="event =>  setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'ps3SpeedRange')"
                   list="tickMarks">
          </div>
          <!--        PS1 control-->

          <div id="ps1">
            <select id="select-sp1" class="firstLineComponent" v-model="liquidDispenserModuleConfig.selectedSP1">
              <option v-for="item in liquidDispenserModuleConfig.items" :value="item" :key="item">{{ item }}</option>
            </select>

            <button :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                    class="button firstLineComponent"
                    id="razPs1"
                    @click="resetSp('sp1')">
              Empty
            </button>

            <button :disabled="!liquidDispenserModuleConfig.sp1VolumeSelected"
                    id="volumeSp1Up"
                    class="button firstLineComponent"
                    @mousedown="moveStepperMotors('sp1Up','mousedown')"
                    @mouseup="moveStepperMotors('sp1Up','mouseup')">
              Up
            </button>
            <button :disabled="!liquidDispenserModuleConfig.sp1VolumeSelected"
                    id="volumeSp1Down"
                    class="button firstLineComponent"
                    @mousedown="moveStepperMotors('sp1Down','mousedown')"
                    @mouseup="moveStepperMotors('sp1Down','mouseup')">
              Down
            </button>
            <input type="text"
                   :disabled="!liquidDispenserModuleConfig.sp1VolumeSelected"
                   @change="event => setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'volumeSp1Input')"
                   class="input-text"
                   id="volumeSp1Input"
            />

            <textarea readonly id="ps1SpeedLabel"></textarea>
            <input type="range" id="ps1SpeedRange" min="1" max="200"
                   @input="event => setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'ps1SpeedRange')"
                   list="tickMarks">
          </div>
          <!--        PS2 control-->
          <div id="ps2">
            <select id="select-sp2" class="firstLineComponent" v-model="liquidDispenserModuleConfig.selectedSP2">
              <option v-for="item in liquidDispenserModuleConfig.items" :value="item" :key="item">{{ item }}</option>
            </select>

            <button :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                    class="button firstLineComponent"
                    id="razPs2"
                    @click="resetSp('sp2')">
              Empty
            </button>
            <button :disabled="!liquidDispenserModuleConfig.sp2VolumeSelected"
                    id="volumeSp2Up"
                    class="button firstLineComponent"
                    @mousedown="moveStepperMotors('sp2Up','mousedown')"
                    @mouseup="moveStepperMotors('sp2Up','mouseup')">
              Up
            </button>
            <button :disabled="!liquidDispenserModuleConfig.sp2VolumeSelected"
                    id="volumeSp2Down"
                    class="button firstLineComponent"
                    @mousedown="moveStepperMotors('sp2Down','mousedown')"
                    @mouseup="moveStepperMotors('sp2Down','mouseup')">
              Down
            </button>
            <input type="text"
                   :disabled="!liquidDispenserModuleConfig.sp2VolumeSelected"
                   class="input-text"
                   id="volumeSp2Input"
                   @change="event => setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'volumeSp2Input')"/>

            <textarea readonly id="ps2SpeedLabel"></textarea>
            <input type="range" id="ps2SpeedRange" min="1" max="200"
                   @input="event => setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'ps2SpeedRange')"
                   list="tickMarks">

          </div>
          <!--    PS ranges -->

          <div class="progressbar-wrapper" id="PS3PProgressbar">
            <div id="ps3LiquidLevel" title="ps3LiquidLevel" class="progressbar">
            </div>
          </div>
          <div class="progressbar-wrapper" id="PS1PProgressbar">
            <div id="ps1LiquidLevel" title="ps1LiquidLevel" class="progressbar ">
            </div>
          </div>

          <div class="progressbar-wrapper" id="PS2PProgressbar">
            <div id="ps2LiquidLevel" title="ps2LiquidLevel" class="progressbar">
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
          <div id="pump">
            <button id="pumpLeft-button"
                    class="button"
                    @mousedown="moveStepperMotors('pumpLeft','mousedown')"
                    @mouseup="moveStepperMotors('pumpLeft','mouseup')">
              Left
            </button>
            <button id="pumpRight-button"
                    class="button"
                    @mousedown="moveStepperMotors('pumpRight','mousedown')"
                    @mouseup="moveStepperMotors('pumpRight','mouseup')">
              Right
            </button>
            <input type="text"
                   class="input-text"
                   id="pump1Input"
                   @change="event => setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'pump1Input')"/>

            <input type="range" id="pump1Speed" min="1" max="500"
                   @input="event =>  setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'pump1Speed')"
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


            <img id="wheelRight" alt="" src="../../assets/LiquidDispenserImages/Pump1R.png"/>
            <img id="wheelLeft" alt="" src="../../assets/LiquidDispenserImages/Pump1L.png"/>

          </div>

        </div>
      </div>
      <v-btn
          @click="rightScroll"
          class="ma-2 right"
          outlined
          small
          fab
          color="indigo"
      >
        <v-icon>mdi-chevron-right </v-icon>
      </v-btn>

    </div>

  </div>
</template>

<script>

import VueScrollSnap from "vue-scroll-snap";
import axios from "axios";

export default {
  name: "PlatFormCard",
  components: {
    VueScrollSnap,
  },
  props: {
    mode: String
  },

  data: () => ({
        online: false,
        totalOfSteps: 0,
        rotateRight: false,
        rotateLeft: false,
        noRotation: true,
        readOnly: false,
        sp1Width: '10%',
        sp2Width: '10%',
        sp3Width: '10%',
        speed: 2,
        overflowDialog: {
          open: false,
          message: ''
        },
        angle: 45,
        connection: '',
        //Modules
        tlcMigrationModuleConfig: {
          name: '',
          items: ['Idle position', 'Ready position', 'Cycle', 'Redeposit tab'],
          selectedOption: 'Idle position',
          data: [
            {
              position: 0,
            }]
        },

        dropDispenserModuleConfig: {
          name: '',
          items: ['None', 'Standards'],
          selectedOption: 'None',
          data: [
            {
              value: 0,
            },
          ]
        },

        phMeterModuleConfig: {
          name: '',
          items: ['Idle position', 'QC sample', 'Rinsing', 'Calibration 1', 'Calibration 2', 'Lift'],
          selectedOption: 'Idle position',
          columns: [
            {text: 'Position', value: 'position', width: 150, align: 'center'},

          ],
          data: [
            {
              position: 0,
            }]
        },

        liquidDispenserModuleConfig: {
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
            {text: "SP3 Quantity", value: "sP3P", width: 150, align: 'center'},
            {text: "SP3 Speed (µL/s)", value: "sP3S", width: 82, align: 'center'},
            {text: "SP1 Quantity", value: "sP1P", width: 150, align: 'center'},
            {text: "SP1 Speed (µL/s)", value: "sP1S", width: 82, align: 'center'},
            {text: "SP2 Quantity", value: "sP2P", width: 150, align: 'center'},
            {text: "SP2 Speed (µL/s)", value: "sP2S", width: 82, align: 'center'},
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

        waitingConditionConfig: {
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

        commentConfig: '',

        // Other Modules

        ginaModuleConfig: {
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
        },
        timer: null,
      }
  ),

  /*------------------------------------------------------------------------
  * Loads data when this page (component) is mounted
  * ------------------------------------------------------------------------*/

  mounted() {
    this.fetchNetworkByName('Auras');
    this.initialization();

    this.totalOfSteps = this.$store.state.totalOfSteps;

    this.timer = setInterval(() => {
      this.checkAurasIsOnline()
    }, 3000)

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
      this.waitingConditionConfig.data[0].value = 0;
      this.waitingConditionConfig.selectedOption === 'Timeout' ?
          this.waitingConditionConfig.timeoutOptionSelected = true : this.waitingConditionConfig.timeoutOptionSelected = false;

      if (this.waitingConditionConfig.selectedOption === 'Timeout')
        this.waitingConditionConfig.data[0].value = this.waitingConditionConfig.timeoutValue;
      else if (this.waitingConditionConfig.selectedOption === 'Gina')
        this.waitingConditionConfig.data[0].value = -1;

    },

    /*------------------------------------------------------------------------
    * Listener: to dropDispenserModule.selectedOption
    * ------------------------------------------------------------------------*/
    'dropDispenserModule.selectedOption'() {
      this.dropDispenserModuleConfig.selectedOption === 'None' ?
          this.dropDispenserModuleConfig.data[0].value = 0 : this.dropDispenserModuleConfig.data[0].value = 1;

    }
    ,
    /*------------------------------------------------------------------------
    * Listener: to liquidDispenserModule.selectedSP1
    * ------------------------------------------------------------------------*/
    'liquidDispenserModule.selectedSP1'() {

      this.liquidDispenserModuleConfig.sp1Quantity = 0;
      this.liquidDispenserModuleConfig.sp1VolumeSelected = false;

      if (this.liquidDispenserModuleConfig.selectedSP1 === 'Volume')
        this.liquidDispenserModuleConfig.sp1VolumeSelected = true;
      else
        this.liquidDispenserModuleConfig.data[0].sP1P = this.liquidDispenserModuleConfig.selectedSP1;


      document.getElementById('volumeSp1Input').value = 0;
    }
    ,
    /*------------------------------------------------------------------------
    * Listener: to liquidDispenserModule.selectedSP2
    * ------------------------------------------------------------------------*/
    'liquidDispenserModule.selectedSP2'() {

      this.liquidDispenserModuleConfig.data[0].sP2P = 0;
      this.liquidDispenserModuleConfig.sp2VolumeSelected = false;

      if (this.liquidDispenserModuleConfig.selectedSP2 === 'Volume')
        this.liquidDispenserModuleConfig.sp2VolumeSelected = true;
      else
        this.liquidDispenserModuleConfig.data[0].sP2P = this.liquidDispenserModuleConfig.selectedSP2;

      document.getElementById('volumeSp2Input').value = 0;
    }
    ,
    /*------------------------------------------------------------------------
    * Listener: to liquidDispenserModule.selectedSP3
    * ------------------------------------------------------------------------*/
    'liquidDispenserModule.selectedSP3'() {

      this.liquidDispenserModuleConfig.data[0].sP3P = 0;
      this.liquidDispenserModuleConfig.sp3VolumeSelected = false;

      if (this.liquidDispenserModuleConfig.selectedSP3 === 'Volume')
        this.liquidDispenserModuleConfig.sp3VolumeSelected = true;
      else
        this.liquidDispenserModuleConfig.data[0].sP3P = this.liquidDispenserModuleConfig.selectedSP3;

      document.getElementById('volumeSp3Input').value = 0;
    }
    ,
    /*------------------------------------------------------------------------
    * Listener: to tlcMigrationModule.selectedOption
    * ------------------------------------------------------------------------*/
    'tlcMigrationModule.selectedOption'() {

      switch (this.tlcMigrationModuleConfig.selectedOption) {
        case "Idle position":
          this.tlcMigrationModuleConfig.data[0].position = 0;
          break;
        case "Ready position":
          this.tlcMigrationModuleConfig.data[0].position = 1;
          break;
        case "Cycle":
          this.tlcMigrationModuleConfig.data[0].position = 2;
          break;
        case "Redeposit tab":
          this.tlcMigrationModuleConfig.data[0].position = 3;
          break;
        default:
          this.tlcMigrationModuleConfig.data[0].position = 0;
          break;
      }
    }
    ,
    /*------------------------------------------------------------------------
    * Listener: to phMeterModule.selectedOption
    * ------------------------------------------------------------------------*/
    'phMeterModule.selectedOption'() {

      switch (this.phMeterModuleConfig.selectedOption) {
        case "Idle position":
          this.phMeterModuleConfig.data[0].position = 0;
          break;
        case "QC sample":
          this.phMeterModuleConfig.data[0].position = 1;
          break;
        case "Rinsing":
          this.phMeterModuleConfig.data[0].position = 2;
          break;
        case "Tempo 1":
          this.phMeterModuleConfig.data[0].position = 3;
          break;
        case "Tempo 2":
          this.phMeterModuleConfig.data[0].position = 4;
          break;
        case "Lift":
          this.phMeterModuleConfig.data[0].position = 5;
          break;
        default:
          this.phMeterModuleConfig.data[0].position = 0;
          break;
      }

    },
  },

  methods: {

    leftScroll() {
      const left = document.querySelector("#image-container");

      left.scrollBy({
        top: 600,
        left: -600,
        behavior : "smooth"
      })
    },
    rightScroll() {
      const right = document.querySelector("#image-container");

      right.scrollBy({
        top: 600,
        left: 600,
        behavior : "smooth"
      })
    },

    emergencyStop() {

      this.sendToWebsocket({"EmergencyStop ": true});
    },

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

      this.waitingConditionConfig.selectedOption = 'None';
      this.commentConfig = '';
    },

    /*------------------------------------------------------------------------
    * LiquidDispenser: Method used to set each pinch valve value
    * ------------------------------------------------------------------------*/
    setStepValues(angle, servoKey, displayedInfo) {

      this.liquidDispenserModuleConfig.data[0][servoKey] = parseInt(angle);

      if (angle === 0)
        this.liquidDispenserModuleConfig.data[0][displayedInfo] = 0;
      else if (angle > 0)
        this.liquidDispenserModuleConfig.data[0][displayedInfo] = 'Right';
      else
        this.liquidDispenserModuleConfig.data[0][displayedInfo] = 'Left';
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
        document.getElementById('ps1SpeedRange').style.visibility = 'hidden';
        document.getElementById('ps2SpeedRange').style.visibility = 'hidden';
        document.getElementById('ps3SpeedRange').style.visibility = 'hidden';
        document.getElementById('pump1Speed').style.visibility = 'hidden';
        document.getElementById('pumpLeft-button').style.visibility = 'hidden';
        document.getElementById('pumpRight-button').style.visibility = 'hidden';
        document.getElementById('razPs1').style.visibility = 'hidden';
        document.getElementById('razPs2').style.visibility = 'hidden';
        document.getElementById('razPs3').style.visibility = 'hidden';
        document.getElementById('pump1Speed').disabled = true;
        document.getElementById('pump1Input').disabled = true;

      }

      this.hidePump();

      // Initialize names
      this.dropDispenserModuleConfig.name = this.$store.state.dropDispenserModuleName;
      this.liquidDispenserModuleConfig.name = this.$store.state.liquidDispenserModuleName;
      this.tlcMigrationModuleConfig.name = this.$store.state.tlcMigrationModuleName;
      this.phMeterModuleConfig.name = this.$store.state.phMeterModuleName;
      this.ginaModuleConfig.name = this.$store.state.ginaModuleName;
      this.aurasModule.name = this.$store.state.aurasModuleName;

      //Initialize default waitingCondition instrument
      this.waitingConditionConfig.instrumentSelected = this.ginaModuleConfig.name;

      // Initialize the PS positions
      this.liquidDispenserModuleConfig.sP1PAbsolutePosition = document.getElementById('ps1LiquidLevel').value;

    },

    hidePump() {
      let element = document.getElementById('wheelLeft');
      element.style.display = 'none';
      let element1 = document.getElementById('wheelRight');
      element1.style.display = 'none';
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
                  this.$store.state.aurasIp = this.webSocket.ipAddress = network['ipAddress'];
                  this.$parent.simulatorMode = this.webSocket.ipAddress.toString().includes('ws');

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
            this.online = false;
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

    checkAurasIsOnline() {
      this.online = this.$store.state.connectionWS.readyState === 1;
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

        if (this.angle === 0) this.angle = 55;
        else if (this.angle > 5) this.angle = -55;
        if (document.getElementById(id).style.transform.includes('-')) this.angle = 0;

      } else {
        if (this.angle === 0) this.angle = 15;
        else if (this.angle > 5) this.angle = -20;
        if (document.getElementById(id).style.transform.includes('-')) this.angle = 0;

      }

      this.setModulePhysicalPosition(this.liquidDispenserModuleConfig, this.angle, id);

    },

    /*------------------------------------------------------------------------
    * Method used to rotate pinch valves physically
    * ------------------------------------------------------------------------*/
    manageRunStages(data) {

      const obj = JSON.parse(data);

      this.hidePump();

      if (obj.status === 'success') {

        switch (obj.stage) {

          case 'init':
            this.setDefaultSettings();
            break;

          case 'runMethod':
            if (obj.stepNumber === this.$parent.stepModule.totalOfSteps - 1)
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

    reloadPage() {
      location.reload();
      console.log('reloaded');
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

      if (obj.stage !== undefined) {

        if (obj.stage === 'init') {
          this.setDefaultSettings();
        } else {
          console.log('pass')
          this.manageRunStages(data);
          return;
        }
      }
      //Restart Simulator
      if (obj.Restarted !== undefined) {

        setTimeout(this.reloadPage, 2000);
      }


      //TLCMigration
      if (obj.TLCMigration !== undefined)
        this.tlcMigrationModuleConfig.selectedOption = this.tlcMigrationModuleConfig.items[obj.TLCMigration];

      //PHMeter
      if (obj.PHMeter !== undefined) {

        this.phMeterModuleConfig.selectedOption = this.phMeterModuleConfig.items[obj.PHMeter];
      }

      if (obj.SolCurrentPosition !== undefined) {
        let value = -1 * (-193 + obj.SolCurrentPosition * 0.0024);
        document.getElementById('phSolutions-image').style.left = value + 'px';
      }

      if (obj.ProbeCurrentPosition !== undefined) {
        let value = (105 + obj.ProbeCurrentPosition * 0.0024);
        document.getElementById('phProbe-image').style.top = value + 'px';
      }

      //DropDispenser
      if (obj.DropDispenser !== undefined)
        this.dropDispenserModuleConfig.selectedOption = this.dropDispenserModuleConfig.items[obj.DropDispenser];

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
        let element = document.getElementById("ps1LiquidLevel");
        element.innerText = value.toFixed(0);
        element.style.width = value / 10 + '%';
        this.liquidDispenserModuleConfig.data[0].sP1P = document.getElementById("volumeSp1Input").value = value.toFixed(0);
        this.liquidDispenserModuleConfig.sP1PAbsolutePosition = value;

        let element1 = document.getElementById('sp-plug1');
        let value1 = 425 - value / 5;
        element1.style.top = value1 + 'px';

      }

      // SP1 Relative position
      if (obj.SP1CurrentRelativePosition !== undefined) {
        let value = parseInt(obj.SP1CurrentRelativePosition) / 1000;
        this.liquidDispenserModuleConfig.data[0].sP1P = document.getElementById("volumeSp1Input").value = value.toFixed(0);
      }

      // SP1 Max speed
      if (obj.SP1MaxSpeed !== undefined) {
        let maxSpeed = parseInt(obj.SP1MaxSpeed) / 1000;
        this.liquidDispenserModuleConfig.data[0].sP1S = maxSpeed;
        this.liquidDispenserModuleConfig.sp1MaxSpeed = maxSpeed;
        document.getElementById("ps1SpeedLabel").innerText = "Max Speed: " + maxSpeed + " µL/s";
        document.getElementById("ps1SpeedLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModuleConfig.sp1CurrentSpeed + " µL/s";

        //Init max speed range
        document.getElementById("ps1SpeedRange").value = maxSpeed;
      }

      // SP1 Current Speed
      if (obj.SP1Speed !== undefined) {


        let currentSpeed = parseInt(obj.SP1Speed) / 1000;
        this.liquidDispenserModuleConfig.sp1CurrentSpeed = currentSpeed;
        currentSpeed = currentSpeed.toFixed(0);
        document.getElementById("ps1SpeedLabel").innerText = "Max Speed: " + this.liquidDispenserModuleConfig.sp1MaxSpeed + " µL/s";
        document.getElementById("ps1SpeedLabel").innerHTML += "\nCurrent Speed: " + currentSpeed + " µL/s";
      }

      // SP2 Absolute position
      if (obj.SP2CurrentPosition !== undefined) {

        let value = parseInt(obj.SP2CurrentPosition) / 1000;
        let element = document.getElementById("ps2LiquidLevel");
        element.innerText = value.toFixed(0);
        element.style.width = value / 10 + '%';
        this.liquidDispenserModuleConfig.data[0].sP2P = document.getElementById("volumeSp2Input").value = value.toFixed(0);
        this.liquidDispenserModuleConfig.sP2PAbsolutePosition = value;

        let element1 = document.getElementById('sp-plug2');
        let value1 = 425 - value / 5;
        element1.style.top = value1 + 'px';

        // Init PS Absolute position
        this.liquidDispenserModuleConfig.sP2PAbsolutePosition = value;

      }

      // SP2 Relative position
      if (obj.SP2CurrentRelativePosition !== undefined) {
        let value = parseInt(obj.SP2CurrentRelativePosition) / 1000;
        this.liquidDispenserModuleConfig.data[0].sP2P = document.getElementById("volumeSp2Input").value = value.toFixed(0);

      }

      // SP2 Max speed
      if (obj.SP2MaxSpeed !== undefined) {
        let maxSpeed = parseInt(obj.SP2MaxSpeed) / 1000;
        this.liquidDispenserModuleConfig.data[0].sP2S = maxSpeed;
        this.liquidDispenserModuleConfig.sp2MaxSpeed = maxSpeed;
        document.getElementById("ps2SpeedLabel").innerText = "Max Speed: " + maxSpeed + " µL/s";
        document.getElementById("ps2SpeedLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModuleConfig.sp2CurrentSpeed + " µL/s";

        // Init max speed range
        document.getElementById("ps2SpeedRange").value = maxSpeed;
      }

      // SP2 Current speed
      if (obj.SP2Speed !== undefined) {
        let currentSpeed = parseInt(obj.SP2Speed) / 1000;
        currentSpeed = currentSpeed.toFixed(0);
        this.liquidDispenserModuleConfig.sp2CurrentSpeed = currentSpeed;
        document.getElementById("ps2SpeedLabel").innerText = "Max Speed: " + this.liquidDispenserModuleConfig.sp2MaxSpeed + " µL/s";
        document.getElementById("ps2SpeedLabel").innerHTML += "\nCurrent Speed: " + currentSpeed + " µL/s";
      }

      // SP3 Absolute position
      if (obj.SP3CurrentPosition !== undefined) {

        let value = parseInt(obj.SP3CurrentPosition) / 1000;
        let element = document.getElementById("ps3LiquidLevel");
        element.innerText = value.toFixed(0);
        element.style.width = value / 10 + '%';
        this.liquidDispenserModuleConfig.data[0].sP3P = document.getElementById("volumeSp3Input").value = value.toFixed(0);
        this.liquidDispenserModuleConfig.sP3PAbsolutePosition = value;

        let element1 = document.getElementById('sp-plug3');
        let value1 = 425 - value / 5;
        element1.style.top = value1 + 'px';

        // Init PS Absolute position
        this.liquidDispenserModuleConfig.sP3PAbsolutePosition = value;

      }

      // SP3 Relative position
      if (obj.SP3CurrentRelativePosition !== undefined) {
        let value = parseInt(obj.SP3CurrentRelativePosition) / 1000;
        this.liquidDispenserModuleConfig.data[0].sP3P = document.getElementById("volumeSp3Input").value = value.toFixed(0);
      }

      // SP3 Max speed
      if (obj.SP3MaxSpeed !== undefined) {
        let maxSpeed = parseInt(obj.SP3MaxSpeed) / 1000;
        this.liquidDispenserModuleConfig.data[0].sP3S = maxSpeed;
        this.liquidDispenserModuleConfig.sp3MaxSpeed = maxSpeed;
        document.getElementById("ps3SpeedLabel").innerText = "Max Speed: " + maxSpeed + " µL/s";
        document.getElementById("ps3SpeedLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModuleConfig.sp3CurrentSpeed + " µL/s";

        // Init max speed range
        document.getElementById("ps3SpeedRange").value = maxSpeed;
      }

      // SP3 Current speed
      if (obj.SP3Speed !== undefined) {
        let currentSpeed = parseInt(obj.SP3Speed) / 1000;
        currentSpeed = currentSpeed.toFixed(0);
        this.liquidDispenserModuleConfig.sp3CurrentSpeed = currentSpeed;
        document.getElementById("ps3SpeedLabel").innerText = "Max Speed: " + this.liquidDispenserModuleConfig.sp3MaxSpeed + " µL/s";
        document.getElementById("ps3SpeedLabel").innerHTML += "\nCurrent Speed: " + currentSpeed + " µL/s";
      }

      // PUMP1 Absolute position
      if (obj.PUMP1CurrentPosition !== undefined) {

        let value = parseInt(obj.PUMP1CurrentPosition) / 360;
        value = value.toFixed(1);

        this.liquidDispenserModuleConfig.data[0].pumP1P = value;
        document.getElementById("pump1Input").value = value;

        // Display turning wheel if method is running

        if (this.mode === 'run' && obj.stage !== 'init') {

          // TODO: Stop the pump revolutions

        }
      }
      // PUMP1 Max speed
      if (obj.PUMP1MaxSpeed !== undefined) {
        let value = parseInt(obj.PUMP1MaxSpeed) / 6;
        this.liquidDispenserModuleConfig.pump1MaxSpeed = value.toFixed(1);
        document.getElementById("pumpsLabel").innerHTML = "Max Speed: " + this.liquidDispenserModuleConfig.pump1MaxSpeed + " RPM";
        document.getElementById("pumpsLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModuleConfig.pump1CurrentSpeed + " RPM";
        this.liquidDispenserModuleConfig.data[0].pumP1S = parseInt(value);

        document.getElementById("pump1Speed").value = value;

      }

      // PUMP1 Current speed
      if (obj.PUMP1Speed !== undefined) {
        let value = parseFloat(obj.PUMP1Speed) / 6;
        this.liquidDispenserModuleConfig.pump1CurrentSpeed = value.toFixed(1);
        document.getElementById("pumpsLabel").innerHTML = "Max Speed: " + this.liquidDispenserModuleConfig.pump1MaxSpeed + " RPM";
        document.getElementById("pumpsLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModuleConfig.pump1CurrentSpeed + " RPM";


        // Display pump revolutions

        if (value > 0) {

          let speed = 60 / value;

          let element = document.getElementById('wheelRight');
          element.style.display = 'inline';
          element.style.visibility = 'visible';
          element.style.animationDuration = speed + "s";

          let element1 = document.getElementById('wheelLeft');
          element1.style.display = 'none';

        } else if (value < 0) {

          let speed = -1 * (60 / value);
          let element = document.getElementById('wheelLeft');
          element.style.display = 'inline';
          element.style.visibility = 'visible';
          element.style.animationDuration = speed + "s";


          let element1 = document.getElementById('wheelRight');
          element1.style.display = 'none';

        } else {

          let element = document.getElementById('wheelRight');
          element.style.display = 'none';
          let element1 = document.getElementById('wheelLeft');
          element1.style.display = 'none';
        }

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

            let data = {SP1: {MoveTo: parseInt(value) * 1000}};
            this.liquidDispenserModuleConfig.data[0].sP1P = parseInt(value);
            this.liquidDispenserModuleConfig.sp1VolumeUsed = true;
            this.sendToWebsocket(data);
          }

          if (componentId === 'volumeSp2Input') {
            let data = {SP2: {MoveTo: parseInt(value) * 1000}};
            this.liquidDispenserModuleConfig.data[0].sP2P = parseInt(value);
            this.liquidDispenserModuleConfig.sp2VolumeUsed = true;
            this.sendToWebsocket(data);
          }

          if (componentId === 'volumeSp3Input') {

            let data = {SP3: {MoveTo: parseInt(value) * 1000}};
            this.liquidDispenserModuleConfig.data[0].sP3P = parseInt(value);
            this.liquidDispenserModuleConfig.sp3VolumeUsed = true;
            this.sendToWebsocket(data);
          }

          if (componentId === 'pump1Input') {
            // this.liquidDispenserModule.sp3Quantity = parseInt(value);
            let data = {PUMP1: {PUMP1TargetPosition: parseFloat(value) * 360}};
            this.liquidDispenserModuleConfig.data[0].pumP1P = parseFloat(value);
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

    resetSp(id) {

      let data = null;
      switch (id) {

        case 'sp1':
          data = {SP1: {MoveTo: -2000000}};
          this.sendToWebsocket(data);
          break;
        case'sp2':
          data = {SP2: {MoveTo: -2000000}};
          this.sendToWebsocket(data);
          break;
        case 'sp3':
          data = {SP3: {MoveTo: -2000000}};
          this.sendToWebsocket(data);
          break;
      }

    },

    /*------------------------------------------------------------------------
    * Moves the PS up or down
    * ------------------------------------------------------------------------*/
    moveStepperMotors(id, click) {

      this.noRotation = true;
      this.liquidDispenserModuleConfig.sp3VolumeUsed = false;
      this.liquidDispenserModuleConfig.sp2VolumeUsed = false;
      this.liquidDispenserModuleConfig.sp1VolumeUsed = false;

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
            let data = {PUMP1: {MoveTo: -3000000}};
            this.sendToWebsocket(data);
          } else {
            let data = {PUMP1: {Stop: true}};
            this.sendToWebsocket(data);
          }
          break;

        case 'pumpRight':


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
      document.getElementById('wheelLeft').style.display = 'none';
      document.getElementById('wheelRight').style.display = 'none';
    }
  }
}

</script>

<style scoped lang="scss">

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
  min-width: 97%;
  height: 900px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-right: 550px;

}


/*modules*/

/*TLC Migration*/
.cover {
  padding: 10px 30px;
  position: relative;
  z-index: 1;
}

.left {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
}

.right {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
}

#tlcMigration-section {
  position: absolute;
  left: 20px;
  top: 120px;
  display: none;

  #tlc_title {
    position: absolute;
    left: 100px;
    top: -100px;
    font-size: 25px;
  }

  #tlcMigration-image {
    position: absolute;
    top: 148px;
    width: 600px;
  }

  #tlcMigration-buttons {

    position: absolute;
    left: 150px;
    top: 40px;

    #tlc_btn_0 {
      position: absolute;
    }

    #tlc_btn_1 {
      position: absolute;
      left: 50px;
    }

    #tlc_btn_2 {
      position: absolute;
      left: 100px;
    }

    #tlc_btn_3 {
      position: absolute;
      left: 150px;
    }
  }
}


/*Drop Dispenser*/

#dropDispenser-section {
  position: absolute;
  left: 50px;
  top: 148px;

  #dd_title {
    position: absolute;
    left: 180px;
    margin-top: -50px;
    font-size: 25px;
    white-space: nowrap;

  }

  #dropDispenser-image {
    margin-top: 100px;
    width: 600px;
  }

  #dropDispenser-buttons {
    position: absolute;
    top: 0;
    left: -440px;

    #dd_btn_0 {
      margin-left: 650px;
    }

    #dd_btn_1 {
      margin-left: 30px;
    }

  }

}

/*PH Meter*/

#phMeter-section {

  position: absolute;
  left: 1000px;
  top: 70px;

  #ph_title {
    position: absolute;
    left: 180px;
    margin-top: -50px;
    font-size: 25px;
    white-space: nowrap;

  }

  #phMeter-image {
    position: absolute;
    margin-top: 100px;
    width: 1400px;
    height: auto;
    left: -400px;
  }

  #phSolutions-image {
    position: absolute;
    height: auto;
    top: 500px;
    left: 13px;
    width: 546px;
  }

  #phProbe-image {
    position: absolute;
    left: -110px;
    top: 258px;
    height: auto;
    width: 780px;
  }

  #phMeters-buttons {
    position: absolute;
    top: 10px;

    #phm_btn_0 {
      position: absolute;
    }

    #phm_btn_1 {
      position: absolute;
      left: 80px;
    }

    #phm_btn_2 {
      position: absolute;
      left: 160px;
    }

    #phm_btn_3 {
      position: absolute;
      left: 240px;
    }

    #phm_btn_4 {
      position: absolute;
      left: 320px;
    }

    #phm_btn_5 {
      position: absolute;
      left: 400px;
    }
  }

}

/* Liquid Dispenser */

#liquid-dispenser-section {
  position: absolute;
  left: 1000px;
  top: -18px;

  #ld_title {
    position: absolute;
    left: 1492px;
    margin-top: 37px;
    font-size: 25px;
    white-space: nowrap;
  }

  #liquid-dispenser-image {
    position: absolute;
    height: 720px;
    width: 1280px;
    left: 735px;
    top: 148px;
  }

  #sp-plug3 {
    position: absolute;
    z-index: 1;
    left: 1028px;
    top: 420px;
    width: 70px;
  }

  #sp-plug1 {
    position: absolute;
    z-index: 1;
    left: 1354px;
    top: 420px;
    width: 70px;
  }

  #sp-plug2 {
    position: absolute;
    z-index: 1;
    left: 1830px;
    top: 420px;
    width: 70px;
  }

  /* syringes */

  /* PS3 */
  #ps3 {
    position: absolute;
    left: 1000px;
    top: 100px;

    #select-sp3 {
      position: absolute;
    }

    #ps3SpeedLabel {
      position: absolute;
      margin-top: 30px;
      font-size: 14px;
      height: fit-content;
      width: 200px;
      resize: none;
    }

    #ps3SpeedRange {
      position: absolute;
      margin-top: 80px;
      height: fit-content;
    }

    #razPs3 {
      position: absolute;
      left: 160px;
      background-color: #eb3434;
    }

    #volumeSp3Up {
      position: absolute;
      left: 220px;
    }

    #volumeSp3Down {
      position: absolute;
      background-color: #e07b39;
      left: 272px;
    }

    #volumeSp3Input {
      position: absolute;
      left: 220px;
      margin-top: 30px;
    }


  }

  #PS3PProgressbar {
    position: absolute;
    left: 984px;
    top: 569px;
    width: 157px;
    height: 18px;

  }

  /* PS1 */

  #ps1 {
    position: absolute;
    left: 1400px;
    top: 100px;

    #select-sp1 {
      position: absolute;

    }

    #ps1SpeedLabel {
      position: absolute;
      margin-top: 30px;
      font-size: 14px;
      height: fit-content;
      width: 200px;
      resize: none;
    }

    #ps1SpeedRange {
      position: absolute;
      margin-top: 80px;
      height: fit-content;
    }

    #razPs1 {
      position: absolute;
      left: 160px;
      background-color: #eb3434;
    }

    #volumeSp1Up {
      position: absolute;
      left: 220px;
    }

    #volumeSp1Down {
      position: absolute;
      background-color: #e07b39;
      left: 272px;
    }

    #volumeSp1Input {
      position: absolute;
      left: 220px;
      margin-top: 30px;
    }
  }


  #PS1PProgressbar {
    position: absolute;
    left: 1309px;
    top: 569px;
    width: 159px;
    height: 18px;
  }


  /* PS2 */

  #ps2 {
    position: absolute;
    left: 1800px;
    top: 100px;

    #select-sp2 {
      position: absolute;
    }

    #ps2SpeedLabel {
      position: absolute;
      margin-top: 30px;
      font-size: 14px;
      height: fit-content;
      width: 200px;
      resize: none;
    }

    #ps2SpeedRange {
      position: absolute;
      margin-top: 80px;
      height: fit-content;
    }

    #razPs2 {
      position: absolute;
      left: 160px;
      background-color: #eb3434
    }

    #volumeSp2Up {
      position: absolute;
      left: 220px;
    }

    #volumeSp2Down {
      position: absolute;
      background-color: #e07b39;
      left: 272px;
    }

    #volumeSp2Input {
      position: absolute;
      left: 220px;
      margin-top: 30px;
    }
  }

  #PS2PProgressbar {
    position: absolute;
    left: 1785px;
    top: 569px;
    width: 159px;
    height: 18px;;
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
    height: 18px;
    border-radius: 5px;
  }

  /*pump*/


  /* pinch valves */

  .pinch {
    height: 60px;
    width: 60px;
    display: inline-block;
  }

  #ldS1 {
    position: absolute;
    left: 1147px;
    top: 358px;

  }

  #ldS2 {
    position: absolute;
    left: 1147px;
    top: 441px;
  }

  #ldS3 {
    position: absolute;
    left: 1147px;
    top: 524px;
  }

  #ldS4 {
    position: absolute;
    left: 1147px;
    top: 605px;
  }

  #ldS5 {
    position: absolute;
    left: 1147px;
    top: 687px;
  }

  #ldS6 {
    position: absolute;
    left: 868px;
    top: 688px;
  }

  #ldS7 {
    position: absolute;
    left: 1003px;
    top: 730px;
    height: 120px;
    width: 120px;
    display: inline-block;
  }

  #ldS8 {
    position: absolute;
    left: 1327px;
    top: 730px;
    height: 120px;
    width: 120px;
    display: inline-block;
  }

  #ldS9 {
    position: absolute;
    left: 1470px;
    top: 688px;
  }

  #ldS10 {
    position: absolute;
    left: 1580px;
    top: 683px;
  }

  #ldS11 {
    position: absolute;
    left: 1718px;
    top: 745px;
  }

  #ldS12 {
    position: absolute;
    left: 1869px;
    top: 745px;
  }


  #pump {

    position: absolute;
    left: 1460px;
    top: 350px;

    #pumpLeft-button {
      position: absolute;

    }


    #pumpRight-button {
      position: absolute;
      background-color: #e07b39;
      left: 70px;
    }

    #pump1Input {
      position: absolute;
      left: 140px;

    }

    #pumpsLabel {
      position: absolute;
      top: 30px;
      font-size: 14px;
      height: fit-content;
      width: 200px;
      resize: none;
    }

    #pump1Speed {
      position: absolute;
      top: 80px;
    }


    #wheelRight {
      position: absolute;
      top: 180px;
      left: 50px;
      width: 80px;
      -webkit-animation: spin 3s linear infinite;
      animation: spin 3s linear infinite;
    }

    #wheelLeft {
      position: absolute;
      top: 180px;
      left: 50px;
      width: 80px;
      -webkit-animation: spin1 3s linear infinite;
      animation: spin1 3s linear infinite;
    }
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

}

</style>

<style lang="scss">


</style>