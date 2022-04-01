import { Ref, ref } from "vue"

export interface Song {
    name: string
    songers :Array<{name:string,id:number}>
    alName: string,
    picUrl: string,
    dt: number
    id: number
    tns:Array<string>,
    mv:number
}




export const curPlaySong: Ref<Song> = ref({
    name: '',
    id: 0,
    alName:'',
    songers:[],
    dt: 0,
    picUrl: '',
    tns:[],
    mv:0
})


export const setCurPlaySongVal = (val: Song) => {
    curPlaySong.value = val;   
}

export const playList: Ref<Array<Song>> = ref([]);

export const addSong = (song: Song) => {
    playList.value.push(song)
}

export const rPlayList = (list: Array<Song>)=>{
    playList.value = list;
}

export const removeSong = (song: Song) => {
    let index = playList.value.findIndex(v => v.id === song.id);
    if (index != -1) {
        playList.value.splice(index, 1)
    }
}

export const nextPlay = (song: Song) => {
    if(curPlaySong.value.id === song.id){
        return
    }
    let index = playList.value.findIndex(v => v.id == curPlaySong.value.id);
    playList.value.splice(index, 0, song)
}