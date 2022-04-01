<template>
    <Tiltle class="mt-8">最新音乐</Tiltle>
    <div class="grid mt6 grid-cols-2 gap-x-4 mt-6">
        <div
            v-for="(item, index) in list"
            :key="item.id"
            class="flex pt-1.5 relative pb-2 pl-2 rounded-sm hover:bg-gray-100"
        >
            <div
                class="w-16   flex-none h-16 bg-cover rounded-sm relative"
                :style="{ backgroundImage: `url(${item.picUrl})` }"
            >
                <div
                    class="play-icon absolute left-0 flex items-center justify-center right-0 top-0 bottom-0 m-auto"
                >
                    <span class="iconfont icon-bofang text-red-800 block text-xs"></span>
                </div>
            </div>
            <div class="serail h-full flex ml-3 text-slate-400 text-xs items-center">
                <span>{{ pad(index + 1) }}</span>
            </div>
            <div class="flex ml-3  overflow-hidden  flex-col justify-center ">
                <div class="text-sm text-slate-800">{{ item.name }}</div>
                <div class="mt-1   h-8  w-full  truncate  overflow-hidden text-ellipsis  whitespace-nowrap">
                    <span
                        class="text-orange-600 leading-none font-light rounded-sm sq mr-1 text-xs border border-solid border-orange-600"
                    >SQ</span>
                    <span
                        class="text-xs  text-slate-400 mr-0.5 hover:text-slate-600 cursor-pointer"
                        v-for="(songer, index) in item.song.artists"
                        :key="index"
                    >
                        {{ songer.name }}
                        <template v-if="index != item.song.artists.length - 1">/</template>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Tiltle from '@/components/Title.vue';
import { onMounted, ref, Ref } from 'vue';
import { httpGet } from '@/utils';
const list: Ref<Array<{ picUrl: string, name: string, id: number, song: { artists: Array<any> } }>> = ref([]);

const pad = (str: string | number) => {
    return str.toString().padStart(2, '0')
}


onMounted(async () => {
    const { result } = await httpGet('/personalized/newsong');
    console.log(result, '--');
    list.value = result;
})
</script>

<style lang='scss' scoped>
.play-icon {
    width: 24px;
    height: 24px;
    right: 0;
}
.sq {
    font-size: 10px;
    padding: 0.4px;
}
</style>