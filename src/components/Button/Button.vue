<template>
	<button
		class="vk-button"
		:class="{
			[`vk-button--${type}`]: type,
			[`vk-button--${size}`]: size,
			'is-plain': plain,
			'is-round': round,
			'is-circle': circle,
			'is-disabled': disabled,
		}"
		:disabled="disabled"
		:autofocus="autofocus"
		:type="nativeType"
	>
		<span>
			<slot />
		</span>
	</button>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonInstance } from './types';
import { ref } from 'vue';
const _ref = ref<ButtonInstance>();
defineOptions({
	name: 'VkButton', //定义组件名
});
withDefaults(defineProps<ButtonProps>(), {
	nativeType: 'button',
});

defineExpose({ ref: _ref });
</script>

<style scoped lang="scss"></style>
