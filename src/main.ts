import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

/*
 *  此处只针对于全局样式，要定义全局变量则是前往vite.config.ts中定义，需区分开来
 *  引入全局样式文件
 */
import '@/styles/global.scss';

/*
 * 注册 FontAwesome 图标
 * 全局注册 FontAwesomeIcon 组件
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'; //免费图标库
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faUserSecret);

const app = createApp(App);

app.use(createPinia());

app.component('FontAwesomeIcon', FontAwesomeIcon).mount('#app');
