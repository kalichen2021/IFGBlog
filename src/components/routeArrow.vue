<template>
	<transition name="icon-fade-in">
		<RouterLink :to="routeList[index]" @click="() => {
			index = (index + 1) % routeList.length
		}">
			<div class="leadIcon">
				<!-- 提示下滑图标 -->
				<i-ep-arrow-down-bold />
				<i-ep-arrow-down />
			</div>
		</RouterLink>
	</transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let index = ref(0)
const routeList = ref(["/","/imgWall", "/publish"])


</script>

<style scoped lang="scss">
@mixin flex-style {
	display: flex;
	justify-content: center;
	align-items: center;
}
.leadIcon {
	@include flex-style;
	flex-direction: column;
	opacity: 0.5;
	position: absolute;
	bottom: 1rem;
	left: calc(50% - 2.5rem);
	font-size: 2.5rem;

	transition: all 0.5s;

	svg {
		margin-bottom: -2rem;
		transform: scale(2.5, 0.4);
		transition: margin-bottom 0.5s;
	}

	&:hover {
		bottom: 3rem;
		opacity: 0.8;
		transform: scale(1, 1.4);
	}
}
</style>