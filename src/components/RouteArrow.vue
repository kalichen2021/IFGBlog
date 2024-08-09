<template>
	<RouterLink :to="routeLinkList[index]" @click="() => {
		index = (index + 1) % routeLinkList.length
	}">
		<div class="routeArrow">
			<i-ep-arrow-right-bold />
			<i-ep-arrow-right-bold />
		</div>
	</RouterLink>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const index = ref(0)
const routeLinkList = [
	"/imgwall",
	"/publish",
	"/about",
	"/",
]

</script>

<style lang="scss" scoped>
.routeArrow {
	position: absolute;
	right: 10px;
	top: 50%;
	display: flex;
	flex-direction: row;

	transform: translate(-50%) scale(1, 4);
	overflow: visible;
	transition: transform 0.25s ease-in;

	&:hover {
		// transform-origin: bottom;
		transform: translate(-50%) scale(1, 5);
	}

	* {
		margin: 0 -4px;
	}
}
</style>