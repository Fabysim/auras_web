import Vue from 'vue'
import VueRouter from 'vue-router'
import StationManager from '../views/StationManager.vue'
import IndexColorSView from "@/views/ColorSensor/IndexColorSView";
import PlayGround from "@/views/PlayGround";
import IndexAuras from "@/views/Auras/V1/IndexAurasView_V1";
import IndexAurasV2 from "@/views/Auras/V2/IndexAurasView_V2";
import AurasConfigMethodView from "@/views/Auras/V1/ConfigMethodView_V1";
import AurasConfigMethodViewV2 from "@/views/Auras/V2/ConfigMethodView_V2";
import RunAurasView from "@/views/Auras/V1/RunMethodView_V1";
import RunAurasViewV2 from "@/views/Auras/V2/RunMethodView_V2";
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
        path: '/indexAurasV2',
        name: 'IndexAurasV2',
        component: IndexAurasV2,

    },
    {
        path: '/configAuras/:idMethod',
        name: 'ConfigAuras',
        component: AurasConfigMethodView,
    },
    {
        path: '/configAurasV2/:idMethod',
        name: 'ConfigAurasV2',
        component: AurasConfigMethodViewV2,
    },
    {
        path: '/runAuras/:idMethod',
        name: 'RunAuras',
        component: RunAurasView,
    },
    {
        path: '/runAurasV2/:idMethod',
        name: 'RunAurasV2',
        component: RunAurasViewV2,
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
