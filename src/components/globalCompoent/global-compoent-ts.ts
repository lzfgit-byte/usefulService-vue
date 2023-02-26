import { compoentFunc, playVideoInType } from '@/const/type';
import { h, ref, render, VNode } from 'vue';
import GlobalCompoentCom from '@/components/globalCompoent/global-compoent-com.vue';
import { Message } from '@/utills/KitUtil';
const currentRecord = ref();
const appContext = ref();
let currentInstance: compoentFunc;
export const registerAppContext = (appContext) => {
    appContext.value = appContext;
};
export const CONTAINER_ID = 'prent-render';
const init = () => {
    if (currentInstance) {
        return;
    }

    const vNode: VNode = h(GlobalCompoentCom, {});
    if (appContext.value) {
        vNode.appContext = appContext.value;
    }
    const container: HTMLElement = document.createElement('div');
    container.id = CONTAINER_ID;
    render(vNode, container);
    currentInstance = vNode.component?.exposed as any;
    document.body.appendChild(container);
};
let cb, ecb;
export const playVideo = (data: playVideoInType, cb_ = null, ecb_ = null) => {
    cb = cb_;
    ecb = ecb_;
    currentRecord.value = data;
    init();
    if (!currentInstance['playVideo']) {
        Message.error('无方法');
    }
    currentInstance?.playVideo(data);
};
