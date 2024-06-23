<script setup lang="ts">
import { onMounted, ref, } from 'vue'
import { RouterLink} from 'vue-router'
import IconIFG from '@/components/icons/IconIFG.vue'

// region
// let timer: any = null
// const SCROLL_SPEED = 5
// const elIconIFG = ref()

// const props = defineProps({
// 	prop_IfWheel: {
// 		type: Object,
// 		required: true
// 	},
// 	prop_scrollTop: {
// 		type: Function,
// 		required: true
// 	},
// 	prop_wheelAni: {
// 		type: Function,
// 		required: true
// 	}
// })

// onMounted(() => {
// 	console.log(props.prop_scrollTop().get())
// })


// // 点击箭头，自动滚动一段距离
// const AutoScroll = (timer: any, scrollTop: Function) => {
// 	if (timer) {
// 		clearInterval(timer)
// 	}
// 	timer = setInterval(() => {
// 		// 获取滚动容器
// 		let ValscrollTop = scrollTop().get() + SCROLL_SPEED;
// 		scrollTop().set(ValscrollTop)
// 		// 模糊度变化
// 		props.prop_wheelAni(scrollTop().get())
// 		// console.log(container.scrollTop)
// 	})
// 	setTimeout(() => clearInterval(timer), 200) // 0.5s后停止滚动

// }
// endregion
</script>

<template>
	<main>
		<div class="welcomeText">
			<IconIFG ref="elIconIFG" />
			<p>这是一个简单的Vue.js应用程序，用于展示欢迎界面。</p>
		</div>
	</main>
</template>


<style scoped lang="scss">
/* #region Golobal Settings*/
h1 {
	font-size: 5em;
	color: var(--color-heading);
}
p {
	color: var(--color-text);
}

@mixin flex-style{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
}
/* #endregion */

/* #region animation*/
/* #endregion */


main {
	@include flex-style;
	width: auto;
	height: 100%;
	gap: 1rem;
	color: #fff;
	font-size: 1.9rem;
	margin-left: -5vw; //取消偏移
}

main>div {
	@include flex-style;

	height: 100%;
}


/* .leadIcon>svg:hover{
	margin-bottom: 0;
} */
</style>