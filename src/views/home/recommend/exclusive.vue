<template>
    <Tiltle class="mt-8">独家放送</Tiltle>
    <div class="grid grid-cols-4 gap-5 mt-4">
        <div v-for="(item, index) in list" :key="index">
            <div
                class="xl:h-36 h-24 bg-cover relative"
                :key="index"
                :style="{ backgroundImage: `url(${item.sPicUrl})` }"
            >
            <div class="icon absolute left-2 top-1.5  w-6  h-6 ">
                <span class="iconfont icon-24gl-play text-xs text-white"></span>
            </div>  
            </div>
            <div class="text-line-2 text-sm text-slate-700 mt-1.5">{{ item.name }}</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Tiltle from '@/components/title.vue'
import { httpGet } from '@/utils';
import { onMounted, ref, Ref } from 'vue';

const list: Ref<Array<{ sPicUrl: string, name: string }>> = ref([]);


onMounted(async () => {
    const { result } = await httpGet('/personalized/privatecontent/list', { limit: 4 });
    list.value = result;
})

</script>

<style lang='scss'>
.icon{
    border: 1px solid #ccc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0,.3);
}
</style>