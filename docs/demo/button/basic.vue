<template>
	<div class="mb-4">
		<vk-button>Default</vk-button>
		<vk-button type="primary">Primary</vk-button>
		<vk-button type="warning">Warning</vk-button>
		<vk-button type="success">Success</vk-button>
		<vk-button type="danger">Danger</vk-button>
		<vk-button type="info">Info</vk-button>
	</div>

	<div class="mb-4">
		<vk-button plain>Plain</vk-button>
		<vk-button type="primary" plain>Primary</vk-button>
		<vk-button type="warning" plain>Warning</vk-button>
		<vk-button type="success" plain>Success</vk-button>
		<vk-button type="danger" plain>Danger</vk-button>
		<vk-button type="info" plain>Info</vk-button>
	</div>

	<div class="mb-4">
		<vk-button round>Round</vk-button>
		<vk-button type="primary" round>Primary</vk-button>
		<vk-button type="warning" round>Warning</vk-button>
		<vk-button type="success" round>Success</vk-button>
		<vk-button type="danger" round>Danger</vk-button>
		<vk-button type="info" round>Info</vk-button>
	</div>

	<div>
		<vk-button round :icon="['fa', 'xmark']" circle></vk-button>
		<vk-button type="primary" round :icon="['fa', 'xmark']" circle></vk-button>
		<vk-button type="warning" round :icon="['fa', 'house']" circle></vk-button>
		<vk-button type="success" round :icon="['fa', 'image']" circle></vk-button>
		<vk-button type="danger" round :icon="['fa', 'phone']" circle></vk-button>
		<vk-button type="info" round :icon="['fa', 'star']" circle></vk-button>
	</div>
</template>

<script setup lang="ts">
import vkButton from '@/components/Button/Button.vue';
</script>
