import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

/*
 * "dependencies"：您的应用程序在生产中需要这些包。 --save
 *"devDependencies"：这些包仅用于开发和测试。 --save-dev
 */

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
import { fas } from '@fortawesome/free-solid-svg-icons'; //免费图标库
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far); //注册所有图标

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
