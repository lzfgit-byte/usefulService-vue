<template>
    <div class="container">
        <div class="header">
            <var-breadcrumbs>
                <var-breadcrumb
                    v-for="item in paths"
                    :key="item"
                    @click="handlerBreadClick(item)"
                    >{{ item.name }}</var-breadcrumb
                >
            </var-breadcrumbs>
        </div>
        <div class="body">
            <var-table>
                <thead>
                    <tr>
                        <th>名字</th>
                        <th>大小</th>
                        <th>类型</th>
                        <!--                        <th>是否隐藏</th>-->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in fileInfoDataArr" :key="item" @click="handlerTrClick(item)">
                        <td>
                            <span>{{ item.name }}</span>
                        </td>
                        <td>{{ isDir(item) ? '' : wrapperFileSize(item.size) }}</td>
                        <td>{{ item.fileType || 'F' }}</td>
                        <!--                        <td>{{ item.hidden ? '是' : '否' }}</td>-->
                    </tr>
                </tbody>
            </var-table>
        </div>
    </div>
</template>

<script setup lang="ts">
    import fileShareApis from '@/view/fileShare/const/file-share-apis';

    import { ref } from 'vue';
    import { getPostDataExt } from '@/utills/httpUtil';
    import { fileInfoEntity } from '@/view/fileShare/const/file-share-type';
    import { ResultEntity } from '@/const/type';
    import { isDir, notBlankOrEmpty, wrapperFileSize } from '@/utills/KitUtil';
    import { SEPARATOR } from '@/const/const-data';

    const fileInfoDataArr = ref<fileInfoEntity[]>([]);

    const paths = ref<fileInfoEntity[]>([{ name: 'root', path: '/' }]);
    const handlerBreadClick = (item_: any) => {
        if (item_.path === '/') {
            paths.value = [];
            loadFiles();
            return;
        }
        let filePath = '';
        const findIndex = paths.value.findIndex((item) => item.path === item_.path);
        paths.value.forEach((item, index) => {
            if (index <= findIndex && index !== 0) {
                filePath = filePath + item.path + SEPARATOR;
            }
        });
        loadFiles(filePath);
    };

    const loadFiles = (path_ = '') => {
        if (notBlankOrEmpty(path_)) {
            const splits = path_.split(SEPARATOR);
            paths.value = [];
            paths.value.push({ name: 'root', path: '/' });
            splits.forEach((path) => {
                if (notBlankOrEmpty(path)) {
                    paths.value.push({ name: path, path });
                }
            });
        }
        getPostDataExt(fileShareApis.listFileApi, { path: path_ }).then((res: ResultEntity) => {
            fileInfoDataArr.value = res?.data.sort(
                (it: fileInfoEntity, next: fileInfoEntity) => it.order - next.order
            );
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
        if (isDir(file)) {
            handlerFileNext(file.path);
        } else {
            handlerFileInfoClick(file.path);
        }
    };
    defineExpose({});
</script>

<style scoped lang="less">
    .container {
        width: 93vw;
        height: 83vh;
        margin: 10px;
        align-items: center;
        .body {
            height: 80vh;
            overflow-y: auto;
            tr {
                cursor: pointer;
            }
            td {
                width: 30%;
            }
            span {
            }
        }
    }
</style>
