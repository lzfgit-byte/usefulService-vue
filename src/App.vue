<template>
    <!--    <router-view></router-view>-->
    <config-provider v-bind="wholeConfig" :locale="zhCN">
        <file-download-main-page></file-download-main-page>
    </config-provider>
</template>

<script setup lang="ts">
    import FileDownloadMainPage from '@/view/fileShare/file-share-main-page.vue';
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import { ConfigProvider } from 'ant-design-vue';
    import { reactive } from 'vue';
    const modalConfig = { centered: true };
    const wholeConfig = reactive({ ...modalConfig });
</script>
<style lang="less">
    * {
        box-sizing: border-box;
    }
</style>
