import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export const constantRoutes = [
    {
        path: '/login',
        component: (resolve) => require(['@/views/login'], resolve)
    }
]


export default new Router({
    mode: 'history',
    routes: constantRoutes
})