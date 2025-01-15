import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from './Input.vue';

describe('Input', () => {
	it('基本展示', () => {
		// basic text
		const wrapper = mount(Input, {
			//传入对应参数
			props: { size: 'small', type: 'text' },
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
			props: { size: 'small', type: 'textarea' },
		});
		expect(wrapper2.find('textarea').exists()).toBeTruthy();
	});
});
