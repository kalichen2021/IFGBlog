<template>
	<div class="gameItem">
		<img src="@/assets/img/gameItem/2.jpg" alt="">
		<main class="infoBox">
			<div game-name>{{ itemInfo.gameName }}</div>
			<div class="tagList">
				<span v-for="i in tagList">{{ i }}</span>
			</div>
			<div class="text">
				{{ itemInfo.describtion }}
			</div>
			<!-- <div class="text describtion"></div> -->
		</main>
	</div>
</template>

<script setup lang="ts">

const props = defineProps({
	itemInfo: {
		type: Object,
		required: true
	}
})

const tagList = props.itemInfo.tag
</script>

<style lang="scss" scoped>
.gameItem {
	--border-radius: 10px;
	display: flex;
	flex-direction: column;

	width: 90%;
	height: 90%;
	padding-bottom: 0.4rem;
	background-color: var(--color-da1);

	border: 1px solid transparent;
	background-clip: padding-box, border-box;
	background-origin: padding-box, border-box;
	background-image:
		linear-gradient(to right, var(--color-ca2), var(--color-ca2)),
		linear-gradient(90deg, var(--color-ba2), var(--color-d));

	box-shadow: var(--color-aa2) 0px 10px 30px 0px;

	border-radius: var(--border-radius);
	backdrop-filter: blur(2px);


	&:hover {
		img {
			height: 50%;
		}

		.infoBox>.text {
			white-space: wrap;
			text-indent: 1em; // 缩进
			color: var(--color-font-minor1);
			font-weight: 200;
		}
	}

	img {
		width: 100%;
		height: 70%;
		border-radius: 10px;
		object-fit: cover;

		transition: all 0.3s ease-out;

		pointer-events: none;
	}

	.infoBox {
		width: 100%;
		height: auto;
		flex: 1;
		padding: 0 0.2rem;

		display: flex;
		flex-flow: column nowrap;
		--item-height: 1.6rem;

		div[game-name] {
			height: var(--item-height);

			margin: 0 0.2rem;

			color: var(--color-font);
			font-size: 1.2rem;
			font-weight: 500;
		}

		.tagList {
			height: 1.2rem;
			width: 100%;
			border-top: 0.1rem solid var(--color-ca1);

			display: flex;
			align-items: center;
			justify-content: flex-start;

			span {
				height: 0.8rem;
				border-radius: 0.5rem;

				margin: 0 0.2rem;
				padding: 0 0.2rem;

				font-size: 0.6rem;
				font-weight: 500;
				color: var(--color-font);

				display: inline-flex;
				align-items: center;
				justify-content: center;

				background-color: var(--color-ba1);
			}
		}

		.text {
			flex: 1;

			white-space: nowrap;
			font-family: Arial, sans-serif;
			/* 启用自动断字功能，有助于在单词过长时适当断开，英文适用 */
			hyphens: auto;
			/* 允许单词在必要时换行，避免撑破容器 */
			word-wrap: break-word;
			// 溢出省略号
			text-overflow: ellipsis;

			padding: 0 0.2rem;

			// 溢出文字淡出
			background-image: linear-gradient(to right, var(--color-font-minor1), var(--color-font-minor1) 60%, rgba(255, 255, 255, 0) 100%);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-clip: text;
			-webkit-background-clip: text;
			color: transparent;
			display: inline-block;
			/* 确保背景仅应用于文本内容 */

			transition: all 0.3s ease-out;
		}
	}
}

.detailBox {
	position: fixed;
	top: 5vh;
	width: 80vw;
	height: 90vh;
	z-index: 5;

	display: flex;
	flex-flow: row wrap;
	overflow: visible;
	align-items: center;
	justify-content: center;

	img {
		height: 80%;
		width: min(20%, 200px);

		margin-left: -50px;
	}

	.infoBox {
		display: flex;
		flex-flow: column wrap;
		height: 100%;

		div[game-name] {
			height: auto;
			font-size: 1.8rem;
		}

		.text {
			margin: 1.5rem 1rem;
			flex: 1;
			white-space: wrap;
			text-indent: 1em; // 缩进
			color: var(--color-font-minor1);
			font-weight: 200;
		}
	}

	&:hover img {
		height: 80%;
	}

}
</style>