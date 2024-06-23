<template>
	<div class="publish">
		<itemBox v-for="item in items" :item="item" />
	</div>
</template>

<script setup lang="ts">
import itemBox from "@/components/itemBox.vue"
import data from "@/assets/viewsRes/PublishView/index.json"

const items = data.itemList
const imgFolder = import.meta.glob('@/assets/viewsRes/PublishView/img*.{jpg,jpeg,png,gif,svg}');


</script>

<style scoped lang="scss">
.publish{
	width: 90vw;
	height: 100%;
	justify-content: center;
	align-content: start;

	//flex-wrap:wrap;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 220px));
	grid-template-rows: repeat(auto-fill, minmax(250px, 1fr));
	justify-items: center;

}
</style>