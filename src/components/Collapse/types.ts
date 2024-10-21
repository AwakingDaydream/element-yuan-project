import { Ref, InjectionKey } from 'vue';
/*
 *	Collapse属性类型
 *  modelValue 绑定打开的数组值
 *  accordion 手风琴模式
 *
 *	CollapseItem属性类型
 *  name 独一无二的name
 *  title 标题
 *  disabled 禁用
 */

export type NameType = string | number;

export interface CollapseProps {
	modelValue: NameType[];
	accordion?: boolean;
}

export interface CollapseItemProps {
	name: NameType;
	title?: string;
	disabled?: boolean;
}

export interface CollapseEmits {
	(e: 'update:modelValue', values: NameType[]): void;
	(e: 'change', values: NameType[]): void;
}

// 定义provide inject的定义类型
export interface CollapseContext {
	activeNames: Ref<NameType[]>;
	handleItemClick: (name: NameType) => void;
}
// 保证定义的类型不会报错
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey');
