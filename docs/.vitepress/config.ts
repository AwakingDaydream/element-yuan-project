import { defineConfig } from 'vitepress';
import path from 'path';
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: '/md-project/',
	title: 'ChinaYuan Project',
	description: 'A VitePress Site',
	vite: {
		resolve: {
			//重新配置@的指向
			alias: {
				//地址替换为@
				'@': path.resolve(__dirname, '../../src'),
			},
		},
	},
	markdown: {
		config(md) {
			md.use(containerPreview);
			md.use(componentPreview);
		},
	},
	// srcDir: './component',
	themeConfig: {
		logo: '../miku.png',
		nav: [
			{ text: 'Vue', link: '/vue/index' },
			{ text: 'JavaScript', link: '/javascript/index' },
			{ text: 'Canvas学习', link: '/canvas/index' },
			{ text: '组件临摹', link: '/component/button' },
		],

		sidebar: {
			'/vue/': [
				{
					text: 'vue',
					items: [{ text: 'vue 按钮', link: '/vue/index.md' }],
				},
			],
			'/javascript/': [
				{
					text: 'javascript',
					items: [{ text: 'javascript 按钮', link: '/javascript/index.md' }],
				},
			],
			'/canvas/': [
				{
					text: 'Canvas学习',
					items: [{ text: 'canvas 按钮', link: '/canvas/index.md' }],
				},
			],
			'/component/': [
				{
					text: 'Basic基本组件',
					items: [
						{ text: 'Button 按钮', link: '/component/button.md' },
						{ text: 'Icon 图标', link: '/component/icon.md' },
					],
				},
			],
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/AwakingDaydream/element-yuan-project' }],
	},
});
