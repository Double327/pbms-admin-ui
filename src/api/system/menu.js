import request from '@/utils/request';

export function getMenuInfo(id) {
    return request({
        url: 'system/menu/info/' + id,
        method: 'get',
    });
}

export function getMenuList(query) {
    return request({
        url: '/system/menu/list',
        method: 'get',
        params: query
    });
}

export function addMenu(menu) {
    return request({
        url: '/system/menu/add',
        method: 'post',
        params: menu
    });
}

export function deleteMenu(menu) {
    return request({
        url: '/system/menu/remove',
        method: 'delete',
        params: menu
    })
}