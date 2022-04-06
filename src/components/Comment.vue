<template>
    <div class="flex mb-3 pb-1">
        <div class="flex-none w-8 h-8 bg-cover mr-2.5 mt-1 rounded-full bg-slate-400">
            <img :src="item.avatarUrl" class="w-full h-full object-cover rounded-full" />
        </div>
        <div class="flex-1 border-b border-neutral-200 pb-3">
            <div class="leading-5 text-xs mb-1">
                <span class="text-sky-500 flex-none mr-0.5">{{ item.nickname }}:</span>
                <span class="text-slate-800">{{ item.content }}</span>
            </div>
            <div
                v-for="(_item, index) in item.beReplied"
                class="text-xs leading-5 mt-0.5 pb-1.5 pt-1.5 pr-3 rounded-sm bg-stone-100 pl-1.5"
                :key="index"
            >
                <span class="text-sky-500 mr-0.5">@{{ _item.nickname }}:</span>
                <span>{{ _item.content }}</span>
            </div>
            <div class="flex justify-between mt-2 text-xs text-slate-500">
                <div>{{ item.time }}</div>
                <div class="flex text-slate-500 font-light">
                    <ThumbUpIcon class="w-4 h-4 mr-3.5" />
                    <ExternalLinkIcon class="w-4 h-4 mr-0.5" />
                    <span v-if="item.likedCount">{{ item.likedCount }}</span>
                    <ChatAltIcon class="w-4 h-4 ml-3.5" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ThumbUpIcon, ChatAltIcon, ExternalLinkIcon } from '@heroicons/vue/outline';
import { defineEmits, defineProps } from 'vue';
const  {item} = defineProps(['item'])
</script>

<style lang='scss'>
</style>