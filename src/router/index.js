import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layout';


Vue.use(Router);

export const constantRoutes = [
    {
        path: '/login',
        component: (resolve) => require(['@/views/login'], resolve),
        meta: {title: '登录'},
        hidden: true
    },
    {
        path: '/404',
        meta: {title: "页面丢失"},
        component: resolve => require(['@/views/error/404'], resolve),
        hidden: true
    },
    {
        path: '/401',
        component: resolve => require(['@/views/error/401'], resolve),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                component: resolve => require(['@/views/index'], resolve),
                name: '首页',
                meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true}
            }
        ]
    },

];


export default new Router({
    mode: 'history',
    routes: constantRoutes
})