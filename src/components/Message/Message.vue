<template>
	<div class="vk-message" v-show="visible">
		<div class="vk-message__content">
			<slot> <RenderVnode :v-node="message" v-if="message" /></slot>
		</div>
		<div class="vk-message__close" v-if="showClose">
			<slot name="close">
				<vk-icon :icon="['fas', 'xmark']" @click.stop="visible = false"></vk-icon>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { MessageProps } from '@/components/Message/types';
import RenderVnode from '@/components/Common/RenderVnode';
import { onMounted, ref, watch } from 'vue';
import vkIcon from '@/components/Icon/Icon.vue';
import { getLastInstance } from '@/components/Message/index';

defineOptions({
	name: 'VkMessage', //定义组件名
});
const props = withDefaults(defineProps<MessageProps>(), {
	duration: 3000,
	type: 'info',
	showClose: false,
});
const visible = ref(false);
const preInstance = getLastInstance(); //获取最近的实例

watch(visible, (newVal) => {
	if (newVal === false) {
		props.onDestory();
	}
});

const startTimer = () => {
	if (props.duration === 0) return;
	setTimeout(() => {
		visible.value = false;
	}, props.duration);
};

onMounted(() => {
	visible.value = true;
	startTimer();
	console.log('preInstance---', preInstance);
});
</script>

<style scoped lang="scss">
.vk-message {
	width: max-content;
	position: fixed;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	border: 1px solid;
	background-color: #ffffff;
}
</style>
