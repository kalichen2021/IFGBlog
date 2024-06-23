<template>
	<header class="main-header">Header</header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@mixin flex-style {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

header {
	position: absolute;
	top: 0;
	width: 100vw;
	height: 50px;

	border-radius: 10px;
	background-color: rgb(0, 55, 102, 0.5);
	backdrop-filter: blur(5px);
	z-index: 10;
	animation: enter 0.4s;
}

@keyframes enter {
	from {
		transform: translateY(-20px);
		opacity: 0.5;
	}
}
</style>