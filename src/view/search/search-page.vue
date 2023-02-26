<template>
    <div class="container">
        <div class="icon">
            <div>
                <img width="272" height="92" src="/imgs/google_logo.svg" />
            </div>
        </div>
        <div class="search-container">
            <div class="search">
                <img src="/imgs/search.svg" />
                <input ref="searchInput" :value="value" placeholder="请输入" @blur="handleBlur" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { routerType } from '@/router';
    const router = useRouter();
    const store = useStore();
    const value = ref();
    const searchInput = ref<any>();
    const route: any = {
        path: '/hWord',
        name: 'hWord',
        aliasZH: 'hWord',
        showInMenu: false,
        icon: 'home',
        component: () => import('@/view/hWord/h-word-main-page.vue'),
    };
    router.addRoute(route);
    const handleBlur = () => {
        value.value = searchInput.value.value;
        if (value.value === '180742') {
            const dynamicMenu = store.state.dynamicMenu;
            if (!dynamicMenu.some((item: routerType) => item.path === '/hWord')) {
                store.commit('addNew', route);
            }
        }
    };
</script>

<style scoped lang="less">
    .container {
        height: 60vh;
        .icon {
            height: 20vh;
            display: flex;
            & > div {
                margin: auto;
                transform: translateY(13vh);
            }
        }
        .search-container {
            height: 30vh;
            display: flex;
            .search {
                margin: auto;
                display: flex;
                border-radius: 22px;
                box-shadow: 0 1px 6px 0 #20212447;
                height: 39px;
                padding: 5px;
                input {
                    background-color: #fff;
                    border: none;
                    border-radius: 10%;
                    color: #000;
                    outline: 0;
                    height: 30px;
                    font-size: 20px;
                    line-height: 20px;
                }
            }
        }
    }
</style>
