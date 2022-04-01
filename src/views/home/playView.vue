<template>
    <div class="subView absolute pt-8 pl-20" :class="[isShowSongDetail ? 'active' : '']">
        <div class="flex">
            <div>
                <div class="cd rounded-full" :class="[isPlay ? 'active' : '']">
                    <div v-for="(item, index) in 13" :class="'l' + index" :key="index"></div>
                    <div class="img-view">
                        <img :src="curPlaySong.picUrl" />
                    </div>
                </div>
                <div class="icons flex mt-8">
                    <div
                        v-for="(item, index) in icons"
                        class="w-10 h-10 rounded-full flex mr-5 justify-center items-center bg-slate-200 hover:bg-slate-300"
                        :key="index"
                    >
                        <component :is="item.key" class="h-6 w-6 text-gray-700 text-xs"></component>
                    </div>
                </div>
            </div>

            <div class="pl-20">
                    <div class="flex items-center">
                        <span class=" text-2xl  text-black">{{curPlaySong.name}}</span>
                        <span v-if="curPlaySong.mv " class=" ml-3 border text-center  border-solid rounded-sm  block border-red-500 w-8 h-5 text-sm text-red-500">MV</span>
                    </div>
                    <div class=" mt-4 text-slate-400 text-xs" >
                        <span >专辑:</span>
                        <span  class="mr-6 ml-1 text-blue-500">{{curPlaySong.alName}}</span>
                        <span class="mr-1">歌手:</span>
                        <span class="text-blue-500 mr-1" v-for="item in curPlaySong.songers" :key="item.id"> {{item.name}} </span>
                    </div>

            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { HeartIcon, DownloadIcon, FolderDownloadIcon, ShareIcon } from '@heroicons/vue/outline';

import { watch, defineComponent, ref } from 'vue'
import { isShowSongDetail } from '@/utils/control';
import { curPlaySong } from '@/utils/store';
import { isPlay } from '@/utils/audio';

const icons = [
    {
        key: HeartIcon
    },
    {
        key: DownloadIcon
    },
    {
        key: FolderDownloadIcon
    },
    {
        key: ShareIcon
    }
]



watch(() => curPlaySong.value.id, () => {
    // console.log(curPlaySong.value);
})

</script>

<style lang='scss' scoped>
.playView {
    height: 0;
}
@for $i from 1 through 13 {
    .l#{$i} {
        width: calc(66% + #{$i} * 2.5%);
        height: calc(66% + #{$i} * 2.5%);
        box-shadow: 0 0 1.5px #000;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
}

.img-view {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 210px;
    height: 210px;
    border-radius: 50%;
    border: 6px solid #000;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
}

.subView {
    width: 100vw;
    height: 0;
    @apply bg-gray-50;
    transition: all 0.36s ease-in-out;
    height: calc(100vh - 4rem);
    transform: translate3d(0, 0, 0);
    &.active {
        transform: translate3d(0, -100%, 0);
    }
}
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
.cd {
    box-shadow: 0 0 0 8px #dcdcdc;
    width: 280px;
    height: 280px;
    position: relative;
    background-image: radial-gradient(
        circle at center center,
        rgb(71, 71, 71),
        rgb(8, 8, 8)
    );
    animation: rotate 38s ease-in paused infinite;
    &.active {
        animation-play-state: running;
    }
}
</style>