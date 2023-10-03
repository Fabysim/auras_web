<template>

  <div id="platform">
    <!--Actions-->

    <v-card
        class="table"

    >
      <v-card-title
          class="justify-center"
          v-if="mode==='config'"
      >
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
                    <template v-slot:[`item.v11Info`]="{ item }">
                      <div v-if="item.v11Info ==='Closed'">
                        <span style="color: red"> {{ item.v11Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v11Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v12Info`]="{ item }">
                      <div v-if="item.v12Info ==='Closed'">
                        <span style="color: red"> {{ item.v12Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v12Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v13Info`]="{ item }">
                      <div v-if="item.v13Info ==='Closed'">
                        <span style="color: red"> {{ item.v13Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v13Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v14Info`]="{ item }">
                      <div v-if="item.v14Info ==='Closed'">
                        <span style="color: red"> {{ item.v14Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v14Info }}</span>
                      </div>
                    </template>

                    <template v-slot:[`item.v21Info`]="{ item }">
                      <div v-if="item.v21Info ==='Closed'">
                        <span style="color: red"> {{ item.v21Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v21Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v22Info`]="{ item }">
                      <div v-if="item.v22Info ==='Closed'">
                        <span style="color: red"> {{ item.v22Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v22Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v23Info`]="{ item }">
                      <div v-if="item.v23Info ==='Closed'">
                        <span style="color: red"> {{ item.v23Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v23Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v24Info`]="{ item }">
                      <div v-if="item.v34Info ==='Closed'">
                        <span style="color: red"> {{ item.v24Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v24Info }}</span>
                      </div>
                    </template>

                    <template v-slot:[`item.v31Info`]="{ item }">
                      <div v-if="item.v31Info ==='Closed'">
                        <span style="color: red"> {{ item.v31Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v31Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v32Info`]="{ item }">
                      <div v-if="item.v32Info ==='Closed'">
                        <span style="color: red"> {{ item.v32Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v32Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v33Info`]="{ item }">
                      <div v-if="item.v33Info ==='Closed'">
                        <span style="color: red"> {{ item.v33Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v33Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v34Info`]="{ item }">
                      <div v-if="item.v34Info ==='Closed'">
                        <span style="color: red"> {{ item.v34Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v34Info }}</span>
                      </div>
                    </template>

                    <template v-slot:[`item.v41Info`]="{ item }">
                      <div v-if="item.v41Info ==='Closed'">
                        <span style="color: red"> {{ item.v41Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v41Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v42Info`]="{ item }">
                      <div v-if="item.v42Info ==='Closed'">
                        <span style="color: red"> {{ item.v42Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v42Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v43Info`]="{ item }">
                      <div v-if="item.v43Info ==='Closed'">
                        <span style="color: red"> {{ item.v43Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v43Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v44Info`]="{ item }">
                      <div v-if="item.v44Info ==='Closed'">
                        <span style="color: red"> {{ item.v44Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v44Info }}</span>
                      </div>
                    </template>

                    <template v-slot:[`item.v51Info`]="{ item }">
                      <div v-if="item.v51Info ==='Closed'">
                        <span style="color: red"> {{ item.v51Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v51Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v52Info`]="{ item }">
                      <div v-if="item.v52Info ==='Closed'">
                        <span style="color: red"> {{ item.v52Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v52Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v53Info`]="{ item }">
                      <div v-if="item.v53Info ==='Closed'">
                        <span style="color: red"> {{ item.v53Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v53Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v54Info`]="{ item }">
                      <div v-if="item.v54Info ==='Closed'">
                        <span style="color: red"> {{ item.v54Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v54Info }}</span>
                      </div>
                    </template>

                    <template v-slot:[`item.v61Info`]="{ item }">
                      <div v-if="item.v61Info ==='Closed'">
                        <span style="color: red"> {{ item.v61Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v61Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v62Info`]="{ item }">
                      <div v-if="item.v62Info ==='Closed'">
                        <span style="color: red"> {{ item.v62Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v62Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v63Info`]="{ item }">
                      <div v-if="item.v63Info ==='Closed'">
                        <span style="color: red"> {{ item.v63Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v63Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v64Info`]="{ item }">
                      <div v-if="item.v64Info ==='Closed'">
                        <span style="color: red"> {{ item.v64Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v64Info }}</span>
                      </div>
                    </template>

                    <template v-slot:[`item.v71Info`]="{ item }">
                      <div v-if="item.v71Info ==='Closed'">
                        <span style="color: red"> {{ item.v71Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v71Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v72Info`]="{ item }">
                      <div v-if="item.v72Info ==='Closed'">
                        <span style="color: red"> {{ item.v72Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v72Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v73Info`]="{ item }">
                      <div v-if="item.v73Info ==='Closed'">
                        <span style="color: red"> {{ item.v73Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v73Info }}</span>
                      </div>
                    </template>
                    <template v-slot:[`item.v74Info`]="{ item }">
                      <div v-if="item.v74Info ==='Closed'">
                        <span style="color: red"> {{ item.v74Info }}</span>
                      </div>
                      <div v-else>
                        <span style="color: green"> {{ item.v74Info }}</span>
                      </div>
                    </template>


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
                  <v-card-title class="justify-center module-title-color"> Description</v-card-title>
                  <v-text-field label="Enter a comment" v-model="commentConfig"/>
                </v-card>
              </td>

            </tr>
          </table>
        </vue-scroll-snap>

      </v-card-text>
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

    <div class="image_cover">
      <!--      Image Navigation-->

      <v-card id="image-navigation-buttons">
        <v-card-actions>

          <div id="connection-state">
            <div v-if="online">
              <v-icon color="success">mdi-power</v-icon>
              <span style="color: green"> Online</span>
            </div>

            <div v-else>
              <v-icon color="error">mdi-power</v-icon>
              <span style="color: red"> Offline</span>
            </div>
          </div>


          <v-tooltip bottom v-if="simulatorMode">
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined
                     fab
                     class="ml-16"
                     v-bind="attrs"
                     v-on="on"
                     @click="restartSimulator()"
                     color="red"
              >
                <Icon icon="bi:sign-stop"
                      class="emergency-stop-icon"
                      x-large
                      color="#eb3434"/>
              </v-btn>
            </template>
            <span>Reset Simulator</span>
          </v-tooltip>

          <v-tooltip bottom v-else>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined
                     fab
                     class="ml-16"
                     v-bind="attrs"
                     v-on="on"
                     @click="emergencyStop"
                     color="red"
              >
                <Icon icon="bi:sign-stop"
                      class="emergency-stop-icon"
                      large
                      color="#eb3434"/>
              </v-btn>
            </template>
            <span>Emergency Stop</span>
          </v-tooltip>


          <v-spacer/>
          <!--        Navigation buttons-->

          <v-btn
              @click="leftScroll"
              class="ma-2 mr-16"
              outlined
              small
          >
            <v-icon class="nav-chevron">mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn
              small
              dark
              class="module-buttons"
              outlined
              @click="scrollTo(tlcMigrationModuleConfig.name)"
          > {{ tlcMigrationModuleConfig.name }}
          </v-btn>
          <v-btn
              small
              class="module-buttons"
              outlined
              @click="scrollTo(dropDispenserModuleConfig.name)"
          > {{ dropDispenserModuleConfig.name }}
          </v-btn>


          <v-btn
              small
              class="module-buttons"
              outlined
              @click="scrollTo(phMeterModuleConfig.name)"
          > {{ phMeterModuleConfig.name }}
          </v-btn>

          <v-btn
              small
              class="module-buttons"
              outlined
              @click="scrollTo(liquidDispenserModuleConfig.name)"
          > {{ liquidDispenserModuleConfig.name }}
          </v-btn>

          <v-btn
              @click="rightScroll"
              class="ma-2 ml-16"
              outlined
              small
          >
            <v-icon class="nav-chevron">mdi-chevron-right</v-icon>
          </v-btn>

          <v-spacer/>

          <v-btn id="save-step-button"
                 v-if="mode==='config'"
                 style="background-color: dodgerblue; color: white;"
                 @click="$emit('lineSaved')"
          >
            Save step
          </v-btn>
        </v-card-actions>
      </v-card>

      <div id="image-container">

        <!--TLC Migration-->

        <div id="tlcMigration-section">

          <label id="tlc_title" class="module-title-color">{{ tlcMigrationModuleConfig.name }}</label>

          <!--          <img id="tlcMigration-image" src="../../assets/LiquidDispenserImages/phMeter.png" alt=""/>-->

          <div id="tlcMigration-buttons">


            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    rounded
                    outlined
                    large
                    color="black"
                    id="tlc_btn_home"
                    @click="setModulePhysicalPosition(tlcMigrationModuleConfig, tlcMigrationModuleConfig.items[0])"
                >
                  <v-icon dark>
                    mdi-home
                  </v-icon>
                  {{ tlcMigrationModuleConfig.items[0] }}
                </v-btn>
              </template>
              <span>{{ tlcMigrationModuleConfig.items[0] }}</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    rounded
                    outlined
                    large
                    color="black"
                    id="tlc_btn_ready"
                    @click="setModulePhysicalPosition(tlcMigrationModuleConfig, tlcMigrationModuleConfig.items[1])"
                >
                  <v-icon dark>
                    mdi-beaker-check-outline
                  </v-icon>
                  {{ tlcMigrationModuleConfig.items[1] }}
                </v-btn>
              </template>
              <span>{{ tlcMigrationModuleConfig.items[1] }}</span>
            </v-tooltip>


            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    rounded
                    outlined
                    large
                    color="black"
                    id="tlc_btn_migration"
                    @click="setModulePhysicalPosition(tlcMigrationModuleConfig, tlcMigrationModuleConfig.items[2])"
                >
                  <v-icon dark>
                    mdi-boom-gate-arrow-down-outline
                  </v-icon>
                  {{ tlcMigrationModuleConfig.items[2] }}
                </v-btn>
              </template>
              <span>{{ tlcMigrationModuleConfig.items[2] }}</span>
            </v-tooltip>

          </div>
        </div>

        <!--Drop Dispenser-->

        <div id="dropDispenser-section">
          <label id="dd_title" class="module-title-color">{{ dropDispenserModuleConfig.name }}</label>
          <!--          <img ID="dropDispenser-image" src="../../assets/LiquidDispenserImages/phMeter.png" alt=""/>-->
          <div id="dropDispenser-buttons">

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    rounded
                    outlined
                    large
                    color="black"
                    id="dd_btn_none"
                    @click="setModulePhysicalPosition(dropDispenserModuleConfig, dropDispenserModuleConfig.items[0])"
                >
                  <v-icon dark>
                    mdi-circle-off-outline
                  </v-icon>
                  {{ dropDispenserModuleConfig.items[0] }}
                </v-btn>
              </template>
              <span>{{ dropDispenserModuleConfig.items[0] }}</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    rounded
                    outlined
                    large
                    color="black"
                    id="dd_btn_standards"
                    @click="setModulePhysicalPosition(dropDispenserModuleConfig,dropDispenserModuleConfig.items[1])"
                >
                  <v-icon dark>
                    mdi-water
                  </v-icon>
                  {{ dropDispenserModuleConfig.items[1] }}
                </v-btn>
              </template>
              <span>{{ dropDispenserModuleConfig.items[1] }}</span>
            </v-tooltip>

          </div>
        </div>

        <!--Ph Meter-->

        <div id="phMeter-section">
          <label id="ph_title" class="module-title-color">{{ phMeterModuleConfig.name }}</label>

          <div id="phMeterImages">
            <img id="phMeterBasement-image" src="../../../assets/LiquidDispenserImages/phMeter.png" alt=""/>
            <img id="phSolutions-image" src="../../../assets/LiquidDispenserImages/ph_solutions.png" alt=""/>
            <img id="phProbe-image" src="../../../assets/LiquidDispenserImages/ph_probe.png" alt=""/>
          </div>
          <div id="phMeters-buttons">

            <!--Buffer Low-->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    rounded
                    outlined
                    large
                    id="phm_btn_buffer_low"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[3])"
                >
                  <v-icon>
                    mdi-thermometer-probe
                  </v-icon>
                  {{ phMeterModuleConfig.items[3] }}
                </v-btn>
              </template>
              <span>Calibration 1</span>
            </v-tooltip>
            <!--Buffer High-->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    rounded
                    outlined
                    large
                    id="phm_btn_buffer_high"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[4])"
                >
                  <v-icon>
                    mdi-thermometer-probe
                  </v-icon>
                  {{ phMeterModuleConfig.items[4] }}
                </v-btn>
              </template>
              <span>Calibration 2</span>
            </v-tooltip>
            <!--Kcl-->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    rounded
                    outlined
                    large
                    color="black"
                    id="phm_btn_kcl"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[0])"
                >
                  <v-icon>
                    mdi-alpha-k-circle-outline
                  </v-icon>
                  {{ phMeterModuleConfig.items[0] }}
                </v-btn>
              </template>
              <span>{{ phMeterModuleConfig.items[0] }}</span>
            </v-tooltip>
            <!--Rinsing-->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    rounded
                    outlined
                    large
                    color="black"
                    id="phm_btn_rinsing"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[2])"
                >
                  <v-icon dark>
                    mdi-waves
                  </v-icon>
                  {{ phMeterModuleConfig.items[2] }}
                </v-btn>
              </template>
              <span>{{ phMeterModuleConfig.items[2] }}</span>
            </v-tooltip>
            <!--Measure-->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    rounded
                    outlined
                    large
                    color="black"
                    id="phm_btn_measure"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[1])"
                >
                  <v-icon dark>
                    mdi-ph
                  </v-icon>
                  {{ phMeterModuleConfig.items[1] }}
                </v-btn>
              </template>
              <span>{{ phMeterModuleConfig.items[1] }}</span>
            </v-tooltip>
            <!--Init-->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    color="black"
                    large
                    rounded
                    outlined
                    id="phm_btn_init"
                    @click="setModulePhysicalPosition(phMeterModuleConfig, phMeterModuleConfig.items[6])"
                >
                  <v-icon>
                    mdi-reload
                  </v-icon>
                  {{ phMeterModuleConfig.items[6] }}
                </v-btn>
              </template>
              <span>{{ phMeterModuleConfig.items[6] }}</span>
            </v-tooltip>

          </div>
        </div>

        <!--Liquid Dispenser--><!--Liquid Dispenser-->

        <div id="liquid-dispenser-section">

          <label id="ld_title" class="module-title-color">{{ liquidDispenserModuleConfig.name }}</label>

          <img id="liquid-dispenser-image" src="/Auras/Images/V2/Platine_prototype.jpg" alt=""/>

          <div id="syringes">

            <div id="syringe_supports">
              <img id="syringe_support1" src="/Auras/Images/V2/Assemblage1.PNG" alt=""/>
              <img id="syringe_support2" src="/Auras/Images/V2/Assemblage1.PNG" alt=""/>
              <img id="syringe_support3" src="/Auras/Images/V2/Assemblage1.PNG" alt=""/>
            </div>
            <div id="syringe_heads">

              <img id="sp-plug1" src="/Auras/Images/V2/Assemblage3.png" alt=""/>
              <img id="sp-plug2" src="/Auras/Images/V2/Assemblage3.png" alt=""/>
              <img id="sp-plug3" src="/Auras/Images/V2/Assemblage3.png" alt=""/>
            </div>
          </div>

          <div id="ld-switches">

            <v-switch v-model="liquidDispenserModuleConfig.data[0].v11Info"
                      true-value="Opened"
                      false-value="Closed"
                      @click="togglePinchValveState('v11')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 275px;top: 281px;opacity: 200%;"
            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v12"
                      @click="togglePinchValveState('v12')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 326px;top: 300px;opacity: 200%;transform: rotate(90deg);"

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v13"
                      @click="togglePinchValveState('v13')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 305px;top: 351px;opacity: 200%; transform: rotate(180deg);"

            >
            </v-switch>

            <v-switch v-model="liquidDispenserModuleConfig.data[0].v14"
                      @click="togglePinchValveState('v14')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 255px;top: 330px;opacity: 200%;transform: rotate(-90deg);"

            >
            </v-switch>

            <v-switch v-model="liquidDispenserModuleConfig.data[0].v21"
                      @click="togglePinchValveState('v21')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 274px;top: 483px;opacity: 200%;"
            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v22"
                      @click="togglePinchValveState('v22')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 325px;top: 502px;opacity: 200%;transform: rotate(90deg);  "

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v23"
                      @click="togglePinchValveState('v23')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 306px;top: 553px;opacity: 200%; transform: rotate(180deg);"

            >
            </v-switch>

            <v-switch v-model="liquidDispenserModuleConfig.data[0].v24"
                      @click="togglePinchValveState('v24')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 256px;top: 534px;opacity: 200%;transform: rotate(-90deg);"

            >
            </v-switch>

            <v-switch v-model="liquidDispenserModuleConfig.data[0].v31"
                      @click="togglePinchValveState('v31')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 274px;top: 685px;opacity: 200%;"
            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v32"
                      @click="togglePinchValveState('v32')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 255px;top: 735px;opacity: 200%;transform: rotate(-90deg);"

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v33"
                      @click="togglePinchValveState('v33')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 307px;top: 755px;opacity: 200%; transform: rotate(180deg) "

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v34"
                      @click="togglePinchValveState('v34')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 325px;top: 702px;opacity: 200%;transform: rotate(90deg);"

            >
            </v-switch>

            <v-switch v-model="liquidDispenserModuleConfig.data[0].v41"
                      @click="togglePinchValveState('v41')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 525px;top: 685px;opacity: 200%"
            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v42"
                      @click="togglePinchValveState('v42')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 577px;top: 703px;opacity: 200%;transform: rotate(90deg);"

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v43"
                      @click="togglePinchValveState('v43')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 558px;top: 755px;opacity: 200%; transform: rotate(180deg);"

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v44"
                      @click="togglePinchValveState('v44')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 507px;top: 736px;opacity: 200%;transform: rotate(-90deg);"

            >
            </v-switch>

            <v-switch v-model="liquidDispenserModuleConfig.data[0].v51"
                      @click="togglePinchValveState('v51')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 830px;top: 685px;opacity: 200%; "
            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v52"
                      @click="togglePinchValveState('v52')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 881px;top: 704px;opacity: 200%;transform: rotate(90deg);"

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v53"
                      @click="togglePinchValveState('v53')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 861px;top: 756px;opacity: 200%; transform: rotate(180deg);"

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v54"
                      @click="togglePinchValveState('v54')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 811px;top: 735px;opacity: 200%;transform: rotate(-90deg);"

            >
            </v-switch>

            <v-switch v-model="liquidDispenserModuleConfig.data[0].v61"
                      @click="togglePinchValveState('v61')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 1033px;top: 686px;opacity: 200%;"
            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v62"
                      @click="togglePinchValveState('v62')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 1083px;top: 704px;opacity: 200%;transform: rotate(90deg);"

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v63"
                      @click="togglePinchValveState('v63')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 1063px;top: 756px;opacity: 200%; transform: rotate(180deg);"

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v64"
                      @click="togglePinchValveState('v64')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 1013px;top: 736px;opacity: 200%;transform: rotate(-90deg);"

            >
            </v-switch>

            <v-switch v-model="liquidDispenserModuleConfig.data[0].v71"
                      @click="togglePinchValveState('v71')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 1235px;top: 686px;opacity: 200%;"
            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v72"
                      @click="togglePinchValveState('v72')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 1285px;top: 705px;opacity: 200%;transform: rotate(90deg);"

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v73"
                      @click="togglePinchValveState('v73')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 1265px;top: 757px;opacity: 200%; transform: rotate(180deg);"

            >
            </v-switch>
            <v-switch v-model="liquidDispenserModuleConfig.data[0].v74"
                      @click="togglePinchValveState('v74')"
                      readonly
                      light
                      background-color="dimgray"
                      color="#08a122"
                      style="position: absolute; left: 1215px;top: 736px;opacity: 200%;transform: rotate(-90deg);"

            >
            </v-switch>
          </div>

          <div id="ld-commands">

            <div id="syringe1-commands">

              <!--        PS1 control-->

              <select id="select-sp1" v-show="mode.toLowerCase()==='config'" class="firstLineComponent"
                      v-model="liquidDispenserModuleConfig.selectedSP1">
                <option v-for="item in liquidDispenserModuleConfig.items" :value="item" :key="item">
                  {{ item }}
                </option>
              </select>

              <textarea readonly id="ps1SpeedLabel"/>

              <div id="syringe1-buttons" v-show="mode.toLowerCase()==='config'">
                <v-btn :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                       small
                       outlined
                       class="empty"
                       id="razPs1"
                       @click="resetSp('sp1')">
                  <v-icon>
                    mdi-needle-off
                  </v-icon>

                  Empty
                </v-btn>

                <v-btn :disabled="!liquidDispenserModuleConfig.sp1VolumeSelected"
                       rounded
                       small
                       outlined
                       id="volumeSp1Up"
                       @mousedown="moveStepperMotors('sp1Up','mousedown')"
                       @mouseup="moveStepperMotors('sp1Up','mouseup')">
                  <v-icon>
                    mdi-chevron-up
                  </v-icon>
                </v-btn>
                <v-btn :disabled="!liquidDispenserModuleConfig.sp1VolumeSelected"
                       rounded
                       small
                       outlined
                       id="volumeSp1Down"
                       @mousedown="moveStepperMotors('sp1Down','mousedown')"
                       @mouseup="moveStepperMotors('sp1Down','mouseup')">
                  <v-icon>
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
                <input type="text"
                       :disabled="!liquidDispenserModuleConfig.sp1VolumeSelected"
                       @change="event => setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'volumeSp1Input')"
                       class="input-text"
                       id="volumeSp1Input"
                />

                <input type="range" id="ps1SpeedRange" min="1" max="200"
                       @input="event => setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'ps1SpeedRange')"
                       list="tickMarks">
              </div>

            </div>

            <!--        PS2 control-->

            <div id="syringe2-commands">
              <select id="select-sp2" v-show="mode.toLowerCase()==='config'" class="firstLineComponent"
                      v-model="liquidDispenserModuleConfig.selectedSP2">
                <option v-for="item in liquidDispenserModuleConfig.items" :value="item" :key="item">{{ item }}</option>
              </select>

              <textarea readonly id="ps2SpeedLabel"></textarea>

              <div id="syringe2-buttons" v-show="mode.toLowerCase()==='config'">
                <v-btn :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                       small
                       outlined
                       class="empty"
                       id="razPs2"
                       @click="resetSp('sp2')">
                  <v-icon>
                    mdi-needle-off
                  </v-icon>
                  Empty
                </v-btn>
                <v-btn :disabled="!liquidDispenserModuleConfig.sp2VolumeSelected"
                       rounded
                       small
                       outlined
                       id="volumeSp2Up"
                       @mousedown="moveStepperMotors('sp2Up','mousedown')"
                       @mouseup="moveStepperMotors('sp2Up','mouseup')">
                  <v-icon>
                    mdi-chevron-up
                  </v-icon>
                </v-btn>
                <v-btn :disabled="!liquidDispenserModuleConfig.sp2VolumeSelected"
                       rounded
                       small
                       outlined
                       id="volumeSp2Down"
                       @mousedown="moveStepperMotors('sp2Down','mousedown')"
                       @mouseup="moveStepperMotors('sp2Down','mouseup')">
                  <v-icon>
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
                <input type="text"
                       :disabled="!liquidDispenserModuleConfig.sp2VolumeSelected"
                       class="input-text"
                       id="volumeSp2Input"
                       @change="event => setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'volumeSp2Input')"/>

                <input type="range" id="ps2SpeedRange" min="1" max="200"
                       @input="event => setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'ps2SpeedRange')"
                       list="tickMarks">

              </div>
            </div>

            <!--        PS3 control-->

            <div id="syringe3-commands">

              <select id="select-sp3" v-show="mode.toLowerCase()==='config'"
                      v-model="liquidDispenserModuleConfig.selectedSP3">
                <option v-for="item in liquidDispenserModuleConfig.items" :value="item" :key="item">{{ item }}</option>
              </select>

              <textarea readonly id="ps3SpeedLabel"></textarea>

              <div id="syringe3-buttons" v-show="mode.toLowerCase()==='config'">

                <v-btn :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                       small
                       outlined
                       class="empty"
                       id="razPs3"
                       @click="resetSp('sp3')">
                  <v-icon>
                    mdi-needle-off
                  </v-icon>
                  Empty
                </v-btn>
                <v-btn :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                       rounded
                       small
                       outlined
                       id="volumeSp3Up"
                       @mousedown="moveStepperMotors('sp3Up','mousedown')"
                       @mouseup="moveStepperMotors('sp3Up','mouseup')">
                  <v-icon>
                    mdi-chevron-up
                  </v-icon>
                </v-btn>
                <v-btn :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                       rounded
                       small
                       outlined
                       id="volumeSp3Down"
                       @mousedown="moveStepperMotors('sp3Down','mousedown')"
                       @mouseup="moveStepperMotors('sp3Down','mouseup')">
                  <v-icon>
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
                <input type="text"
                       :disabled="!liquidDispenserModuleConfig.sp3VolumeSelected"
                       id="volumeSp3Input"
                       class="input-text"
                       @change="event => setModulePhysicalPosition(liquidDispenserModuleConfig,  event.target.value,'volumeSp3Input')"/>

                <input type="range" id="ps3SpeedRange" min="1" max="200"
                       @input="event =>  setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'ps3SpeedRange')"
                       list="tickMarks">
              </div>
            </div>

            <!--  Pump  images -->

            <div id="pump"
            >
              <v-btn id="pumpLeft-button"
                     small
                     outlined
                     rounded
                     @mousedown="moveStepperMotors('pumpLeft','mousedown')"
                     @mouseup="moveStepperMotors('pumpLeft','mouseup')">
                <v-icon>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn id="pumpRight-button"
                     small
                     outlined
                     rounded
                     @mousedown="moveStepperMotors('pumpRight','mousedown')"
                     @mouseup="moveStepperMotors('pumpRight','mouseup')">
                <v-icon>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <input v-show="mode.toLowerCase()==='config'"
                     type="text"
                     class="input-text"
                     id="pump1Input"
                     @change="event => setModulePhysicalPosition(liquidDispenserModuleConfig, event.target.value,'pump1Input')"/>

              <input type="range" id="pump1SpeedRange" min="1" max="500"
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


              <img id="wheelRight" alt="" src="../../../assets/LiquidDispenserImages/Pump1R.png"/>
              <img id="wheelLeft" alt="" src="../../../assets/LiquidDispenserImages/Pump1L.png"/>

            </div>

            <div id="solution-level">

              <div class="progressbar-wrapper" id="PS1PProgressbar">
                <div id="ps1LiquidLevel" title="ps1LiquidLevel" class="progressbar ">
                </div>
              </div>

              <div class="progressbar-wrapper" id="PS2PProgressbar">
                <div id="ps2LiquidLevel" title="ps2LiquidLevel" class="progressbar">
                </div>
              </div>


              <div class="progressbar-wrapper" id="PS3PProgressbar">
                <div id="ps3LiquidLevel" title="ps3LiquidLevel" class="progressbar">
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>


    </div>

  </div>
</template>

<script>

import VueScrollSnap from "vue-scroll-snap";
import axios from "axios";
import {Icon} from '@iconify/vue2';

export default {
  name: "PlatFormCard",
  components: {
    VueScrollSnap,
    Icon,
  },
  props: {
    mode: String
  },

  data: () => ({
        online: false,
        simulatorMode: false,
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

        connection: '',
        //Modules
        tlcMigrationModuleConfig: {
          name: '',
          items: ['Idle position', 'Ready position', 'Migration'],
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
          items: ['KCl', 'Measure', 'Rinsing', 'Buffer Low', 'Buffer High', 'Lift', 'Init'],
          selectedOption: 'KCl',
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
            {text: "v11", value: "v11Info", width: 82, align: 'center'},
            {text: "v12", value: "v12Info", width: 82, align: 'center'},
            {text: "v13", value: "v13Info", width: 82, align: 'center'},
            {text: "v14", value: "v14Info", width: 82, align: 'center'},
            {text: "v21", value: "v21Info", width: 82, align: 'center'},
            {text: "v22", value: "v22Info", width: 82, align: 'center'},
            {text: "v23", value: "v23Info", width: 82, align: 'center'},
            {text: "v24", value: "v24Info", width: 82, align: 'center'},
            {text: "v31", value: "v31Info", width: 82, align: 'center'},
            {text: "v32", value: "v32Info", width: 82, sortable: false, align: 'center'},
            {text: "v33", value: "v33Info", width: 82, sortable: false, align: 'center'},
            {text: "v34", value: "v34Info", width: 82, sortable: false, align: 'center'},
            {text: "v41", value: "v41Info", width: 82, sortable: false, align: 'center'},
            {text: "v42", value: "v42Info", width: 82, sortable: false, align: 'center'},
            {text: "v43", value: "v43Info", width: 82, sortable: false, align: 'center'},
            {text: "v44", value: "v44Info", width: 82, sortable: false, align: 'center'},
            {text: "v51", value: "v51Info", width: 82, sortable: false, align: 'center'},
            {text: "v52", value: "v52Info", width: 82, sortable: false, align: 'center'},
            {text: "v53", value: "v53Info", width: 82, sortable: false, align: 'center'},
            {text: "v54", value: "v54Info", width: 82, sortable: false, align: 'center'},
            {text: "v61", value: "v61Info", width: 82, sortable: false, align: 'center'},
            {text: "v62", value: "v62Info", width: 82, sortable: false, align: 'center'},
            {text: "v63", value: "v63Info", width: 82, sortable: false, align: 'center'},
            {text: "v64", value: "v64Info", width: 82, sortable: false, align: 'center'},
            {text: "v71", value: "v71Info", width: 82, sortable: false, align: 'center'},
            {text: "v72", value: "v72Info", width: 82, sortable: false, align: 'center'},
            {text: "v73", value: "v73Info", width: 82, sortable: false, align: 'center'},
            {text: "v74", value: "v74Info", width: 82, sortable: false, align: 'center'},
            {text: "SP1 Quantity", value: "sP1P", width: 150, align: 'center'},
            {text: "SP1 Speed (µL/s)", value: "sP1S", width: 82, align: 'center'},
            {text: "SP2 Quantity", value: "sP2P", width: 150, align: 'center'},
            {text: "SP2 Speed (µL/s)", value: "sP2S", width: 82, align: 'center'},
            {text: "SP3 Quantity", value: "sP3P", width: 150, align: 'center'},
            {text: "SP3 Speed (µL/s)", value: "sP3S", width: 82, align: 'center'},
            {text: "Rotations pump", value: "pumP1P", width: 82, align: 'center'},
            {text: "Speed pump (rpm)", value: "pumP1S", width: 82, align: 'center'},
          ],
          data: [
            {
              v11Info: 'Closed',
              v11: false,
              v12Info: 'Closed',
              v12: false,
              v13Info: 'Closed',
              v13: false,
              v14Info: 'Closed',
              v14: false,
              v21Info: 'Closed',
              v21: false,
              v22Info: 'Closed',
              v22: false,
              v23Info: 'Closed',
              v23: false,
              v24Info: 'Closed',
              v24: false,
              v31Info: 'Closed',
              v31: false,
              v32Info: 'Closed',
              v32: false,
              v33Info: 'Closed',
              v33: false,
              v34Info: 'Closed',
              v34: false,
              v41Info: 'Closed',
              v41: false,
              v42Info: 'Closed',
              v42: false,
              v43Info: 'Closed',
              v43: false,
              v44Info: 'Closed',
              v44: false,
              v51Info: 'Closed',
              v51: false,
              v52Info: 'Closed',
              v52: false,
              v53Info: 'Closed',
              v53: false,
              v54Info: 'Closed',
              v54: false,
              v61Info: 'Closed',
              v61: false,
              v62Info: 'Closed',
              v62: false,
              v63Info: 'Closed',
              v63: false,
              v64Info: 'Closed',
              v64: false,
              v71Info: 'Closed',
              v71: false,
              v72Info: 'Closed',
              v72: false,
              v73Info: 'Closed',
              v73: false,
              v74Info: 'Closed',
              v74: false,
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
    this.fetchNetworkByName(this.$aurasVersionV2);
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
    'waitingConditionConfig.selectedOption'() {
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
    'tlcMigrationModuleConfig.selectedOption'() {

      switch (this.tlcMigrationModuleConfig.selectedOption) {
        case "Idle position":
          this.tlcMigrationModuleConfig.data[0].position = 0;
          break;
        case "Ready position":
          this.tlcMigrationModuleConfig.data[0].position = 1;
          break;
        case "Migration":
          this.tlcMigrationModuleConfig.data[0].position = 2;
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

    scrollTo(module) {
      /* const mainImage = document.querySelector("#image-container");
       let value = null;*/
      let element = null;

      switch (module) {
        case this.dropDispenserModuleConfig.name:
          element = document.getElementById("dd_title");
          break;
        case this.tlcMigrationModuleConfig.name:
          element = document.getElementById("tlc_title");
          break;
        case this.phMeterModuleConfig.name:
          element = document.getElementById("ph_title");
          break;
        case this.liquidDispenserModuleConfig.name:
          element = document.getElementById("ld_title");
          break;
        default:
          element = document.getElementById("dd_title");
          break;
      }

      element.scrollIntoView({behavior: 'smooth', block: 'start', inline: "nearest"});

    },

    leftScroll() {
      const left = document.querySelector("#image-container");

      left.scrollBy({
        top: 0,
        left: -600,
        behavior: "smooth"
      })
    },
    rightScroll() {
      const right = document.querySelector("#image-container");

      right.scrollBy({
        top: 0,
        left: 600,
        behavior: "smooth"
      })
    },

    emergencyStop() {
      this.sendToWebsocket({"EmergencyStop ": true});
    },

    restartSimulator() {
      let data = {
        restart: true
      }
      this.sendToWebsocket(data);

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
        document.getElementById('pump1SpeedRange').style.visibility = 'hidden';
        document.getElementById('pumpLeft-button').style.visibility = 'hidden';
        document.getElementById('pumpRight-button').style.visibility = 'hidden';
        document.getElementById('razPs1').style.visibility = 'hidden';
        document.getElementById('razPs2').style.visibility = 'hidden';
        document.getElementById('razPs3').style.visibility = 'hidden';
        document.getElementById('pump1SpeedRange').disabled = true;
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
          .get(this.$aurasApiV2 + "api/networks/byName?name=" + name)
          .then(
              (response) => {
                if (response.status === 200) {
                  let network = response.data;
                  this.$store.state.aurasIp = this.webSocket.ipAddress = network['ipAddress'];
                  this.simulatorMode = this.$parent.simulatorMode = this.webSocket.ipAddress.toString().includes('ws');

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

      if (!this.online) {

        setTimeout(() => {
          this.$store.state.connectionWS = null;
          this.connectToWebSocket();
        }, 3000);


      }
    },
    /*------------------------------------------------------------------------
    * Method used to rotate pinch valves physically
    * ------------------------------------------------------------------------*/
    togglePinchValveState(id) {

      if (this.mode !== 'config') return;

      let value;

      switch (id) {
        case 'v11':
          value = this.liquidDispenserModuleConfig.data[0].v11 === false ? 1 : 0;
          break;
        case 'v12':
          value = this.liquidDispenserModuleConfig.data[0].v12 === false ? 1 : 0;
          break;
        case 'v13':
          value = this.liquidDispenserModuleConfig.data[0].v13 === false ? 1 : 0;
          break;
        case 'v14':
          value = this.liquidDispenserModuleConfig.data[0].v14 === false ? 1 : 0;
          break;
        case 'v21':
          value = this.liquidDispenserModuleConfig.data[0].v21 === false ? 1 : 0;
          break;
        case 'v22':
          value = this.liquidDispenserModuleConfig.data[0].v22 === false ? 1 : 0;
          break;
        case 'v23':
          value = this.liquidDispenserModuleConfig.data[0].v23 === false ? 1 : 0;
          break;
        case 'v24':
          value = this.liquidDispenserModuleConfig.data[0].v24 === false ? 1 : 0;
          break;
        case 'v31':
          value = this.liquidDispenserModuleConfig.data[0].v31 === false ? 1 : 0;
          break;
        case 'v32':
          value = this.liquidDispenserModuleConfig.data[0].v32 === false ? 1 : 0;
          break;
        case 'v33':
          value = this.liquidDispenserModuleConfig.data[0].v33 === false ? 1 : 0;
          break;
        case 'v34':
          value = this.liquidDispenserModuleConfig.data[0].v34 === false ? 1 : 0;
          break;
        case 'v41':
          value = this.liquidDispenserModuleConfig.data[0].v41 === false ? 1 : 0;
          break;
        case 'v42':
          value = this.liquidDispenserModuleConfig.data[0].v42 === false ? 1 : 0;
          break;
        case 'v43':
          value = this.liquidDispenserModuleConfig.data[0].v43 === false ? 1 : 0;
          break;
        case 'v44':
          value = this.liquidDispenserModuleConfig.data[0].v44 === false ? 1 : 0;
          break;
        case 'v51':
          value = this.liquidDispenserModuleConfig.data[0].v51 === false ? 1 : 0;
          break;
        case 'v52':
          value = this.liquidDispenserModuleConfig.data[0].v52 === false ? 1 : 0;
          break;
        case 'v53':
          value = this.liquidDispenserModuleConfig.data[0].v53 === false ? 1 : 0;
          break;
        case 'v54':
          value = this.liquidDispenserModuleConfig.data[0].v54 === false ? 1 : 0;
          break;
        case 'v61':
          value = this.liquidDispenserModuleConfig.data[0].v61 === false ? 1 : 0;
          break;
        case 'v62':
          value = this.liquidDispenserModuleConfig.data[0].v62 === false ? 1 : 0;
          break;
        case 'v63':
          value = this.liquidDispenserModuleConfig.data[0].v63 === false ? 1 : 0;
          break;
        case 'v64':
          value = this.liquidDispenserModuleConfig.data[0].v64 === false ? 1 : 0;
          break;
        case 'v71':
          value = this.liquidDispenserModuleConfig.data[0].v71 === false ? 1 : 0;
          break;
        case 'v72':
          value = this.liquidDispenserModuleConfig.data[0].v72 === false ? 1 : 0;
          break;
        case 'v73':
          value = this.liquidDispenserModuleConfig.data[0].v73 === false ? 1 : 0;
          break;
        case 'v74':
          value = this.liquidDispenserModuleConfig.data[0].v74 === false ? 1 : 0;
          break;

        default:
          break;

      }

      this.setPinchValvesPositions(id, value);

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
      if (obj.PhMeter !== undefined) {

        this.phMeterModuleConfig.selectedOption = obj.PhMeter;
      }

      if (obj.SolCurrentPosition !== undefined) {
        let value = -1 * (-590 + obj.SolCurrentPosition * 0.0024);
        document.getElementById('phSolutions-image').style.left = value + 'px';
      }

      if (obj.ProbeCurrentPosition !== undefined) {
        let value = (obj.ProbeCurrentPosition * 0.0024);
        document.getElementById('phProbe-image').style.top = value + 'px';
      }

      //DropDispenser
      if (obj.DropDispenser !== undefined)
        this.dropDispenserModuleConfig.selectedOption = this.dropDispenserModuleConfig.items[obj.DropDispenser];

      //Pinch valves
      if (obj.V11 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v11 = parseInt(obj.V11) === 1;
        this.liquidDispenserModuleConfig.data[0].v11Info = parseInt(obj.V11) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V12 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v12 = parseInt(obj.V12) === 1;
        this.liquidDispenserModuleConfig.data[0].v12Info = parseInt(obj.V12) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V13 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v13 = parseInt(obj.V13) === 1;
        this.liquidDispenserModuleConfig.data[0].v13Info = parseInt(obj.V13) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V14 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v14 = parseInt(obj.V14) === 1;
        this.liquidDispenserModuleConfig.data[0].v14Info = parseInt(obj.V14) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V21 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v21 = parseInt(obj.V21) === 1;
        this.liquidDispenserModuleConfig.data[0].v21Info = parseInt(obj.V21) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V22 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v22 = parseInt(obj.V22) === 1;
        this.liquidDispenserModuleConfig.data[0].v22Info = parseInt(obj.V22) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V23 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v23 = parseInt(obj.V23) === 1;
        this.liquidDispenserModuleConfig.data[0].v23Info = parseInt(obj.V23) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V24 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v24 = parseInt(obj.V24) === 1;
        this.liquidDispenserModuleConfig.data[0].v24Info = parseInt(obj.V24) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V31 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v31 = parseInt(obj.V31) === 1;
        this.liquidDispenserModuleConfig.data[0].v31Info = parseInt(obj.V31) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V32 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v32 = parseInt(obj.V32) === 1;
        this.liquidDispenserModuleConfig.data[0].v32Info = parseInt(obj.V32) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V33 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v33 = parseInt(obj.V33) === 1;
        this.liquidDispenserModuleConfig.data[0].v33Info = parseInt(obj.V33) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V34 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v34 = parseInt(obj.V34) === 1;
        this.liquidDispenserModuleConfig.data[0].v34Info = parseInt(obj.V34) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V41 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v41 = parseInt(obj.V41) === 1;
        this.liquidDispenserModuleConfig.data[0].v41Info = parseInt(obj.V41) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V42 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v42 = parseInt(obj.V42) === 1;
        this.liquidDispenserModuleConfig.data[0].v42Info = parseInt(obj.V42) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V43 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v43 = parseInt(obj.V43) === 1;
        this.liquidDispenserModuleConfig.data[0].v43Info = parseInt(obj.V43) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V44 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v44 = parseInt(obj.V44) === 1;
        this.liquidDispenserModuleConfig.data[0].v44Info = parseInt(obj.V44) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V51 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v51 = parseInt(obj.V51) === 1;
        this.liquidDispenserModuleConfig.data[0].v51Info = parseInt(obj.V51) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V52 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v52 = parseInt(obj.V52) === 1;
        this.liquidDispenserModuleConfig.data[0].v52Info = parseInt(obj.V52) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V53 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v53 = parseInt(obj.V53) === 1;
        this.liquidDispenserModuleConfig.data[0].v53Info = parseInt(obj.V53) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V54 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v54 = parseInt(obj.V54) === 1;
        this.liquidDispenserModuleConfig.data[0].v54Info = parseInt(obj.V54) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V61 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v61 = parseInt(obj.V61) === 1;
        this.liquidDispenserModuleConfig.data[0].v61Info = parseInt(obj.V61) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V62 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v62 = parseInt(obj.V62) === 1;
        this.liquidDispenserModuleConfig.data[0].v62Info = parseInt(obj.V62) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V63 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v63 = parseInt(obj.V63) === 1;
        this.liquidDispenserModuleConfig.data[0].v63Info = parseInt(obj.V63) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V64 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v64 = parseInt(obj.V64) === 1;
        this.liquidDispenserModuleConfig.data[0].v64Info = parseInt(obj.V64) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V71 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v71 = parseInt(obj.V71) === 1;
        this.liquidDispenserModuleConfig.data[0].v71Info = parseInt(obj.V71) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V72 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v72 = parseInt(obj.V72) === 1;
        this.liquidDispenserModuleConfig.data[0].v72Info = parseInt(obj.V72) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V73 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v73 = parseInt(obj.V73) === 1;
        this.liquidDispenserModuleConfig.data[0].v73Info = parseInt(obj.V73) === 1 ? 'Opened' : 'Closed';
      }

      if (obj.V74 !== undefined) {
        this.liquidDispenserModuleConfig.data[0].v74 = parseInt(obj.V74) === 1;
        this.liquidDispenserModuleConfig.data[0].v74Info = parseInt(obj.V74) === 1 ? 'Opened' : 'Closed';
      }

      // SP1 Absolute position
      if (obj.SP1CurrentPosition !== undefined) {

        let value = parseInt(obj.SP1CurrentPosition) / 1000;
        let element = document.getElementById("ps1LiquidLevel");
        element.innerText = value.toFixed(0);
        element.style.height = '18px';
        element.style.width = value / 10 + '%';
        this.liquidDispenserModuleConfig.data[0].sP1P = document.getElementById("volumeSp1Input").value = value.toFixed(0);
        this.liquidDispenserModuleConfig.sP1PAbsolutePosition = value;

        let element1 = document.getElementById('sp-plug1');
        let value1 = 355 - value / 5;
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
        element.style.height = '18px';
        element.style.width = value / 10 + '%';
        this.liquidDispenserModuleConfig.data[0].sP2P = document.getElementById("volumeSp2Input").value = value.toFixed(0);
        this.liquidDispenserModuleConfig.sP2PAbsolutePosition = value;

        let element1 = document.getElementById('sp-plug2');
        let value1 = 355 - value / 5;
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
        element.style.height = '18px';
        element.style.width = value / 10 + '%';
        this.liquidDispenserModuleConfig.data[0].sP3P = document.getElementById("volumeSp3Input").value = value.toFixed(0);
        this.liquidDispenserModuleConfig.sP3PAbsolutePosition = value;

        let element1 = document.getElementById('sp-plug3');
        let value1 = 355 - value / 5;
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
        value = value.toFixed(2);

        this.liquidDispenserModuleConfig.data[0].pumP1P = value;
        document.getElementById("pump1Input").value = value;

      }
      // PUMP1 Max speed
      if (obj.PUMP1MaxSpeed !== undefined) {
        let value = parseInt(obj.PUMP1MaxSpeed) / 6;
        this.liquidDispenserModuleConfig.pump1MaxSpeed = value.toFixed(1);
        document.getElementById("pumpsLabel").innerHTML = "Max Speed: " + this.liquidDispenserModuleConfig.pump1MaxSpeed + " RPM";
        document.getElementById("pumpsLabel").innerHTML += "\nCurrent Speed: " + this.liquidDispenserModuleConfig.pump1CurrentSpeed + " RPM";
        this.liquidDispenserModuleConfig.data[0].pumP1S = parseInt(value);

        document.getElementById("pump1SpeedRange").value = value;

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

    setPinchValvesPositions(id, value) {

      let data;

      switch (id) {
        case 'v11':
          data = {V11: {Switch: parseInt(value)}};
          break;
        case 'v12':
          data = {V12: {Switch: parseInt(value)}};
          break;
        case 'v13':
          data = {v13: {Switch: parseInt(value)}};
          break;
        case 'v14':
          data = {v14: {Switch: parseInt(value)}};
          break;
        case 'v21':
          data = {V21: {Switch: parseInt(value)}};
          break;
        case 'v22':
          data = {V22: {Switch: parseInt(value)}};
          break;
        case 'v23':
          data = {V23: {Switch: parseInt(value)}};
          break;
        case 'v24':
          data = {V24: {Switch: parseInt(value)}};
          break;
        case 'v31':
          data = {V31: {Switch: parseInt(value)}};
          break;
        case 'v32':
          data = {V32: {Switch: parseInt(value)}};
          break;
        case 'v33':
          data = {V33: {Switch: parseInt(value)}};
          break;
        case 'v34':
          data = {V34: {Switch: parseInt(value)}};
          break;
        case 'v41':
          data = {V41: {Switch: parseInt(value)}};
          break;
        case 'v42':
          data = {V42: {Switch: parseInt(value)}};
          break;
        case 'v43':
          data = {V43: {Switch: parseInt(value)}};
          break;
        case 'v44':
          data = {V44: {Switch: parseInt(value)}};
          break;
        case 'v51':
          data = {V51: {Switch: parseInt(value)}};
          break;
        case 'v52':
          data = {V52: {Switch: parseInt(value)}};
          break;
        case 'v53':
          data = {V53: {Switch: parseInt(value)}};
          break;
        case 'v54':
          data = {V54: {Switch: parseInt(value)}};
          break;
        case 'v61':
          data = {V61: {Switch: parseInt(value)}};
          break;
        case 'v62':
          data = {V62: {Switch: parseInt(value)}};
          break;
        case 'v63':
          data = {V63: {Switch: parseInt(value)}};
          break;
        case 'v64':
          data = {V64: {Switch: parseInt(value)}};
          break;
        case 'v71':
          data = {V71: {Switch: parseInt(value)}};
          break;
        case 'v72':
          data = {V72: {Switch: parseInt(value)}};
          break;
        case 'v73':
          data = {V73: {Switch: parseInt(value)}};
          break;
        case 'v74':
          data = {V74: {Switch: parseInt(value)}};
          break;

        default:
          return;

      }

      this.sendToWebsocket(data);
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
        let data = {PhMeter: {MoveTo: value}};
        this.sendToWebsocket(data);
      }
      if (module.name.toLowerCase().includes('drop')) {
        let data = {DropDispenser: {MoveTo: parseInt(module.items.indexOf(value))}};
        this.sendToWebsocket(data);
      }
      if (module.name.toLowerCase().includes('liquid')) {

        if (componentId !== undefined && componentId !== '') {


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

.emergency-stop-icon {
  width: 40px;
  height: auto;
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
  width: 103px;
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
  z-index: 3;
}

#scroll-snap-container {
  height: auto;
}

#image-container {
  position: absolute;
  min-width: 97%;
  height: 1001px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-right: 550px;
  z-index: 3;
  background-color: white;
  opacity: 100;
  margin-top: 60px;

}

#image-navigation-buttons {
  position: absolute;
  top: 20px;
  left: 1px;
  z-index: 7;
  width: 100%;
  background-color: #ffff;

  .left {
    position: absolute;
    left: 10px;
    top: -5px;
    z-index: 4;
  }

  .right {
    position: absolute;
    right: 10px;
    top: -10px;
    z-index: 4;
  }

  .module-buttons {
    color: darkblue;
    border-color: black;
  }
  .nav-chevron{
    color: darkblue;
  }

}

/*modules*/


.image_cover {
  padding: 10px 30px;
  position: relative;
  background-color: white;
}


/*Tlc Migration*/

#tlcMigration-section {
  position: absolute;
  left: 0;
  top: 0;

  #tlc_title {
    position: absolute;
    left: 100px;
    margin-top: 20px;
    font-size: 25px;
    white-space: nowrap;
    scroll-margin: 800px;
  }

  #tlcMigration-image {
    position: absolute;
    top: 148px;
    width: 600px;
  }

  #tlcMigration-buttons {

    position: absolute;
    left: 0;
    top: 80px;

    #tlc_btn_home {
      position: absolute;
    }

    #tlc_btn_ready {
      position: absolute;
      left: 190px;
    }

    #tlc_btn_migration {
      position: absolute;
      left: 400px;
    }

    #tlc_btn_deposit {
      position: absolute;
      left: 530px;
    }
  }
}

/*Drop Dispenser*/

#dropDispenser-section {
  position: absolute;
  left: 800px;
  top: 0;

  #dd_title {
    position: absolute;
    left: 100px;
    margin-top: 20px;
    font-size: 25px;
    white-space: nowrap;
    scroll-margin: 800px;

  }

  #dropDispenser-image {
    margin-top: 100px;
    width: 600px;
  }

  #dropDispenser-buttons {
    position: absolute;
    top: 80px;

    #dd_btn_none {
      position: absolute;

    }

    #dd_btn_standards {
      position: absolute;
      left: 120px;
    }

  }

}

/*PH Meter*/

#phMeter-section {

  position: absolute;
  left: 1450px;
  top: 70px;

  #ph_title {
    position: absolute;
    left: 180px;
    margin-top: -50px;
    font-size: 25px;
    white-space: nowrap;
    scroll-margin: 800px;
  }

  #phMeterImages {
    position: absolute;
    top: 40px;
    left: -400px;

    #phMeterBasement-image {
      position: absolute;
      width: 1400px;
      height: auto;
    }

    #phSolutions-image {
      position: absolute;
      height: auto;
      width: 546px;
      top: 400px;
      left: 412px;
    }

    #phProbe-image {
      position: absolute;
      height: auto;
      width: 780px;
      top: 156px;
      left: 289px;
    }

  }

  #phMeters-buttons {
    position: absolute;
    top: 10px;
    left: -217px;

    #phm_btn_buffer_low {
      position: absolute;

    }

    #phm_btn_buffer_high {
      position: absolute;
      left: 181px;
    }

    #phm_btn_kcl {
      position: absolute;
      left: 366px;
    }

    #phm_btn_rinsing {
      position: absolute;
      left: 473px;
    }

    #phm_btn_measure {
      position: absolute;
      left: 616px;
    }

    #phm_btn_init {
      position: absolute;
      left: 770px;
    }
  }

  #phm_btn_lift {
    position: absolute;
    left: 896px;
  }


}

