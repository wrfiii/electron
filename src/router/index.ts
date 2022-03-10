import { RouteRecordRaw } from 'vue-router'
const router:Array<RouteRecordRaw> = [
    {
        path: '/',
        name :"home",
        component:() => import('@/views/home/index.vue')
    },
    {
        path:'/login',
        name :"login",
        component:()=> import('@/views/login/index.vue')
    }
] 

export default router