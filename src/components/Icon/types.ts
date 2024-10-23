import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import type { ButtonType } from '@/components/Button/types';

//直接继承封装组件props 在透传给响应组件
export interface IconProps extends FontAwesomeIconProps {
	type?: ButtonType;
	color?: string;
}
