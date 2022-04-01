<template>
    <Tiltle class="mt-9">推荐MV</Tiltle>
    <div class="grid grid-cols-4 gap-3 h-40 mt-6">
        <div
            v-for="(item,index) in list"
            :key="index"
            class="h-full bg-cover relative mv-box"
            :style="{ backgroundImage: `url(${item.picUrl})` }"
        >
            <div
                class="h-8 mc text-white text-xs flex items-center pl-1.5 truncate"
            >{{ item.copywriter }}</div>
            <div class="absolute right-3 top-2 text-white text-xs playCount">
                <span class="iconfont icon-24gl-play mr-1"></span>
                <span>{{ item.playCount }}</span>
            </div>
        </div>
    </div>
</template> 

<script setup lang='ts'>
import Tiltle from '@/components/Title.vue';
import { httpGet } from '@/utils';
import { onMounted, ref, Ref } from 'vue';
const list: Ref<Array<{ picUrl: string, playCount: number, copywriter: string }>> = ref([])

onMounted(async () => {
    const { result } = await httpGet('/personalized/mv');
    result.length = 4;
    list.value = result;
})

</script>

<style lang='scss'>
.mc {
    background-color: rgba(0, 0, 0, 0.5);
    transform: translate3d(0, -100%, 0);
    transition: transform 0.16s;
}
.mv-box {
    overflow: hidden;
    &:hover {
        .mc {
            transform: translate3d(0, 0%, 0);
        }
        .playCount {
            display: none;
        }
    }
}
</style>