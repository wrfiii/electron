<template>
    <div class="flex h-12 select-none" style="-webkit-app-region : drag;" ref="topBar">
        <div class="l-btn pt-3 bg-gray-50 flex justify-end p-2 pr-1  border-white">
            <span class="iconfont icon-zuojiantou h-6 w-6 rounded-full text-xl hover:bg-slate-100"></span>
            <span class="iconfont icon-youjiantou h-6 w-6 rounded-full text-xl hover:bg-slate-100"></span>
        </div>
        <div class="r-menu flex h-full bg-gray-50 flex-1" @click.stop>
            <div class="flex h-full items-center text-sm pl-8">
                <router-link :to="item.name"
                    v-for="(item, index) in menu"
                    :key="index"
                    class="mr-7 text-gray-500 hover:text-gray-900 cursor-default"
                >{{ item.label }}</router-link>
            </div>

            <div class="flex items-center pl-7 flex-1 justify-end">
                <div class="flex relative mr-4">
                    <input
                        type="text"
                        class="rounded-rand outline-none h-6 w-36 rounded-full py-3 px-2 pl-6  bg-white"
                    />
                    <SearchIcon class="h-4 w-4 absolute top-1 left-1.5" />
                </div>

                <div class="flex justify-end">
                    <CogIcon class="h-5 w-5 text-gray-500 mr-4" />
                    <MailIcon class="h-5 w-5 text-gray-500 font-extralight mr-4" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, CogIcon, MailIcon } from '@heroicons/vue/Solid'
import { doubleClick } from '@/utils/index';
import { onMounted, ref } from 'vue';

const menu = [
    {
        label: '个性推荐',
        name:'recommend'
    },
    {
        label: '歌单',
        name:'songPlayList'
    },
    {
        label: '主播电台',
        name:'radio'
    },
    {
        label: '排行榜',
        name:'rankList'
    },
    {
        label: '歌手',
        name:'songer'
    },
    {
        label: '最新音乐',
        name:'newMusic'
    }
]
const topBar = ref(null)


onMounted(() => {

    doubleClick(topBar.value!, () => {
        window.ipcRenderer.send('maximize')
    })

})


</script>

<style lang='scss'>
.l-btn {
    width: $user-menu-wdith;
}
</style>