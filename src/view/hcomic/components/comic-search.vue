<template>
    <div class="btnContainer">
        <var-space>
            <var-input
                :value="searchValue"
                placeholder="搜索"
                style="width: 250px"
                enter-button
                @search="handlerSarch"
            />
            <var-button type="primary" @click="back">返回</var-button>
            <var-button type="primary" @click="reset">刷新</var-button>
        </var-space>
        <var-link
            v-for="item in pageInfos"
            :key="item"
            style="width: 30px; height: 30px; cursor: pointer"
            :color="item.isCurrent ? 'pink' : 'green'"
            @click="load(item.jumpUrl)"
        >
            {{ item.title }}
        </var-link>
    </div>
    <var-loading :loading="spinning">
        <card>
            <comic-cover
                v-for="item in imgs"
                :key="item"
                :cover-info="item"
                @to-content="handlerContent"
            ></comic-cover>
        </card>
    </var-loading>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { pageInfo, seaerchPageInfo } from '@/view/hcomic/const/18-comic-type';
    import ComicCover from '@/view/hcomic/components/comic-cover.vue';
    import { detail, HOME_URL } from '@/view/hcomic/const/18-comic-type';
    import { getHtml } from '@/utils/NetUtils';
    import { getSearchInfo } from '@/view/hcomic/const/18-comic-func';

    const props = defineProps({
        searchUrl: String,
    });
    const emits = defineEmits(['toContent', 'back']);
    const handlerContent = (detail: detail) => {
        emits('toContent', detail);
    };
    const imgs = ref();
    const spinning = ref(true);
    const pageInfos = ref<pageInfo[]>();
    const load = (url: string) => {
        spinning.value = true;
        getHtml(url)
            .then((res) => {
                return getSearchInfo(res);
            })
            .then((res: seaerchPageInfo) => {
                imgs.value = res.covers;
                spinning.value = false;
                pageInfos.value = res.pageInfos;
            });
    };
    load(props?.searchUrl || '');
    const searchValue = ref();
    const handlerSarch = () => {
        const searchUrl = `${HOME_URL}search/photos?main_tag=0&search_query=${searchValue.value}`;
        load(searchUrl);
    };
    const back = () => {
        emits('back');
    };
</script>

<style scoped lang="less">
    .btnContainer {
        position: fixed;
        right: 10px;
        z-index: 2;
    }
</style>
