import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// 引入全局样式文件
/*
 此处只针对于全局样式，要定义全局变量则是前往vite.config.ts中定义，需区分开来
* */
import '@/styles/global.scss';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
