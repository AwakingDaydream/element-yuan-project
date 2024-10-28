import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vkIcon from '../Icon/Icon.vue';

/*
 * 使用 describe 可以在当前上下文中定义一个新的测试套件，相当于分类
 * 作为一组相关测试或基准以及其他嵌套测试套件。测试套件可让组织测试和基准，使报告更加清晰
 */
describe('Button.vue', () => {
	/*
	 * test 相当于定义了一组相关的期望。 它接收测试名称和保存测试期望的函数。
	 */
	test('basic button', () => {
		// 挂载组件好基本属性
		const wrapper = mount(Button, {
			props: {
				type: 'primary',
			},
			slots: {
				default: 'button',
			},
		});
		/*
		 * wrapper属性
		 * html：html结构；classes：所含class
		 */
		console.log('wrapper', wrapper.html());
		expect(wrapper.classes()).toContain('vk-button--primary'); //class是否包含vk-button--primary
		// 寻找元素节点的相关属性 get find get会抛出错误 find会继续执行
		// 寻找button的元素节点下的文本是否为text
		expect(wrapper.get('button').text()).toBe('button');
		// 测试事件 events
		wrapper.get('button').trigger('click'); // 触发button上面的click事件
		console.log(wrapper.emitted()); // 获取被触发的自定义时间的对象
		expect(wrapper.emitted()).toHaveProperty('click'); // 判断是否含有click事件
	});
	// 测试disabled
	test('disabled', () => {
		const wrapper = mount(Button, {
			props: {
				disabled: true,
			},
			slots: {
				default: 'disabled',
			},
		});
		// attributes:获取节点属性;toBeDefined:判断属性是否存在
		expect(wrapper.attributes('disabled')).toBeDefined();
		// 原生dom节点判断
		expect(wrapper.find('button').element.disabled).toBeDefined();

		wrapper.get('button').trigger('click');
		console.log(wrapper.emitted());
		expect(wrapper.emitted()).not.toHaveProperty('click'); // 没有触发click事件
	});
	// 测试icon 涉及到获取图标的代码
	test('icon', () => {
		const wrapper = mount(Button, {
			props: {
				icon: 'arrow-up',
			},
			slots: {
				default: 'icon',
			},
			global: {
				// 模拟的任意组件名称 保证不存在报错 可以往下穿透 FontAwesomeIcon实际上是vk-icon的组件
				stubs: ['FontAwesomeIcon'],
			},
		});
		console.log(wrapper.html());
		// 判断是否存在 图标组件
		const iconElement = wrapper.findComponent(FontAwesomeIcon);
		expect(iconElement.exists()).toBeTruthy();
		//判断icon组件上的icon属性是否为arrow-up
		expect(iconElement.attributes('icon')).toBe('arrow-up');
	});

	// 测试loading
	test('loading', () => {
		const wrapper = mount(Button, {
			props: {
				loading: true,
			},
			slots: {
				default: 'loading',
			},
			global: {
				// 模拟的任意组件名称 保证不存在报错
				stubs: ['vkIcon'],
			},
		});
		console.log(wrapper.html());
		// 判断是否存在 图标组件
		const iconElement = wrapper.findComponent(vkIcon);
		expect(iconElement.exists()).toBeTruthy();
		expect(iconElement.attributes('icon')).toBe('spinner');
		// 判断disabled是否生效
		expect(wrapper.attributes('disabled')).toBeDefined();
	});
});
