<template>
	<div class="vk-dropdown">
		<vk-tooltip
			:placement="placement"
			:trigger="trigger"
			:manual="manual"
			:popper-options="popperOptions"
			:open-delay="openDelay"
			:close-delay="closeDelay"
			@visible-change="visibleChange"
			ref="tooltipRef"
			is-dropdown
		>
			<!--slot抛出后点击展示tooltip-->
			<slot />
			<template #content>
				<ul class="vk-dropdown__menu">
					<template v-for="item in menuOptions" :key="item.key">
						<li v-if="item.divided" role="separator" class="divided-placeholder" />
						<li
							class="vk-dropdown__item"
							@click="itemClick(item)"
							:class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
							:id="`dropdown-item-${item.key}`"
						>
							<RenderVnode :v-node="item.label" />
						</li>
					</template>
				</ul>
			</template>
		</vk-tooltip>
	</div>
</template>

<script setup lang="ts">
import type { DropdownEmits, DropdownInstance, DropdownProps, MenuOption } from '@/components/Dropdown/types';
import type { TooltipInstance } from '@/components/Tooltip/types';
import { ref } from 'vue';
import vkTooltip from '@/components/Tooltip/Tooltip.vue';
import RenderVnode from '@/components/Common/RenderVnode';
defineOptions({
	name: 'VkDropdown', //定义组件名
});
const props = withDefaults(defineProps<DropdownProps>(), {
	hideAfterClick: true,
});
const emits = defineEmits<DropdownEmits>();
const tooltipRef = ref<TooltipInstance | null>();

//emits事件
const visibleChange = (e: boolean) => {
	emits('visible-change', e); // 再抛出给 引用的组件
};
const itemClick = (e: MenuOption) => {
	if (e.disabled) return;
	if (props.hideAfterClick) {
		tooltipRef.value?.hide();
	}
	emits('select', e);
};

defineExpose<DropdownInstance>({
	hide: tooltipRef.value?.hide,
	show: tooltipRef.value?.show,
});
</script>

<style scoped lang="scss"></style>
