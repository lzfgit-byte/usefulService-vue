import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import '@varlet/ui/es/style';
import { registRouter } from '@/router';

const app = createApp(App);
//注册路由
registRouter(app);
app.mount('#app');
