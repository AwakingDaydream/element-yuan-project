<template>
	<div
		class="vk-message"
		v-show="visible"
		:class="{
			[`vk-message--${type}`]: type,
			'is-close': showClose,
		}"
		role="alert"
		ref="messageRef"
		:style="cssStyle"
		@mouseenter="endTimer"
		@mouseleave="startTimer"
	>
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
import { computed, onMounted, ref, watch, nextTick } from 'vue';
import vkIcon from '@/components/Icon/Icon.vue';
import { getLastBottomOffset } from '@/components/Message/index';
import useEventListener from '@/hooks/useEventListener';

defineOptions({
	name: 'VkMessage', //定义组件名
});
const props = withDefaults(defineProps<MessageProps>(), {
	duration: 3000,
	type: 'info',
	showClose: false,
	offset: 20,
});
const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
let timer: any = null;
// const preInstance = getLastInstance(); //获取最近的实例

const height = ref(0); // 实例高度
// lastOffset：上一个实例的 offset+height（bottomOffset）
const lastOffset = computed(() => getLastBottomOffset(props.id));
// 该实例的top
const topOffset = computed(() => lastOffset.value + props.offset);
// 预留该实例的offset
const bottomOffset = computed(() => topOffset.value + height.value);
const cssStyle = computed(() => {
	return {
		top: `${topOffset.value}px`,
		zIndex: props.zIndex,
	};
});

const keydown = (e: Event) => {
	const event = e as KeyboardEvent; //断言成键盘事件对象
	if (event.code === 'Escape') {
		visible.value = false;
	}
};
useEventListener(document, 'keydown', keydown);

watch(visible, (newVal) => {
	if (newVal === false) {
		props.onDestory();
	}
});

const startTimer = () => {
	if (props.duration === 0) return;
	timer = setTimeout(() => {
		visible.value = false;
	}, props.duration);
};

const endTimer = () => {
	clearTimeout(timer);
};

onMounted(async () => {
	visible.value = true;
	await nextTick(); // 强制更新后在往下执行，不然获取不到高度
	height.value = messageRef.value!.getBoundingClientRect().height;
	startTimer();
});

defineExpose({
	visible,
	bottomOffset,
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
