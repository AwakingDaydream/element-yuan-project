import type { Placement } from '@popperjs/core';

export interface TooltipProps {
	content?: string;
	trigger?: 'hover' | 'click';
	placement: Placement;
	manual?: boolean; //是否手动展示
}

export interface TooltipEmits {
	(e: 'visible-change', value: boolean): void;
}

export interface TooltipInstance {
	show: () => void;
	hide: () => void;
}
