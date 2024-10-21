<template>
	<div class="vk-collapse" :class="[{ 'is-disabled': disabled }]">
		<div class="vk-collapse__header" :id="`item-header-${name}`">
			<!--具名插槽，没有传入插槽时取title-->
			<slot name="title">{{ title }}</slot>
		</div>
		<div class="vk-collapse__content" :id="`item-content-${name}`">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CollapseProps } from './types';

defineOptions({
	name: 'VkCollapseItem', //定义组件名
});
defineProps<CollapseProps>();

defineExpose();
</script>

<style scoped lang="scss"></style>
