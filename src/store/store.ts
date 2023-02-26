import { createStore } from 'vuex';
import { routerType } from '@/router';

export const store: any = createStore<{ dynamicMenu: routerType[]; localHosts: any }>({
    state() {
        return {
            dynamicMenu: [],
            localHosts: '',
        };
    },
    mutations: {
        addNew(state, payload: routerType) {
            store?.state?.dynamicMenu?.push(payload);
        },
        initLocalHosts(state, payload) {
            if (payload.length > 0) {
                state.localHosts = payload[0];
            }
        },
    },
});
