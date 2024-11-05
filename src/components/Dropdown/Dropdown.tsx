import { defineComponent, ref, Fragment, computed } from 'vue';
import type { PropType } from 'vue';
import type { MenuOption } from './types';
import type { Placement, Options } from '@popperjs/core';
import { TooltipInstance } from '@/components/Tooltip/types';
import vkTooltip from '@/components/Tooltip/Tooltip.vue';

const vkDropdown = defineComponent({
	name: 'VkDropdown',
	components: { vkTooltip },
	props: {
		menuOptions: {
			type: Array as PropType<MenuOption[]>,
			required: true,
		},
		hideAfterClick: {
			type: Boolean,
			default: true,
		},
		trigger: {
			type: String,
			default: 'click',
		},
		transition: {
			type: String,
			default: 'fade',
		},
		openDelay: {
			type: Number,
			default: 0,
		},
		closeDelay: {
			type: Number,
			default: 0,
		},
		manual: {
			type: Boolean,
			default: false,
		},
		placement: {
			type: String as PropType<Placement>,
			required: true,
		},
		popperOptions: {
			type: Object as PropType<Partial<Options>>,
			default: () => {},
		},
	},
	emits: ['visible-change', 'select'],
	setup(props, { slots, emit, expose }) {
		const tooltipRef = ref<TooltipInstance | null>();
		//emits事件
		const visibleChange = (e: boolean) => {
			emit('visible-change', e); // 再抛出给 引用的组件
		};
		const itemClick = (e: MenuOption) => {
			if (e.disabled) return;
			if (props.hideAfterClick) {
				tooltipRef.value?.hide();
			}
			emit('select', e);
		};

		const options = computed(() => {
			return props.menuOptions.map((item) => {
				return (
					//template 标签在tsx的形式
					<Fragment key={item.key}>
						{item.divided ? <li role="separator" class="divided-placeholder" /> : ''}
						<li
							class={{ 'vk-dropdown__item': true, 'is-disabled': item.disabled, 'is-divided': item.divided }}
							id={`dropdown-item-${item.key}`}
							onClick={() => itemClick(item)}
						>
							{item.label}
						</li>
					</Fragment>
				);
			});
		});

		// 函数的形式保证能拿到ref上的函数执行
		expose({
			hide: () => tooltipRef.value?.hide(),
			show: () => tooltipRef.value?.show(),
		});
		// 渲染函数或 JSX
		return () => (
			<div class="vk-dropdown">
				<vkTooltip
					placement={props.placement}
					trigger={props.trigger}
					manual={props.manual}
					popperOptions={props.popperOptions}
					openDelay={props.openDelay}
					ref={tooltipRef}
					onVisibleChange={visibleChange}
					closeDelay={props.closeDelay}
				>
					{{
						default: () => slots.default && slots.default(),
						content: () => <ul class="vk-dropdown__menu">{options.value}</ul>,
					}}
				</vkTooltip>
			</div>
		);
	},
});

export default vkDropdown;
