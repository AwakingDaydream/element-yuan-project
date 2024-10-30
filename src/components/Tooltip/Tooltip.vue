<template>
	<div ref="popperContainerNode" class="vk-tooltip" style="display: inline-block" v-on="outsideEvent">
		<div class="vk-tooltip__trigger" v-on="event" ref="triggerNode">
			<slot />
		</div>
		<div class="vk-tooltip__popper" ref="popperNode" v-if="isOpen">
			<slot name="content">{{ content }}</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { TooltipEmits, TooltipProps } from './types';
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import { ref, watch } from 'vue';
import useClickOutside from '@/hooks/useClickOutside';
defineOptions({
	name: 'VkTooltip', //定义组件名
});
const props = withDefaults(defineProps<TooltipProps>(), {
	placement: 'bottom',
	trigger: 'hover',
});
const emits = defineEmits<TooltipEmits>();
const isOpen = ref(false);
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const popperContainerNode = ref<HTMLElement>();
let popperInstance: Instance | null = null;
//v-on事件绑定不需要响应式对象
let event = {};
let outsideEvent = {};
//点击操作 点击外部dom隐藏
useClickOutside(popperContainerNode, () => {
	if (props.trigger === 'click' && isOpen.value) {
		isOpen.value = false;
	}
});

// 根据trigger绑定事件
const togglePopper = (_type) => {
	const _isEnter = _type === 'hover-enter';
	const _isClick = _type === 'click';
	return () => {
		isOpen.value = _isClick ? !isOpen.value : _isEnter;
		emits('visible-change', isOpen.value);
	};
};
const attachEvents = () => {
	if (props.trigger === 'hover') {
		event['mouseenter'] = togglePopper('hover-enter');
		outsideEvent['mouseleave'] = togglePopper('hover-leave');
	} else if (props.trigger === 'click') {
		event['click'] = togglePopper('click');
	}
};
watch(
	() => props.trigger,
	() => {
		outsideEvent = {};
		event = {};
		attachEvents();
	},
	{ immediate: true }
);

watch(
	isOpen,
	() => {
		if (isOpen.value) {
			if (popperNode.value && triggerNode.value) {
				// 创建popper实例
				popperInstance = createPopper(triggerNode.value, popperNode.value, {
					placement: props.placement,
				});
			}
		} else {
			//对应的isOpen为false的时候销毁
			popperInstance?.destroy();
		}
	},
	{
		// 侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM
		flush: 'post',
	}
);
</script>

<style scoped lang="scss"></style>
