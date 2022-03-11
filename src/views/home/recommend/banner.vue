<template>
    <div class="relative h-full overflow-hidden" ref="banner">
        <div
            v-for="(item, index) in bannerList"
            class="w overflow-hidden absolute h-46 w-5/6 rounded-xl shadow duration-250 transition-transform"
            :class="[index === curIndex ? 'active' : '']"
            :style="{ transform: `translate3d(${imgWeidth * ((index - curIndex))}px,0,0)` }"
            @click="bannerClick(index)"
        >
            <img :key="index" :src="item.imageUrl" :class="['h-full', 'w-full', 'object-fill']" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, Ref, nextTick } from 'vue';
import { httpGet } from '@/utils/index';
const bannerList: Ref = ref([]);
const imgWeidth = ref(0)
const banner = ref(null)
const curIndex = ref(1);
let timer: NodeJS.Timeout | null = null;

onMounted(async () => {

    const { banners } = await httpGet('/banner', { type: 0 });
    bannerList.value = banners;
    const firstBanner = bannerList.value[0]
    bannerList.value.unshift(bannerList.value[bannerList.value.length - 1]);
    bannerList.value.push(firstBanner);
    let len = bannerList.value.length;
    await nextTick()
    imgWeidth.value = (banner.value as unknown as HTMLElement).querySelector('img')!.getBoundingClientRect().width - 80;

    startLoop()

})

const bannerClick = (index: number) => {
    if (index === bannerList.value.length - 1) {
        curIndex.value = 1;
    }
    curIndex.value = index;
    startLoop()
}


const startLoop = () => {
    timer && clearInterval(timer)
    timer = setInterval(() => {
        curIndex.value++;
        if (bannerList.value.length - 1 === curIndex.value) {
            curIndex.value = 1;
            console.log(curIndex.value,'curIndex');
        }
    }, 6600)
}

</script>

<style lang='scss'>
.active {
    z-index: 999;

    transform: translate3d(4rem, 0, 0) !important;
}
.w:not(.active) {
    height: 12rem;
    top: 1rem;
    transition: transform 0.2s 0.06s;
}
.preActive {
    z-index: 998;
    left: 0;
}
.nextActive {
    z-index: 998;

    right: 0;
}
</style>