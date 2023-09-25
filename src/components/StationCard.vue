<template>

  <div>

    <!--Ip Machine-->
    <v-dialog v-model="settings"
              width="500px">
      <v-card>
        <v-card-title>
          Set Machine Ip
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field label="Ip Address" v-model="ipAddress"/>
            </v-col>
            <v-col>
              <v-text-field label="Port" v-model="port"/>
            </v-col>
            <v-col>
              <v-text-field label="uri" v-model="uri"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="settings=false"
                 color="secondary">
            Cancel
          </v-btn>
          <v-btn @click="saveIp"
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
        <img id="app-image" :src="imageUrl" alt="">

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
                          @click="redirectTo(item.url)"
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


import axios from "axios";

export default {
  name: "StationCard",
  components: {},

  props: {
    'name': String,
    'url': String,
    'imageUrl': String,
    'items': Array
  },

  data() {
    return {
      settings: false,
      ipAddress: '',
      port: '',
      uri: '',
      currentApp: '',
      networks: [],
    }
  },


  methods: {
    /*--------------------------------------------------------------------------
    * Route redirection
    * -------------------------------------------------------------------------*/
    redirectTo(route) {

      if (route.toLowerCase().includes('network')) {
        this.settings = true;
        this.setCurrentApp(route);

      } else {
        this.$router.push({name: route});
      }
    },
    /*--------------------------------------------------------------------------
    * Set current App name
    * -------------------------------------------------------------------------*/
    setCurrentApp(route) {

      this.currentApp = '';

      if (route.toLowerCase().includes('auras'))
        if (route.toLowerCase().includes('v2'))
          this.currentApp = this.$aurasVersionV2;
        else
          this.currentApp = this.$aurasVersion;

      else if (route.toLowerCase().includes('drop'))
        this.currentApp = 'Drop Dispenser';
      else
        this.currentApp = 'Color Sensor';

      this.fetchNetworkByName(this.currentApp);

    },

    /*--------------------------------------------------------------------------
     * Retrieves all Ip addresses from database
    * --------------------------------------------------------------------------*/
    fetchNetworkByName(name) {

      let base_url;
      if (name.toLowerCase().includes('v2'))
        base_url = 'https://' + this.$aurasApiV2;
      else
        base_url = 'http://' + this.$aurasApi;

      axios.get(base_url + "api/networks/byName?name=" + name)
          .then(
              (response) => {
                if (response.status === 200) {
                  this.networks = response.data;

                  let url = this.networks['ipAddress'];
                  this.ipAddress = url.substring(0, url.indexOf(':'));

                  if (url.includes('/')) {
                    this.port = url.substring(url.indexOf(':') + 1, url.indexOf('/'));
                    this.uri = url.substring(url.indexOf('/') + 1);

                  } else {

                    this.port = url.substring(url.indexOf(':') + 1);
                  }

                }
              })
          .catch(
              (error) => {
                console.log('error', error.data)
              });
    },

    /*--------------------------------------------------------------------------
     * Updates an app address ip in database
    * --------------------------------------------------------------------------*/
    saveIp() {

      if (this.networks['ipAddress'] === this.ipAddress) {
        this.settings = false;
        return;
      }
      this.networks['ipAddress'] = this.ipAddress + ':' + this.port;

      if (this.uri)
        this.networks['ipAddress'] = this.networks['ipAddress'] + '/' + this.uri;

      let base_url;

      if (this.currentApp === this.$aurasVersionV2)
        base_url = 'https://' + this.$aurasApiV2;
      else
        base_url = 'http://' + this.$aurasApiV;


      axios.put(base_url + "api/networks/" + this.networks['id'], this.networks)
          .then(
              (response) => {
                if (response.status === 200) {
                  this.networks = response.data;
                }
              });
      this.settings = false;
    },

    /*--------------------------------------------------------------------------
      * Removes focus from all items
      * -------------------------------------------------------------------------*/
    removeFocusToAll() {
      document.activeElement.blur();
    },
  }


}
</script>

<style scoped>

#app-image {
  width: 100px;
  height: auto;
  margin-top: 20px;
}
</style>
