import request from '@/utils/request'

export function login(username, password, code, uuid) {
    const data = {
        username,
        password,
        code,
        uuid
    }
    return request({
        url: '/login',
        method: 'post',
        params: data
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

export function getUserInfo() {
    return request({
        url: '/getUserInfo',
        method: 'post'
    })
}

export function captchaImage() {
    return request({
        url: '/captchaImage',
        method: 'get'
    })
}
