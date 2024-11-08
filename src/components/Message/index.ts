import type { CreateMessageProps, MessageContext } from '@/components/Message/types';
import MessageConstructor from '@/components/Message/Message.vue';
import { h, render, shallowReactive } from 'vue';
import useZIndex from '@/hooks/useZIndex';

const { nextZIndex } = useZIndex();
// 实例对象数组
let seed = 1; // 实例个数
//shallowReactive 对象的根属性才有响应式
const instances: MessageContext[] = shallowReactive([]); //设置为响应式变量，在message组件中计算属性绑定，更新时重新执行
console.log('instances----', instances);

export function createMessage(props: CreateMessageProps) {
	/*
	 *  函数操作流程：通过h创建虚拟节点，再通过render函数渲染到对应的dom节点上
	 *  h函数创建vnode虚拟节点
	 *  tag：元素标签名（也可以是某个组件），data：元素属性对象（组件的props），children：元素子节点，key：唯一值，el：保存真实dom
	 * */
	const id = `message_${seed++}`;
	const container = document.createElement('div');
	// 销毁函数
	const destory = () => {
		//销毁时删除对应数组实例
		const idx = instances.findIndex((item) => item.id === id);
		if (idx === -1) return;
		instances.splice(idx, 1);
		render(null, container);
	};
	//手动调用删除 即修改visible
	const manualDestory = () => {
		const instance = instances.find((item) => item.id === id);
		if (instance) {
			instance.vm.exposed!.visible.value = false;
		}
	};
	const newProps = {
		...props,
		id,
		zIndex: nextZIndex(),
		onDestory: destory,
	};
	const VNode = h(MessageConstructor, newProps); //创建虚拟节点
	/*
	将虚拟节点使用render函数生成真实节点后挂载到container上
	render函数为异步操作 因此instance获取的不会是自己
	*/
	render(VNode, container); //将虚拟节点使用render函数生成真实节点后挂载到container上
	document.body.appendChild(container.firstElementChild!); // !非空断言 挂载该container的第一个子节点，即message组件
	//把创建的实例push到instance数组
	const vm = VNode.component!;
	const _instance = {
		id,
		vm, //vm生成是异步的
		vnode: VNode, //组件实例的component.exposed可以拿到导出的实例属性
		props: newProps,
		destory: manualDestory,
	};
	instances.push(_instance);
	//将当前实例返回
	return _instance;
}

export const getLastInstance = () => {
	// array.at(index) 访问index参数处的元素 -1返回最后一个
	return instances.at(-1);
};

// 获取距离上一个实例的值 instance.offset+instance.height
export const getLastBottomOffset = (id: string) => {
	const idx = instances.findIndex((item) => item.id === id);
	if (idx <= 0) return 0;
	const prev = instances[idx - 1]; //上一个实例
	return prev.vm.exposed!.bottomOffset.value;
};
