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
		<!--$slots打印没东西，返回的属性值是函数-->
		<!--input-->
		<template v-if="type !== 'textarea'">
			<!--prepend-->
			<div v-if="$slots.prepend" class="vk-input__prepend"><slot name="prepend"></slot></div>
			<!--prefix-->
			<span v-if="$slots.prefix" class="vk-input__prefix"><slot name="prefix"></slot></span>
			<!--content-->
			<input v-model="innerValue" @input="handleInput" :disabled="disabled" :type="type" class="vk-input__inner" />
			<!--suffix-->
			<span v-if="$slots.suffix" class="vk-input__suffix"><slot name="suffix"></slot></span>
			<!--append-->
			<div v-if="$slots.append" class="vk-input__append"><slot name="append"></slot></div>
		</template>
		<!--textarea-->
		<template v-else>
			<textarea v-model="innerValue" class="vk-textarea__wrapper" :disabled="disabled" />
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { InuptProps, InuptEmits } from './types';

defineOptions({
	name: 'VkIcon', //定义组件名
	inheritAttrs: false, //防止默认透传 默认会加载到跟组件上
});
const props = withDefaults(defineProps<InuptProps>(), { type: 'text' });
const emits = defineEmits<InuptEmits>();
const innerValue = ref(props.modelValue);

watch(
	() => props.modelValue,
	(newValue) => {
		innerValue.value = newValue;
	}
);

const handleInput = () => {
	emits('update:modelValue', innerValue.value);
};
</script>

<style scoped lang="scss"></style>
