import type { VNode, ComponentInternalInstance } from 'vue';

export interface MessageProps {
	message?: string | VNode;
	duration?: number;
	showClose?: boolean;
	transitionName?: string;
	type?: 'success' | 'warning' | 'danger' | 'info' | 'primary';
	onDestory: () => void;
	offset?: number; // 距离顶部的初始值
	id: string;
	zIndex: number;
}

// message对应存储属性
export interface MessageContext {
	id: string;
	vnode: VNode;
	vm: ComponentInternalInstance; //组件实例
	props: MessageProps;
	destory: () => void;
}

// CreateMessageProps 忽略 onDestory/id
export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>;
