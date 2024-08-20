<template>
	<div class="filter-lib">
		<svg>

			<filter id="gooey">
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" />
				<feColorMatrix type="matrix" values=" 1 0 0 0 0  
				0 1 0 0 0  
				0 0 1 0 0  
				0 0 0 18 -7" />
			</filter>
		</svg>

	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.filter-lib{
	display: none;
}
</style>