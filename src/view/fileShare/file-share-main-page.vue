<template>
    <div class="container">
        <div class="header">
            <var-breadcrumbs>
                <var-breadcrumb v-for="item in paths" :key="item">{{ item.name }}</var-breadcrumb>
            </var-breadcrumbs>
        </div>
        <div class="body">
            <var-table>
                <thead>
                    <tr>
                        <th>名字</th>
                        <th>大小</th>
                        <th>类型</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in fileInfoDataArr" :key="item" @click="handlerTrClick(item)">
                        <td>{{ item.name }}</td>
                        <td>{{ isDir(item.path) ? '' : wrapperFileSize(item.size) }}</td>
                        <td>{{ item.fileType || '文件夹' }}</td>
                    </tr>
                </tbody>
            </var-table>
        </div>
    </div>
</template>

<script setup lang="ts">
    import fileShareApis from '@/const/fileShare/file-share-apis';

    import { ref } from 'vue';
    import { getPostDataExt } from '@/utills/httpUtil';
    import { fileInfoEntity } from '@/const/fileShare/file-share-type';
    import { ResultEntity } from '@/const/type';
    import { isDir, notBlankOrEmpty, wrapperFileSize } from '@/utills/KitUtil';

    const loading = ref(false);
    const finished = ref(true);
    const load = () => {
        loadFiles();
    };

    const fileInfoDataArr = ref<fileInfoEntity[]>([]);

    const paths = ref<fileInfoEntity[]>([]);

    const loadFiles = (path_ = '') => {
        if (notBlankOrEmpty(path_)) {
            fileInfoDataArr.value.push({ path: path_ });
        }
        getPostDataExt(fileShareApis.listFileApi, { path: path_ }).then((res: ResultEntity) => {
            fileInfoDataArr.value = res?.data.sort((it: fileInfoEntity) => (it.fileType ? 1 : -1));
        });
    };
    loadFiles();

    const handlerFileInfoClick = (path: string) => {
        window.open(fileShareApis.downloadFilebyPath + '?path=' + encodeURIComponent(path));
    };
    const handlerFileNext = (path: string) => {
        loadFiles(path);
    };
    const handlerTrClick = (file: fileInfoEntity) => {
        if (isDir(file.path)) {
            handlerFileNext(file.path);
        } else {
            handlerFileInfoClick(file.path);
        }
    };
    defineExpose({});
</script>

<style scoped lang="less">
    .container {
        width: 98vw;
        margin: 10px;
        align-items: center;
        .body {
            tr {
                cursor: pointer;
            }
        }
    }
</style>
