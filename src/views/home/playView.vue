<template>
    <div class="subView absolute pl-20" :class="[isShowSongDetail ? 'active' : '']">
        <div class="flex pt-20">
            <div>
                <div class="cd rounded-full" :class="[isPlay ? 'active' : '']">
                    <div v-for="(item, index) in 13" :class="'l' + index" :key="index"></div>
                    <div class="img-view bg-slate-400">
                        <img :src="curPlaySong.picUrl" class="bg-slate-400 bg-cover" />
                    </div>
                </div>
                <div class="icons flex pt-14">
                    <div
                        v-for="(item, index) in icons"
                        class="w-10 h-10 rounded-full flex mr-5 justify-center items-center bg-slate-200 hover:bg-slate-300"
                        :key="index"
                    >
                        <component :is="item.key" class="h-6 w-6 text-gray-700 text-xs"></component>
                    </div>
                </div>
            </div>

            <div class="pl-20 flex-1 mr-24">
                <div class="flex items-center from-white">
                    <span class="text-2xl text-black">{{ curPlaySong.name }}</span>
                    <span
                        v-if="curPlaySong.mv"
                        class="ml-3 border text-center border-solid rounded-sm block border-red-500 w-8 h-5 text-sm text-red-500"
                    >MV</span>
                </div>
                <div class="mt-4 text-slate-400 text-xs">
                    <span>专辑:</span>
                    <span class="mr-6 ml-1 text-blue-500">{{ curPlaySong.alName }}</span>
                    <span class="mr-1">歌手:</span>
                    <span
                        class="text-blue-500 mr-1"
                        v-for="item in curPlaySong.songers"
                        :key="item.id"
                    >{{ item.name }}</span>
                </div>

                <div class="relative flex-1 border-r border-solid border-slate-200">
                    <div class="_shadow h-12 pointer-events-none absolute inset-x-0 z-10"></div>
                    <div
                        class="mt-6 flex relative flex-col h-full overflow-scroll wrods"
                        style="height: calc(400px - 1rem - 0.75rem - 1.5rem );"
                    >
                        <span
                            class="text-sm mb-2.5 text-slate-500"
                            :curPlayTime="item.key"
                            v-for="(item, index) in songWord"
                            :key="index"
                        >{{ item.val }}</span>
                        <span
                            v-if="songWord.length === 0"
                            class="text-base n-word absolute left-1/2 right-1/2 m-auto translate-x-1/2 translate-y-1/2 text-slate-700"
                        >暂无歌词</span>
                    </div>
                    <div class="_shadow h-12 pointer-events-none -bottom-4 absolute left-0 z-10"></div>
                </div>
            </div>
        </div>
        <div class="flex">
            <div class="flex-1">
                <div>
                    <span class="text-slate-800 text-1xl font-semibold mr-6">听友评论</span>
                    <span class="text-xs text-slate-500">(已有{{ commentNum }}条评论)</span>
                </div>
                <div class="mt-2">
                    <div
                        type="text"
                        class="flex relative items-center w-full border text-slate-300 pt-1.5 text-xs pb-1.5 border-slate-300 rounded-md"
                    >
                        <PencilIcon class="w-4 h-4 ml-2" />
                        <span>发表评论</span>
                        <span
                            class="absolute right-2 -top-0.5 text-slate-500 font-extralight text-xl"
                        >@</span>
                    </div>
                </div>

                <div class="mt-8">
                    <div class="mb-3">
                        <span class="text-slate-800 text-sm font-semibold mr-6">精彩评论</span>
                    </div>
                    <div class="flex mb-3 pb-1" v-for="(item, index) in commentList" :key="index">
                        <div
                            class="flex-none w-8 h-8 bg-cover mr-2.5 mt-1 rounded-full bg-slate-400"
                        >
                            <img
                                :src="item.avatarUrl"
                                class="w-full h-full object-cover rounded-full"
                                alt
                            />
                        </div>
                        <div class="flex-1 border-b border-neutral-200 pb-3">
                            <div class="leading-5 text-xs mb-1">
                                <span class="text-sky-500 flex-none mr-0.5">{{ item.nickname }}:</span>
                                <span class="text-slate-800">{{ item.content }}</span>
                            </div>
                            <div
                                v-for="(_item, index) in item.beReplied"
                                class="text-xs leading-5 mt-0.5 pb-1.5 pt-1.5 pr-3 rounded-sm  bg-stone-200 pl-1.5"
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
                </div>
            </div>
            <div class="w-96"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { HeartIcon, DownloadIcon, FolderDownloadIcon, ShareIcon, PencilIcon, ThumbUpIcon, ChatAltIcon, ExternalLinkIcon } from '@heroicons/vue/outline';

