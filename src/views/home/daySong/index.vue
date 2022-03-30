<template>
    <div class="w-full overflow-scroll h-full">
        <div class="mt-4">
            <p class="text-black text-2xl ml-9">每日歌曲推荐</p>
            <p class="text-xs text-gray-400 mt-2 ml-9">根据你的音乐口味生成, 每天6:00更新</p>
        </div>
        <div class="flex mt-3">
            <div
                class="bg-red-500 ml-9 pt-1 pb-1 text-white rounded-xl pl-3 pr-3 flex items-center"
            >
                <span
                    class="iconfont icon-bofang w-5 h-5 flex justify-center p-1 items-center border text-xs rounded-full border-white"
                ></span>
                <span class="text-xs ml-2 mr-2">播放全部</span>
                <span
                    class="border-r mr-2 border-red-200 block border-solid"
                    style="width:1px;height:80% "
                ></span>
                <span class="iconfont icon-jiahao1"></span>
            </div>
            <div class>
                <span class></span>
            </div>
        </div>
        <div
            class="pt-1.5 pb-1.5 border-t grid grid-cols-12 mt-3 text-xs text-slate-500 border-cyan-300 border-solid"
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
        >
            <div class="text-slate-500 text-sm col-span-2">
                <span class="ml-9 text-xs">{{ (index + 1).toString().padStart(2, '0') }}</span>
                <span class="ml-2 iconfont icon-xihuan"></span>
                <span class="ml-2 iconfont icon-xiazai-"></span>
            </div>

            <div class="col-span-4 pr-6 truncate text-xs text-slate-700">{{ item.name }}</div>
            <div class="col-span-2 text-xs text-slate-600">
                <span v-for="_item in item.ar" :key="_item.id">{{ _item.name }}</span>
            </div>
            <div class="col-span-3 text-xs truncate pr-6 text-slate-600">{{ item.al.name }}</div>
            <div class="col-span-1 text-xs text-slate-500 flex pr-9">{{ formateSongTime(item.dt) }}</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { httpGet, formateSongTime } from "@/utils";
import { onMounted, reactive, Ref, ref } from "vue";
const songList: Ref<Array<{ name: string, ar: Array<any>, al: { name: string }, dt: number, id: number }>> = ref([])
onMounted(async () => {
    const { dailySongs } = await httpGet('/recommend/songs')
    songList.value = dailySongs;
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
}
</style>