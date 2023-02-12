<template>
    <config-provider v-bind="wholeConfig" :locale="zhCN">
        <router-view></router-view>
        <menu-ins></menu-ins>
    </config-provider>
</template>

<script setup lang="ts">
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import { ConfigProvider } from 'ant-design-vue';
    import { reactive, provide } from 'vue';
    import MenuIns from '@/view/menu-ins.vue';
    const modalConfig = { centered: true };
    const wholeConfig = reactive({ ...modalConfig });
    const href = new URL(window.location.href);
    provide('baseHref', href);
</script>
<style lang="less">
    * {
        box-sizing: border-box;
    }
</style>
