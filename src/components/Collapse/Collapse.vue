<template>
	<div class="vk-collapse">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import type { CollapseEmits, CollapseProps, NameType } from './types';
import { ref, provide, watch } from 'vue';
import { collapseContextKey } from './types';

defineOptions({
	name: 'VkCollapse',
});
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();

watch(
	() => props.modelValue,
	() => {
		activeNames.value = props.modelValue;
	}
);

const activeNames = ref<NameType[]>(props.modelValue);
// 选择了手风琴模式，但是数组长度大于1的时候抛出错误
if (props.accordion && props.modelValue.length > 1) {
	console.warn('手风琴模式只允许默认打开一项!');
}

function handleItemClick(item: NameType) {
	let _item = [...activeNames.value];
	if (props.accordion) {
		_item = [_item[0] === item ? '' : item];
	} else {
		const index = _item.indexOf(item);
		if (index > -1) {
			_item.splice(index, 1);
		} else {
			_item.push(item);
		}
	}

	emits('update:modelValue', _item);
	// 抛出change方法使用
	emits('change', _item);
}

provide(collapseContextKey, {
	activeNames,
	handleItemClick,
});

defineExpose();
</script>

<style scoped lang="scss"></style>
