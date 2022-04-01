<template>
    <div class=" relative z-50  bg-white">
        <div class="relative z-50">
        <div
            class="slider-bar w-3 h-3 bg-red-600 absolute rounded-full"
            :style="{ left: curPercentage + '%', top: '-4px' }"
            ref="slider"
        ></div>
        <div class="h-0.5 bg-red-700 absolute left-0 top-0" :style="{ width: `${curPercentage}%` }"></div>
    </div>

    <div
        class="control h-16 border-t border-solid border-cyan-500 flex items-center justify-between"
    >
        <div class="flex items-center ml-3" style="width: 33vw;">
            <div
                @click="showDetail"
                class="w-11 h-11 bg-cover rounded-sm flex-none transition-all duration-75"
                :style="{ backgroundImage: `url(${curPlaySong.picUrl})` }"
            ></div>
            <div
                class="ml-3 flex h-10 flex-col justify-between"
                style="width: calc( 100% - 2.75rem);"
            >
                <div class="flex items-center">
                    <span
                        class="text-slate-700 text-sm truncate inline-block"
                        style="max-width: 60%"
                    >{{ curPlaySong.name }}</span>
                    <span class="ml-1 mr-1 text-slate-600 text-xs">-</span>
                    <span class="text-slate-500 text-xs max-w-16 truncate inline-block flex-1">
                        <span
                            v-for="(item, index) in curPlaySong.songers"
                            :key="index"
                        >{{ item.name }}</span>
                    </span>
                </div>
                <div class="text-xs text-slate-500">
                    <span>{{ formatCurTime }}</span>
                    <span class="mr-1 ml-1">/</span>
                    <span>{{ endTime }}</span>
                </div>
            </div>
        </div>

        <div class="flex items-center">
            <span class="iconfont icon-xihuan mr-7 text-red-700"></span>
            <span class="iconfont icon-047caozuo_shangyishou mr-4 text-red-700" @click="setCurPlaySongVal(playPre())"></span>
            <span
                @click="chekPlay"
                class="iconfont mr-4 w-8 h-8 text-sm flex items-center justify-center bg-red-600 rounded-full text-white"
                :class="[isPlay ? 'icon-zanting' : 'icon-bofang']"
            ></span>
            <span class="iconfont icon-49xiayishou" @click="setCurPlaySongVal(playNext())"></span>
        </div>

        <div class="pr-8 flex justify-end" style="width: 33vw;">
            <span class="iconfont icon-danquxunhuan text-slate-600 mr-2 text-sm"></span>
            <span class="iconfont icon-bofangliebiao text-slate-600 text-sm"></span>
        </div>
    </div>
    </div>
</template>

<script setup lang='ts'>

import { computed, ref, onMounted, Ref } from 'vue';
import { curPlaySong ,setCurPlaySongVal} from '@/utils/store';
import { formateSongTime } from '@/utils';
import { formatCurTime, percentage, isPlay } from '@/utils/audio';
import { playNext,playPre ,isShowSongDetail} from '@/utils/control';


const isTouch = ref(false);
let oldpercentage = 0;
const slider:Ref<HTMLElement|undefined> = ref();


onMounted(()=>{
    // slider.value!.addEventListener('mousemove',(e)=>{
    //         console.log(e);
    // })
})

const showDetail = ()=>{
    isShowSongDetail.value =! isShowSongDetail.value
}




const endTime = computed(() => {
    return formateSongTime(curPlaySong.value.dt)
})

const curPercentage = computed(() => {
    if (isTouch.value) {
        return oldpercentage
    }

    return oldpercentage = percentage.value
})


const chekPlay = () => {
    isPlay.value = !isPlay.value
}


</script>

<style lang='scss'>
</style>