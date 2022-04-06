
const enum PlayType {
    uniPlay,
    rodomPlay,
    quePlay,
    queLoopPlay,
}

import { ref, Ref } from "vue";
import { playList, curPlaySong, Song } from "./store";

export const playType: Ref<PlayType> = ref(PlayType.quePlay);

export const isPrivateFM = ref(false);

export const isShowSongDetail = ref(false);


export const changePlayType = () => {
    if (playType.value === PlayType.queLoopPlay) {
        playType.value = PlayType.uniPlay;
        return
    }
    playType.value++;
}

export const getPlayNext = () => {
    let index = playList.value.findIndex((v) => v.id === curPlaySong.value.id);
    return playList.value[index + 1] || playList.value[0]
}

export const getPlayPre = () => {
    let index = playList.value.findIndex((v) => v.id === curPlaySong.value.id);
    return playList.value[index - 1] || playList.value[playList.value.length-1]
}

export const setCurPlay = () => {
    let nextSong: Song;
    switch (playType.value) {
        case PlayType.uniPlay:
            nextSong = curPlaySong.value
            break;
        case PlayType.rodomPlay:
            nextSong = playList.value[Math.floor(Math.random() * playList.value.length)]
            break;
        case PlayType.quePlay:
            nextSong = getPlayNext()
            break;
        case PlayType.queLoopPlay:
            nextSong = getPlayNext()
            break;
        default: nextSong = curPlaySong.value
            break;
    }
    curPlaySong.value = nextSong;
}

