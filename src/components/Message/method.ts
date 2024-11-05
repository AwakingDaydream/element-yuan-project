import type { CreateMessageProps } from '@/components/Message/types';
import MessageConstructor from '@/components/Message/Message.vue';
import { h, render } from 'vue';

export function createMessage(props: CreateMessageProps) {
	/*
	 *  函数操作流程：通过h创建虚拟节点，再通过render函数渲染到对应的dom节点上
	 *  h函数创建vnode虚拟节点
	 *  tag：元素标签名（也可以是某个组件），data：元素属性对象（组件的props），children：元素子节点，key：唯一值，el：保存真实dom
	 * */
	const container = document.createElement('div');
	// 销毁函数
	const destory = () => {
		render(null, container);
	};
	const newProps = {
		...props,
		onDestory: destory,
	};
	const VNode = h(MessageConstructor, newProps); //创建虚拟节点
	render(VNode, container); //将虚拟节点使用render函数生成真实节点后挂载到container上
	document.body.appendChild(container.firstElementChild!); // !非空断言 挂载该container的第一个子节点，即message组件
}
