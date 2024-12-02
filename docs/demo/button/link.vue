<template>
	<div class="mb-4">
		<vk-button link>Link</vk-button>
		<vk-button type="primary" link>Primary</vk-button>
		<vk-button type="warning" link>Warning</vk-button>
		<vk-button type="success" link>Success</vk-button>
		<vk-button type="danger" link>Danger</vk-button>
		<vk-button type="info" link>Info</vk-button>
	</div>

	<div>
		<vk-button link disabled>Link</vk-button>
		<vk-button type="primary" link disabled>Primary</vk-button>
		<vk-button type="warning" link disabled>Warning</vk-button>
		<vk-button type="success" link disabled>Success</vk-button>
		<vk-button type="danger" link disabled>Danger</vk-button>
		<vk-button type="info" link disabled>Info</vk-button>
	</div>
</template>

<script setup lang="ts">
import vkButton from '@/components/Button/Button.vue';
</script>
