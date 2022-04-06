<template>
    <div
        class="relative overflow-x-hidden  xl:w-10/12 m-auto z-0"
        style="height: 200px;"
        ref="banner"
    >
        <div
            v-for="(item, index) in bannerList"
            class="w absolute rounded-xl xl:w-6/12 w-7/12 shadow duration-200 ease-in-out transition transform-gpu"
            :class="[index === curIndex ? 'active ' : '', index === curIndex - 1 ? 'preNode' : '', index === curIndex + 1 ? 'nextNode' : '']"
            :key="item.id"
            @click="bannerClick(index)"
        >
            <div
                class="h-full w-full bg-cover rounded-xl"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
        </div>
    </div>
    <div class="flex justify-center h-max mt-4 left-0 right-0">
        <!-- <span
            v-for="index in 8"
            :key="index"
            class="block w-1.5 h-1.5 rounded-full bg-slate-300 mr-3"
            @click="bannerClick(index)"
            :class="[curIndex === index ? 'bg-red-700' : '']"
        ></span> -->
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, Ref, nextTick } from 'vue';
import { httpGet } from '@/utils/index';
const bannerList: Ref = ref([]);
const curIndex = ref(0);
let timer: NodeJS.Timeout | null = null;

onMounted(async () => {
    const { banners } = await httpGet('/banner', { type: 0 });
    bannerList.value = banners;
})

const bannerClick = (index: number) => {
    if (index === bannerList.value.length - 1) {
        curIndex.value = 1;
        return
    }
    curIndex.value = index;
}
</script>

<style lang='scss' scoped>
.active {
    height: 200px;
    z-index: 999 !important;
    transform: translate3d(220px, 0, 0) !important;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}
.preNode {
    transform: translate3d(0, 0, 0) !important;
    z-index: 2 !important;
}
.nextNode {
    transform: translate3d(450px, 0, 0) !important;
    z-index: 2 !important;
}
@media screen and (max-width: 1200px) {
    .active {
        transform: translate3d(188px, 0, 0) !important;
    }
    .nextNode {
        transform: translate3d(350px, 0, 0) !important;
    }
}

.w:not(.active) {
    top: 10px;
    height: 180px;
    transition: transform 0.2s;
    z-index: 1;
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