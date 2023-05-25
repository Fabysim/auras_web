import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // Ip Addresses
        currentIp: '',
        ddIp: '10.10.17.140:81',
        csIp: '10.10.17.241:81',
        mecatechIp: '10.10.15.101',

        // Modules Names
        trayModuleName: 'Tray',
        liquidDispenserModuleName: 'Liquid Dispenser',
        dropDispenserModuleName: 'Drop Dispenser',
        tlcMigrationModuleName: 'TLC Migration',
        phMeterModuleName: 'PH Meter',
        ginaModuleName: 'Gina',
        aurasModuleName: 'Auras',
        commentModuleName: 'Comment',
        lalModuleName: 'LAL',

        //Miscellaneous
        connectionWS: null,
        totalOfSteps:0,


    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
