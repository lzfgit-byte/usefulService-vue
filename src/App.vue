<template>
    <div class="container">
        <div class="top"> <router-view></router-view></div>
        <div class="bottom"> <menu-ins></menu-ins></div>
    </div>
</template>

<script setup lang="ts">
    import { provide } from 'vue';
    import MenuIns from '@/view/menu-ins.vue';
    const href = new URL(window.location.href);
    provide('baseHref', href);
</script>
<style lang="less">
    * {
        box-sizing: border-box;
    }
</style>
<style lang="less" scoped>
    .container {
        height: 100vh;
        overflow: hidden;
        .top {
            height: 90vh;
            width: 98vh;
            overflow: auto;
        }
    }
</style>
