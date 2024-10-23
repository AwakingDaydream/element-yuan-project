<template>
	<img src="@/assets/images/miku.gif" />
	<h1>Button</h1>
	<h3>type</h3>
	<div>
		<vk-button>vk-button</vk-button>
		<vk-button type="primary">vk-button</vk-button>
		<vk-button type="warning">vk-button</vk-button>
		<vk-button type="success">vk-button</vk-button>
		<vk-button type="danger">vk-button</vk-button>
		<vk-button type="info">vk-button</vk-button>
	</div>
	<h3>plain</h3>
	<div>
		<vk-button plain>vk-button</vk-button>
		<vk-button type="primary" plain>vk-button</vk-button>
		<vk-button type="warning" plain>vk-button</vk-button>
		<vk-button type="success" plain>vk-button</vk-button>
		<vk-button type="danger" plain>vk-button</vk-button>
		<vk-button type="info" plain>vk-button</vk-button>
	</div>
	<h3>round</h3>
	<div>
		<vk-button round>vk-button</vk-button>
		<vk-button type="primary" round>vk-button</vk-button>
		<vk-button type="warning" round>vk-button</vk-button>
		<vk-button type="success" round>vk-button</vk-button>
		<vk-button type="danger" round>vk-button</vk-button>
		<vk-button type="info" round>vk-button</vk-button>
	</div>
	<h3>disabled</h3>
	<div>
		<vk-button disabled>vk-button</vk-button>
		<vk-button type="primary" disabled>vk-button</vk-button>
		<vk-button type="warning" disabled>vk-button</vk-button>
		<vk-button type="success" disabled>vk-button</vk-button>
		<vk-button type="danger" disabled>vk-button</vk-button>
		<vk-button type="info" disabled>vk-button</vk-button>
	</div>
	<h3>icon</h3>
	<div>
		<vk-button disabled>vk-button</vk-button>
		<vk-button size="small" loading>vk-button</vk-button>
		<vk-button size="large" icon="arrow-up">vk-button</vk-button>
	</div>

	<h1 style="margin-top: 50px">Collapse</h1>
	---{{ modelValue }}---
	<div style="width: 200px; margin: 50px">
		<vkCollapse v-model="modelValue" accordion>
			<vkCollapseItem name="a" title="a"> about a </vkCollapseItem>
			<vkCollapseItem name="b">
				<template #title>title b</template>
				about b
			</vkCollapseItem>
			<vkCollapseItem name="c" disabled>
				<template #title>title c</template>
				about c
			</vkCollapseItem>
		</vkCollapse>
	</div>

	<h1 style="margin-top: 50px">Icon</h1>
	<vk-icon icon="fa-user-secret" :size="size" type="danger" color="#000000"></vk-icon>
</template>

<script setup lang="ts">
import vkButton from '@/components/Button/Button.vue';
import vkCollapse from '@/components/Collapse/Collapse.vue';
import vkCollapseItem from '@/components/Collapse/CollapseItem.vue';
import vkIcon from '@/components/Icon/Icon.vue';
import { ref } from 'vue';

const modelValue = ref(['a']);
const size = ref<any>('2x');

setTimeout(() => {
	size.value = '5x';
}, 2000);
</script>

<style scoped lang="scss"></style>
