import type { VNode } from 'vue';
import type { TooltipProps } from '@/components/Tooltip/types';

// 继承Tooltip的属性，依此触发
export interface DropdownProps extends TooltipProps {
	menuOptions: MenuOption[]; // 下拉数据
	hideAfterClick?: boolean;
}

export interface MenuOption {
	label: string | VNode;
	key: string | number;
	disabled?: boolean;
	divided?: boolean; // 是否显示分隔符
}

// emits是基于函数的声明
export interface DropdownEmits {
	(e: 'visible-change', value: boolean): void;
	(e: 'select', value: MenuOption): void; // 选中数组值的操作
}

// instance是基于对象的声明
export interface DropdownInstance {
	show: () => void;
	hide: () => void;
}
