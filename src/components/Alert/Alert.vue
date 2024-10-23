<template>
	<div>alert</div>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonInstance } from './types';
import { ref } from 'vue';
import vkIcon from '@/components/Icon/Icon.vue';
const _ref = ref<ButtonInstance>();
defineOptions({
	name: 'VkAlert', //定义组件名
});
withDefaults(defineProps<ButtonProps>(), {
	nativeType: 'button',
});

defineExpose({ ref: _ref });
</script>

<style scoped lang="scss"></style>
