<template>
	<div :class="{'has-logo': showLogo}">
		<logo v-if="showLogo" :collapse="isCollapse"/>
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
					:default-active="activeMenu"
					:collapse="isCollapse"
					background-color="#304156"
					text-color="#bfcbd9"

					mode="vertical"
			>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
    import logo from './Logo'

    export default {
        name: "index",
        components: {
            logo
        },
        computed: {
            showLogo() {
                return true;
            },
            activeMenu() {
                const route = this.$route;
                const {meta, path} = route;
                if (meta.activeMenu) {
                    return meta.activeMenu;
                }
                return path;
            },
            isCollapse() {
                return false;
            }
        }
    }
</script>

<style scoped>

</style>