import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import '@varlet/ui/es/style';
import { registRouter } from '@/router';
import { store } from '@/store/store';

const app = createApp(App);

//注册路由
registRouter(app);
app.use(store).mount('#app');
