<template>
    <Tiltle class="mt-8">最新音乐</Tiltle>
    <div class="grid mt6 grid-cols-2   gap-x-4  mt-6">
        <div v-for="(item, index) in list" :key="index" class="flex pt-1.5  relative pb-2 pl-2 rounded-sm hover:bg-gray-100">
        <!-- <div class="line border-solid w-full    absolute border-black border">

        </div> -->
            <div class="w-16 h-16 bg-cover rounded-sm" :style="{backgroundImage:`url(${item.picUrl})`}">

            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Tiltle from '@/components/title.vue';
import { onMounted, ref, Ref } from 'vue';
import { httpGet } from '@/utils';
const list = ref([])

onMounted(async () => {
    const { result } = await httpGet('/personalized/newsong');
    console.log(result, '--');
    list.value = result;

})
</script>

<style lang='scss'>
</style>