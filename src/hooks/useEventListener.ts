/*
 * target 目标dom
 * event 事件
 * handler 回调函数
 */
import { onMounted, isRef, watch, onBeforeUnmount, unref } from 'vue';
import type { Ref } from 'vue';

export default function useEventListener(target: Ref<EventTarget | null> | EventTarget, event: string, handler: (e: Event) => void) {
	// 响应式判断，传入响应式的话需要考虑当前的dom是否生成
	if (isRef(target)) {
		watch(target, (newValue, oldValue) => {
			oldValue?.removeEventListener(event, handler);
			newValue?.addEventListener(event, handler);
		});
	} else {
		onMounted(() => {
			target.addEventListener(event, handler);
		});
	}
	onBeforeUnmount(() => {
		unref(target)?.removeEventListener(event, handler);
	});
}
