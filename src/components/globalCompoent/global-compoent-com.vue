<template>
    <!--    <var-popup v-model:show="videoSet.visible" position="center">-->
    <!--        <video-html5 :title="videoSet.videoTitle" :src="videoSet.videoSrc"></video-html5>-->
    <!--    </var-popup>-->
    <div v-show="videoSet.visible" class="popup" @click="videoSet.visible = false">
        <div class="popup-container">
            <video-html5
                ref="videoRef"
                :title="videoSet.videoTitle"
                :src="videoSet.videoSrc"
            ></video-html5>
        </div>
    </div>
</template>

<script setup lang="ts">
    import VideoHtml5 from '@/components/video-html5.vue';
    import { reactive, ref } from '@vue/reactivity';
    import { nextTick } from 'vue';

    const videoRef = ref();
    const videoSet = reactive({
        visible: false,
        videoTitle: '',
        videoSrc: '',
        playVideo: (data) => {
            videoSet.videoSrc = data?.videoSrc;
            videoSet.videoTitle = data?.title;
            videoRef.value.playVideo(videoSet.videoSrc, videoSet.videoTitle);
            nextTick(() => {
                videoSet.visible = true;
            });
        },
    });

    defineExpose({ playVideo: videoSet.playVideo });
</script>

<style scoped lang="less">
    .popup {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 99;

        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        transition: all 0.25s;
        .popup-container {
            margin: auto;
        }
    }
</style>
