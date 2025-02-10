import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from './Input.vue';
import exp from 'constants';

describe('Input', () => {
	it('基本展示', () => {
		// basic text
		const wrapper = mount(Input, {
			//传入对应参数
			props: { size: 'small', type: 'text', modelValue: '' },
			slots: { prepend: 'prepend', prefix: 'prefix' },
		});
		console.log(wrapper.html());
		//判断class是否存在
		expect(wrapper.classes()).toContain('vk-input--small');
		expect(wrapper.classes()).toContain('is-prepend');
		//判断是否有input
		expect(wrapper.find('input').exists()).toBeTruthy();
		expect(wrapper.get('input').attributes('type')).toBe('text');
		//判断是否有slots
		expect(wrapper.find('.vk-input__prepend').exists()).toBeTruthy();

		// textarea
		const wrapper2 = mount(Input, {
			props: { size: 'small', type: 'textarea', modelValue: '' },
		});
		expect(wrapper2.find('textarea').exists()).toBeTruthy();
	});

	//测试v-model
	it('支持v-model', async () => {
		const wrapper = mount(Input, {
			//传入对应参数
			props: {
				modelValue: 'test',
				'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
			},
		});
		console.log('v-model-text--', wrapper.html());
		// 判断初始值
		const input = wrapper.get('input');
		expect(input.element.value).toBe('test');
		//更新modelValue
		await input.setValue('update');
		expect(wrapper.props('modelValue')).toBe('update');
		expect(input.element.value).toBe('update');
		//v-model的异步更新
		await wrapper.setProps({ modelValue: 'prop update' });
		expect(input.element.value).toBe('prop update');
	});

	//测试清空文本
});
