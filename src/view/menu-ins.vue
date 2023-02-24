<template>
    <div>
        <var-bottom-navigation v-model:active="active">
            <var-bottom-navigation-item
                v-for="item in routesInMenu"
                :key="item.path"
                :name="item.name"
                :label="item.aliasZH"
                icon="home"
                @click="hanlderBottomMenuClick(item)"
            />
            <var-bottom-navigation-item
                name="showIpQR"
                icon="heart"
                label="设置"
            ></var-bottom-navigation-item>
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
    import { computed, reactive, ref, watch } from 'vue';
    import { routes as routesClient } from '@/router';
    import { ImageInfoEntity, ResultEntity } from '@/const/type';
    import { getPostDataExt } from '@/utills/httpUtil';
    import imageApis from '@/const/image/image-apis';
    import { getCurrentRoutePath } from '@/utills/KitUtil';
    const router = useRouter();
    const routesInMenu = computed(() => routesClient.filter((t) => t.showInMenu));
    const active = ref(routesInMenu.value.filter((i) => i.path === getCurrentRoutePath())[0].name);
    watch(active, () => {
        hanlderMenuClick({ key: active.value });
    });

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
