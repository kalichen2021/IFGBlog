<template>
	<div class="dashBoard">
		<span></span>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.dashBoard {
	display: none;
	
	width: $dashBoardWidth;
	height: 60vh;
	background-color: var(--color-aa2);
	backdrop-filter: blur(2px);

	position: absolute;
	left: $dashBoardLeft;
	top: 20vh;

	border-radius: calc($dashBoardWidth/2);
	transition: all 0.2s ease-in-out;

	z-index: 20;

	&:hover {
		width: 200px;
	}
}
</style>