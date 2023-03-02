import Vue from 'vue'
import VueRouter from 'vue-router'
import StationManager from '../views/StationManager.vue'
import IndexColorSView from "@/views/ColorSensor/IndexColorSView";
import PlayGround from "@/views/PlayGround";
import IndexAuras from "@/views/Auras/IndexAurasView";
import AurasConfigMethodView from "@/views/Auras/ConfigMethodView";
import RunAurasView from "@/views/Auras/RunMethodView";
import IndexLiquidDispenser from "@/views/LiquidDispenser/IndexLiquidDView";
import DdConfigMethod from "@/views/LiquidDispenser/ConfigMethodDd";
import DdUpdateMethod from "@/views/LiquidDispenser/UpdateMethodLD";
import ViewMethodDd from "@/views/LiquidDispenser/ViewMethodLD";


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
        component: AurasConfigMethodView,
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
        name: 'IndexLiquidDispenser',
        component: IndexLiquidDispenser
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
