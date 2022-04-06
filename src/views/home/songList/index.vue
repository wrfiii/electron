<template>
    <div class="h-full overflow-scroll flex-1">
        <div class="flex items-center h-max pt-4 pl-8">
            <div
                class="w-48 h-48 bg-cover rounded-lg flex-none"
                :style="{ backgroundImage: `url(${picUrl})` }"
            ></div>

            <div class="pl-8 text-xs">
                <div class="flex items-center">
                    <span
                        class="pb-0.5 pt-0.5 p-1 rounded-md border-red-600 border-solid border text-red-600 text-xs"
                    >歌单</span>
                    <span class="ml-3 text-xl">{{ name }}</span>
                </div>

                <div class="flex items-center mt-2">
                    <img :src="playObj.creator.avatarUrl" class="object-cover w-6 h-6 rounded-full" />
                    <span class="ml-2 text-xs text-blue-500">{{ playObj.creator.nickname }}</span>
                    <span class="ml-2 text-xs">{{ formateTime(playObj.createTime) }}</span>
                </div>

                <div class="flex mt-2">
                    <PlayAllVue @click="playAll" />
                </div>

                <div>
                    <div class="mt-3">
                        <span class="mr-1">标&emsp13;&emsp13;&emsp14;签&emsp14;:</span>
                        <span
                            class="text-blue-500"
                            v-for="(item, index) in playObj.tags"
                            :key="index"
                        >
                            {{ item }}
                            <template v-if="index !== playObj.tags.length - 1">
                                <span class="text-slate-600 mr-0.5">/</span>
                            </template>
                        </span>
                    </div>
                    <div class="mt-2">
                        <span>歌曲数&emsp14;:</span>
                        <span class="ml-1">{{ playObj.trackCount }}</span>
                        <span class="ml-3">播放数&emsp14;:</span>
                        <span class="ml-1 ext-slate-400">{{ computCont(playObj.playCount) }}万</span>
                    </div>
                    <div class="mt-2 flex">
                        <span class="flex-none">简&emsp13;&emsp13;&emsp14;介&emsp14;:</span>
                        <span class="ml-1 mr-16">{{ playObj.description }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="ml-4 text-sm text-slate-700 mt-7 flex items-center nav">
            <span class="mr-6 texred pb-1 block" :class="[curNav == 'list' ? 'active' : '']" @click="curNav='list'">歌曲列表</span>
            <span class="mr-6 pb-1 block" :class="[curNav == 'comment' ? 'active' : '']" @click="curNav='comment'">评论<span class=" text-slate-400 text-xs">({{playObj.commentCount}})</span></span>
            <span class="pb-1 block" :class="[curNav === 'collect' ? 'active' : '']"  @click="curNav='collect'">收藏者</span>
        </div>

        <SongTabVue ref="tab" @play="play" />
    </div>
</template>

<script setup lang='ts'>
import { useRoute, parseQuery } from 'vue-router';
import { httpGet, firterSongParams } from '@/utils';
import { onMounted, ref, Ref } from 'vue';
import PlayAllVue from '@/components/PlayAll.vue';
import { formateTime } from '@/utils/formatTime';
import SongTabVue from '@/components/songTab.vue';
import { rPlayList, setCurPlaySongVal ,nextPlay } from '@/utils/store';


const router = useRoute();
const { id, name, picUrl } = router.query;

const playObj: Ref<any> = ref({
    creator: {},
    tags: []
});

const tab: Ref<{ getList: (val: any) => void } | null> = ref(null)
let list: Array<any> = [];
const curNav = ref('list');

const computCont = (cont: number) => {
    return Math.floor(cont / 10000)
}

onMounted(async () => {
    const data = await httpGet('/playlist/detail', { id });
    playObj.value = data.playlist;
    console.log(playObj.value,'--');
        
    tab.value?.getList(list = data.playlist.tracks.map(firterSongParams));
    const {songs} = await httpGet('/song/detail',{ids:playObj.value.trackIds.map((v:any)=>v.id).join(',')})
    tab.value?.getList(songs.map(firterSongParams))
    
})

const playAll = () => {
    rPlayList(list);
    setCurPlaySongVal(list[0]);
}
const play = (item: any) => {
    nextPlay(item);
    setCurPlaySongVal(item);
}



</script>

<style lang='scss' scoped>
.active {
    --tw-text-opacity: 1;
    color: rgb(220 38 38 / var(--tw-text-opacity));
    border-bottom: 2px solid rgb(220 38 38 / var(--tw-text-opacity)) !important;
}
.nav{
    span{
        border-bottom-width: 2px;
        border-color: transparent;
    }

}
</style>