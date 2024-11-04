<template>
	<div ref="popperContainerNode" class="vk-tooltip" style="display: inline-block" v-on="outsideEvent">
		<div class="vk-tooltip__trigger" v-on="event" ref="triggerNode">
			<slot />
		</div>
		<transition :name="transition">
			<div class="vk-tooltip__popper" ref="popperNode" v-if="isOpen">
				<slot name="content">{{ content }}</slot>
				<div id="arrow" data-popper-arrow></div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import type { TooltipEmits, TooltipInstance, TooltipProps } from './types';
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import { computed, ref, watch } from 'vue';
import { onUnmounted } from 'vue';
import useClickOutside from '@/hooks/useClickOutside';
import { debounce } from 'lodash-es';
defineOptions({
	name: 'VkTooltip', //定义组件名
});
const props = withDefaults(defineProps<TooltipProps>(), {
	placement: 'bottom',
	trigger: 'hover',
	transition: 'fade',
	openDelay: 0,
	closeDelay: 0,
	isDropdown: false,
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
	if (props.trigger === 'click' && isOpen.value && !props.manual) {
		isOpen.value = false;
	}
});

// 根据trigger绑定事件
const togglePopper = (_type) => {
	const _isEnter = _type === 'hover-enter';
	const _isClick = _type === 'click';
	//防抖
	return debounce(
		() => {
			isOpen.value = _isClick ? !isOpen.value : _isEnter;
			emits('visible-change', isOpen.value);
		},
		isOpen.value ? props.closeDelay : props.openDelay
	);
};

const hoverEvent = () => {
	const _enter = togglePopper('hover-enter');
	const _leave = togglePopper('hover-leave');
	return {
		enter: () => {
			_leave.cancel(); //清除上一个行为的定时器
			_enter();
		},
		leave: () => {
			_enter.cancel();
			_leave();
		},
	};
};

const attachEvents = () => {
	if (props.trigger === 'hover') {
		const { enter, leave } = hoverEvent();
		event['mouseenter'] = enter;
		outsideEvent['mouseleave'] = leave;
	} else if (props.trigger === 'click') {
		event['click'] = togglePopper('click');
	}
};

onUnmounted(() => {
	popperInstance?.destroy();
});

// poppers Props配置
const popperOptions = computed(() => {
	return {
		placement: props.placement,
		// 弹窗操作
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 9], //偏移量
				},
			},
		],
		...props.popperOptions,
	};
});

//手动的情况不绑定事件
watch(
	() => props.manual,
	(isManual) => {
		if (isManual) {
			outsideEvent = {};
			event = {};
		} else {
			attachEvents();
		}
	}
);

watch(
	() => props.trigger,
	() => {
		if (!props.manual) {
			outsideEvent = {};
			event = {};
			attachEvents();
		}
	},
	{ immediate: true }
);

watch(
	isOpen,
	() => {
		if (isOpen.value) {
			if (popperNode.value && triggerNode.value) {
				// 创建popper实例
				popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value);
			}
		} else {
			//对应的isOpen为false的时候销毁
			setTimeout(() => {
				popperInstance?.destroy();
			}, props.closeDelay + 500);
		}
	},
	{
		// 侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM
		flush: 'post',
	}
);

const exposeParams = () => {
	const { enter, leave } = hoverEvent();
	return {
		show: () => {
			if (!props.manual && !props.isDropdown) return;
			enter();
		},
		hide: () => {
			if (!props.manual && !props.isDropdown) return;
			leave();
		},
	};
};

defineExpose<TooltipInstance>(exposeParams());
</script>

<style scoped lang="scss"></style>
