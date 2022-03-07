<template>
    <div class=' title' > 
        {{msg}}
    </div>
</template>

<script setup lang="ts">
    const msg = 'hello electron'
</script>

<style lang="scss">
.title{
    @apply bg-emerald-300  h-10  flex justify-center items-center text-xl font-medium text-slate-100;
    -webkit-app-region: drag
}    
</style>