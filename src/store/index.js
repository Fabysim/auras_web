import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentIp: '',
        aurasIp: '10.10.17.140:81',
        ddIp: '10.10.17.140:81',
        csIp: '10.10.17.241:81',
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
