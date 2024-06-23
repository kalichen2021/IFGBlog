<template>
	<div class="item-box" ref="elItemBox">
		<img :src="imgPath" alt="">
		<div class="txt-box">
			<span id="item-name">{{ item.name }}</span>
			<div class="tag">

				<span id="tag" v-for="tag in item.tags">{{ tag }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
	item: {
		type: Object,
		required: true
	}
})
const rootPath = "/src/assets/viewsRes/PublishView/"
const imgPath = rootPath + "img/" + props.item.img
const elItemBox = ref<HTMLDivElement>()

onMounted(() => {
	// const elItemBox = document.querySelector(".item-box") as HTMLElement

	if (elItemBox.value)
		(function () {
			elItemBox.value?.focus()
			const handler = () => {
				elItemBox.value?.classList.add("item-box-active");
				elItemBox.value?.removeEventListener("click", handler);
			};
			elItemBox.value?.addEventListener("click", handler);
		})();
})
</script>

<style scoped lang="scss">
.item-box {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;

	width: 80%;
	height: 90%;

	border: red 1px solid;
	margin: 1rem;
	border-radius: 1rem;

	img {
		border-radius: 1rem;
		width: 100%;
		height: 65%;
		object-fit: cover;
		object-position: center;

		transition: all 0.3s;
	}

	&:hover {
		img {
			height: 50%;
		}
	}
}

// 点击卡片，查看详情
.item-box-active::after {
	$style-height: 85vh;
	$style-width: 85vw;

	content: '<div></div>';
	position: absolute;
	display: flex;
	height: $style-height;
	width: $style-width;

	top: calc(50% - $style-height/2);
	left: calc(50% - $style-width/2);

	background-color: #00000088;
	border-radius: 1rem;
	backdrop-filter: blur(10px);

	animation: showDetailBox 1s;
}

@keyframes showDetailBox {
	from {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;

		width: 80%;
		height: 90%;

		border: red 1px solid;
		margin: 1rem;
		border-radius: 1rem;
	}
}

.txt-box {
	width: 100%;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	#item-name {
		font-size: 1.5rem;
	}

	.tag {
		display: flex;

		span {
			height: 1.2rem;
			font-size: 1rem;
			color: black;
			border-radius: 0.2rem;
			margin: 0 0.2rem;

			padding: 0 0.2rem;
			text-align: center;
			vertical-align: middle;
			line-height: 1rem;
			background-color: aqua;
		}
	}
}
</style>