<template>
    <div class="w-full overflow-scroll h-full flex-1">
        <div class="mt-4">
            <p class="text-black text-2xl ml-9">每日歌曲推荐</p>
            <p class="text-xs text-gray-400 mt-2 ml-9">根据你的音乐口味生成, 每天6:00更新</p>
        </div>
        <div class="flex mt-3 mb-3">
            <PlayAllVue @click="addPlayAll" class="ml-9"/>
        </div>


        <SongTab  @play="play" ref="Tab" ></SongTab>
    </div>
</template>

<script setup lang='ts'>
import { httpGet, formateSongTime,filterSongParams } from "@/utils";
import { onMounted, reactive, Ref, ref } from "vue";
import { Song, curPlaySong, setCurPlaySongVal, rPlayList ,nextPlay } from '@/utils/store';
import PlayAllVue from "@/components/PlayAll.vue";
import SongTab from "@/components/SongTab.vue";
let songList: Array<Song>= [];
const Tab:Ref<{getList:(val:any)=>void}|null> = ref(null);

onMounted(async () => {
    const { dailySongs } = await httpGet('/recommend/songs');
    Tab.value!.getList(songList = dailySongs.map(filterSongParams));
})  
const play = (item: any) => {
    nextPlay(item);
    setCurPlaySongVal(item);
}

const addPlayAll = () => {
    rPlayList(songList);
    setCurPlaySongVal(songList[0]);
}

</script>

<style lang='scss' scoped>

</style>