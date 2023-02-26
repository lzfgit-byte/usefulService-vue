<template>
    <div class="container">
        <div class="search">
            <var-collapse v-model="search.visible">
                <var-collapse-item title="搜索" name="1">
                    <div>
                        <var-row>
                            <var-row>
                                <var-col :span="24">
                                    <var-space>
                                        <var-input
                                            v-model="search.searchValue"
                                            placeholder="input search text"
                                            style="width: 200px"
                                            @search="search.search"
                                        />
                                        <var-button type="primary" @click="search.search">
                                            搜索
                                        </var-button>
                                    </var-space>
                                </var-col>
                            </var-row>
                            <var-row>
                                <var-link
                                    v-for="item in tags_"
                                    :key="item"
                                    type="info"
                                    style="margin: 5px; cursor: pointer"
                                    color="orange"
                                    @click="handlerTagClick(item.jumpUrl)"
                                    >{{ item.tageName + ' ' + item.count }}
                                </var-link>
                            </var-row>
                        </var-row>
                    </div>
                </var-collapse-item>
            </var-collapse>
        </div>

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
    import { getFullUrlPath } from '@/utills/KitUtil';

    const TEXT_URL = 'https://thehentaiworld.com/?new';
    let currentUrl = '';
    const infos = ref<[x: mainHtml]>();
    const pageInfos = ref();
    const tags_ = ref<tags[]>();
    const handlerChangePage = (url: string) => {
        loadPage('https:' + url);
    };

    const isSpinning = ref(true);
    const loadPage = (url: string) => {
        url = getFullUrlPath(url, 'https');
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
    const handlerTagClick = (url: string) => {
        loadPage(url);
    };
    const search = reactive({
        visible: [1],
        searchValue: '',
        search: () => {
            const sarchVal = search.searchValue.replaceAll(' ', '+');
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
        padding-top: 36px;

        .search {
            position: fixed;
            width: 98vw;
            top: 0;
            z-index: 9;
        }
    }
</style>
