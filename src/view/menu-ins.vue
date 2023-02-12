<template>
    <div>
        <dropdown :trigger="['click']">
            <div
                class="flatMenu"
                @mousedown="handlerMouseDown"
                @mousemove="handlerMouseMove"
                @mouseup="handlerMouseUp"
                @touchenter="handlerMouseDown"
                @touchmove="handlerMouseMove"
                @touchend="handlerMouseUp"
            ></div>
            <template #overlay>
                <a-menu @click="hanlderMenuClick">
                    <menu-item key="back">
                        <span>返回</span>
                    </menu-item>
                    <menu-item key="showIpQR">
                        <span>展示二维码</span>
                    </menu-item>
                    <menu-item v-for="item in routesClient" :key="item.path">
                        <router-link :to="item.path">{{ item.aliasZH }}</router-link>
                    </menu-item>
                </a-menu>
            </template>
        </dropdown>
        <div class="backClass" @click="hanlderMenuClick({ key: 'back' })"></div>
        <Modal v-model:visible="QRModal.visible" :title="'二维码'">
            <template v-if="QRModal.visible">
                <div class="qrContainer"
                    ><div v-for="item in QRCodeInfo" :key="item" class="imageClass">
                        <img width="300" :src="item.base64Data" />
                        <span>{{ item.name }}</span>
                    </div></div
                >
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
    import { Dropdown, Menu as AMenu, MenuItem, Modal } from 'ant-design-vue';
    import { useRouter } from 'vue-router';
    import { reactive, ref } from 'vue';
    import { routes as routesClient } from '@/router';
    import { ImageInfoEntity, ResultEntity } from '@/const/type';
    import { getPostDataExt } from '@/utills/httpUtil';
    import imageApis from '@/const/image/image-apis';
    const router = useRouter();
    const topPx = ref('10px');
    const leftPx = ref('10px');
    const canMove = ref(false);
    const handlerMouseDown = () => {
        canMove.value = true;
    };
    const handlerMouseMove = (event: MouseEvent) => {
        console.log(event.clientX);
        console.log(event.clientY);
        if (canMove.value) {
            leftPx.value = event.clientX - 15 + 'px';
            topPx.value = event.clientY - 15 + 'px';
        }
    };
    const handlerMouseUp = () => {
        canMove.value = false;
    };
    const QRCodeInfo = ref<ImageInfoEntity[]>();
    const QRModal = reactive({
        visible: false,
    });
    const showIpQR = () => {
        getPostDataExt(imageApis.listNetWOrkQrCode, {}).then((res: ResultEntity) => {
            QRCodeInfo.value = res.data;
        });
        QRModal.visible = true;
    };
    const hanlderMenuClick = ({ key }: any) => {
        if (key === 'back') {
            router.back();
        } else if ('showIpQR' === key) {
            showIpQR();
        }
    };
</script>

<style scoped lang="less">
    .menuShare {
        position: absolute;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        z-index: 999999999;
    }
    .flatMenu {
        left: v-bind(leftPx);
        top: v-bind(topPx);
        background-color: aqua;
        .menuShare();
    }
    .backClass {
        .menuShare();
        background-color: #b71930;
        right: 10px;
        top: 10px;
    }
    .imageClass {
        display: inline-block;
    }
    .qrContainer {
        overflow-y: auto;
        height: 500px;
    }
</style>
