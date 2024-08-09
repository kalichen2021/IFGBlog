<template>
	<header>
		<span img>
			<img src="@/assets/logo.svg" alt="IFGLogo">
		</span>
		<span>home</span>|
		<span>about</span>|
		<span>publish</span>|
		<span>imgWall</span>
	</header>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">



header {
	width: 100%;
	height: $headerSize;
	background-color: var(--color-aa2);
	display: flex;
	justify-content: flex-start;
	padding: 0 10px;
	align-items: center;

	backdrop-filter: blur(2px);
	-webkit-backdrop-filter: blur(10px);

	span:not(:has(img)) {
		flex-grow: 1;
		max-width: 80px;
		text-align: center;
		font-size: 1rem;
		font-weight: bold;
		color: var(--color-font);
		cursor: pointer
	}

	span:has(img) {
		display: flex;
		align-items: center;
		flex-grow: 2;

		img {
			width: $headerSize*0.9;
			height: $headerSize*0.9;
			object-fit: fill;

			border-radius: 50%;
			background-color: var(--color-da1);
		}
	}
}
</style>