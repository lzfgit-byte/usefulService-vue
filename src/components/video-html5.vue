<template>
    <div class="container">
        <video
            id="my-player"
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
    import { defineProps, ref } from 'vue';
    import videojs, { VideoJsPlayerOptions } from 'video.js';
    const props = defineProps({
        src: String,
        title: String,
    });
    const videoType = ref('mp4');
    const split = (props?.src as any)?.split('.');
    if (split.length > 0) {
        videoType.value = split[split.length - 1];
    }
    var options: VideoJsPlayerOptions = { html5: true, width: 300 };

    setTimeout(() => {
        var player = videojs('#my-player', options, function onPlayerReady() {
            videojs.log('Your player is ready!');
            this.play();
            this.on('ended', function () {
                videojs.log('Awww...over so soon?!');
            });
        });
    }, 1000);
</script>

<style scoped lang="less">
    .container {
        text-align: center;
        background-color: transparent;
    }
</style>
