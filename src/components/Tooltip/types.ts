import type { Placement, Options } from '@popperjs/core';

export interface TooltipProps {
	content?: string;
	trigger?: 'hover' | 'click';
	placement: Placement;
	manual?: boolean; //是否手动展示
	popperOptions?: Partial<Options>; // partial 全部设置为可选
	transition?: string;
	openDelay?: number;
	closeDelay?: number;
	isDropdown?: boolean;
}

export interface TooltipEmits {
	(e: 'visible-change', value: boolean): void;
}

export interface TooltipInstance {
	show: () => void;
	hide: () => void;
}
