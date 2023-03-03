<template>
    <div class="container">
        <div class="top"> <router-view></router-view></div>
        <div class="bottom"> <menu-ins></menu-ins></div>
    </div>
</template>

<script setup lang="ts">
    import MenuIns from '@/view/menu-ins.vue';
    import { ImageInfoEntity, ResultEntity } from '@/const/type';
    import { getPostDataExt } from '@/utils/httpUtil';
    import imageApis from '@/const/global/image-apis';
    import { useStore } from 'vuex';
    import { getCurrentInstance } from 'vue';
    import { registerAppContext } from '@/components/globalCompoent/global-compoent-ts';
    import { dynaRoutes } from '@/view/search/const/search';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const store = useStore();
    const currentInstance = getCurrentInstance();
    registerAppContext(currentInstance?.appContext);
    getPostDataExt(imageApis.listNetWOrkInfo, {}).then((res: ResultEntity) => {
        store.commit(
            'initLocalHosts',
            res?.data.map((item: ImageInfoEntity) => item.url)
        );
    });
    dynaRoutes.forEach((route) => router.addRoute(route));
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
