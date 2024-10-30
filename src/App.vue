<template>
	<vk-button :type="trigger === 'click' ? 'primary' : 'danger'" @click="trigger === 'click' ? (trigger = 'hover') : (trigger = 'click')">
		trigger:{{ trigger }}
	</vk-button>
	<vkTooltip content="12345" placement="right" :trigger="trigger" ref="vkTooltipRef" :manual="manual">
		<template #content>123</template>
		<img src="@/assets/images/miku.gif" ref="triggerNode" />
	</vkTooltip>
	<vk-button @click="open">toolTipOpen</vk-button>
	<vk-button @click="hide">toolTipClose</vk-button>
	<vk-button @click="manual = !manual">manual:{{ manual }}</vk-button>
	<h1>Button</h1>
	<h3>type</h3>
	<div>
		<vk-button>vk-button</vk-button>
		<vk-button type="primary">vk-button</vk-button>
		<vk-button type="warning">vk-button</vk-button>
		<vk-button type="success">vk-button</vk-button>
		<vk-button type="danger">vk-button</vk-button>
		<vk-button type="info">vk-button</vk-button>
	</div>
	<h3>plain</h3>
	<div>
		<vk-button plain>vk-button</vk-button>
		<vk-button type="primary" plain>vk-button</vk-button>
		<vk-button type="warning" plain>vk-button</vk-button>
		<vk-button type="success" plain>vk-button</vk-button>
		<vk-button type="danger" plain>vk-button</vk-button>
		<vk-button type="info" plain>vk-button</vk-button>
	</div>
	<h3>round</h3>
	<div>
		<vk-button round>vk-button</vk-button>
		<vk-button type="primary" round>vk-button</vk-button>
		<vk-button type="warning" round>vk-button</vk-button>
		<vk-button type="success" round>vk-button</vk-button>
		<vk-button type="danger" round>vk-button</vk-button>
		<vk-button type="info" round>vk-button</vk-button>
	</div>
	<h3>disabled</h3>
	<div>
		<vk-button disabled>vk-button</vk-button>
		<vk-button type="primary" disabled>vk-button</vk-button>
		<vk-button type="warning" disabled>vk-button</vk-button>
		<vk-button type="success" disabled>vk-button</vk-button>
		<vk-button type="danger" disabled>vk-button</vk-button>
		<vk-button type="info" disabled>vk-button</vk-button>
	</div>
	<h3>icon</h3>
	<div>
		<vk-button disabled>vk-button</vk-button>
		<vk-button size="small" loading>vk-button</vk-button>
		<vk-button size="large" icon="arrow-up">vk-button</vk-button>
	</div>

	<h1 style="margin-top: 50px">Collapse</h1>
	---{{ modelValue }}---
	<div style="width: 200px; margin: 50px">
		<vkCollapse v-model="modelValue" accordion>
			<vkCollapseItem name="a" title="a"> about a </vkCollapseItem>
			<vkCollapseItem name="b">
				<template #title>title b</template>
				about b
			</vkCollapseItem>
			<vkCollapseItem name="c" disabled>
				<template #title>title c</template>
				about c
			</vkCollapseItem>
		</vkCollapse>
	</div>

	<h1 style="margin-top: 50px">Icon</h1>
	<vk-icon icon="fa-user-secret" :size="size" type="danger" color="#000000"></vk-icon>

	<h1 style="margin-top: 50px">Alert</h1>
	<div style="width: 300px">
		<vk-alert title="default alert" type="info" show-icon closable center />
		<vk-alert title="default alert" type="warning" show-icon closable close-text="Gotcha" />
		<vk-alert title="default alert" type="danger" show-icon />
		<vk-alert title="Success Alert" type="success" show-icon>
			<template #title> Success Alert </template>
			<template #description>这是一串描述</template>
		</vk-alert>

		<vk-alert title="default alert" type="info" effect="dark" show-icon description="This is a description." closable />
		<vk-alert title="default alert" type="warning" effect="dark" show-icon />
		<vk-alert title="default alert" type="danger" effect="dark" show-icon />
		<vk-alert title="Success Alert" type="success" effect="dark" show-icon>
			<template #title> Success Alert </template>
		</vk-alert>
	</div>
</template>

<script setup lang="ts">
import vkButton from '@/components/Button/Button.vue';
import vkCollapse from '@/components/Collapse/Collapse.vue';
import vkCollapseItem from '@/components/Collapse/CollapseItem.vue';
import vkIcon from '@/components/Icon/Icon.vue';
import vkAlert from '@/components/Alert/Alert.vue';
import { ref } from 'vue';
import vkTooltip from '@/components/Tooltip/Tooltip.vue';
import type { TooltipInstance } from '@/components/Tooltip/types';

const modelValue = ref(['a']);
const size = ref<any>('2x');
const trigger = ref<any>('click');
const manual = ref<any>(false);
const vkTooltipRef = ref<TooltipInstance>();

function open() {
	vkTooltipRef.value?.show();
}

function hide() {
	vkTooltipRef.value?.hide();
}
</script>

<style scoped lang="scss"></style>
