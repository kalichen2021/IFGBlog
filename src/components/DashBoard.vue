<template>
	<div class="DashBoard"></div>
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

.DashBoard {
	position: absolute;
	left: 2vw;
	top: 25%;
	min-height: 20em;
	width: 5vw;
	height: 60vh;
	z-index: 10;

	border-radius: 2.5vw;
	background-color: rgb(0, 55, 102, 0.5);
	backdrop-filter: blur(5px);
	transition: all 0.3s;
	animation: enter 0.4s
}

.DashBoard:hover {
	width: 30vh;
	min-height: 20em;
}

@keyframes enter {
	from {
		transform: translateX(-120px);
		opacity: 0;
	}
}
</style>