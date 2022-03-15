<template>
    <div class="relative w-full overflow-x-hidden" style="height: 200px;" ref="banner">
        <div
            v-for="(item, index) in bannerList"
            class="w absolute rounded-xl shadow duration-200 ease-in-out transition transform-gpu"
            :class="[index === curIndex ? 'active ' : '']"
            :style="{ transform: `translate3d(${520 * ((index - curIndex)) + 123}px,0,0)`, width: '520px' }"
            @click="bannerClick(index)"
        >
            <div
                class="h-full w-full bg-cover rounded-xl"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
        </div>
    </div>
    <div class="flex justify-center h-max mt-4 left-0 right-0">
        <span
            v-for="index in bannerList.length"
            class="block w-1.5 h-1.5 rounded-full bg-slate-300 mr-3"
            @mousemove="bannerClick(index)"
            :class="[curIndex ===index ? 'bg-red-700':'' ]"
        ></span>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, Ref, nextTick } from 'vue';
import { httpGet } from '@/utils/index';
const bannerList: Ref = ref([]);
const banner = ref(null)
const curIndex = ref(1);
let timer: NodeJS.Timeout | null = null;

onMounted(async () => {

    const { banners } = await httpGet('/banner', { type: 0 });
    bannerList.value = banners;
    const firstBanner = bannerList.value[0];
    console.log(bannerList.value[bannerList.value.length-1]);
    
    bannerList.value.unshift(bannerList.value[bannerList.value.length - 1]);
    bannerList.value.push(firstBanner);
})

const bannerClick = (index: number) => {
    if (index === bannerList.value.length - 2) {
        curIndex.value = 1;
    }
    curIndex.value = index;
}



</script>

<style lang='scss'>
.active {
    height: 200px;
    z-index: 999 !important;
    transform: translate3d(123px, 0, 0) !important;
}
.w:not(.active) {
    top: 10px;
    height: 180px;
    transition: transform 0.2s;

    &::before {
        @apply rounded-xl;

        position: absolute;
        left: 0;
        content: "";
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.7);
    }
}
</style>