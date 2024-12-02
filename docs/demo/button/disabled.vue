<template>
	<div class="mb-4">
		<vk-button disabled>Default</vk-button>
		<vk-button type="primary" disabled>Primary</vk-button>
		<vk-button type="warning" disabled>Warning</vk-button>
		<vk-button type="success" disabled>Success</vk-button>
		<vk-button type="danger" disabled>Danger</vk-button>
		<vk-button type="info" disabled>Info</vk-button>
	</div>

	<div>
		<vk-button plain disabled>Plain</vk-button>
		<vk-button type="primary" plain disabled>Primary</vk-button>
		<vk-button type="warning" plain disabled>Warning</vk-button>
		<vk-button type="success" plain disabled>Success</vk-button>
		<vk-button type="danger" plain disabled>Danger</vk-button>
		<vk-button type="info" plain disabled>Info</vk-button>
	</div>
</template>

<script setup lang="ts">
import vkButton from '@/components/Button/Button.vue';
</script>
