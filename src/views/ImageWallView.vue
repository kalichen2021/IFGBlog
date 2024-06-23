<script setup lang="ts">
import ImgWindow from '@/components/ImgWindow.vue';

const imgFolder = import.meta.glob('@/assets/img/ImgWall/*.{jpg,jpeg,png,gif,svg}');
let imgFiles: any = []

for (let i in imgFolder) {
	imgFiles.push(i)
}


</script>

<template>
	<div class="ImgWall">
		<h1>ImgWall</h1>
		<div class="imgWallMain">
			<imgWindow v-for="imgItem in imgFiles" :imgUrl="imgItem" />
		<!-- <el-row class="mb-4">
			<el-button>Default</el-button>
			<el-button type="primary">Primary</el-button>
			<el-button type="success">Success</el-button>
			<el-button type="info">Info</el-button>
			<el-button type="warning">Warning</el-button>
			<el-button type="danger">Danger</el-button>
		</el-row> -->
		</div>
	</div>
</template>


<style scoped>
.ImgWall{
	display: flex;
	height: 100%;
	flex-direction: column;
}
.imgWallMain{
	display: flex;
	position: relative;
	height: 80%;
	width: 80vw;
	display: block;
	border: 1px solid red;
}
</style>