<template>
    <div class="container">
        <space>
            <a-upload
                v-model:file-list="fileList"
                :action="fileShareApis.uploadFile"
                @change="handleUploadChange"
            >
                <a-button>
                    <upload-outlined></upload-outlined>
                    Upload
                </a-button>
            </a-upload>
            <a-button @click="handlerModalOpen">下载文件</a-button>
        </space>
        <Modal v-model:visible="modal1Visible" :title="'文件'">
            <template v-if="modal1Visible">
                <div v-for="item in fileInfoDataArr" :key="item" class="wrapperAlert">
                    <a-alert
                        :message="`点击下载【${item.name}】 --- ${wrapperFileSize(item.size)}`"
                        type="info"
                        @click="handlerFileInfoClick(item.name)"
                    />
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
    import { Alert as AAlert, Button as AButton, message } from 'ant-design-vue';
    import { Modal, Space, Upload as AUpload, UploadChangeParam } from 'ant-design-vue';
    import { UploadOutlined } from '@ant-design/icons-vue';
    import fileShareApis from '@/const/fileShare/file-share-apis';

    import { ref } from 'vue';
    import { getPostDataExt } from '@/utills/httpUtil';
    import { fileInfoEntity } from '@/const/fileShare/file-share-type';
    import { ResultEntity } from '@/const/type';
    import { wrapperFileSize } from '@/utills/KitUtil';

    const modal1Visible = ref(false);
    const fileList = ref([]);
    const handleUploadChange = (info: UploadChangeParam) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`上传成功`);
            fileList.value = [];
        } else if (info.file.status === 'error') {
            message.error(`上传失败`);
        }
    };
    const fileInfoDataArr = ref<fileInfoEntity[]>([]);
    const loadFiles = () => {
        getPostDataExt(fileShareApis.listFileApi, {}).then((res: ResultEntity) => {
            fileInfoDataArr.value = res?.data;
        });
    };
    const handlerModalOpen = () => {
        loadFiles();
        modal1Visible.value = true;
    };
    const handlerFileInfoClick = (path: string) => {
        window.open(fileShareApis.downloadFilebyPath + '?id=' + path);
    };
    defineExpose({});
</script>

<style scoped lang="less">
    .container {
    }
    .wrapperAlert {
        cursor: pointer;
        margin: 2px;
    }
</style>
