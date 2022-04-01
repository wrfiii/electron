<template>
    <div>
        歌单111
    </div>
</template>

<script setup lang='ts'>
import { httpGet } from '@/utils';
import { ref ,onMounted} from 'vue';
onMounted(async ()=>{
        console.log(  await   httpGet('/top/playlist',{}));
        
})

</script>

<style lang='scss'>
    
</style>