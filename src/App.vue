<template>
    <div class="container">
        <div class="top"> <router-view></router-view></div>
        <div class="bottom"> <menu-ins></menu-ins></div>
    </div>
</template>

<script setup lang="ts">
    import { provide } from 'vue';
    import MenuIns from '@/view/menu-ins.vue';
    import { getPostDataExt } from '@/utills/httpUtil';
    import settingApis from '@/view/setting/const/setting-apis';
    import { ResultEntity } from '@/const/type';
    import { configStr2boolean } from '@/utills/KitUtil';
    const href = new URL(window.location.href);
    getPostDataExt(settingApis.listConfig, {}).then((res: ResultEntity) => {
        formData.isShowHidden = configStr2boolean(res?.data?.isShowHidden);
    });
    provide('baseHref', href);
</script>
<style lang="less">
    * {
        box-sizing: border-box;
    }
</style>
<style lang="less" scoped>
    .container {
        height: 98vh;
        overflow: hidden;
        .top {
            height: 90vh;
            width: 98vw;
            overflow: auto;
        }
    }
</style>
