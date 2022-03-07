<template>
    <div class="flex h-12" style="-webkit-app-region : drag;">
        <div class="l-btn pt-4 bg-slate-100 flex justify-end p-4 pr-3 border-white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 rounded-full hover:bg-slate-100"
                fill="none"
                viewBox="0 0 24 24"
                width="12"
                height="12"
                stroke="currentColor"
                stroke-width="1"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </div>
        <div class="r-menu flex h-full bg-slate-50 flex-1">
            <div class="flex h-full items-center text-sm pl-8">
                <span
                    v-for="(item, index) in menu"
                    :key="index"
                    class="mr-7 text-gray-500 hover:text-gray-900 cursor-default"
                >{{ item.label }}</span>
            </div>

            <div class="flex items-center pl-7">
                <div class="flex relative">
                    <input
                        type="text"
                        class="rounded-rand outline-none h-6 w-36 rounded-full py-3 px-2 pl-6 bg-slate-200"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 absolute top-1 left-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                <div class="flex">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>


                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>

const menu = [
    {
        label: '个性推荐',
    },
    {
        label: '歌单',
    },
    {
        label: '主播电台',
    },
    {
        label: '排行榜',
    },
    {
        label: '歌手',
    },
    {
        label: '最新音乐',
    }
]


</script>

<style lang='scss'>
.l-btn {
    width: $user-menu-wdith;
}
</style>