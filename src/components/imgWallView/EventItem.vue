<template>
	<section class="eventItem">
		<div class="itemMain">
			<h1>{{ eventData.title }}</h1>
			<img :src='getImgUrl' alt="">
		</div>

	</section>
	<div class="datePoint">
		<svg class="point" width="40" height="40" viewbox="0 0 40 40">
			<circle cx="20" cy="20" r="10" fill="var(--color-c)" stroke="var(--color-a)" stroke-width="8" />
		</svg>
		<span class="text" :index="props.index">{{ eventData.date }}</span>
	</div>

</template>

<script setup lang="ts">
import { computed, onMounted, type Ref } from 'vue';
const props = defineProps<{
	eventData: any,
	selectDate?: any,
	index: number
}>()

const eventData = props.eventData

const getImgUrl = computed(() => {
	return `${import.meta.env.BASE_URL}source/eventItem/img/${eventData.img}`
})
onMounted(() => {

})

</script>

<style scoped lang="scss">
.eventItem {
	width: 100%;
	height: min(var(--item-height), 250px);
	// height: 100%;

	// margin: 0 1rem;

	border-radius: 10px;
	background-color: var(--color-c);

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	animation: appear 1s ease-in-out;

	// overflow: visible;


	.itemMain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 0.5rem;


		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

	}
}


.datePoint {
	position: absolute;
	width: 100px;
	height: 80px;
	// background-color: rgba(0, 21, 40, 0.33);

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	// 绝对定位，居中
	// 由于父元素 align-items: center，所以子元素会垂直居中
	top: 50%;
	transform: translateY(-50%);

	.text{
		position: absolute;
		font-size: var(--font-size-small);
	}

	// 朝上的eventItem
	.text[index = '0']{
		bottom: 0;
	}
	// 朝下的eventItem
	.text[index = '1']{
		top: 0;
	}

}
</style>