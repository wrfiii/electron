<template>
    <div class="bg-red-500  pt-1 pb-1 text-white rounded-xl pl-3 pr-3 flex items-center">
        <span
            class="iconfont icon-bofang w-5 h-5 flex justify-center p-1 items-center border text-xs rounded-full border-white"
        ></span>
        <span class="text-xs ml-2 mr-2" @click="addPlayAll">播放全部</span>
        <span class="border-r mr-2 border-red-200 block border-solid" style="width:1px;height:80% "></span>
        <span class="iconfont icon-jiahao1"></span>
    </div>
</template>

<script setup lang='ts'>
import { defineEmits } from 'vue'

const emits = defineEmits<{ (event: 'click',): void }>()
const addPlayAll = () => {
    emits('click')
}

</script>

<style lang='scss'>
</style>