<template>
    <div>
        <var-bottom-navigation v-model:active="active" :fixed="true">
            <var-bottom-navigation-item
                v-for="item in routesInMenu"
                :key="item.path"
                :name="item.name"
                :label="item.aliasZH"
                :icon="item.icon"
                @click="hanlderBottomMenuClick(item)"
            />
            <template #fab>
                <var-menu :placement="'top'" :offset-y="-10">
                    <!--                    @click="handlerFabClick({ key: 'showIpQR' })"-->
                    <var-icon name="heart" />
                    <template #menu>
                        <var-cell
                            v-for="item in extMenu"
                            :key="item.path"
                            @click="handlerFabClick({ key: item.name, route: item })"
                            >{{ item.aliasZH }}</var-cell
                        >
                        <var-cell @click="handlerFabClick({ key: 'showIpQR' })">二维码</var-cell>
                        <var-cell @click="handlerFabClick({ key: 'clearTemp' })">清除缓存</var-cell>
                    </template>
                </var-menu>
            </template>
        </var-bottom-navigation>

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
    import { Popup, Image as VarImage } from '@varlet/ui';
    import { useRouter } from 'vue-router';
    import { computed, reactive, ref } from 'vue';
    import { routerType, routes as routesClient } from '@/router';
    import { ImageInfoEntity, ResultEntity } from '@/const/type';
    import { getPostDataExt } from '@/utills/httpUtil';
    import imageApis from '@/const/global/image-apis';
    import { getCurrentRoutePath, Message } from '@/utills/KitUtil';
    import { useStore } from 'vuex';
    import tempApis from '@/const/global/temp-apis';
    const store = useStore();
    const router = useRouter();
    const routesInMenu = computed(() => routesClient.filter((t) => t.showInMenu));
    const extMenu = computed(() => {
        return [...store.state.dynamicMenu, ...routesClient].filter((t) => !t?.showInMenu);
    });
    const active = ref(routesInMenu.value.filter((i) => i.path === getCurrentRoutePath())[0].name);
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
    const handlerFabClick = ({ key, route }: any) => {
        if (key === 'showIpQR') {
            showIpQR();
        } else if (key === 'clearTemp') {
            getPostDataExt(tempApis.clearTemp)
                .then(() => {
                    Message.success('清除成功');
                })
                .catch(() => {
                    Message.error('清除失败');
                });
        } else {
            const item: routerType = route;
            router.push({ path: item.path, query: {} });
        }
    };
    const hanlderBottomMenuClick = (item: Record<string, string>) => {
        router.push({ path: item.path, query: {} });
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
