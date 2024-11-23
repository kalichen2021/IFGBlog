<template>
	<div welcome>
		<main>
			<img><img><img><img><img>
		</main>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const getCenterOffset = (clientX: number, clientY: number) => {
	return {
		x: (clientX - window.innerWidth / 2) / window.innerWidth,
		y: (clientY - window.innerHeight / 2) / window.innerHeight
	}
}
const imgRotate = (e: MouseEvent, imgList: HTMLElement[], oTransform: string) => {
	// img.style.transform = `rotateY(${img.style.transform})`
	const { x, y } = getCenterOffset(e.clientX, e.clientY)
	for (let img of imgList) {
		// 旋转
		//-- 除去rotateY和rotateX
		const rotateStyle = `rotateY(${x * 30}deg) rotateX(${y * -30}deg)`;
		img.style.transform = oTransform ? `${oTransform} ${rotateStyle}` : rotateStyle

		// 影子
		img.style.filter = `drop-shadow(${x * -10}px ${y * -10}px 10px var(--color-d))`;
	}
}



onMounted(() => {
	const imgList = Array.from(document.querySelectorAll('div[welcome] img')) as HTMLImageElement[];
	for (let i = 0; i < 5; i++) {
		const img = imgList[i]
		img.src = `./source/welcomeView/logoLayers/${i + 1}.png`
		img.alt = `layer${i + 1}`
	}

	const oTransform = imgList[0].style.transform
	let isFirstAni = true
	document.addEventListener('mousemove', (e) => {
		requestAnimationFrame(() => {
			imgRotate(e, imgList, oTransform)
		})
	})
	document.addEventListener('mouseleave', (e) => imgList.forEach(img => {
		img.style.transition = 'transform 800ms'
		img.style.transform = oTransform
		setTimeout(() => {
			img.style.transition = ''
		}, 800)
	}))
})

</script>

<style scoped lang="scss">
$perspectiveDis: 1000px;


div {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	font-size: 100px;
	font-weight: bold;
	// font-family: 'Courier New', Courier, monospace

	main {
		font-family: 'Courier New', Courier, monospace;
		width: 100%;
		height: 100%;
		// font-weight: bold;
		// font-size: 2em;
		// background: linear-gradient(90deg, var(--color-font) 0%, var(--color-aa1) 90%);
		// background-clip: text;
		// color: transparent;
		transform-style: preserve-3d;
		perspective: $perspectiveDis;

		img {
			position: absolute;
			width: 100%;
			height: 100%;
			object-fit: contain;
			overflow: hidden;

			// top: 50%;
			// left: 50%;
			// transform: translate(-50%, -50%);
			// background-color: aliceblue;

			filter: drop-shadow(0 0 10px var(--color-d));
			transition: all 0.1s;
		}

		$offsetZ: 20px;
		$rotateY: 0deg;

		// 景深设置
		@for $i from 1 through 5 {
			img:nth-child(#{$i}) {
				$step: $i * 1;
				transform-origin: center center (-($offsetZ * $step));
				transform:
					translateZ($offsetZ * $step) scale(calc($perspectiveDis / ($perspectiveDis + $offsetZ * $step))) rotateY($rotateY);
			}
		}
	}
}
</style>