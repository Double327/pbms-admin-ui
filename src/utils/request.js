import axios from 'axios';
import {getToken} from "@/utils/auth";
import store from '@/store'
import errorCode from "@/utils/errorCode";
import {Message, MessageBox} from "element-ui";

const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
        config.headers['Authorization'] = 'DoubleToken ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

service.interceptors.response.use(res => {
    const code = res.data.code || 200;
    const message = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 401) {
        MessageBox.confirm(
            '登录状态过期,您可以继续留在该页面,或重新登录',
            '系统提示',
            {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: "warning"
            }
        ).then(() => {
            store.dispatch('Logout').then(() => {
                location.reload();
            })
        })
    } else if (code === 500) {
        Message({
            message: message,
            type: "error"
        });
        return Promise.reject(new Error(message));
    } else {
        return res.data;
    }
})

export default service;