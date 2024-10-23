<template>
	<div class="vk-collapse-item" :class="[{ 'is-disabled': disabled }]">
		<div
			class="vk-collapse-item__header"
			:class="{
				'is-disabled': disabled,
				'is-active': isActive,
			}"
			:id="`item-header-${name}`"
			@click="handleClick"
		>
			<!--具名插槽，没有传入插槽时取title-->
			<slot name="title">{{ title }}</slot>
			<vk-icon class="header-angle" icon="angle-right" />
		</div>
		<Transition name="slide" v-on="transitionEvents">
			<div class="vk-collapse-item__wrap" v-show="isActive">
				<div class="vk-collapse-item__content" :id="`item-content-${name}`">
					<slot />
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { inject, computed } from 'vue';
import { collapseContextKey } from './types';
import vkIcon from '@/components/Icon/Icon.vue';

defineOptions({
	name: 'VkCollapseItem', //定义组件名
});
const props = defineProps<CollapseItemProps>();
const collapseContext = inject(collapseContextKey);
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name));

function handleClick() {
	if (props.disabled) return;
	collapseContext?.handleItemClick(props.name);
}

/*
  使用v-on的方式添加组件属性
  record 一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
  interface AppConfig {
    port: number;
    env: 'development' | 'production';
  }
  同时如果属性名有要求 也可以使用接口方式
  const config: Record<string, AppConfig> = {
    server: { port: 3000, env: 'development' },
    client: { port: 8080, env: 'production' },
  };
  设置固定高度，才可以实现高度动画
  scrollHeight 返回元素整体的高度，包括由于 overflow 溢出而在屏幕上不可见的内容
*/
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
	beforeEnter(el) {
		el.style.height = '0px';
		el.style.overflow = 'hidden';
	},
	enter(el) {
		el.style.height = `${el.scrollHeight}px`;
	},
	afterEnter(el) {
		el.style.height = '';
		el.style.overflow = '';
	},
	beforeLeave(el) {
		el.style.height = `${el.scrollHeight}px`;
		el.style.overflow = 'hidden';
	},
	leave(el) {
		el.style.height = '0px';
	},
	afterLeave(el) {
		el.style.height = '';
		el.style.overflow = '';
	},
};

defineExpose();
</script>

<style scoped lang="scss"></style>
