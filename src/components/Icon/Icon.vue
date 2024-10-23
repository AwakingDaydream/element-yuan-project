<template>
	<i
		class="vk-icon"
		:class="{
			[`vk-icon--${type}`]: type,
		}"
		:style="customStyles"
		v-bind="$attrs"
	>
		<!--透传props 让定义的props直接由外部icon组件继承，v-bind接受对象形式props的所有响应式属性-->
		<FontAwesomeIcon v-bind="filterProps" />
	</i>
</template>

<script setup lang="ts">
import type { IconProps } from './types';
import { computed } from 'vue';
import { omit } from 'lodash-es';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/*
 * $props和$attrs的区别，共同点是都可以被孙组件继承
 * $props：是本身组件必须定义的属性，再由父组件传递进来生效的值
 * $attrs：不需要定义，在父组件上的变量、class、id都可以被子组件继承，且透传并不是响应式的
 */
defineOptions({
	name: 'VkIcon', //定义组件名
	inheritAttrs: false, //防止默认透传 默认会加载到跟组件上
});

const props = defineProps<IconProps>();
//lodash过滤选项，但不再是响应式对象,使用computed包裹后实现响应式更新
const filterProps = computed(() => omit(props, ['type', 'color']));

// 自定义颜色
const customStyles = computed(() => {
	return props.color ? { color: props.color } : {};
});
</script>

<style scoped lang="scss"></style>
