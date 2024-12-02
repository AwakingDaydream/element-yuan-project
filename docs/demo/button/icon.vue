<template>
	<div>
		<vk-button type="primary" round :icon="['fa', 'xmark']"></vk-button>
		<vk-button type="primary" round :icon="['fa', 'house']"></vk-button>
		<vk-button type="primary" round :icon="['fa', 'image']"></vk-button>
		<vk-button type="primary" round :icon="['fa', 'phone']">phone</vk-button>
	</div>
</template>

<script setup lang="ts">
import vkButton from '@/components/Button/Button.vue';
</script>
