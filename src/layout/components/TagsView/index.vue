<template>
	<div class="tags-view-container">
		<scroll-pane
			ref="scrollPane"
			class="tags-view-wrapper"
			@scroll="handleScroll"
		>
			<router-link
				v-for="tag in visibleViews"
				ref="tag"
				:key="tag.path"
			>

			</router-link>
		</scroll-pane>
	</div>
</template>

<script>
    import ScrollPane from "@/layout/components/TagsView/ScrollPane";
    export default {
        name: "index",
        components: {ScrollPane}
    }
</script>

<style scoped>

</style>