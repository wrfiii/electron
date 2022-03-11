import { defineStore } from 'pinia';
import { httpGet } from '@/utils';

export default defineStore({
    id: 'user',
    state: () => ({
        name: '',
        uid: '',
        isLogin: false,
        cookie: '',
        profile:{
            avatarUrl:'',
            nickname:''
        }
    }),
    getters: {

    },
    actions: {
        setState(key: string, val: any) {
            this.name = val;
        },
        async setCookie(cookie: string) {
            this.cookie = cookie;
            const { profile } = await httpGet('/user/account').catch(()=>{
                alert()
            });
            this.isLogin = true;
            this.profile = profile;
            alert(this.profile)
        }
    }
})