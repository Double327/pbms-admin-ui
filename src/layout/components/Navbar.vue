<template>
	<div class="navbar">
		<Hamburger
				id="hamburger-container"
				:is-active="sidebar.opened"
				class="hamburger-container"
				@toggleClick="toggleSidebar"/>
		<div class="right-menu">
			<el-dropdown
					class="avatar-container right-menu-item hover-effect"
					trigger="click">
				<div class="avatar-wrapper">
					<img :src="avatar" class="user-avatar"/>
					<i class="el-icon-caret-bottom"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<router-link to="/user/profile">
						<el-dropdown-item>个人中心</el-dropdown-item>
					</router-link>
					<el-dropdown-item @click.native="setting = true">
						<span>布局设置</span>
					</el-dropdown-item>
					<el-dropdown-item @click.native="logout">
						<span>退出登录</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Hamburger from '@/components/Hamburger';

    export default {
        name: "Navbar",
        components: {
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar',
                'device'
            ]),
            setting: {
                get() {
                    return this.$route.state.setting.showSettings;
                },
                set(val) {
                    this.$store.dispatch('settings/changeSetting', {
                        key: 'showSettings',
                        value: val
                    })
                }
            }
        },
        methods: {
            toggleSidebar() {
                return this.$store.dispatch('app/toggleSidebar');
            },
            async logout() {
                this.$confirm('确定退出登录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('Logout').then(() => {
                        location.href = '/index';
                    })
                });
            }
        }
    };
</script>

<style scoped>
	.navbar {
		height: 50px;
		overflow: hidden;
		position: relative;
		background: #ffffff;
		box-shadow: 0 1px 3px rgba(0, 21, 41, .08);
	}

	.navbar .hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background .3s;
		-webkit-tap-highlight-color: transparent;
	}

	.navbar .hamburger-container:hover {
		background: rgba(0, 0, 0, .025);
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;
	}

	.right-menu:focus {
		outline: none;
	}

	.right-menu-item {
		display: inline-block;
		padding: 0 8px;
		height: 100%;
		font-size: 18px;
		color: #5a5e66;
		vertical-align: text-bottom;
	}

	.avatar-container {
		margin-right: 30px;
	}

	.avatar-container .avatar-wrapper {
		margin-top: 5px;
		position: relative;
	}

	.avatar-wrapper .user-avatar {
		cursor: pointer;
		width: 40px;
		height: 40px;
		right: -20px;
		top: 25px;
		font-size: 12px;
	}

	.avatar-wrapper .el-icon-caret-bottom {
		cursor: pointer;
		position: absolute;
		right: -20px;
		top: 25px;
		font-size: 12px;
	}

</style>