<template>
	<div
		class="vk-input"
		:class="{
			[`vk-input--${type}`]: type,
			[`vk-input--${size}`]: size,
			'is-disabled': disabled,
			'is-prepend': $slots.prepend,
			'is-append': $slots.append,
			'is-prefix': $slots.prefix,
			'is-suffix': $slots.suffix,
		}"
	>
		<!--input-->
		<template v-if="type !== 'textarea'">
			<!--prepend-->
			<div v-if="$slots.prepend" class="vk-input__prepend"><slot name="prepend"></slot></div>
			<!--prefix-->
			<span v-if="$slots.prefix" class="vk-input__prefix"><slot name="prefix"></slot></span>
			<!--content-->
			<input :disabled="disabled" :type="type" class="vk-input__inner" />
			<!--suffix-->
			<span v-if="$slots.suffix" class="vk-input__suffix"><slot name="suffix"></slot></span>
			<!--append-->
			<div v-if="$slots.append" class="vk-input__append"><slot name="append"></slot></div>
		</template>
		<!--textarea-->
		<template v-else>
			<textarea class="vk-textarea__wrapper" :disabled="disabled" />
		</template>
	</div>
</template>

<script setup lang="ts">
import type { InuptProps } from './types';
defineOptions({
	name: 'VkIcon', //定义组件名
	inheritAttrs: false, //防止默认透传 默认会加载到跟组件上
});
withDefaults(defineProps<InuptProps>(), { type: 'text' });
</script>

<style scoped lang="scss"></style>
