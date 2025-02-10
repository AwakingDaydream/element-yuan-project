<template>
	<div class="common parent">
		<div class="left">你好，我是父组件</div>
		<son />
	</div>
</template>

<script setup lang="ts">
import son from './son.vue';
</script>

<style scoped lang="scss">
.common {
	background: #3c3f44;
	.left {
		color: #3dd68c;
	}
}
</style>
