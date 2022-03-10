<template>
    <div class="wrap">
        <TopMenuVue />
        <section class="flex">
            <UserMenuVue />
        </section>
    </div>
</template>

<script setup lang="ts">
import TopMenuVue from './top-menu.vue';
import UserMenuVue from './user-menu.vue';





</script>

<style lang="scss">
.wrap {
    width: 100vw;
    height: 100vh;
}
section {
    height: calc(100% - 3rem);
}
</style>