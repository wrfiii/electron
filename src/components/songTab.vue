<template>
    <div
        class="pt-1.5 pb-1.5 border-t grid grid-cols-12 text-xs text-slate-500 border-cyan-300 border-solid"
    >
        <div class="col-start-3 col-span-4">音乐标题</div>

        <div class="col-span-2">歌手</div>

        <div class="col-span-3">专辑</div>

        <div class="col-span-1 flex">时长</div>
    </div>
    <div
        class="grid grid-cols-12 pb-1.5 pt-1.5 text-sm item"
        v-for="(item, index) in songList"
        :key="item.id"
        @dblclick="play(item)"
        :class="[curPlaySong.id === item.id ? 'active' : '']"
    >
        <div class="text-slate-500 text-sm col-span-2">
            <span class="ml-9 text-xs">{{ (index + 1).toString().padStart(2, '0') }}</span>
            <span class="ml-2 iconfont icon-xihuan"></span>
            <span class="ml-2 iconfont icon-xiazai-"></span>
        </div>

        <div class="col-span-4 pr-6 truncate text-xs text-slate-700 name">{{ item.name }}</div>
        <div class="col-span-2 text-xs text-slate-600 truncate pr-2 ">
            <span v-for="_item in item.songers" :key="_item.id">{{ _item.name }}</span>
        </div>
        <div class="col-span-3 text-xs truncate pr-6 text-slate-600">{{ item.alName }}</div>
        <div class="col-span-1 text-xs text-slate-500 flex pr-9">{{ formateSongTime(item.dt) }}</div>
    </div>
</template>

<script setup lang='ts'>
import { defineEmits, ref, Ref, defineExpose } from 'vue'
import { Song, curPlaySong } from '@/utils/store';
import { formateSongTime } from '@/utils';
let songList: Ref<Array<Song>> = ref([]);


const emit = defineEmits<{ (event: 'play', item: Song): void }>()

const play = (item: Song) => {
    emit('play', item)
}
const getList = (list: Array<Song>) => {
    songList.value = list;
}

defineExpose({
    getList
})
</script>

<style lang='scss' scoped>
.item {
    &:nth-of-type(odd) {
        background-color: rgb(248, 248, 248);
    }
    &:hover {
        background-color: rgb(240, 240, 240) !important;
    }
    &.active {
        background-color: rgb(230, 230, 230) !important;
        .name {
            --tw-text-opacity: 1;
            color: rgb(220 38 38 / var(--tw-text-opacity));
        }
    }
}
</style>