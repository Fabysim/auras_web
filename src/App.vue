<template>
  <div id="app">
    <v-app-bar
        id="app_bar"
        color="#FF0000"
    >
      <div class="d-flex align-center">
        <v-img
            alt="Elysia Logo"
            class="shrink mr-2"
            contain
            :src="require('./assets/ElysiaRaytest_Logo.png')"
            transition="scale-transition"
            width="200"
        />
      </div>
      <v-spacer></v-spacer>
      <v-icon
          @click="settings=true">
        mdi-cog
      </v-icon>
    </v-app-bar>

    <v-spacer/>

    <v-main>
      <router-view/>
    </v-main>

  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    settings: false,
  }),
  methods: {
    showSettings() {
      this.$store.state.settingsDisplay = true;
    },

  }
}
</script>

<style lang="scss">
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

  #app_bar {
    background-color: red;
  }
}
</style>
