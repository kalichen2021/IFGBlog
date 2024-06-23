<template>
	<div class="ScrollBox" ref="elScrollBox">
		<div class="text">
			<h2 id="textVal" ref="elTextVal"></h2>
			<small>Scrolled</small>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';


const elTextVal = ref()
const elScrollBox = ref()
let scrollRatio = 0
const props = defineProps({
	scrollRatio: {
		type: Number,
		required: true
	}
})

onMounted(() => {
	// elTextVal.value.focus()
	// elScrollBox.value.focus()
	let angle = 360 * props.scrollRatio
	
	
	elScrollBox.value.style.background = `conic-gradient(
		from 0deg, #008eff 0%, #f00 ${angle}deg, #000 ${angle}deg)`
		
		
		window.addEventListener('wheel', (e: WheelEvent) => {
			scrollRatio += e.deltaY / 10000
			angle = 360 * scrollRatio
			let percent = Math.round(scrollRatio * 100)
			elTextVal.value.innerHTML = `${percent}<span>%</span>`
			elScrollBox.value.style.background = `conic-gradient(
			from 0deg, #008eff 0%, #f00 ${angle}deg, #000 ${angle}deg)`
	})
})
</script>

<style scoped lang="scss">
.ScrollBox {
	position: fixed;
	width: 60px;
	height: 60px;
	border-radius: 50%;

	bottom: 50px;
	right: 50px;

	display: flex;
	justify-content: center;
	align-items: center;
	/* border: red 1px solid; */

}

.ScrollBox::before {
	content: '';
	position: absolute;
	inset: 2px;
	background-color: black;
	z-index: -1;

	border-radius: 50%;
}

.text {
	position: fixed;
	text-align: center;
	font-size: 0.8rem;
	line-height: 0.8rem;

	small{
		font-size: 0.6rem;
		text-align: center
	}
}

</style>