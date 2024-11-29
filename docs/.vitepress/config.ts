import { defineConfig } from 'vitepress';
import path from 'path';
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'My Awesome Project',
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
		nav: [
			{ text: '指南', link: '/' },
			{ text: '组件', link: '/component' },
		],

		sidebar: [
			{
				text: 'Basic基本组件',
				items: [{ text: 'Button 按钮', link: '/component/button.md' }],
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/AwakingDaydream/element-yuan-project' }],
	},
});
