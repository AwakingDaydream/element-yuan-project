/*
 *Button属性类型
 *  type(样式) Primary Danger Info Success Warning
 *  plain 展现模式 boolean
 *  round 圆角 boolean
 *  circle 原型按钮 boolean
 *  size 按钮大小 small normal large
 *  disabled 禁用 boolean
 * 	nativeType 按钮操作类型
 *  autofocus 自动获取焦点
 *  loading 正在加载
 *  icon 图标
 */

/*固定字面量*/
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'large' | 'small';
export type NativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
	type?: ButtonType;
	size?: ButtonSize;
	plain?: boolean;
	round?: boolean;
	circle?: boolean;
	disabled?: boolean;
	nativeType?: NativeType;
	autofocus?: boolean;
	loading?: boolean;
	icon?: string;
}

export interface ButtonInstance {
	ref: HTMLButtonElement;
}
