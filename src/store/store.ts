import { createStore } from 'vuex';
import { routerType } from '@/router';

export const store: any = createStore<{ dynamicMenu: routerType[] }>({
    state() {
        return {
            dynamicMenu: [],
        };
    },
    mutations: {
        addNew(state, payload: routerType) {
            store?.state?.dynamicMenu?.push(payload);
        },
    },
});
