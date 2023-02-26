<template>
    <div class="container">
        <video
            :id="elId"
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
    import { ref } from 'vue';
    import videojs, { VideoJsPlayerOptions } from 'video.js';
    const src = ref();
    const elId = ref('video-src');
    const videoType = ref('mp4');
    var options: VideoJsPlayerOptions = { html5: true, width: 300 };
    let player: videojs.Player;
    setTimeout(() => {
        player = videojs(elId.value, options, function onPlayerReady() {
            videojs.log('Your player is ready!');
            this.play();
            this.on('ended', function () {
                videojs.log('Awww...over so soon?!');
            });
        });
    }, 1000);
    const playVideo = (videoSrc, title) => {
        src.value = videoSrc;
        const split = videoSrc?.split('.');
        if (split.length > 0) {
            videoType.value = split[split.length - 1];
        }
        player?.src({ src: videoSrc });
    };

    defineExpose({ playVideo: playVideo });
</script>

<style scoped lang="less">
    .container {
        text-align: center;
        background-color: transparent;
    }
</style>
