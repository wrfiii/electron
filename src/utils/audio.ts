let audio: HTMLAudioElement;

import { watch, ref } from "vue";
import { curPlaySong } from "./store";
import { getNextSong } from "./control";
import { formateSecendTime } from "./formatTime";

import { httpGet } from "./axios";





let timer: NodeJS.Timeout | null = null;

let curSongTime = 0;

export const formatCurTime = ref('');
export const percentage = ref(0);


export const isPlay = ref(false);


export const creatAudio = () => {
    audio = document.createElement('audio');
    audio.style.display = 'none';
    document.body.appendChild(audio);
}

watch(() => curPlaySong.value.id, async (id) => {
    const { success } = await httpGet('/check/music', { id })
    if (success) {
        let data = await httpGet('/song/url', { id });
        curSongTime = curPlaySong.value.dt;
        audio.src = data[0].url;

        audio.addEventListener("canplaythrough", () => {
            audio.play();
            isPlay.value = true;
        })

        audio.addEventListener("timeupdate", () => {
            percentage.value = audio.currentTime / audio.duration * 100;
            formatCurTime.value = formateSecendTime(audio.currentTime)
        })

        audio.addEventListener('ended', () => {
            getNextSong();
        })
        clearInterval(timer!)
    }
})


watch(isPlay, (val) => {
    if (val) {
        audio.play();
    } else {
        audio.pause();
    }
})



