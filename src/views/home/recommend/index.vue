<template>
    <div class="w-full p-8 pt-0 pb-9 overflow-y-auto index-view" style="height: 100%;">
        <Banner />
        <SongList />
        <Exclusive />
        <NewMiusicVue />
        <RecommendMvVue />
    </div>
</template>

<script setup lang='ts'>
import Banner from './banner.vue';
import SongList from './songList.vue';
import Exclusive from './exclusive.vue';
import NewMiusicVue from './newMiusic.vue';
import RecommendMvVue from './recommendMv.vue';
import { onMounted } from 'vue';
onMounted(() => {
    document.querySelector('.index-view')?.addEventListener('scroll', function (e) {
        console.log(e);
    })
})
</script>

<style lang='scss'>
</style>