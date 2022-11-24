import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // Ip Addresses
        currentIp: '',
        aurasIp: '10.10.17.140:81',
        ddIp: '10.10.17.140:81',
        csIp: '10.10.17.241:81',
        mecatechIp:'10.10.15.101',

        // Modules Names
        module1Name: 'Tray',
        module2Name: 'Liquid Dispenser',
        module3Name: 'Drop Dispenser',
        module4Name: 'TLC Migration Module',
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
