<template>
    <div ref="container" class="container">
        <video
            ref="videoRef"
            class="video-js"
            controls
            preload="auto"
            poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
            data-setup="{}"
            webkit-playsinline="true"
            playsinline="true"
            x-webkit-airplay="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-ignore-metadata="true"
        >
        </video>
        <div> </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import videojs, { VideoJsPlayerOptions } from 'video.js';
    import { logToService, IMessage } from '@/utils/KitUtil';
    import { useIntersectionObserver } from '@vueuse/core';
    import { useWindowSize } from '@vueuse/core';

    const container = ref();
    const targetIsVisible = ref();
    const { stop } = useIntersectionObserver(container, ([{ isIntersecting }], observerElement) => {
        targetIsVisible.value = isIntersecting;
    });

    const { width, height } = useWindowSize();
    const src = ref();
    const videoType = ref('mp4');
    const videoRef = ref();
    console.log(width.value);
    var options: VideoJsPlayerOptions = {
        html5: true,
        width: width.value * 0.8,
        height: height.value * 0.85,
        loop: true,
        autoplay: false,
    };
    let player: videojs.Player;
    onMounted(() => {
        if (videoRef.value) {
            player = videojs(videoRef.value, options, function onPlayerReady() {
                videojs.log('Your player is ready!');
                // this.play();
                this.on('ended', function () {
                    videojs.log('Awww...over so soon?!');
                });
                this.on('error', function (data) {
                    IMessage.error('video 报错');
                    logToService(data);
                });
            });
        }
    });

    const playVideo = (videoSrc, title) => {
        src.value = videoSrc;
        const split = videoSrc?.split('.');
        if (split.length > 0) {
            videoType.value = split[split.length - 1];
        }
        player?.src({ src: videoSrc });
        player?.load();
        // IMessage.info(document.getElementsByTagName('video').length.toString());
    };
    watch(targetIsVisible, () => {
        if (!targetIsVisible.value) {
            // player?.paused();
            player?.pause();
        }
    });

    defineExpose({ playVideo: playVideo });
</script>

<style scoped lang="less">
    .container {
        text-align: center;
        background-color: transparent;
    }
</style>
