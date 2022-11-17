import Vue from 'vue'
import VueRouter from 'vue-router'
import StationManager from '../views/StationManager.vue'
import SensorManagerView from "@/views/ColorSensor/SensorManagerView";
import PlayGround from "@/views/PlayGround";
import IndexAuras from "@/views/Auras/IndexAuras";
import ConfigAurasView from "@/views/Auras/ConfigAurasView";
import RunAurasView from "@/views/Auras/RunAurasView";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: StationManager,

    },
    {
        path: '/playground',
        name: 'playground',
        component: PlayGround,

    },
    {
        path: '/indexAuras',
        name: 'IndexAuras',
        component: IndexAuras,

    },
    {
        path: '/configAuras/:idMethod',
        name: 'ConfigAuras',
        component: ConfigAurasView,
    },
    {
        path: '/runAuras/:idMethod',
        name: 'RunAuras',
        component: RunAurasView,
    },
    {
        path: '/colorSensor',
        name: 'colorSensor',
        component: SensorManagerView,
    },


]

const router = new VueRouter({
    routes
})

export default router
