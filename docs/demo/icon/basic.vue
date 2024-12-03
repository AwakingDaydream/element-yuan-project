<template>
	<div class="mb-4">
		<vkIcon :icon="['fas', 'face-smile-beam']" size="2x" />
		<vkIcon :icon="['far', 'face-smile-beam']" size="2x" />
	</div>
	<div>
		<vkIcon :icon="['fas', 'face-smile-beam']" color="green" size="2x" />
		<vkIcon :icon="['far', 'face-smile-beam']" color="orange" size="2x" />
	</div>
</template>

<script setup lang="ts">
import vkIcon from '@/components/Icon/Icon.vue';
</script>

<style lang="scss">
.vk-icon {
	& + & {
		margin-left: 20px;
	}
}
</style>
