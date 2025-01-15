<template>
	<Input>
		<template #suffix> 1 </template>
		<template #prepend> 1 </template>
	</Input>
	<button @click="message1.destory()">销毁</button>
	<div style="text-align: center">
		<vkDropdown
			content="12345"
			placement="right"
			:trigger="trigger"
			ref="vkTooltipRef1"
			:manual="manual"
			:popper-options="popperOptions"
			:open-delay="500"
			:close-delay="500"
			@visible-change="visiableChange"
			:menu-options="options"
		>
			<img src="@/assets/images/carl.jpeg" ref="triggerNode" />
		</vkDropdown>
	</div>
	<div style="text-align: center">
		<vkTooltip
			content="12345"
			placement="right"
			:trigger="trigger"
			ref="vkTooltipRef"
			:manual="manual"
			:popper-options="popperOptions"
			:open-delay="500"
			:close-delay="500"
			@visible-change="visiableChange"
		>
			<template #content>123</template>
			<img src="@/assets/images/miku.gif" ref="triggerNode" />
		</vkTooltip>
	</div>
	<div style="text-align: center">
		<vk-button :type="trigger === 'click' ? 'primary' : 'danger'" @click="trigger === 'click' ? (trigger = 'hover') : (trigger = 'click')">
			---trigger:{{ trigger }}
		</vk-button>
		<vk-button @click="open">toolTipOpen</vk-button>
		<vk-button @click="hide">toolTipClose</vk-button>
		<vk-button @click="manual = !manual">manual:{{ manual }}</vk-button>
	</div>
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
import { ref, h, onMounted } from 'vue';
import vkTooltip from '@/components/Tooltip/Tooltip.vue';
import vkDropdown from '@/components/Dropdown/Dropdown';
import Input from '@/components/Input/Input.vue';
import type { TooltipInstance } from '@/components/Tooltip/types';
import type { Options } from '@popperjs/core';
import type { MenuOption } from '@/components/Dropdown/types';
import { createMessage } from '@/components/Message';
import type { MessageContext } from '@/components/Message/types';

const modelValue = ref(['a']);
const size = ref<any>('2x');
const trigger = ref<any>('click');
const manual = ref<any>(false);
const vkTooltipRef = ref<TooltipInstance>();
const vkTooltipRef1 = ref<TooltipInstance>();
const message1 = ref<MessageContext | null>();
const popperOptions = ref<Partial<Options>>({
	placement: 'right',
	strategy: 'fixed',
});
const options: MenuOption[] = [
	{
		key: 1,
		label: h('div', {
			class: 'name',
			innerHTML: 'this is bold',
		}),
	},
	{ key: 2, label: 'item2', disabled: true },
	{ key: 3, label: 'item3', divided: true },
	{ key: 4, label: 'item4' },
];

function open() {
	vkTooltipRef1.value?.show();
}

function hide() {
	vkTooltipRef1.value?.hide();
}

function visiableChange(flag: boolean) {
	console.log('---flag---', flag);
}

onMounted(() => {
	message1.value = createMessage({ message: options[0].label, showClose: true, duration: 1000, type: 'danger' });
	console.log('message1.value---', message1.value);
	createMessage({ message: options[1].label, showClose: true, duration: 0 });
	createMessage({ message: options[2].label, showClose: true, duration: 0 });
});
</script>

<style scoped lang="scss"></style>
