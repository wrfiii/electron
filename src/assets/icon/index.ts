import { h } from 'vue';

import music from './music.svg';


export default {
    setup(props:string,{}){
        return ()=>{
            h('svg',music)
        }
    }
}