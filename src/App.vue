<template>
  <div id="app">
    <v-app-bar
        id="app_bar"
        color="#FF0000"
    >
      <div class="d-flex align-center"
           @click=" redirectTo('home')"
           style="cursor: pointer">

        <v-img
            alt="Elysia Logo"
            class="shrink mr-2"
            contain

            :src="require('./assets/LiquidDispenserImages/ElysiaRaytest_Logo.png')"
            transition="scale-transition"
            width="200"
        />
      </div>
      <v-spacer/>
      <v-btn text
             color="#FFFFFF"
             @click ="redirectTo('IndexAuras')">
        Auras
      </v-btn>
      <v-btn text
             color="#FFFFFF"
             @click ="redirectTo('IndexColorSensor')">
        Color sensor
      </v-btn>
      <v-btn text
             color="#FFFFFF"
             @click ="redirectTo('IndexLiquidDispenser')">
        Liquid dispenser
      </v-btn>

    </v-app-bar>

    <v-app>
      <router-view/>
    </v-app>

  </div>
</template>

<script>


export default {
  name: 'App',
  methods: {
    redirectTo(route) {

      if (this.$route.name !== route)
        this.$router.push({name: route})
    }
  }

}
</script>

<style lang="scss" scoped>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

}
</style>
