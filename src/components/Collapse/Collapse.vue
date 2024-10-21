<template>
	<div class="vk-collapse">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import type { NameType } from './types';
import { collapseContextKey } from './types';
import { ref, provide } from 'vue';

defineOptions({
	name: 'VkCollapse',
});

const activeNames = ref<NameType[]>([]);
function handleItemClick(item: NameType) {
	const index = activeNames.value.indexOf(item);
	if (index > -1) {
		activeNames.value.splice(index, 1);
	} else {
		activeNames.value.push(item);
	}
}

provide(collapseContextKey, {
	activeNames,
	handleItemClick,
});

defineExpose();
</script>

<style scoped lang="scss"></style>
