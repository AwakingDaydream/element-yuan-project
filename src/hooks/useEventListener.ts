/*
 * target 目标dom
 * event 事件
 * handler 回调函数
 */
import { onMounted, onUnmounted } from 'vue';

export default function useEventListener(target: EventTarget, event: string, handler: (e: Event) => void) {
	onMounted(() => {
		target.addEventListener(event, handler);
	});
	onUnmounted(() => {
		target.removeEventListener(event, handler);
	});
}
