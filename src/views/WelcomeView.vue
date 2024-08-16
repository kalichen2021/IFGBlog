<template>
	<div welcome>
		<main>IFG</main>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
div{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	font-size: 100px;
	font-weight: bold;
	// font-family: 'Courier New', Courier, monospace

	main {
		font-family: 'Courier New', Courier, monospace;
		font-weight: bold;
		font-size: 2em;
		background: linear-gradient(90deg, var(--color-font) 0%, var(--color-aa1) 90%);
		background-clip: text;
		color: transparent;
	}
}
</style>