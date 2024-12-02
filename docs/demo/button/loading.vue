<template>
	<div>
		<vk-button loading type="primary">loading</vk-button>
		<vk-button type="danger" loading>
			<template #loadingIcon>
				<vkIcon :icon="['fa', 'house']" />
			</template>
			CustomIcon
		</vk-button>
	</div>
</template>

<script setup lang="ts">
import vkButton from '@/components/Button/Button.vue';
import vkIcon from '@/components/Icon/Icon.vue';
</script>
