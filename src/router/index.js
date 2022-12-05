import Vue from 'vue'
import VueRouter from 'vue-router'
import StationManager from '../views/StationManager.vue'
import IndexColorSView from "@/views/ColorSensor/IndexColorSView";
import PlayGround from "@/views/PlayGround";
import IndexAuras from "@/views/Auras/IndexAurasView";
import ConfigAurasView from "@/views/Auras/ConfigAurasView";
import RunAurasView from "@/views/Auras/RunAurasView";
import IndexDd from "@/views/LiquidDispenser/IndexDropDView";
import DdConfigMethod from "@/views/LiquidDispenser/ConfigMethodDd";
import DdUpdateMethod from "@/views/LiquidDispenser/UpdateMethodDd";
import ViewMethodDd from "@/views/LiquidDispenser/ViewMethodDd";


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
        name: 'IndexColorSensor',
        component: IndexColorSView,
    },
    {
        path: '/config',
        name: 'IndexDd',
        component: IndexDd
    },
    {
        path: '/method/:id_method_list',
        name: 'DdConfigMethod',
        component: DdConfigMethod,
    },
    {
        path: '/edit/:id_method',
        name: 'DdUpdateMethod',
        component: DdUpdateMethod,
    },
    {
        path: '/view/:id_method_list',
        name: 'ViewMethod',
        component: ViewMethodDd,

    },


]

const router = new VueRouter({
    routes
})

export default router
