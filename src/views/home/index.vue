<template>
    <div class="wrap">
        <TopMenuVue />
        <section class="flex" style="height: calc(100% - 3rem - 4rem);">
            <UserMenuVue />
            <router-view></router-view>
        </section>
        <div class="relative">
            <PlayViewVue/>
        </div>
        <ControlVue/>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TopMenuVue from './top-menu.vue';
import UserMenuVue from './user-menu.vue';
import ControlVue from './control.vue';
import PlayViewVue from './playView.vue';
</script>

<style lang="scss">
.wrap {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
section {
    height: calc(100% - 3rem);
}
</style>