import { RouteRecordRaw } from 'vue-router'
const router: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "home",
        component: () => import('@/views/home/index.vue'),
        redirect: 'recommend',
        children: [
            {
                path: '/recommend',
                name: 'recommend',
                component: () => import('@/views/home/recommend/index.vue')
            },
            {
                path: '/songPlayList',
                name: 'songPlayList',
                component: () => import('@/views/home/songPlayList/index.vue')
            },
            {
                path: '/newMusic',
                name: 'newMusic',
                component: () => import('@/views/home/newMusic/index.vue')
            },
            {
                path: '/songer',
                name: 'songer',
                component: () => import('@/views/home/songer/index.vue')
            },
            {
                path: '/songPlayList',
                name: 'songPlayList',
                component: () => import('@/views/home/songPlayList/index.vue')
            },   {
                path: '/radio',
                name: 'radio',
                component: () => import('@/views/home/radio/index.vue')
            },
            {
                path:'rankList',
                name:"rankList",
                component: () => import('@/views/home/rankList/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: "login",
        component: () => import('@/views/login/index.vue')
    },
    // {
    //     path:'*',
    //     component: () => import('@/views/home/index.vue'),
    // }
]

export default router