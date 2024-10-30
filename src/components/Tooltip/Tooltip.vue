<template>
	<div class="vk-tooltip" style="display: inline-block">
		<div class="vk-tooltip__trigger" ref="triggerNode" @click="togglePopper">
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
let popperInstance: Instance | null = null;

const togglePopper = () => {
	isOpen.value = !isOpen.value;
	emits('visible-change', isOpen.value);
};

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
