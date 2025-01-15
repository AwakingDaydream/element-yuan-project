//直接继承封装组件props 在透传给响应组件
export interface InuptProps {
	type: string; // 多种情况 主要以 text textarea password
	size?: 'large' | 'small';
	disabled?: boolean;
	clearable?: boolean;
	showPassword?: boolean;
}
