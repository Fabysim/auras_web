<template>

  <div>
    <v-dialog v-model="settings"
              width="500px">
      <v-card>
        <v-card-title>
          Set Machine Ip
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field v-model="IpAddress"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="settings=false"
                 color="secondary">
            Cancel
          </v-btn>
          <v-btn @click="SaveIp"
                 color="primary">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card
        class="mx-auto, v-card"
        width="500"
        style="border-top: 2px solid red;"
    >
      <v-card-text>
        <div>Application</div>
        <h1 style="margin-top: 50px; color:purple">
          {{ name }}
        </h1>

      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
        >
          <v-list-item-icon>
            <div data-app>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-text="item.icon"
                          x-large
                          @click="RedirectTo(item.url)"
                          v-bind="attrs"
                          v-on="on"
                          style="cursor: pointer"/>
                </template>
                <span v-text="item.text"></span>
              </v-tooltip>
            </div>
          </v-list-item-icon>

        </v-list-item>

      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
export default {
  name: "StationCard",
  components: {},


  props: {
    'name': String,
    'url': String,
    'items': Array
  },
  data() {
    return {
      settings: false,
      IpAddress: '2',
      currentApp: ''
    }
  },
  methods: {
   /*--------------------------------------------------------------------------
   * Route redirection
   * -------------------------------------------------------------------------*/
    RedirectTo(route) {

      if (route.toLowerCase().includes('network')) {
        this.settings = true;
        this.SetCurrentApp(route);

      } else if (route === 'DropDRun') {
        window.location.href = 'http://10.10.14.106:8082/#/run';

      }  else if (route === 'DropDConfig') {
        window.location.href = 'http://10.10.14.106:8082/#/config';

      } else {
        this.$router.push({name: route});
      }
    },
    /*--------------------------------------------------------------------------
    * Set current App name
    * -------------------------------------------------------------------------*/
    SetCurrentApp(route) {


      this.currentApp = '';

      if (route.toLowerCase().includes('auras')) {
        this.currentApp = 'auras';
        this.IpAddress = this.$store.state.aurasIp;
      } else if (route.toLowerCase().includes('drop')) {
        this.currentApp = 'drop';
        this.IpAddress = this.$store.state.ddIp;
      } else {
        this.currentApp = 'colorSensor';
        this.IpAddress = this.$store.state.csIp;
      }
    },

   /*--------------------------------------------------------------------------
    * Dave Ip locally
    *-------------------------------------------------------------------------*/
    SaveIp() {
      switch (this.currentApp) {
        case 'auras':
          this.$store.state.aurasIp = this.IpAddress;
          break;
        case 'drop':
          this.$store.state.ddIp = this.IpAddress;
          break;
        case 'colorSensor':
          this.$store.state.csIp = this.IpAddress;
          break;
        default:
          break;
      }

      this.$store.state.csIp = this.espIP;
      this.settings = false;

    },

  }


}
</script>

<style scoped>

.v-content .v-card.v-sheet.theme--light {
  background-color: #ffffff !important;
  border-left: 5px solid red !important
}
</style>