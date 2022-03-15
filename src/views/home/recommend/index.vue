<template>
    <div class=" w-full p-8 pt-0  pb-9  overflow-y-auto" style="height: 100%;" >
        <Banner/>
        <SongList/>
        <Exclusive/>
        <newMiusicVue/>
    </div>
</template>

<script setup lang='ts'>
import Banner from './banner.vue';
import SongList from './songList.vue';
import Exclusive from './exclusive.vue';
import newMiusicVue from './newMiusic.vue';
    
</script>

<style lang='scss'>

    
</style>