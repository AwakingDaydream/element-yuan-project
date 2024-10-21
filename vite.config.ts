import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
/*
	vite-plugin-vue-setup-extend 使用script标签直接定义name + defineProps 会报错
* */
// import VueSetuoExtend from 'vite-plugin-vue-setup-extend';
// import eslint from 'vite-plugin-eslint';

import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: {
			//地址替换为@
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: '0.0.0.0', // 默认是 localhost
		port: 8008, // 自定义端口
		strictPort: false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
		open: false, // 启动后是否浏览器自动打开
		hmr: true, // 为开发服务启用热更新，默认是不启用热更新的
	},
	css: {
		preprocessorOptions: {
			// 这里配置 mixin.scss 混合文件的全局引入
			scss: {
				api: 'modern-compiler',
				additionalData: '@use "@/styles/mixins.scss";',
			},
		},
	},
});
