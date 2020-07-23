import request from '@/utils/request'

export function getRoutes() {
    return request({
        url: '/getRouters',
        method: 'get'
    })
}