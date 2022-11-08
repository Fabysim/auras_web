<template>
  <v-container>
      <table style="margin-left: -380px">
      <tr>
        <td style="padding-right: 5px">
          <v-card elevation="5">
            <v-card-title>

              <!-- Filter sensor 1 -->
              <table>
                <tr>
                  <td>
                    <v-row>
                      <v-col>
                        <v-btn class="primary"
                               v-if="!realTimeS1"
                               @click="captureAverageImageS1"
                        >
                          Capture
                        </v-btn>
                      </v-col>
                      <v-col v-if="captureS1BtnClicked">
                        <v-progress-circular
                            indeterminate
                            color="primary"
                        ></v-progress-circular>
                      </v-col>

                    </v-row>

                  </td>
                  <td> Sensor 1</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <v-row>
                      <v-col>
                        Average
                      </v-col>
                      <v-col>
                        <v-text-field
                            v-if="!realTimeS1"
                            class="mt-0 pt-0"
                            style="width: 50px; vertical-align: bottom"
                            type="number"
                            :min="1"
                            v-model="averageS1"
                        />
                      </v-col>
                    </v-row>
                  </td>
                  <td style="padding-right: 20px; padding-left: 20px">
                    <v-switch inset
                              color="red"
                              v-model="realTimeS1">
                    </v-switch>
                  </td>
                  <td>Real time</td>
                </tr>
                <tr>
                  <td>Non calibrated values</td>
                  <td style="padding-right: 10px; padding-left: 10px">
                    <v-switch inset
                              color="red"
                              v-model="cValuesS1">
                    </v-switch>
                  </td>
                  <td>Calibrated values</td>
                </tr>

              </table>

            </v-card-title>
            <v-divider/>

            <!-- Table  sensor 1 -->

            <v-card-text>
              <v-data-table
                  :headers="tableSensor1"
                  :items="sensor1TableData"
                  :hide-default-footer="true"
              >
              </v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  style="margin-right: 30px"
                  color="primary"
                  @click='CopyToClipboard("sensor1")'
              >
                Copy line
              </v-btn>
            </v-card-actions>
          </v-card>
        </td>

        <td>
          <!-- Sensor 2 -->
          <v-card elevation="5">
            <v-card-title class="justify-center">

              <!-- Filter sensor 2 -->

              <table>
                <tr>
                  <td>
                    <v-row>
                      <v-col>
                        <v-btn class="primary"
                               v-if="!realTimeS2"
                               @click="captureAverageImageS2"
                        >
                          Capture
                        </v-btn>
                      </v-col>
                      <v-col v-if="captureS2BtnClicked">
                        <v-progress-circular
                            indeterminate
                            color="primary"
                        />
                      </v-col>

                    </v-row>
                  </td>
                  <td> Sensor 2</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <v-row justify="center">
                      <v-col>
                        Average
                      </v-col>
                      <v-col>
                        <v-text-field
                            v-if="!realTimeS2"
                            class="mt-0 pt-0"
                            style="width: 50px"
                            type="number"
                            :min="1"
                            v-model="averageS2"
                        />
                      </v-col>
                    </v-row>
                  </td>
                  <td style="padding-right: 20px; padding-left: 20px">
                    <v-switch inset
                              color="red"
                              v-model="realTimeS2">
                    </v-switch>
                  </td>
                  <td>Real time</td>
                </tr>
                <tr>
                  <td>Non calibrated values</td>
                  <td style="padding-right: 20px; padding-left: 20px">
                    <v-switch inset
                              color="red"
                              v-model="cValuesS2">

                    </v-switch>
                  </td>
                  <td>Calibrated values</td>
                </tr>

              </table>
            </v-card-title>
            <v-divider/>

            <!-- Table  sensor 2 -->
            <v-card-text>
              <v-data-table
                  :headers="tableSensor2"
                  :items="sensor2TableData"
                  :hide-default-footer="true"
              >
              </v-data-table>
            </v-card-text>
            <v-card-actions content="right">
              <v-spacer></v-spacer>
              <v-btn
                  style="margin-right: 30px"
                  color="primary"
                  @click='CopyToClipboard("sensor2")'
              >
                Copy line
              </v-btn>
            </v-card-actions>
          </v-card>
        </td>
      </tr>
      <tr style="margin-top: 100px">

        <!-- Chart  sensor 1 -->

        <td style="padding-right:150px;padding-top:50px">
          <Bar :chart-data="sensor1Data" :styles="myStyles" :chart-options="chartOptions"/>
        </td>

        <!-- Chart  sensor 2 -->

        <td style="padding-left:300px;padding-top:50px">
          <Bar :chart-data="sensor2Data" :styles="myStyles" :chart-options="chartOptions"/>
        </td>
      </tr>
    </table>

  </v-container>
