<template>
    <div
        class="day  bg-view relative rounded-md overflow-hidden  bg-gray-100"
        :style="{ backgroundImage: `url(${item.picUrl})` }"
        @click="goRote(item)"
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
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
defineProps(['item']);
const fillterNum = (num: number) => {
    return Math.floor(num / 10000)
}
const router = useRouter();
const goRote = (item: any) => {
   router.push({
        name: 'songList',
        query: {
            id: item.id,
            name: item.name,
            picUrl: item.picUrl
        }

    })
}

</script>

<style lang='scss' scoped>
.bg-view{
    transition: backGround .16s;
}
</style>