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
			'is-loading': loading,
			'is-link': link,
		}"
		:disabled="disabled || loading"
		:autofocus="autofocus"
		:type="nativeType"
	>
		<slot name="loadingIcon" v-if="loading"><vk-icon icon="spinner" spin /></slot>
		<vk-icon :icon="icon" v-if="icon && !loading" />
		<span>
			<slot />
		</span>
	</button>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonInstance } from './types';
import { ref } from 'vue';
import vkIcon from '@/components/Icon/Icon.vue';
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
