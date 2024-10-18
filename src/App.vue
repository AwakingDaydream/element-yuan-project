<script setup lang="ts">
import vkButton from '@/components/Button/Button.vue';
</script>

<template>
	<h3>基本</h3>
	<div class="123">
		<vk-button>vk-button</vk-button>
		<vk-button circle>vk-button</vk-button>
		<vk-button round>vk-button</vk-button>
		<vk-button type="primary">vk-button</vk-button>
		<vk-button type="warning">vk-button</vk-button>
		<vk-button type="success">vk-button</vk-button>
		<vk-button type="danger">vk-button</vk-button>
		<vk-button type="info">vk-button</vk-button>
	</div>
	<h3>朴素</h3>
	<div>
		<vk-button plain>vk-button</vk-button>
		<vk-button circle plain>vk-button</vk-button>
		<vk-button round plain>vk-button</vk-button>
		<vk-button type="primary" plain>vk-button</vk-button>
		<vk-button type="warning" plain>vk-button</vk-button>
		<vk-button type="success" plain>vk-button</vk-button>
		<vk-button type="danger" plain>vk-button</vk-button>
		<vk-button type="info" plain>vk-button</vk-button>
	</div>
	<h3>禁用</h3>
	<div>
		<vk-button disabled>vk-button</vk-button>
		<vk-button circle disabled>vk-button</vk-button>
		<vk-button round disabled>vk-button</vk-button>
		<vk-button type="primary" disabled>vk-button</vk-button>
		<vk-button type="warning" disabled>vk-button</vk-button>
		<vk-button type="success" disabled>vk-button</vk-button>
		<vk-button type="danger" disabled>vk-button</vk-button>
		<vk-button type="info" disabled>vk-button</vk-button>
	</div>
</template>

<style scoped lang="scss"></style>
