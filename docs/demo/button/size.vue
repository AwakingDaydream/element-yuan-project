<template>
	<div class="mb-4">
		<vk-button size="large">Default</vk-button>
		<vk-button>Default</vk-button>
		<vk-button size="small">Default</vk-button>
	</div>

	<div class="mb-4">
		<vk-button size="large" :icon="['fa', 'house']">Default</vk-button>
		<vk-button :icon="['fa', 'house']">Default</vk-button>
		<vk-button size="small" :icon="['fa', 'house']">Default</vk-button>
	</div>

	<div class="mb-4">
		<vk-button size="large" :icon="['fa', 'house']" round>Default</vk-button>
		<vk-button :icon="['fa', 'house']" round>Default</vk-button>
		<vk-button size="small" :icon="['fa', 'house']" round>Default</vk-button>
	</div>

	<div>
		<vk-button size="large" :icon="['fa', 'house']" circle></vk-button>
		<vk-button :icon="['fa', 'house']" circle></vk-button>
		<vk-button size="small" :icon="['fa', 'house']" circle></vk-button>
	</div>
</template>

<script setup lang="ts">
import vkButton from '@/components/Button/Button.vue';
</script>
