<template>
	<div class="imgwall">
		<span class="curDate">
			<el-date-picker v-model="selectDate" type="month" format="YYYY [年] M [月]" placeholder="Select week" />
		</span>
		<main class="eventList">
			<line ref="elLine"></line>
			<div v-for="(item, index) in eventList" class="item">
				<enent-item :eventData="item" :selectDate="selectDate" :index="index % 2"></enent-item>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import enentItem from '@/components/imgWallView/EventItem.vue'

import imgWallData from '@/source/eventItem/main.json'

const elLine = ref<HTMLDivElement | null>(null)
const lineBg = ref<string>('123')
const selectDate = ref<Date>(new Date())
const eventList: any[] = imgWallData.eventList

const colorList = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']


const lineBackgroundSet = () => {
	const colorStr = colorList.slice(0, eventList.length + 1).join(',')
	lineBg.value = `linear-gradient(to right, ${colorStr})`
	elLine.value!.style.background = lineBg.value
}

onMounted(() => {
	elLine.value?.focus()
	// lineBackgroundSet()

})

</script>

<style scoped lang="scss">
$eventItemOffset: 40vh;

.imgwall {
	--shadow-size: 100px;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	.curDate {
		height: auto;
		width: 100%;

		padding: 0.3rem;
		text-align: center;
	}

	line {
		position: absolute;
		left: 0;
		width: 100vw;
		height: 0.5rem;

		background-color: var(--color-b);
	}


	.eventList {
		display: flex;
		flex-direction: row;
		// justify-content: flex-start;
		align-items: center;

		height: 100%;
		width: 100%;

		padding: 0 var(--shadow-size);
		overflow-x: auto;

		.item {
			--item-width: 220px;
			--item-height: 35vh;
			--gap-column: 2rem;

			position: relative;
			width: var(--item-width);
			// 2倍加上间距
			height: calc(min(var(--item-height) * 2, 500px) + var(--gap-column));

			flex-shrink: 0;
			/**防止宽度缩小 */
			display: flex;
			flex-direction: column;
			align-items: center;


			margin: 0 1rem;
			overflow: visible;

			animation: appear 1s ease-in-out;
		}

		/* up box */
		.item:nth-child(2n+2) {
			// margin-bottom: $eventItemOffset;
			justify-content: flex-start;

		}

		/* down box */
		.item:nth-child(2n+1) {
			// margin-top: $eventItemOffset;
			justify-content: flex-end;

			.point {
				top: calc(50% - $eventItemOffset / 2);
			}

			.text {
				top: calc(50% - $eventItemOffset / 2 - 1.5rem);
			}
		}
	}

}

@keyframes appear {
	from {
		opacity: 0;
		scale: 0.5;
	}

	to {
		opacity: 1;
		scale: 1;
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
	z-index: 30;
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