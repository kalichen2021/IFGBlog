<template>
	<header>
		<span img>
			<img src="@/assets/logo.svg" alt="IFGLogo">
		</span>
		<div class="routes">
			<span>home</span>
			<span>about</span>
			<span>publish</span>
			<span>imgWall</span>
		</div>
		&nbsp;&nbsp;|&nbsp;&nbsp;
		<div class="other">

			<span i18n>
				<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="24" height="24"
					viewBox="0 0 24 24">
					<path d="M0 0h24v24H0z" fill="none"></path>
					<path
						d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ">
					</path>
				</svg>
			</span>
			<span more>
				<i-ep-more-filled />
			</span>
		</div>

	</header>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted } from 'vue';

const getI18nForHeadBox = async () => {
	const res = await axios.get(`${import.meta.env.BASE_URL}/source/i18n.json`)
	return res.data.HeadBox
}

onMounted(() => {
	getI18nForHeadBox().then((data) => {
		const i18nForHeadBox = data
		console.log(i18nForHeadBox)
	})
})
</script>

<style scoped lang="scss">
@mixin flexCC {
	display: flex;
	align-items: center;
	justify-content: center;
}

header {
	width: 100%;
	height: $headerSize;
	background-color: var(--color-aa2);
	display: flex;
	justify-content: flex-start;
	padding: 0 10px;
	align-items: center;

	backdrop-filter: blur(2px);
	-webkit-backdrop-filter: blur(10px);

	span[img] {
		display: flex;
		align-items: center;
		flex-grow: 1;

		img {
			width: $headerSize*0.9;
			height: $headerSize*0.9;
			object-fit: fill;

			border-radius: 50%;
			background-color: var(--color-da1);
		}
	}


	.routes,
	.other {
		border-radius: 50px;
		height: 70%;
		background-color: var(--color-aa2);

		@include flexCC;

		padding: 0 10px;

		span {
			@include flexCC;
			margin: 0 10px;

			font-size: var(--font-size-medium);
			font-weight: 500;
			color: var(--color-font);
			fill: var(--color-font);

			cursor: pointer;
		}

		span:hover {
			color: var(--color-aa1);
			fill: var(--color-aa1);
		}

		span[i18n]::after{
			content: '^';
		}
	}

}
</style>