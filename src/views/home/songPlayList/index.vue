<template>
    <div class="m-7 w-full  h-40 flex items-center s-view" :style="{backgroundImage:`url(${gSong.coverImgUrl})`}">
            <img :src="gSong.coverImgUrl"  class="h-full rounded-xl" alt="">
            
    </div>
</template>

<script setup lang='ts'>
import { httpGet } from '@/utils';
import { ref ,onMounted, Ref} from 'vue';

const gSong:Ref<any> = ref({})

onMounted(async ()=>{
      const {playlists}  =  await   httpGet('/top/playlist',{limit:1});
        gSong.value = playlists[0];
        console.log(gSong.value,'--');
})

</script>

<style lang='scss'>

.s-view{
    background-size: 200% 200%;
    background-position: center center;
}
    
</style>