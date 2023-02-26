<template>
    <div class="container">
        <h-word-card v-for="item in infos" :key="item" :info="item"></h-word-card>
    </div>
    <div class="pagination">
        <pagination-h-word
            :page-infos="pageInfos"
            @change-page="handlerChangePage"
        ></pagination-h-word>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import { htmlInfo, mainHtml, tags } from '@/view/hWord/const/h-word-type';
    import { getHtml } from '@/utills/NetUtils';
    import { getHtmlInfo } from '@/view/hWord/const/h-word-func';
    import HWordCard from '@/view/hWord/compoent/h-word-card.vue';
    import PaginationHWord from '@/view/hWord/compoent/pagination-h-word.vue';
    import { LoadingBar } from '@varlet/ui';
    const TEXT_URL = 'https://thehentaiworld.com/?new';
    let currentUrl = '';
    const infos = ref<[x: mainHtml]>();
    const pageInfos = ref();
    const tags_ = ref<tags[]>();
    const handlerChangePage = (url: string) => {
        loadPage(url);
    };

    const isSpinning = ref(true);
    const loadPage = (url: string) => {
        LoadingBar.start();
        isSpinning.value = true;
        currentUrl = url;
        getHtml(url)
            .then((res: string) => {
                return getHtmlInfo(res);
            })
            .then((res: htmlInfo) => {
                infos.value = res.mainHtml;
                pageInfos.value = res.pageInfo;
                tags_.value = res.tags;
                isSpinning.value = false;
                LoadingBar.finish();
            });
    };
    loadPage(TEXT_URL);
    const drawer = reactive({
        visible: false,
        searchValue: '',
        search: () => {
            const sarchVal = drawer.searchValue.replaceAll(' ', '+');
            const searchUrl = `https://thehentaiworld.com/?s=${sarchVal}`;
            loadPage(searchUrl);
        },
    });
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        text-align: center;
        height: 86vh;
        overflow-y: auto;
    }
</style>