import { watch, defineComponent, ref, Ref, nextTick } from 'vue'
import { isShowSongDetail } from '@/utils/control';
import { curPlaySong } from '@/utils/store';
import { isPlay, curPlayTime, wordFn } from '@/utils/audio';
import { httpGet } from '@/utils';
import { forMateCommentTime, filterMomment } from '@/utils'
import { Comment } from '@/utils/fillterPrams';
const commentNum = ref(0);

const page = ref(0);
const before = ref(0)

const icons = [
    {
        key: HeartIcon
    },
    {
        key: DownloadIcon
    },
    {
        key: FolderDownloadIcon
    },
    {
        key: ShareIcon
    }
]

let songWord: Ref<Array<{ key: number, val: string }>> = ref([]);
const commentList: Ref<Array<Comment>> = ref([])

const getWords = async (id: number) => {
    const { lrc } = await httpGet('/lyric', { id });
    let mathWord = [...lrc.lyric.matchAll(/(\[(.*)\])(.*)/g)]
    return mathWord.map((arr: any, index: number) => {
        let key = arr[2];
        let val = arr[3];
        let m = Number(key.split(':')[0] * 60);
        let s = Number(parseInt(key.split(':')[1]));
        key = Number(m + s);
        return ({ key, val })
    })
}

const setWordFn = () => {
    let preEl: HTMLSpanElement | null = null;
    wordFn.cb = (curTime: string) => {
        if (!isPlay.value || !isShowSongDetail.value || songWord.value.length === 0) return;
        let words = document.querySelector('.wrods');
        let $elArr = words?.querySelectorAll('span');
        let findCurEL = false;
        $elArr!.forEach(el => {
            el.classList.remove('active')
            if (el.getAttribute('curPlayTime') == curTime && el.innerText !== '') {
                preEl = el;
                findCurEL = true;
                el.classList.add('active')
            }
        })
        if (!findCurEL) {
            preEl?.classList.add('active')
        }
        if (preEl && preEl!.offsetTop - 150 > 0) {
            words?.scrollTo({ top: preEl!.offsetTop - 150, behavior: 'smooth' })
        }
    }
    wordFn.restCb = () => {
        let words = document.querySelector('.wrods');
        words?.scrollTo({ 'top': 0 })
    }
}

const getComment = async (id: number) => {
    const { comments, hotComments, total } = await httpGet('/comment/music', { id, offset: page.value, before: before.value });
    commentNum.value = total;
    commentList.value = comments.map(filterMomment)
}


watch(() => curPlaySong.value.id, async (id) => {
    songWord.value = await getWords(id);
    await nextTick();
    setWordFn();
    getComment(id);
})

</script>

<style lang='scss' scoped>
.playView {
    height: 0;
}

.img-view {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 210px;
    height: 210px;
    border-radius: 50%;
    border: 6px solid #000;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
}

.subView {
    width: 100vw;
    height: 0;

    @apply bg-neutral-50;
    transition: all 0.36s ease-in-out;
    height: calc(100vh - 4rem);
    transform: translate3d(0, 0, 0);
    overflow: scroll;
    &.active {
        transform: translate3d(0, -100%, 0);
    }
}
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
.cd {
    box-shadow: 0 0 0 8px #dcdcdc;
    width: 318px;
    height: 318px;
    position: relative;
    background-image: radial-gradient(
        circle at center center,
        rgb(71, 71, 71),
        rgb(8, 8, 8)
    );
    animation: rotate 38s linear paused infinite;
    &.active {
        animation-play-state: running;
    }
}

.wrods {
    span {
        transition: all 0.16s;
        &.active {
            color: rgb(41, 34, 34);
            font-size: 1rem;
        }
        &:last-of-type {
            margin-bottom: 48px;
        }
    }
}
._shadow {
    // position: absolute;
    // z-index: 0;
    // width: 100%;
    // // @apply bg-gray-50;
    // z-index: 1;
    // // background-image: linear-gradient(to bottom , rgba(249, 250, 251,.1),rgb(249, 250, 251,.5));
    // opacity: .4;
    // background-image: linear-gradient(to bottom, rgba(249, 250, 251, .3), rgba(249, 250, 251, 0));
}
</style>