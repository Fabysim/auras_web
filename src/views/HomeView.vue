<template >
  <v-row class="center">
    <v-col>
      <AppCard v-bind:name="appName1" v-bind:items="itemsAuras"/>
    </v-col>
    <v-col>
      <AppCard v-bind:name="appName2" v-bind:items="itemsCS"/>
    </v-col>
    <v-col>
      <AppCard v-bind:name="appName3" v-bind:items="itemsDD"/>
    </v-col>
  </v-row>
</template>

<script>

import AppCard from "@/components/AppCard";

export default {
  name: 'HomeView',
  components: {AppCard},

  data: () => ({
    settings: false,
    appName1: 'Auras',
    appName2: 'Color Sensor',
    appName3: 'Drop Dispenser',


    itemsAuras: [
      {text: 'Run Auras', icon: 'mdi-play-circle-outline', url: 'aurasRun'},
      {text: 'Auras Configuration', icon: 'mdi-cog-outline', url: 'aurasConfig'},
      {text: 'Auras Network', icon: 'mdi-ip-network-outline', url: 'aurasNetwork'},
    ],
    itemsDD: [
      {text: 'Drop Dispenser Run', icon: 'mdi-play-circle-outline', url: 'dropDRun'},
      {text: 'Drop Dispenser Configuration', icon: 'mdi-cog-outline', url: 'dropDConfig'},
      {text: 'Drop Dispenser Network', icon: 'mdi-ip-network-outline', url: 'dropDNetwork'},
    ],
    itemsCS: [
      {text: 'Color sensor Run', icon: 'mdi-play-circle-outline', url: 'colorSensor'},
      {text: 'Color sensor Network', icon: 'mdi-ip-network-outline', url: 'csNetwork'},
    ],
  }),
}
</script>

<style scoped>

.center {

  margin-top: 10%;
  margin-right: 10%;
  position: relative;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-45%, -50%);
}


.platforms{
  height: 768px ;
}

</style>