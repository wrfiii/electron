<template>
    <Tiltle>推荐歌单</Tiltle>
    <div class="grid grid-cols-5 gap-5 mt-4">
        <div class @click="goRote">
            <div class="day day-view relative rounded-md overflow-hidden">
                <span class="iconfont icon-rili text-white block text-7xl ps-center bottom-52"></span>
                <span class="text-white text-xl font-bold ps-center mt-4 bottom-48 pt-6">{{ day }}</span>
                <div class="play-icon absolute">
                    <span class="iconfont icon-bofang text-sm"></span>
                </div>
            </div>
            <div class="text-sm text-slate-700 mt-1.5">每日歌曲推荐</div>
        </div>

        <div class v-for="(item, index) in personalizedList" :key="index" @click="goPage(item)">
            <div
                class="day relative rounded-md overflow-hidden"
                :style="{ backgroundImage: `url(${item.picUrl})` }"
            >
                <div class="flex justify-end pr-1.5 pt-1 text-xs text-white">
                    <span class="iconfont icon-24gl-play text-slate-100 mr-1"></span>
                    <span>{{ fillterNum(item.playCount) }}万</span>
                </div>
                <div class="play-icon absolute">
                    <span class="iconfont icon-bofang text-sm"></span>
                </div>
            </div>
            <div class="text-sm text-slate-700 mt-1.5 text-line-2">{{ item.name }}</div>
        </div>
    </div>
</template>

<script setup lang='ts'>

import { onMounted, ref, Ref } from 'vue';
import { httpGet } from '@/utils';
import { useRouter } from 'vue-router';

import Tiltle from '@/components/title.vue';

interface Song {
    picUrl: string,
    playCount: number,
    name: string
}

const day = new Date().getDate()

const getPersonalized = () => {
    return httpGet('/personalized', { limit: 9 })
}

const fillterNum = (num: number) => {
    return Math.floor(num / 10000)
}

const personalizedList: Ref<Array<Song>> = ref([])
const rotuer = useRouter();

const goRote = () => {
    rotuer.push({
        name: 'dayDetail'
    })
}

onMounted(async () => {
    const { result } = await getPersonalized();
    personalizedList.value = result;
})

const goPage = (item:any)=>{
    rotuer.push({
        name:'songList',
        query:{
            id:item.id,
            name:item.name,
            picUrl:item.picUrl
        }
    })
}

</script>

<style lang='scss'>
.ps-center {
    @apply m-auto right-0 top-0 bottom-0  w-max h-max left-0 absolute;
}

.play-icon {
    right: 0.6rem;
    @apply text-2xl text-white   bottom-1 rounded-full w-7 h-7 flex items-center justify-center;
    bottom: 0.6rem;
    background-color: rgba(255, 255, 255, 0.5);
}

.day {
    background-image: url("@/assets/img/kwc1ofkbefw.jpeg");
    background-size: cover;
    position: relative;
    @apply h-36;
    .play-icon {
        opacity: 0;
    }
    &:hover {
        &:after {
            transform: translate3d(0, 0%, 0);
        }
        .play-icon {
            opacity: 1;
        }
    }

    &::before {
        @extend .play-icon;
    }
}
.day-view:after {
    display: block;
    content: "根据您的音乐口味生成 每日更新";
    @apply text-xs text-slate-50 p-2  pr-0;
    background-color: rgba(0, 0, 0, 0.4);
    transform: translate3d(0, -100%, 0);
    transition: translate3d ease 0.16s !important;
}
</style>