<template>
    <div class="container">
        <div class="typeContain">
            <span v-for="item in coverInfo?.type" :key="item">{{ item.title }}</span>
        </div>
        <div class="imgContainer" @click="handlerImgClick">
            <img width="100" :src="getProxyImgUrl(coverInfo?.coverUrl)" />
        </div>
        <div class="heart">{{ coverInfo?.heart }}</div>
        <div class="title">{{ coverInfo?.title }}</div>
        <!--        <div class="author"-->
        <!--            ><span>{{ coverInfo?.author }}</span>-->
        <!--        </div>-->
        <!--        <div class="tagsContain">-->
        <!--            <div class="wrapper" align="left">-->
        <!--                <span-->
        <!--                    v-for="item in coverInfo?.tags"-->
        <!--                    :key="item"-->
        <!--                    class="tag"-->
        <!--                    @click="handlerTagClick(item?.jumpUrl)"-->
        <!--                >-->
        <!--                    {{ item?.title }}-->
        <!--                </span>-->
        <!--            </div>-->
        <!--        </div>-->
    </div>
</template>

<script setup lang="ts">
    import { comicCover } from '@/view/hcomic/const/18-comic-type';
    import { defineProps, PropType, defineEmits } from 'vue';
    import bus from '@/utils/bus';
    import { getHtml } from '@/utils/NetUtils';
    import { getComicDetailInfo } from '@/view/hcomic/const/18-comic-func';
    import { getProxyImgUrl } from '@/utils/KitUtil';
    const props = defineProps({
        coverInfo: Object as PropType<comicCover>,
    });
    const emits = defineEmits(['toContent', 'searchComic']);
    const handlerTagClick = (url: string) => {
        bus.emit('searchComic', url);
    };
    const handlerImgClick = () => {
        const jumpUrl = props?.coverInfo?.jumpUrl || '';
        getHtml(jumpUrl)
            .then((res) => {
                return getComicDetailInfo(res);
            })
            .then((res) => {
                emits('toContent', res);
            });
    };
</script>

<style scoped lang="less">
    .container {
        display: inline-block;
        position: relative;
        width: 100px;
        height: auto;
        margin: 10px;
        .imgContainer {
            border-radius: 6px;
            cursor: pointer;
        }
        .typeContain {
            position: absolute;
            right: 0;
            top: 0;
            span {
                display: inline-block;
                border: none;
                color: #fff;
                padding: 0 5px;
                text-align: center;
                font-size: 12px;
                border-radius: 5px;
                line-height: inherit;
                background-color: #323232;
                margin: 4px;
            }
        }
        .heart {
            position: absolute;
            left: 4px;
            top: 107px;
            border: none;
            color: #fff;
            padding: 1px 3px 0;
            text-align: center;
            font-size: 15px;
            border-radius: 5px;
            background-color: rgba(200, 200, 200, 0.8);
            line-height: inherit;
        }
        .title {
            display: block;
            width: 100px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            font-size: 16px;
            font-family: open sans, helvetica neue, Helvetica, Arial, sans-serif;
        }
        .author {
            display: block;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            span {
                color: #ff7a00;
                font-size: 16px;
                cursor: pointer;
            }
        }
        .tagsContain {
            text-overflow: clip;
            margin-top: 5px;
            overflow-x: scroll;
            .wrapper {
                width: 1000px;
                display: flex;
            }
            .tag {
                background-color: #666;
                width: 60px;
                overflow: hidden;
                color: #fff;
                padding: 0 5px;
                border-radius: 2rem;
                font-size: 12px;
                margin-right: 3px;
                cursor: pointer;
                text-overflow: clip;
                margin-top: 5px;
                overflow-x: hidden;
            }
            &::-webkit-scrollbar {
                width: 5px;
                height: 5px;
                margin-top: 10px;
                border-radius: 1rem;
                background: rgba(0, 0, 0, 0.15);
            }
        }
    }
</style>