</template>

<script>

import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "SensorManagerView",
  components: {Bar},

  data: () => ({
    //Websockets
    connection: null,
    connectedToWs: false,
    espIP: '',

    // Tables and charts variables
    tableSensor1: [

      {text: 'Violet', value: 'violet', align: 'start', width: 82},
      {text: 'Blue', value: 'blue', width: 82},
      {text: 'Green', value: 'green', width: 82},
      {text: 'Yellow', value: 'yellow', width: 82},
      {text: 'Orange', value: 'orange', width: 82},
      {text: 'Red', value: 'red', width: 82},
    ],
    tableSensor2: [

      {text: 'A', value: 'A', align: 'start', width: 75},
      {text: 'B', value: 'B', width: 75},
      {text: 'C', value: 'C', width: 75},
      {text: 'D', value: 'D', width: 75},
      {text: 'E', value: 'E', width: 75},
      {text: 'F', value: 'F', width: 75},
      {text: 'G', value: 'G', width: 75},
      {text: 'H', value: 'H', width: 75},
      {text: 'R', value: 'R', width: 75},
      {text: 'I', value: 'I', width: 75},
      {text: 'S', value: 'S', width: 75},
      {text: 'J', value: 'J', width: 75},
      {text: 'T', value: 'T', width: 75},
      {text: 'U', value: 'U', width: 75},
      {text: 'V', value: 'V', width: 75},
      {text: 'W', value: 'W', width: 75},
      {text: 'K', value: 'K', width: 75},
      {text: 'L', value: 'L', width: 75},
    ],
    sensor1Data: {
      labels: ['Violet', 'Blue', 'Green', 'Yellow', 'Orange', 'Red'],
      datasets: [
        {
          backgroundColor: ['#483D8B', '#00BFFF', '#2E8B57', '#FFD700', '#FF8C00', '#FF0000'],
          data: []
        },
      ]
    },
    sensor2Data: {
      labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'R', 'I', 'S', 'J', 'T', 'U', 'V', 'W', 'K', 'L'],
      datasets: [

        {
          backgroundColor: ['#7e00db', '#2300ff', '#007bff', '#00eaff', '#00ff00', '#70ff00', '#c3ff00', '#ffef00', '#ff9b00',
            '#ff0000', '#ff0000', '#f60000', '#c80000', '#8d0000', '#771111', '#680023', '#44000C', '#44000C'],
          data: []
        },
      ]
    },
    sensor1TableData: [],
    sensor2TableData: [],
    chartOptions: {
      plugins: {
        legend: {
          display: false,
        },
      },

      responsive: true,
      transitions: {
        resize: {
          animation: {
            duration: 1000
          }
        }
      }
    },

    // Switches variables

    realTimeS1: true,
    realTimeS2: true,
    cValuesS1: true,
    cValuesS2: true,
    count: 0,
    realTimeS1Change: false,
    averageS1: 1,
    averageS2: 1,
    captureS1BtnClicked: false,
    captureS2BtnClicked: false,
    nbCaptureS1: 0,
    nbCaptureS2: 0,
    averageDataS1: [],
    averageDataS2: [],
    settings: false,
  }),

  computed: {
    myStyles() {
      return {
        height: `500px`,
        width: '800px',
        responsive: true,
        position: 'absolute',
      }
    }
  },

  async created() {
    this.espIP = this.$store.state.csIp;
    this.connectToWebSocket();
  },

  watch: {

    realTimeS1() {
      if (!this.realTimeS1) {
        this.averageDataS1 = [];
        this.nbCaptureS1 = 0;
        this.sensor1Data.datasets[0].data = [];
        this.sensor1TableData = [];
      }
    },
    realTimeS2() {
      if (!this.realTimeS2) {
        this.nbCaptureS2 = 0;
        this.averageDataS2 = [];
        this.sensor2Data.datasets[0].data = [];
        this.sensor2TableData = [];
      }
    },
    cValuesS1() {

      if (this.cValuesS1 !== undefined)
        this.sendWebSocketMessage();
    },
    cValuesS2() {
      if (this.cValuesS2 !== undefined)
        this.sendWebSocketMessage();
    },

    espIP() {
    }
  },

  methods: {


    /*--------------------------------------------------------------------------
    * Close and reconnect to websocket
    * -------------------------------------------------------------------------*/
    reconnectColorSensorWebSocket() {

      this.connection.onclose = function () {
      }; // disable onclose handler first

      this.connection.close();
      this.connectToWebSocket();
    }
    ,
    /*--------------------------------------------------------------------------
    * Connection to websocket
    * -------------------------------------------------------------------------*/
    connectToWebSocket() {

      console.log("Starting connection to WebSocket Server");
      this.connection = new WebSocket('ws://' + this.espIP);

      this.connection.onmessage = (event) => {

        try {
          const json = JSON.parse(event.data);

          this.setChartData(json);
          this.setFilters(json);

        } catch (Exception) {
          console.log(Exception.message)
        }

      }

      this.connection.onopen = function (event) {
        console.log(event);
        console.log("Successfully connected to the ESP32 websocket server...");
        this.connectedToWs = true;

        console.log(this.connectedToWs)
      }

      this.connection.onclose = function (event) {
        console.log(event);
        console.log("Disconnected from websocket");
      }
    },

    /*--------------------------------------------------------------------------
     * Creates both sensors charts and tables
     * -------------------------------------------------------------------------*/
    async setChartData(json) {

      if (json != null) {

        if (this.realTimeS1) {
          this.sensor1Data.datasets[0].data = json["Sensor1"];
          let index = this.sensor1TableData[0];

          if (Array.isArray(json["Sensor1"]))
            this.generateAS7262DataTable(json["Sensor1"], index);

        } else {

          this.setAverageSensor1(json["Sensor1"]);
        }

        if (this.realTimeS2) {
          this.sensor2Data.datasets[0].data = json["Sensor2"];
          let index = this.sensor2TableData[0];

          if (Array.isArray(json["Sensor2"]))
            this.generateAS7265XDataTable(json["Sensor2"], index);

        } else {
          this.setAverageSensor2(json["Sensor2"]);
        }
      }
    },

    /*--------------------------------------------------------------------------
     * Used to capture average image of sensor AS7262
     * -------------------------------------------------------------------------*/
    captureAverageImageS1() {
      this.averageDataS1 = [];
      this.sensor1Data.datasets[0].data = [];
      this.nbCaptureS1 = 0;
      this.captureS1BtnClicked = true;
    },

    /*--------------------------------------------------------------------------
     * Used to capture average image of sensor AS7265X
     * -------------------------------------------------------------------------*/
    captureAverageImageS2() {
      this.averageDataS2 = [];
      this.sensor2Data.datasets[0].data = [];
      this.nbCaptureS2 = 0;
      this.captureS2BtnClicked = true;
    },

    /*--------------------------------------------------------------------------
     * Compute the average values of sensor AS7262
     * -------------------------------------------------------------------------*/
    setAverageSensor1(json) {

      if (this.captureS1BtnClicked === true) { // Test if the button capture has been clicked

        let index = this.averageDataS1[0];

        if (index === undefined)
          this.averageDataS1 = json;

        for (let i = 0; i < json.length; i++)
          this.averageDataS1[i] = this.averageDataS1[i] + json[i];


        this.nbCaptureS1++;

        if (this.nbCaptureS1 >= this.averageS1) {

          for (let i = 0; i < json.length; i++)
            this.averageDataS1[i] = parseFloat(this.averageDataS1[i] / this.averageS1).toFixed(2);

          this.sensor1Data.datasets[0].data = this.averageDataS1;
          this.generateAS7262DataTable(this.averageDataS1, 0);
          this.captureS1BtnClicked = false;

        }

      }
    },

    /*--------------------------------------------------------------------------
     * Compute the average values of sensor AS7265X
     *-------------------------------------------------------------------------*/
    setAverageSensor2(json) {
      if (this.captureS2BtnClicked === true) { // Test if the button capture has been clicked

        let index = this.averageDataS2[0];

        if (index === undefined)
          this.averageDataS2 = json;

        for (let i = 0; i < json.length; i++)
          this.averageDataS2[i] = this.averageDataS2[i] + json[i];

        console.log(json[0]);

        this.nbCaptureS2++;

        if (this.nbCaptureS2 >= this.averageS2) {

          for (let i = 0; i < json.length; i++)
            this.averageDataS2[i] = parseFloat(this.averageDataS2[i] / this.averageS2).toFixed(2);

          console.log(this.averageDataS2[0]);
          this.sensor2Data.datasets[0].data = this.averageDataS2;
          this.generateAS7265XDataTable(this.averageDataS2, 0);
          this.captureS2BtnClicked = false;

        }

      }
    },

    /*--------------------------------------------------------------------------
     * Initialization of the filters
     * -------------------------------------------------------------------------*/
    setFilters(json) {

      if (json["cValuesS1"] !== undefined && json["cValuesS2"] !== undefined) {
        this.cValuesS1 = json["cValuesS1"];
        this.cValuesS2 = json["cValuesS2"];
        this.initialized = true;
      }


    },

    /*--------------------------------------------------------------------------
     * Generate AS7262 data table
     * -------------------------------------------------------------------------*/
    generateAS7262DataTable(dataTable, index) {

      if (this.cValuesS1 && this.realTimeS1) {
        for (let i = 0; i < dataTable.length; i++)
          dataTable[i] = parseFloat(dataTable[i].toFixed(2));
      }

      const data = {
        'violet': dataTable[0],
        'blue': dataTable[1],
        'green': dataTable[2],
        'yellow': dataTable[3],
        'orange': dataTable[4],
        'red': dataTable[5]
      };

      if (index !== undefined)
        this.sensor1TableData.splice(0, 1, data);
      else
        this.sensor1TableData.push(data);
    },

    /*--------------------------------------------------------------------------
     * Send web socket messages
     * --------------------------------------------------------------------------*/
    async sendWebSocketMessage() {

      let message = '{"cValuesS1":' + this.cValuesS1 + ',' +
          '"cValuesS2":' + this.cValuesS2 +
          '}';
      this.connection.send(message);
    },

    /*--------------------------------------------------------------------------
    * Generate AS7265X data table
    * --------------------------------------------------------------------------*/
    generateAS7265XDataTable(json, index) {

      if (this.cValuesS2 && this.realTimeS2) {
        for (let i = 0; i < json.length; i++)
          json[i] = parseFloat(json[i].toFixed(2));
      }

      const data2 = {
        'A': json[0],
        'B': json[1],
        'C': json[2],
        'D': json[3],
        'E': json[4],
        'F': json[5],
        'G': json[6],
        'H': json[7],
        'R': json[8],
        'I': json[9],
        'S': json[10],
        'J': json[11],
        'T': json[12],
        'U': json[13],
        'V': json[14],
        'W': json[15],
        'K': json[16],
        'L': json[17],
      };

      index = this.sensor2TableData[0];

      if (index !== undefined)
        this.sensor2TableData.splice(0, 1, data2);
      else
        this.sensor2TableData.push(data2);
    },

    /*--------------------------------------------------------------------------
     * Copies sensor data to clipboard
    * --------------------------------------------------------------------------*/
    CopyToClipboard(sensor) {

      let csv = '';
      if (sensor === "sensor1") {
        csv += this.sensor1TableData[0]["violet"].toString().replace('.', ',') + '\t';
        csv += this.sensor1TableData[0]["blue"].toString().replace('.', ',') + '\t';
        csv += this.sensor1TableData[0]["green"].toString().replace('.', ',') + '\t';
        csv += this.sensor1TableData[0]["yellow"].toString().replace('.', ',') + '\t';
        csv += this.sensor1TableData[0]["orange"].toString().replace('.', ',') + '\t';
        csv += this.sensor1TableData[0]["red"].toString().replace('.', ',') + '\t';


      } else {

        csv += this.sensor2TableData[0]["A"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["B"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["C"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["D"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["E"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["F"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["G"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["H"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["I"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["J"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["K"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["L"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["R"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["S"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["T"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["U"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["V"].toString().replace('.', ',') + '\t';
        csv += this.sensor2TableData[0]["W"].toString().replace('.', ',') + '\t';

      }
      if (window.isSecureContext && navigator.clipboard) {

        navigator.clipboard.writeText(csv);
      } else {
        this.unsecuredCopyToClipboard(csv);
      }

    },
    unsecuredCopyToClipboard(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Unable to copy to clipboard', err);
      }
      document.body.removeChild(textArea);
    }


  }

}
</script>

<style>

.v-input--switch:not(.v-input--switch--flat):not(.v-input--switch--inset) .v-input--switch__thumb {
  color: darkblue
}

.theme--light.v-input--switch .v-input--switch__track {
  color: darkblue
}


</style>