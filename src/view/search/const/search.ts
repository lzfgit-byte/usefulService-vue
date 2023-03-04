export const dynaRoutes = [
    {
        path: '/hWord',
        name: 'hWord',
        aliasZH: 'hWord',
        showInMenu: false,
        icon: 'home',
        component: () => import('@/view/hWord/h-word-main-page.vue'),
    },
    {
        path: '/hComic',
        name: 'hComic',
        aliasZH: 'hComic',
        showInMenu: false,
        icon: 'home',
        component: () => import('@/view/hcomic/h-comic-main-page.vue'),
    },
];
