import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.prototype.$aurasApi = "10.10.17.130:8443/"
Vue.prototype.$ddApi = "10.10.14.106:8080/"
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

