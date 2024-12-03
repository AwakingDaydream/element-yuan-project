import { defineConfig } from 'vitepress';
import path from 'path';
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	head: [['link', { rel: 'icon', href: '/element-yuan-project/favicon.ico' }]],
	base: '/element-yuan-project/',
	title: 'IncBo',
	description: 'A novice',
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
		logo: '/miku.png',
		nav: [
			// { text: 'Vue', link: '/vue/index' },
			{ text: '随笔', link: '/javascript/index' },
			{ text: '学习笔记', link: '/canvas/index' },
			{ text: '组件开发', link: '/component/button' },
			{ text: '关于我', link: '/component/button' },
		],

		footer: {
			message: '学无止尽，唯有努力',
			copyright: 'Fighting',
		},

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
