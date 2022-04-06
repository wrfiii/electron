<template>
    <div class="flex user-menu bg-gray-100 h-full flex-col">
        <div class="flex items-center pl-2 pt-2" @click="login">
            <div class="bg-gray-300 rounded-full">
                <span
                    class="iconfont icon-touxiang text-4xl text-gray-100 rounded-full leading-none"
                ></span>
            </div>
        
            <span class="ml-4 ft-12 text-sm text-slate-700 font-medium" >{{userStore.profile.nickname ? userStore.profile.nickname:'未登陆'}}</span>
            <img :src="userStore.profile.avatarUrl" v-if="userStore.profile.avatarUrl" alt="">
            <span class="iconfont icon-bofang ml-2 text-xs text-slate-400" v-else></span>
        </div>

        <div class="mt-5">
            <div
                v-for="(item, index) in userMenuNav"
                :key="index"
                class="hover:bg-gray-200 p-2.5 pl-3"
            >
                <span :class="['iconfont', item.icon, 'text-sm', 'text-slate-700', 'mr-2']"></span>
                <span class="text-sm text-slate-700">{{ item.label }}</span>
            </div>
        </div>

        <div class="mt-4">
            <p class="pl-3 text-slate-500 text-xs mb-2">我的音乐</p>
            <div
                v-for="(item, index) in myMusicNav"
                :key="index"
                class="hover:bg-gray-200 p-2.5 pl-3"
            >
                <span :class="['iconfont', item.icon, 'text-sm', 'text-slate-700', 'mr-2']"></span>
                <span class="text-sm text-slate-700">{{ item.label }}</span>
            </div>
        </div>
        <div class="mt-3">
            <div class="flex items-center pl-2 justify-between">
                <div class="flex items-center">
                    <span class="iconfont icon-bofang text-slate-400" style="font-size: 9px;"></span>
                    <span class="ml-2 text-sm text-slate-500" style="font-size: 12px;">创建的歌单</span>
                </div>
                <span class="iconfont icon-jiahao1 text-slate-500 mr-4"></span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import useUserStore from '@/store/user';
import { httpPost,httpGet } from '@/utils/index';
import { ref ,onMounted} from 'vue';
const getProfile = async () => {
        const { profile } = await httpGet('/user/account');
        return profile
}
const userMenuNav = [
    { icon: 'icon-music', label: '发现音乐' },
    { icon: 'icon-radioguangbo', label: '私人FM' },
    { icon: 'icon-shipin', label: '视频' },
    { icon: 'icon-pengyou', label: '朋友' }
]

const myMusicNav = [
    { icon: 'icon-xiazai-', label: '下载管理' },
    { icon: 'icon-zuijinbofang', label: '最近播放' }
]
const userStore = useUserStore();

onMounted(()=>{
        // window.ipcRenderer.on('getProfile',getProfile)
})


const login = async () => {
    if (!userStore.isLogin) {
        window.ipcRenderer.send('openLoginView')
    }
}



</script>

<style lang='scss'>
.user-menu {
    width: $user-menu-wdith;
    height: 100%;
}
</style>