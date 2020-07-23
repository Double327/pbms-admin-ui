<template>
	<div v-if="!item.hidden">

	</div>
</template>

<script>
    export default {
        name: "SidebarItem",
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>