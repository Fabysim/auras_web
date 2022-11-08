import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AurasConfigView from "@/views/AurasConfigView";
import SensorManagerView from "@/views/SensorManagerView";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,

    },
    {
        path: '/aurasConfig',
        name: 'aurasConfig',
        component: AurasConfigView,
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
