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
			{ text: '学习笔记', link: '/study/index' },
			{ text: '组件开发', link: '/component/button' },
			{ text: '关于我', link: '/aboutme' },
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
			'/study/': [
				{
					text: '第一步',
					items: [{ text: '第一步', link: '/study/index.md' }],
				},
			],
			'/component/': [
				{
					text: 'Basic 基本组件',
					items: [
						{ text: 'Button 按钮', link: '/component/button.md' },
						{ text: 'Icon 图标', link: '/component/icon.md' },
					],
				},
				{
					text: 'Data 数据展示',
					items: [{ text: 'Collapse 折叠面板', link: '/component/collapse.md' }],
				},
				{
					text: 'Navigation 导航',
					items: [{ text: 'Dropdown 下拉菜单', link: '/component/dropdown.md' }],
				},
				{
					text: 'Feedback 反馈组件',
					items: [
						{ text: 'Alert 提示', link: '/component/alert.md' },
						{ text: 'Tooltip 文字提示', link: '/component/tooltip.md' },
						{ text: 'Message 消息提示', link: '/component/message.md' },
					],
				},
			],
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/AwakingDaydream/element-yuan-project' }],
	},
});
