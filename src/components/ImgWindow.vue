<template>
	<div class="imgWindow" ref="elImgWin" :style="{ backgroundImage: `url(${imgUrl})` }">
	</div>
</template>

<script setup lang="ts">
import {randMove} from "@/assets/js/base"
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
	imgUrl: {
		type: String,
		require: true
	},
	size: {
		type: Number,
		require: false
	}
})



const elImgWin = ref<HTMLDivElement>()

onMounted(() => {
	elImgWin.value?.focus()


	const parentElement = elImgWin.value?.parentElement;
	const parentWidth = parentElement?.offsetWidth;
	const parentHeight = parentElement?.offsetHeight;

	// let winSize = (!props.size ? Math.random() * 300 + 90 : props.size) + "px"
	// elImgWin.value.style.width = elImgWin.value.style.height = winSize;
	// setInterval(() => {

	// 	elImgWin.value.style.left += Math.abs((Math.random() * parentWidth - elImgWin.value.offsetWidth - elImgWin.value.style.left)) + 'px'
	// 	elImgWin.value.style.top += Math.abs((Math.random() * parentHeight - elImgWin.value.offsetHeight - elImgWin.value.style.left)) + 'px'
	// },100)
	setInterval(() => {
		if (elImgWin.value && parentHeight) {
			let pElTop:number | String = elImgWin.value.style.top
			pElTop = parseInt(pElTop?.replace("px", ""), 10);
			let styleTop = randMove(parentHeight, 5, pElTop) + 'px'
			elImgWin.value.style.top = styleTop
		}
		// console.log(randMove(parentHeight, 5, pElTop))
	}, 100)
})
</script>

<style scoped lang="scss">
.imgWindow {
	position: absolute;
	border-radius: 50%;

	background-size: cover;
	background-position: center;

	// top: 20px;
	// left: 20px;
	transition: all 1s linear;
}
</style>