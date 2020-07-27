<template>
	<div :class="classObj" class="app-wrapper">
		<div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
		<SideBar class="sidebar-container"/>
		<div class="main-container">
			<div class="">
				<!-- NavBar -->
				<navbar/>
				<!-- TagsView -->
			</div>
			<app-main/>
		</div>
	</div>
</template>

<script>
    import {mapState} from 'vuex';
    import {SideBar} from './components';
    import AppMain from "@/layout/AppMain";
    import Navbar from "@/layout/components/Navbar";

    export default {
        name: 'Layout',
        components: {
            Navbar,
            AppMain,
            SideBar,
        },
        computed: {
            ...mapState({
                sidebar: state => state.app.sidebar,
                device: state => state.app.device,
                showSettings: state => state.settings.showSettings,
                needTagsView: state => state.settings.tagsView,
                fixedHeader: state => state.settings.fixedHeader
            }),
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('app/closeSidebar', {
                    withoutAnimation: false
                })
            }
        }
    }
</script>

<style scoped>
	.app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.drawer-bg {
		background: #000;
		opacity: 0.3;
		width: 100%;
		top: 0;
		height: 100%;
		position: absolute;
		z-index: 999;
	}

	.sidebar-container {
		width: 200px;
	}
</style>
