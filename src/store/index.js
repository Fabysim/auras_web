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
        trayModuleName: 'Tray',
        liquidDispenserModuleName: 'Liquid Dispenser',
        dropDispenserModuleName: 'Drop Dispenser',
        tlcMigrationModuleName: 'TLC Migration',
        phMeterModuleName: 'PH Meter',
        GinaModuleName: 'Gina',
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
