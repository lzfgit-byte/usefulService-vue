<template>
    <div class="container">
        <video
            ref="videoRef"
            class="video-js"
            controls
            preload="auto"
            poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
            data-setup="{}"
        >
            <source :src="src" :type="`video/${videoType}`" />
        </video>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import videojs, { VideoJsPlayerOptions } from 'video.js';
    import { Message } from '@/utills/KitUtil';
    const src = ref();
    const videoType = ref('mp4');
    const videoRef = ref();
    var options: VideoJsPlayerOptions = { html5: true, width: 300 };
    let player: videojs.Player;
    watch(videoRef, () => {
        if (videoRef.value) {
            player = videojs(videoRef.value, options, function onPlayerReady() {
                videojs.log('Your player is ready!');
                this.play();
                this.on('ended', function () {
                    videojs.log('Awww...over so soon?!');
                });
                this.on('error', function (data) {
                    // Message.info('444');
                    // const keys = Object.keys(data);
                    // Message.info(keys.join(','));
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
        Message.info(document.getElementsByTagName('video').length.toString());
    };

    defineExpose({ playVideo: playVideo });
</script>

<style scoped lang="less">
    .container {
        text-align: center;
        background-color: transparent;
    }
</style>
