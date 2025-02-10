import { defineConfig } from 'vitepress';
import path from 'path';
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	head: [['link', { rel: 'icon', href: '/element-yuan-project/favicon.ico' }]],
	base: '/element-yuan-project/',
	title: 'IncBo',
	lastUpdated: true,
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
		search: {
			provider: 'local',
		},
		nav: [
			// { text: 'Vue', link: '/vue/index' },
			{
				text: '学习笔记',
				items: [
					{ text: 'Javascript', link: '/study/vue/responsive2' },
					{ text: 'Css', link: '/study/css/deep' },
					{ text: 'Vue', link: '/study/vue/responsive2' },
				],
			},
			{ text: '组件开发', link: '/component/button' },
			{ text: '关于我', link: '/aboutme' },
		],

		footer: {
			message: '学无止尽，唯有努力',
			copyright: 'Fighting',
		},

		sidebar: {
			'/study/vue': [
				{
					text: 'Vue',
					items: [
						{ text: 'Vue2的响应式原理', link: '/study/vue/responsive2.md' },
						{ text: 'Vue3的响应式基础', link: '/study/vue/responseBasic.md' },
						{ text: 'Vue3的响应式原理', link: '/study/vue/responsive3.md' },
						{ text: 'Watch 监听', link: '/study/vue/watch.md' },
						{ text: '路由模式', link: '/study/vue/hash&history.md' },
						{ text: '混入', link: '/study/vue/Mixins&extends.md' },
						{ text: 'Vue指令', link: '/study/vue/Vue指令合集.md' },
					],
				},
			],
			'/study/css': [
				{
					text: 'Css',
					items: [{ text: '样式隔离', link: '/study/css/deep.md' }],
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
