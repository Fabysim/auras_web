<template >
  <v-row class="center">
    <v-col>
      <StationCard v-bind:name="appName1" v-bind:items="itemsAuras"/>
    </v-col>
    <v-col>
      <StationCard v-bind:name="appName2" v-bind:items="itemsCS"/>
    </v-col>
    <v-col>
      <StationCard v-bind:name="appName3" v-bind:items="itemsDD"/>
    </v-col>
  </v-row>
</template>

<script>

import StationCard from "@/components/StationCard";

export default {
  name: 'StationManager',
  components: {StationCard},

  data: () => ({
    settings: false,
    appName1: 'Auras',
    appName2: 'Color Sensor',
    appName3: 'Drop Dispenser',


    itemsAuras: [
      {text: 'Start Auras', icon: 'mdi-power', url: 'IndexAuras'},
      {text: 'Auras Network', icon: 'mdi-access-point-network', url: 'AurasNetwork'},
    ],
    itemsDD: [
      {text: 'Drop Dispenser Run', icon: 'mdi-power', url: 'IndexDd'},
      {text: 'Drop Dispenser Network', icon: 'mdi-access-point-network', url: 'DropDNetwork'},
    ],
    itemsCS: [
      {text: 'Color sensor Run', icon: 'mdi-power', url: 'colorSensor'},
      {text: 'Color sensor Network', icon: 'mdi-access-point-network', url: 'CsNetwork'},
    ],
  }),
}
</script>

<style scoped>


.center{
  margin-left: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}


.platforms{
  height: 768px ;
}

</style>