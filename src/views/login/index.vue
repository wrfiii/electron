<template>
        <div class="h-8" style="-webkit-app-region : drag;">
                <div class="ml-3 mt-2 ">
                        <span class="iconfont icon-guanbi text-xl text-cyan-600"  @click="close"></span>
                </div>
        </div>
        <div class="mt-14  text-2xl text-center  text-slate-800">
                        扫码登录 
        </div>

        <div class="code flex items-center justify-center">
                
        </div>
</template>

<script setup lang='ts'>

const close = ()=>{
        window.ipcRenderer.send('closeLoginView')
}


</script>

<style lang='scss'>
</style>