
const enum PlayType {
    uniPlay,
    rodomPlay,
    quePlay,
    queLoopPlay,
}

import { ref, Ref } from "vue";
import { playList, curPlaySong, Song } from "./store";

export const playType: Ref<PlayType> = ref(PlayType.quePlay);


export const changePlayType = () => {
    if (playType.value === PlayType.queLoopPlay) {
        playType.value = PlayType.uniPlay;
        return
    }
    playType.value++;
}

export const playNext = () => {
    let index = playList.value.findIndex((v) => v.id === curPlaySong.value.id);
    return playList.value[index + 1] || playList.value[0]
}

export const playPre = () => {
    let index = playList.value.findIndex((v) => v.id === curPlaySong.value.id);
    return playList.value[index - 1] || playList.value[playList.value.length-1]
}

export const getNextSong = () => {
    let nextSong: Song;
    switch (playType.value) {
        case PlayType.uniPlay:
            nextSong = curPlaySong.value
            break;
        case PlayType.rodomPlay:
            nextSong = playList.value[Math.floor(Math.random() * playList.value.length)]
            break;
        case PlayType.quePlay:
            nextSong = playNext()
            break;
        case PlayType.queLoopPlay:
            nextSong = playNext()
            break;
        default: nextSong = curPlaySong.value
            break;
    }
    curPlaySong.value = nextSong;
}

