<template>
	<div :class="{'has-logo': showLogo}">
		<logo v-if="showLogo" :collapse="isCollapse"/>
		<el-menu
				:default-active="activeMenu"
				:collapse="isCollapse"
				class="el-menu-vertical-demo"
				background-color="#304156"
				text-color="#bfcbd9"
				mode="vertical"
		>
			<sidebar-item
					v-for="(route, index) in permission_routes"
					:key="route.path + index"
					:item="route"
					:base-path="route.path"
			/>
		</el-menu>
	</div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import logo from './Logo';
    import SidebarItem from "@/layout/components/SideBar/SidebarItem";

    export default {
        name: "index",
        components: {
            SidebarItem,
            logo
        },
        created() {
        },
        computed: {
            ...mapGetters(['permission_routes']),
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