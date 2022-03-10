import { defineStore } from 'pinia';


export default defineStore({
    id: 'user',
    state: () => ({
        name: '',
        uid: '',
        isLogin: false
    }),
    actions:{
        setState( key:string,val:any){
            this.name = val;
        }
    }
})