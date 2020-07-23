<template>
	<div class="sidebar-logo-container" :class="{'collapse': collapse}">
		<transition name="sidebarLogoFade">
			<router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
				<img v-if="logoUrl" :src="logoUrl" class="sidebar-logo"/>
				<h1 v-else class="sidebar-title">{{title}}</h1>
			</router-link>
			<router-link v-else key="expand" class="sidebar-logo-link" to="/">
				<img v-if="logoUrl" :src="logoUrl" class="sidebar-logo"/>
				<h1 v-else class="sidebar-title">{{title}}</h1>
			</router-link>
		</transition>
	</div>
</template>

<script>
    export default {
        name: "Logo",
        props: {
            collapse: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {}
        },
        computed: {
            title: {
                default: '达布尔博客管理系统'
            },
            logoUrl: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>