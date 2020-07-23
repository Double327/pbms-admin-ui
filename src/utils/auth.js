import Cookie from 'js-cookie';

const TokenKey = 'Admin-Token'

export function setToken(token) {
    Cookie.set(TokenKey, token)
}

export function getToken() {
    return Cookie.get(TokenKey)
}

export function removeToken() {
    Cookie.remove(TokenKey)
}