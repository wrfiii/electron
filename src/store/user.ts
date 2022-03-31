import { defineStore } from 'pinia';
import { httpGet } from '@/utils';

export default defineStore({
    id: 'user',
    state: () => ({
        name: '',
        uid: '',
        isLogin: false,
        cookie: '',
        profile: {
            avatarUrl: '',
            nickname: ''
        }
    }),
    getters: {

    },
    actions: {
        async setCookie(cookie: string) {
            this.cookie = cookie;
        },
        async getprofile() {
            const { profile } = await httpGet('/user/account');
            this.isLogin = true;
            this.profile = profile;
            
        }
    }
})