import { defineComponent } from 'vue';

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
