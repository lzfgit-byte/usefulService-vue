<template>
    <!--    @mouseenter="mouseenter" @mouseleave="mouseleave"-->
    <div class="thumb">
        <div
            v-if="info.type !== 'Video'"
            :class="{ shadow: true, hideShadow: !hasShow, showShadow: hasShow }"
        >
            <div class="topBtn">
                <var-button @click="getDetail(false)"> default</var-button>
            </div>
            <div class="botBtn">
                <var-button @click="getDetail(true)"> fullSize</var-button>
            </div>
        </div>
        <var-loading type="circle" :loading="isSpinning">
            <a style="position: relative">
                <div v-show="hasShowProgress" class="progress">
                    <var-progress mode="circle" :value="progressValue" />
                </div>
                <h4>{{ info.type }}</h4>
                <img
                    itemprop="thumbnail"
                    class="border"
                    :src="getProxyImgUrl(info?.coverUrl)"
                    :width="info.width"
                    :height="info.height"
                    :title="info.title"
                    @click="getDetail"
                /><span
                    style="
                        position: absolute;
                        bottom: -61px;
                        right: 5px;
                        background: #fff;
                        color: black;
                        padding: 3px;
                        border-radius: 4px 0 0 0;
                        font-weight: 700;
                    "
                >
                    {{ info.count }}</span
                >
            </a>
        </var-loading>
    </div>
    <var-popup v-model:show="videoSet.visible" position="center">
        <video-html5
            v-if="videoSet.visible"
            :title="videoSet.videoTitle"
            :src="videoSet.videoSrc"
        ></video-html5>
    </var-popup>
</template>

<script setup lang="ts">
    import { defineProps, PropType, ref, reactive } from 'vue';
    import { imgInfo, mainHtml, videoInfo } from '@/view/hWord/const/h-word-type';
    import 'viewerjs/dist/viewer.css';
    import { api as viewerApi } from 'v-viewer';
    import VideoHtml5 from '@/components/video-html5.vue';
    import { getProxyImgUrl, getProxyVideoUrl } from '@/utills/KitUtil';
    import { getHtml } from '@/utills/NetUtils';
    import { getImgInfoOnly, getVideoInfo } from '@/view/hWord/const/h-word-func';
    import { playVideo } from '@/components/globalCompoent/global-compoent-ts';

    const prop = defineProps({
        info: Object as PropType<mainHtml>,
    });
    const isSpinning = ref(false);
    const progressValue = ref(0);
    const hasShowProgress = ref(false);
    const videoSet = reactive({
        visible: false,
        videoTitle: '',
        videoSrc: '',
        playVideo: (src: string, title = '') => {
            videoSet.videoSrc = src;
            videoSet.videoTitle = title;
            videoSet.visible = true;
        },
    });
    const hasShow = ref(false);
    const mouseenter = () => {
        hasShow.value = true;
    };
    const mouseleave = () => {
        hasShow.value = false;
    };
    let allImgs: any[] = [];
    let viewerInstance: any = null;
    const getDetail = async (isFull = false) => {
        if (prop?.info?.type !== 'Video') {
            isSpinning.value = true;
            const imgs: any = await getAllImg(isFull).catch((res) => {
                isSpinning.value = false;
            });

            allImgs = [];
            hasShowProgress.value = true;
            progressValue.value = 0;
            for (let i = 0; i < imgs.length; i++) {
                if (isFull) {
                    allImgs.push({
                        src: getProxyImgUrl(imgs[i].original),
                        'data-source': imgs[i].original,
                        alt: imgs[i].name,
                    });
                } else {
                    allImgs.push({
                        src: await getProxyImgUrl(imgs[i].zipUrl),
                        'data-source': imgs[i].zipUrl,
                        alt: imgs[i].name,
                    });
                }
                progressValue.value = +((i + 1) / imgs.length).toFixed(1) * 100;
            }
            hasShowProgress.value = false;
            showImgs(allImgs);
        } else {
            isSpinning.value = true;
            const html = await getHtml(prop?.info?.jumpUrl || '');
            const videoInfo: videoInfo = await getVideoInfo(html);
            playVideo({ videoSrc: getProxyVideoUrl(videoInfo.videoSrc), title: videoInfo.tite });
            isSpinning.value = false;
        }
    };
    const showImgs = (allImgs: any) => {
        if (viewerInstance === null) {
            viewerInstance = viewerApi({
                options: {
                    url: (image: any) => {
                        return image.src;
                    },
                    hidden: () => {
                        viewerInstance = null;
                    },
                },
                images: allImgs,
            });
        }
    };
    const getImgInfoByThumb = async (url: string) => {
        const html = await getHtml(url);
        const imgInfo: imgInfo = await getImgInfoOnly(html);
        return imgInfo;
    };
    const getAllImg = async (isFull = false) => {
        const res = [];
        debugger;
        const html = await getHtml((prop as any).info.jumpUrl);
        const imgInfo: imgInfo = await getHtml(html);
        res.push(imgInfo);
        const allCount = imgInfo.others?.length || 0;
        for (let i = 0; i < allCount; i++) {
            if (imgInfo.others === undefined) {
                continue;
            }
            const imgOne: any = imgInfo?.others[i];
            if (imgOne.isCurrent) continue;
            const other = await getImgInfoByThumb(imgOne.jumpUrl);
            res.push(other);
        }
        return res;
    };
</script>
<style scoped lang="less">
    @import '@/view/hWord/less/card-less.less';
</style>
