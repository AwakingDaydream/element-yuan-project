//添加样式
import DefaultTheme from 'vitepress/theme';

/*
 * 注册 FontAwesome 图标
 * 全局注册 FontAwesomeIcon 组件
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; //免费图标库
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far); //注册所有图标

import '../../../src/styles/global.scss';

//第一步 .vuepress/theme/index.ts 选择一个全局组件
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';

export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		// 注册全局组件
		app.component('demo-preview', ElementPlusContainer);
	},
};