/* Liquid Dispenser */
#liquid-dispenser-section {
  position: absolute;
  left: 2000px;
  margin: 50px;

  #ld_title {
    position: absolute;
    left: 700px;
    top: -20px;
    font-size: 25px;
    white-space: nowrap;
    scroll-margin: 800px;
  }

  #liquid-dispenser-image {
    position: absolute;
    top: 80px;
    left: 100px;
  }

  #syringes {
    position: absolute;

    #syringe_heads {
      position: absolute;

      #sp-plug1 {
        position: absolute;
        left: 512px;
        top: 170px;
        z-index: 1;
      }

      #sp-plug2 {
        position: absolute;
        left: 815px;
        top: 170px;
        z-index: 1;
      }

      #sp-plug3 {
        position: absolute;
        left: 1219px;
        top: 170px;
        z-index: 1;
      }
    }

    #syringe_supports {
      position: absolute;

      #syringe_support1 {
        position: absolute;
        left: 504px;
        top: 423px;
        z-index: 2;
      }

      #syringe_support2 {
        position: absolute;
        left: 808px;
        top: 421px;
        z-index: 2;
      }

      #syringe_support3 {
        position: absolute;
        left: 1212px;
        top: 422px;
        z-index: 2;

      }
    }
  }

  #ld-commands {
    position: absolute;

    #syringe1-commands {
      position: absolute;
      left: 510px;
      top: 90px;

      #select-sp1 {
        position: absolute;
        background-color: #FFFF;
        width: 200px;
        left: 70px;

      }

      #ps1SpeedLabel {
        position: absolute;
        top: 25px;
        left: 70px;
        font-size: 14px;
        height: fit-content;
        width: 200px;
        resize: none;
        background-color: #f7f7f7;
        border-radius: 5%;
        border-style: solid;
        border-width: 1px;

      }

      #syringe1-buttons {
        position: absolute;
        top: 80px;
        left: 70px;

        #ps1SpeedRange {
          position: absolute;
          height: fit-content;
          width: fit-content;
        }

        #volumeSp1Up {
          position: absolute;
          top: 30px;
          background-color: #32a852;
          color: #ffff;
        }

        #volumeSp1Down {
          position: absolute;
          left: 68px;
          top: 30px;
          background-color: #32a852;
          color: #ffff;
        }

        #volumeSp1Input {
          position: absolute;
          top: 60px;
          width: 120px;
          background-color: #FFFF;
        }

        #razPs1 {
          position: absolute;
          top: 90px;
          width: 120px;
          background-color: #fa8e78;
        }
      }
    }

    #syringe2-commands {
      position: absolute;
      left: 815px;
      top: 90px;

      #select-sp2 {
        position: absolute;
        background-color: #FFFF;
        width: 200px;
        left: 70px;
      }

      #ps2SpeedLabel {
        position: absolute;
        margin-top: 25px;
        left: 70px;
        font-size: 14px;
        height: fit-content;
        width: 200px;
        resize: none;
        background-color: #f7f7f7;
        border-radius: 5%;
        border-style: solid;
        border-width: 1px;

      }

      #syringe2-buttons {
        position: absolute;
        top: 80px;
        left: 70px;

        #ps2SpeedRange {
          position: absolute;
          height: fit-content;
          width: fit-content;
        }

        #volumeSp2Up {
          position: absolute;
          top: 30px;
          background-color: #32a852;
          color: #ffff;

        }

        #volumeSp2Down {
          position: absolute;
          left: 68px;
          top: 30px;
          background-color: #32a852;
          color: #ffff;
        }

        #volumeSp2Input {
          position: absolute;
          top: 60px;
          width: 120px;
          background-color: #FFFF;
        }

        #razPs2 {
          position: absolute;
          top: 90px;
          width: 120px;
          background-color: #fa8e78;
        }
      }
    }

    #syringe3-commands {
      position: absolute;
      left: 1215px;
      top: 90px;

      #select-sp3 {
        position: absolute;
        background-color: #FFFF;
        width: 200px;
        left: 70px;
      }

      #ps3SpeedLabel {
        position: absolute;
        margin-top: 25px;
        left: 70px;
        font-size: 14px;
        height: fit-content;
        width: 200px;
        resize: none;
        background-color: #f7f7f7;
        border-radius: 5%;
        border-style: solid;
        border-width: 1px;

      }

      #syringe3-buttons {


        position: absolute;
        top: 80px;
        left: 70px;

        #ps3SpeedRange {
          position: absolute;
          height: fit-content;
          width: fit-content;
        }

        #volumeSp3Up {
          position: absolute;
          top: 30px;
          background-color: #32a852;
          color: #ffff;
        }

        #volumeSp3Down {
          position: absolute;
          left: 68px;
          top: 30px;
          background-color: #32a852;
          color: #ffff;
        }

        #volumeSp3Input {
          position: absolute;
          top: 60px;
          width: 120px;
          background-color: #FFFF;
        }

        #razPs3 {
          position: absolute;
          top: 90px;
          width: 120px;
          background-color: #fa8e78;
        }
      }
    }

  }

  #pump {
    position: absolute;
    left: 940px;
    top: 350px;

    #pump1SpeedRange {
      position: absolute;
      top: -30px;
    }

    #pumpLeft-button {
      position: absolute;
      background-color: #f7a34b;

    }

    #pumpRight-button {
      position: absolute;
      left: 55px;
      background-color: #f7a34b;
    }

    #pump1Input {
      position: absolute;
      left: 110px;
      background-color: #ffff;

    }

    #pumpsLabel {
      position: absolute;
      top: 30px;
      font-size: 14px;
      height: fit-content;
      width: 212px;
      resize: none;
      background-color: #f7f7f7;
      border-radius: 5%;
      border-style: solid;
      border-width: 1px;
    }


    /*  #wheelRight {
        position: absolute;
        top: 124px;
        left: 63px;
        width: 90px;
        -webkit-animation: spin 3s linear infinite;
        animation: spin 3s linear infinite;
      }

      #wheelLeft {
        position: absolute;
        top: 124px;
        left: 63px;
        width: 80px;
        -webkit-animation: spin1 3s linear infinite;
        animation: spin1 3s linear infinite;
      }*/
  }

  #solution-level {

    position: absolute;
    left: 441px;
    top: 540px;
    z-index: 3;

    #PS1PProgressbar {
      position: absolute;
      width: 200px;
      height: 18px;
    }


    #PS2PProgressbar {
      position: absolute;
      width: 200px;
      left: 304px;
    }

    #PS3PProgressbar {
      position: absolute;
      width: 200px;
      left: 708px;
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

      background-color: #32a852;
      height: 18px;
      width: 200px;
      border-radius: 5px;
    }
  }


}

</style>

<style>
.v-input--switch:not(.v-input--switch--flat):not(.v-input--switch--inset) .v-input--switch__thumb {
  color: #a81d02
}

.theme--light.v-input--switch .v-input--switch__track {
  color: #a81d02
}

#wheelRight {
  position: absolute;
  top: 124px;
  left: 63px;
  width: 90px;
  -webkit-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}

#wheelLeft {
  position: absolute;
  top: 124px;
  left: 63px;
  width: 80px;
  -webkit-animation: spin1 3s linear infinite;
  animation: spin1 3s linear infinite;
}
</style>
