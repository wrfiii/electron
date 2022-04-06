<template>
    <div class="m-7 w-full h-40 flex items-center s-view relative rounded-lg">
        <div class="flex-none pl-6">
            <img :src="gSong.coverImgUrl" class="rounded-xl h-28" />
        </div>
        <div class="pl-4">
            <div
                class="border border-solid border-orange-700 pl-2 items-center text-orange-600 p-1 pr-2 rounded-2xl text-sm flex"
            >
                <EmojiHappyIcon class="w-6 h-6 mr-1" />
                <span class="flex-none">精品歌单</span>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { httpGet } from '@/utils';
import { ref, onMounted, Ref } from 'vue';
import { EmojiHappyIcon } from '@heroicons/vue/outline';
const gSong: Ref<any> = ref({})

onMounted(async () => {
    const { playlists } = await httpGet('/top/playlist', { limit: 1 });
    gSong.value = playlists[0];
    // console.log(gSong.value,'--');
})

</script>

<style lang='scss' scoped>
.s-view {
    background-size: 200% 200%;
    background-position: center center;
    background-image: linear-gradient(
            100deg,
            rgba(232, 87, 237, 0.15) 0%,
            rgba(109, 137, 69, 0.15) 100%
        ),
        linear-gradient(
            90deg,
            rgba(244, 218, 112, 0.5) 0%,
            rgba(244, 218, 112, 0.15) 100%
        ),
        linear-gradient(75deg, rgb(33, 138, 184), rgb(0, 241, 181));
}
.mc {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}
</style>