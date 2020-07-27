<template>
	<div class="login">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
			<h3 class="title">达布尔博客管理系统</h3>
			<el-form-item prop="username">
				<el-input v-model="loginForm.username" type="text" placeholder="请输入账户" auto-complete="off">
					<svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
				</el-input>
			</el-form-item>

			<el-form-item prop="password">
				<el-input v-model="loginForm.password" type="password" placeholder="请输入密码" auto-complete="off">
					<svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
				</el-input>
			</el-form-item>

			<el-form-item prop="code">
				<el-input
						class="code-input"
						v-model="loginForm.code"
						type="text"
						placeholder="请输入验证码"
						auto-complete="off"
						@keyup.enter.native="handleLogin"
				>
					<svg-icon slot="prefix" icon-class="validCode"/>
				</el-input>
				<div class="login-code">
					<img class="code-img" :src="codeUrl" @click="getCode" alt="验证码"/>
				</div>
			</el-form-item>

			<el-form-item>
				<el-button
						:loading="loading"
						@keyup.enter.native="handleLogin"
				>
					<span v-if="!loading" @click="handleLogin">登 录</span>
					<span v-else>登 录 中...</span>
				</el-button>
			</el-form-item>
		</el-form>
		<div class="el-login-footer">
			<span>Copyright &copy; 2019-2020 doublefloat.cn All Rights Reserved.</span>
		</div>
	</div>
</template>

<script>
    import {captchaImage} from "@/api/login";

    export default {
        name: "login",
        data() {
            return {
                codeUrl: '',
                cookiePassword: '',
                loginForm: {
                    username: 'admin',
                    password: '123456',
                    rememberMe: false,
                    code: '',
                    uuid: ''
                },
                loginRules: {
                    username: [
                        {require: true, trigger: 'blur', message: '请输入账户!'}
                    ],
                    password: [
                        {require: true, trigger: 'blur', message: '请输入密码!'}
                    ],
                    code: [
                        {require: true, trigger: 'blur', message: '请输入验证码!'}
                    ]
                },
                loading: false,
                redirect: undefined
            }
        },
        created() {
            this.getCode();
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch("Login", this.loginForm).then(() => {
                            this.$router.push({path: this.redirect || '/'});
                        }).catch(() => {
                            this.loading = false;
                            this.getCode();
                        })
                    }
                })
            },
            getCode() {
                captchaImage().then(res => {
                    this.codeUrl = 'data:image/jpg;base64,' + res.img;
                    this.loginForm.uuid = res.uuid;
                })
            }
        }
    }
</script>

<style scoped>

	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-image: url("../assets/img/login-background.png");
		background-size: cover;
	}

	.title {
		font-size: 38px;
		color: #fff;
		text-align: center;
		margin-top: 0;
	}

	.login-form {
		border-radius: 6px;
		background: rgba(255, 255, 255, .2);
		width: 400px;
		padding: 25px 25px 5px 25px;
	}

	.login-code {
		float: right;
		width: 33%;
		height: 38px;
	}

	.code-input {
		float: left;
		width: 63%;
	}

	.code-img {
		cursor: pointer;
		vertical-align: middle;
	}

	.el-login-footer {
		height: 40px;
		line-height: 40px;
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
		color: #fff;
		font-family: Arial;
		font-size: 12px;
		letter-spacing: 1px;
	}
</style>
