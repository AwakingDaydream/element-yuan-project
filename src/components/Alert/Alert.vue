<template>
	<transition name="fade-alert">
		<div
			class="vk-alert"
			v-if="isVisible"
			:class="{
				[`vk-alert--${type}`]: type,
				[`is-${effect}`]: effect,
				'is-center': center,
			}"
		>
			<vk-icon v-if="showIcon" class="vk-alert__icon" :icon="['far', iconSelect]" :class="{ 'is-big': description || !!$slots.description }" />
			<div class="vk-alert__content">
				<div class="vk-alert__title" :class="{ 'with-description': description || !!$slots.description }">
					<slot name="title">{{ title }}</slot>
				</div>
				<div class="vk-alert__description">
					<slot name="description">{{ description }}</slot>
				</div>
				<div v-if="closable" class="vk-alert__close-btn" :class="{ 'is-custom': closeText }" @click="handleClick">
					<div v-if="closeText">{{ closeText }}</div>
					<vk-icon v-else :icon="['far', 'circle-xmark']" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import type { AlertEmits, AlertProps } from './types';
import vkIcon from '@/components/Icon/Icon.vue';
import { reactive, computed, ref } from 'vue';

defineOptions({
	name: 'VkAlert', //定义组件名
});

const isVisible = ref<boolean>(true);
const props = withDefaults(defineProps<AlertProps>(), {
	type: 'info',
	effect: 'light',
});
const emits = defineEmits<AlertEmits>();

const iconTypes = reactive({
	info: 'face-smile-beam',
	success: 'face-laugh',
	warning: 'face-flushed',
	danger: 'face-angry',
});

const iconSelect = computed(() => {
	return iconTypes[props.type];
});

function handleClick(evt: MouseEvent) {
	//关闭操作
	isVisible.value = false;
	emits('close', evt);
}
</script>

<style scoped lang="scss"></style>
