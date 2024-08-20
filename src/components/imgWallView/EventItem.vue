<template>
	<section class="eventItem" :index="props.index">
		<div class="itemMain">
			<h1>{{ eventData.title }}</h1>
			<img :src='"/src/source/eventItem/img/" + eventData.img' alt="">
		</div>

	</section>
	<div class="datePoint">
		<svg class="point" width="40" height="40" viewbox="0 0 40 40">
			<circle cx="20" cy="20" r="10" fill="var(--color-c)" stroke="var(--color-a)" stroke-width="8" />
		</svg>
		<span class="text">{{ eventData.date }}</span>
	</div>

</template>

<script setup lang="ts">
import { computed, onMounted, type Ref } from 'vue';
const props = defineProps<{
	eventData: any,
	selectDate?: any,
	index: number
}>()

const temp = import('@/source/eventItem/img/1.jpg')
const eventData = props.eventData
const imgUrl = '@/source/eventItem/img/' + eventData.img
console.log(new URL(imgUrl, import.meta.url).href)

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

.eventItem[index='0'] {
	align-self: end;
}

.eventItem[index='1'] {
	align-self: start;
}

// .eventItem::after {
// 	content: "";
// 	position: absolute;
// 	width: var(--item-width);
// 	width: 100%;
// 	top: 52px;
// 	height: calc(100% - 40px);

// 	backdrop-filter: url(#gooey);

// }
.datePoint {
	position: absolute;
	width: 40px;
	height: 100px;
	background-color: rgba(0, 21, 40, 0.33);

	// 绝对定位，居中
	// 由于父元素 align-items: center，所以子元素会垂直居中
	top: calc(50% - 50px);

	.point,
	.text {
		position: absolute;
		transform: translateY(-50%);
	}

	.point {
		top: calc(50%);
	}

}
</style>