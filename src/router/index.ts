import { createRouter, createWebHashHistory } from 'vue-router';
import { App } from '@vue/runtime-core';
// 1. 定义路由组件.

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const routes = [
    // { path: '/', name: 'main', component: () => import('@/view/reader/reader-table.vue') },
    // {
    //     path: '/readPdf',
    //     name: 'readPdf',
    //     component: () => import('@/view/reader/pdf-reader-main.vue'),
    // },
    {
        path: '/fileDownload',
        name: 'fileDownload',
        aliasZH: '文件下载',
        component: () => import('@/view/fileShare/file-share-main-page.vue'),
    },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});
export default {};
export const registRouter = (app: App) => {
    app.use(router);
};
