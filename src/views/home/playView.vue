<template>
    <div class="subView absolute pl-20" :class="[isShowSongDetail ? 'active' : '']">
        <div class="flex pt-20">
            <div>
                <div class="cd rounded-full" :class="[isPlay ? 'active' : '']">
                    <div v-for="(item, index) in 13" :class="'l' + index" :key="index"></div>
                    <div class="img-view">
                        <img :src="curPlaySong.picUrl" class="bg-slate-400" />
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
                <div class="flex items-center">
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
                        class="mt-6 flex flex-col h-full overflow-scroll wrods"
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
    </div>
</template>

<script setup lang='ts'>
import { HeartIcon, DownloadIcon, FolderDownloadIcon, ShareIcon } from '@heroicons/vue/outline';

import { watch, defineComponent, ref, Ref, nextTick } from 'vue'
import { isShowSongDetail } from '@/utils/control';
import { curPlaySong } from '@/utils/store';
import { isPlay, curPlayTime, wordFn } from '@/utils/audio';
import { httpGet } from '@/utils';


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

let songWord: Ref<Array<{ key: number, val: string }>> = ref([])


watch(() => curPlaySong.value.id, async (id) => {
    const { lrc } = await httpGet('/lyric', { id });
    const word: string = lrc.lyric;
    let wordMap: { key: number; val: string; }[] = [];
    let mathWord = [...word.matchAll(/(\[(.*)\])(.*)/g)]
    mathWord.forEach((arr: any, index: number) => {
        let key = arr[2];
        let val = arr[3];
        let m = Number(key.split(':')[0] * 60);
        let s = Number(parseInt(key.split(':')[1]));
        key = Number(m + s);
        wordMap.push({ key, val })
    })
    songWord.value = wordMap;
    await nextTick();
    let preEl: HTMLSpanElement | null = null;

    wordFn.cb = (curTime: string) => {
        if (!isPlay.value || !isShowSongDetail.value || wordMap.length === 0) return;
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
            // words?.animate([{'scrollTop':preEl!.offsetTop - 180 + 'px' }],160)
            // words?.animate([{scrollTop: 'rotate(360deg)'}],300)
            words?.scrollTo({ top: preEl!.offsetTop - 150, behavior: 'smooth' })
            // words!.scrollTop = preEl!.offsetTop - 180
        }
    }
    wordFn.restCb = () => {
        let words = document.querySelector('.wrods');
        words?.scrollTo({ 'top': 0 })
    }
})

</script>

<style lang='scss' scoped>
.playView {
    height: 0;
}
@for $i from 1 through 13 {
    .l#{$i} {
        width: calc(66% + #{$i} * 2.5%);
        height: calc(66% + #{$i} * 2.5%);
        box-shadow: 0 0 1.5px #000;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
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
    @apply bg-gray-50;
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

// --tw-bg-opacity:.6;
//         background-color: rgb(249 250 251 / var(--tw-bg-opacity));
.wrods {
    span {
        // position: relative;
        transition: all 0.16s;
        &.active {
            color: rgb(41, 34, 34);
            font-size: 1rem;
        }
        &:last-of-type {
            margin-bottom: 48px;
        }
    }
    &::before {
        // position: absolute;
        // left: 0;
        // top: 0;
        // content: "";
        // width: 100%;
        // height: 16px;
        // --tw-bg-opacity: 0.6;
        // background-color: rgb(249 250 251 / var(--tw-bg-opacity));
    }
}
._shadow {
    --tw-gradient-from: rgb(249 250 251);
    --tw-gradient-stops: var(--tw-gradient-from),
        var(--tw-gradient-to, hsla(0, 0%, 100%, 0));
    position: absolute;
    opacity: 0.8;
    z-index: 0;
    width: 100%;
    background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}
</style>