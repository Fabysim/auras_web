<template>
  <v-row class="center">
    <v-col>
      <StationCard v-bind:name="appName4" v-bind:items="itemsAurasV2" v-bind:imageUrl="image4"/>
    </v-col>
    <v-col>
      <StationCard v-bind:name="appName1" v-bind:items="itemsAurasV1" v-bind:imageUrl="image1"/>
    </v-col>
    <v-col>
      <StationCard v-bind:name="appName2" v-bind:items="itemsCS" v-bind:imageUrl="image2"/>
    </v-col>
    <v-col>
      <StationCard v-bind:name="appName3" v-bind:items="itemsLD" v-bind:imageUrl="image3"/>
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
    appName1: 'Auras v1',
    appName2: 'Color Sensor',
    appName3: 'Liquid Dispenser',
    appName4: 'Auras v2',
    image1:'/Auras/Images/V1/Auras_icon_v1.png',
    image2:'/ColorSensor/images/ColorSensor.png',
    image3:'/LiquidDispenserSD/images/Assemblage_210504.png',
    image4:'/Auras/Images/V2/Auras_icon_v2.png',


    itemsAurasV1: [
      {text: 'Start Auras V2', icon: 'mdi-power', url: 'IndexAuras'},
      {text: 'Auras V1 Network', icon: 'mdi-access-point-network', url: 'AurasNetwork'},
    ],
    itemsAurasV2: [
      {text: 'Start Auras V2', icon: 'mdi-power', url: 'IndexAurasV2'},
      {text: 'Auras V2 Network', icon: 'mdi-access-point-network', url: 'AurasNetworkV2'},
    ],
    itemsLD: [
      {text: 'Liquid Dispenser Run', icon: 'mdi-power', url: 'IndexLd'},
      {text: 'Liquid Dispenser Network', icon: 'mdi-access-point-network', url: 'LiquidDNetwork'},
    ],
    itemsCS: [
      {text: 'Color sensor Run', icon: 'mdi-power', url: 'IndexColorSensor'},
      {text: 'Color sensor Network', icon: 'mdi-access-point-network', url: 'CsNetwork'},
    ],
  }),
}
</script>

<style scoped>


.center {
  margin-left: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}


</style>