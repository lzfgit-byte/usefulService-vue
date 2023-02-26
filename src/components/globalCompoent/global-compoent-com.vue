<template>
    <var-popup v-model:show="videoSet.visible" position="center">
        <video-html5 :title="videoSet.videoTitle" :src="videoSet.videoSrc"></video-html5>
    </var-popup>
</template>

<script setup>
    import { reactive } from 'vue';
    import VideoHtml5 from '@/components/video-html5.vue';

    const videoSet = reactive({
        visible: false,
        videoTitle: '',
        videoSrc: '',
        playVideo: (data) => {
            videoSet.videoSrc = data?.videoSrc;
            videoSet.videoTitle = data?.title;
            videoSet.visible = true;
        },
    });

    defineExpose({ playVideo: videoSet.playVideo });
</script>

<style scoped lang="less"></style>
