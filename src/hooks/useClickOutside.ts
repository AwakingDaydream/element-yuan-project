import type { Ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

const useClickOutside = (elementRef: Ref<null | HTMLElement>, callback: (e: MouseEvent) => void) => {
	const handler = (e: MouseEvent) => {
		if (elementRef.value && e.target) {
			if (!elementRef.value?.contains(e.target as HTMLElement)) {
				callback(e);
			}
		}
	};

	onMounted(() => {
		//事件默认的第一个参数就是event
		document.addEventListener('click', handler);
	});

	onUnmounted(() => {
		document.removeEventListener('click', handler);
	});
};

export default useClickOutside;
