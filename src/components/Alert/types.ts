/*
 *	Alert属性类型
 *  type(样式) Primary Danger Info Success Warning
 *  title 标题 string
 *  description 描述性文本 string
 *  closable 是否可以关闭 boolean
 *  center 是否居中 boolean
 *  close-text 自定义关闭按钮文本 string
 * 	show-icon 是否现实类型图标
 *  effect 主题样式
 */

/*固定字面量*/
export type AlertType = 'success' | 'warning' | 'danger' | 'info';
export type AlertEffectSize = 'light' | 'dark';

export interface AlertProps {
	type?: AlertType;
	title: string;
	description?: string;
	closable?: boolean;
	center?: boolean;
	closeText?: string;
	showIcon?: boolean;
	effect?: AlertEffectSize;
}

export interface AlertEmits {
	(e: 'close', value: MouseEvent): void;
}
