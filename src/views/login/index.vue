<template>
        <div class="h-8 relative" style="-webkit-app-region : drag;">
                <div class="ml-3 mt-2">
                        <span class="iconfont icon-guanbi text-xl text-cyan-600" @click="close"></span>
                </div>
        </div>
        <div class="mt-6 text-2xl text-center text-slate-800">扫码登录</div>
        <div class="code h-52 flex items-center justify-center relative">
                <img :src="imgBase64" class="align-middle w-50" />
                <div
                        class="w-40 h-40 absolute left-0 top-0 right-0 bottom-0 m-auto bg-opacity-80 bg-black"
                        v-if="isExpired"
                >
                        <p class="text-white text-sm text-center mt-12">二维码已失效</p>
                        <div
                                class="p-1 pl-2 m-auto mt-4 pr-2.5 text-sm w-max text-white bg-red-500 rounded-full"
                                @click="getCodeBase64"
                        >点击刷新</div>
                </div>
        </div>

        <div class="code flex items-center justify-center">
                <span class="text-slate-600 text-sm">
                        使用
                        <span class="text-fuchsia-400">网易云音乐APP</span>扫码登录
                </span>
        </div>
        <div class="absolute bottom-14 m-auto text-center w-full">
                <span class="text-slate-400 text-xs">选择其它登陆模式&emsp14;></span>
        </div>
</template>

<script setup lang='ts'>
import { httpPost, httpGet } from '@/utils/index';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/store/user';

const imgBase64 = ref('');
const isExpired = ref(false);


let timer: NodeJS.Timeout | null = null;
const key = ref('');
const msg = ref('');


onMounted(async () => {
        getCodeBase64()
});

const getCodeBase64 = async () => {
        timer && clearInterval(timer);
        const { unikey }: { unikey: string } = await httpGet('/login/qr/key', { timerstamp: Date.now() });
        const { qrimg } = await httpGet('/login/qr/create', { key: unikey, qrimg: true, timerstamp: Date.now() });
        key.value = unikey
        imgBase64.value = qrimg;
        chekCode()
}



const chekCode = () => {
        timer && clearInterval(timer);

        timer = setInterval(async () => {
                const { code, cookie, avatarUrl, message, nickname } = await httpGet('login/qr/check', { key: key.value, timerstamp: Date.now() })
                switch (code) {
                        case 801:

                                break;
                        case 802:
                                // 扫码中 拿到用户信息

                                break;
                        case 803:
                                clearInterval(timer!);
                                const store = useUserStore()
                                store.setCookie(cookie);
                                

                                window.ipcRenderer.send('closeLoginView',true);
                        default:
                                break;
                }

        }, 5000)
}
const close = () => {
        window.ipcRenderer.send('closeLoginView');
}


</script>

<style lang='scss'>
</style>