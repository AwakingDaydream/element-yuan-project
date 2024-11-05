import { defineComponent } from 'vue';

// defineComponent 返回一个vnode 或者 渲染标签
const RenderVnode = defineComponent({
	props: {
		vNode: {
			type: [String, Object],
			require: true,
			default: '',
		},
	},
	setup(props) {
		// 渲染函数或 JSX
		return () => props.vNode;
	},
});

export default RenderVnode;
