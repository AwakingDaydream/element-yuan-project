/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		VueMacros.vite({
			plugins: {
				vue: vue(),
				vueJsx: vueJsx(),
			},
		}),
	],
	resolve: {
		alias: {
			//地址替换为@
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
	},
});
