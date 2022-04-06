const audio: HTMLAudioElement = new Audio();

import { watch, ref } from "vue";
import { curPlaySong } from "./store";
import { getNextSong } from "./control";
import { formateSecendTime } from "./formatTime";

import { httpGet, httpOption } from "./axios";


export let wordFn = {
    cb: (val: any) => { },
    restCb : ()=>{}
};


let timer: NodeJS.Timeout | null = null;

let curSongTime = 0;

export const formatCurTime = ref(formateSecendTime(0));
export const percentage = ref(0);

export const curPlayTime = ref(0)

export const isPlay = ref(false);



audio.addEventListener("canplay", () => {
    isPlay.value = true;
    wordFn.restCb();
})
audio.addEventListener('error', (e) => {
    console.log(e, 'error');
})
audio.addEventListener('waiting', (e) => {
    console.log(e, 'waiting');
})
audio.addEventListener("timeupdate", () => {
    percentage.value = audio.currentTime / audio.duration * 100;
    formatCurTime.value = formateSecendTime(audio.currentTime);
    wordFn.cb(parseInt(audio.currentTime+''))
})

audio.addEventListener('ended', () => {
    getNextSong();
})

watch(() => curPlaySong.value.id, async (id) => {
    const { success } = await httpGet('/check/music', { id })
    if (success) {
        let data = await httpGet('/song/url', { id });
        curSongTime = curPlaySong.value.dt;
        audio.src = data[0].url;
        audio.play();
    }
})


watch(isPlay, (val) => {
    if (val) {
        audio.play();
    } else {
        audio.pause();
    }
})



