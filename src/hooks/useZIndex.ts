import { computed, ref } from 'vue';

const zIndex = ref(0);
export const useZIndex = (initialValue = 2000) => {
	const initialZIndex = ref(initialValue);
	const currentIndex = computed(() => zIndex.value + initialZIndex.value);
	const nextZIndex = () => {
		zIndex.value++;
		return currentIndex.value;
	};
	return {
		currentIndex,
		nextZIndex,
		initialZIndex,
	};
};
