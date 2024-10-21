<template>
	<div class="vk-collapse" :class="[{ 'is-disabled': disabled }]" @click="handleClick">
		<div class="vk-collapse__header" :id="`item-header-${name}`">
			<!--具名插槽，没有传入插槽时取title-->
			<slot name="title">{{ title }}</slot>
		</div>
		<div class="vk-collapse__content" :id="`item-content-${name}`" v-show="isActive">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CollapseProps } from './types';
import { inject, computed } from 'vue';
import { collapseContextKey } from './types';

defineOptions({
	name: 'VkCollapseItem', //定义组件名
});
const props = defineProps<CollapseProps>();
const collapseContext = inject(collapseContextKey);
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name));

function handleClick() {
	if (props.disabled) return;
	collapseContext?.handleItemClick(props.name);
}

defineExpose();
</script>

<style scoped lang="scss"></style>
