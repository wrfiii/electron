import { RouteRecordRaw } from 'vue-router'
const router:Array<RouteRecordRaw> = [
    {
        path: '/',
        name :"home",
        component:() => import('@/views/home/index.vue')
    }
] 

export default router