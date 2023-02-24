<template>
    <div class="container">
        <div class="header">
            <var-breadcrumbs>
                <var-breadcrumb>首页</var-breadcrumb>
                <var-breadcrumb>一级</var-breadcrumb>
                <var-breadcrumb>二级</var-breadcrumb>
            </var-breadcrumbs>
        </div>
        <div class="body">
            <var-list v-model:loading="loading" :finished="finished" @load="load">
                <var-cell
                    v-for="item in fileInfoDataArr"
                    :key="item"
                    @click="handlerFileInfoClick(item.path)"
                >
                    {{ `${item.name} ---------> ${wrapperFileSize(item.size)}` }}
                </var-cell>
            </var-list>
        </div>
    </div>
</template>

<script setup lang="ts">
    import fileShareApis from '@/const/fileShare/file-share-apis';

    import { ref } from 'vue';
    import { getPostDataExt } from '@/utills/httpUtil';
    import { fileInfoEntity } from '@/const/fileShare/file-share-type';
    import { ResultEntity } from '@/const/type';
    import { wrapperFileSize } from '@/utills/KitUtil';

    const loading = ref(false);
    const finished = ref(true);
    const load = () => {
        loadFiles();
    };

    const fileInfoDataArr = ref<fileInfoEntity[]>([]);
    const loadFiles = () => {
        getPostDataExt(fileShareApis.listFileApi, {}).then((res: ResultEntity) => {
            fileInfoDataArr.value = res?.data;
        });
    };
    loadFiles();
    const handlerFileInfoClick = (path: string) => {
        window.open(fileShareApis.downloadFilebyPath + '?path=' + path);
    };
    defineExpose({});
</script>

<style scoped lang="less">
    .container {
        margin: 10px;
    }
</style>
