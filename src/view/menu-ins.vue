<template>
    <div>
        <dropdown :trigger="['click']">
            <!--            @mousedown="handlerMouseDown"-->
            <!--            @mousemove="handlerMouseMove"-->
            <!--            @mouseup="handlerMouseUp"-->
            <!--            @touchenter="handlerMouseDown"-->
            <!--            @touchmove="handlerMouseMove"-->
            <!--            @touchend="handlerMouseUp"-->
            <div class="flatMenu"><menu-outlined style="font-size: 30px" /></div>
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
        <div class="backClass" @click="hanlderMenuClick({ key: 'back' })"
            ><arrow-left-outlined style="font-size: 30px"
        /></div>
        <popup v-model:show="QRModal.visible">
            <template v-if="QRModal.visible">
                <div class="qrContainer">
                    <div v-for="item in QRCodeInfo" :key="item">
                        <var-image
                            width="185px"
                            height="185px"
                            :fit="'fill'"
                            :src="item.base64Data"
                        />
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </template>
        </popup>
    </div>
</template>

<script setup lang="ts">
    import { Dropdown, Menu as AMenu, MenuItem } from 'ant-design-vue';
    import { Popup, Image as VarImage } from '@varlet/ui';
    import { MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue';
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
        //border-radius: 50%;
        width: 50px;
        height: 50px;
        z-index: 999999999;
        cursor: pointer;
    }
    .flatMenu {
        right: v-bind(leftPx);
        top: 50px;
        //background-color: aqua;
        .menuShare();
    }
    .backClass {
        .menuShare();
        //background-color: #b71930;
        right: 10px;
        top: 10px;
    }
    .imageClass {
        display: inline-block;
    }
    .qrContainer {
        overflow-y: auto;
        height: 500px;
        text-align: center;
    }
</style>
