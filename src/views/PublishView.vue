<template>
	<el-scrollbar height="100%" ref="scrollArea">
		<div class="publish" ref="elPublishMain">
			<game-item v-for="item in gameList" :itemInfo="item" />
		</div>
		<div class="mask" mask ref="elMask"></div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import GameItem from '@/components/publishView/GameItem.vue';
import publishViewData from '@/settings/publishItem/main.json'

import { smoothTransition, getRowAndColumn } from '@/assets/js/main';
import _ from 'lodash';



const gameList = publishViewData.itemList

const hasNotAni = ref<Boolean>(true)
const elPublishMain = ref<HTMLElement>()
const elAni = ref<HTMLElement>()
const elMask = ref<HTMLElement>()
const logRowAndColumn = ref<Object>({ rowCount: 0, columnCount: 0 })

gsap.registerPlugin(Flip)

const elMaskOp = {
	show: () => {
		elMask.value!.style.display = 'block'
		gsap.fromTo('.mask', {
			x: "-100vw",
			y: "-100vh",
		},
		{
			x: 0,
			y: 0,
			duration: 0.5,
			opacity: 1,
		})
	},
	hide: () => {
		gsap.to('.mask', {
			duration: 0.5,
			opacity: 0,
			onComplete: () => {
				elMask.value!.style.display = 'none'
			}
		})
	}
}

class elGridResize {
	constructor(
		private elPuBlishMain = elPublishMain.value!,
		private elPublishChilds = elPublishMain.value!.children
	) { }

	setStyle() {
		const { rowCount, columnCount } =
			getRowAndColumn(this.elPublishChilds)
		const gameItemHeight = 260
		const headerHeight = document.querySelector('header')!.clientHeight

		// 比较, 使高度必须大于可视高度， 防止动画被遮挡
		this.elPuBlishMain.style.height =
			`max(${gameItemHeight * rowCount + 30}px, calc(100vh - ${headerHeight}px))`

	}

	setLog(logList: Ref<Object>) {
		logList.value = getRowAndColumn(this.elPublishChilds)
		return logList.value
	}
}

onMounted(() => {
	elPublishMain?.value?.focus()
	const curRouteName = useRoute().name

	const elMainResize = new elGridResize()

	elMainResize.setStyle()
	elMainResize.setLog(logRowAndColumn)
	const resizeEvent = () => {
		elMainResize.setLog(logRowAndColumn)

		watch(logRowAndColumn, (newVal, oldVal) => {
			if (!_.isEqual(newVal, oldVal)) {
				smoothTransition(elPublishMain.value!, () => {
					elMainResize.setStyle()
				})
			}
		})
	}
	window.addEventListener('resize', resizeEvent)
	// window.removeEventListener('resize', resizeEvent)

	document.onclick = (e) => {
		const target = e.target as HTMLElement;
		const elMask = document.getElementsByClassName('mask')[0]
		if (target.className === "gameItem" && hasNotAni.value) {
			console.log('clicked')
			elAni.value = target

			elMaskOp.show()
			const state = Flip.getState(".gameItem")
			elAni.value!.style.zIndex = '998' // 置于页面最上层
			elAni.value!.classList.add('detailBox')
			Flip.from(state, {
				duration: 0.8,
				ease: "sine.out"
			})
			hasNotAni.value = !hasNotAni.value
		} else if (target !== elAni.value && !hasNotAni.value) {

			elMaskOp.hide()
			// 保证 detailBox 置于页面最上层， 直至动画结束
			elAni.value!.style.zIndex = '998'
			const state = Flip.getState(".gameItem", { props: 'zIndex' })
			elAni.value!.classList.remove('detailBox')
			Flip.from(state, {
				duration: 0.8,
				ease: "sine.in",
				onComplete: () => {
					elAni.value!.removeAttribute('style')
				}
			})

			hasNotAni.value = !hasNotAni.value
		}
	}
})
</script>

<style lang="scss" scoped>
.publish {
	width: 100%;

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(180px, 200px));
	grid-template-rows: repeat(auto-fill, 260px);
	place-items: center;
	justify-items: center;
	align-items: end;
	justify-content: space-evenly;
	align-content: start;
	grid-gap: 0 0;

	overflow: visible;

}


.mask {
	display: none;

	position: absolute;
	bottom: 0;
	right: 0;
	height: 100vh;
	width: 100vw;

	background:
		repeating-linear-gradient(-50deg,
			#0000005a,
			#0000005a 4px,
			#ffffff16 4px,
			#ffffff16 8px,
		);

	// backdrop-filter: blur(3px);

	z-index: 4;
	animation: all 0.5s ease-in-out;
}
</style>