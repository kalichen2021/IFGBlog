<template>
	<div class="imgwall">
		<line ref="elLine"></line>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import imgWallData from '@/source/eventItem/main.json'

const elLine = ref<HTMLDivElement | null>(null)
const lineBg = ref<string>('123')
const eventList = imgWallData.eventList

const colorList = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']


const lineBackgroundSet = () => {
	const colorStr = colorList.slice(0, eventList.length + 1).join(',')
	lineBg.value = `linear-gradient(to right, ${colorStr})`
	elLine.value!.style.background = lineBg.value
}

onMounted(() => {
	elLine.value?.focus()
	lineBackgroundSet()
	
})

</script>

<style scoped>
.imgwall {
	--shadow-size: 100px;
	display: flex;
	justify-content: center;
	align-items: center;

	line {
		width: 100%;
		height: 0.5rem;
	}

}

/* 内部两侧阴影 */
.imgwall:before,
.imgwall:after {
	content: "";
	position: absolute;
	top: 0;
	bottom: 0;
	width: var(--shadow-size);
	/* 或其他宽度，作为阴影宽度 */
	background: linear-gradient(var(--linear-direction), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1) 80%, transparent);
}

.imgwall:before {
	--linear-direction: to right;
	left: 0px;
}

.imgwall:after {
	--linear-direction: to left;
	right: 0px;
}
</style>