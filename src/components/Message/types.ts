import type { VNode } from 'vue';

export interface MessageProps {
	message?: string | VNode;
	duration?: number;
	showClose?: boolean;
	type?: 'success' | 'warning' | 'danger' | 'info' | 'primary';
	onDestory: () => void;
}

// message对应存储属性
export interface MessageContext {
	id: string;
	vnode: VNode;
	props: MessageProps;
}

// CreateMessageProps 忽略 onDestory
export type CreateMessageProps = Omit<MessageProps, 'onDestory'>;
