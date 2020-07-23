import {constantRoutes} from '@/router';
import {getRoutes} from "@/api/menu";
import Layout from '@/layout/index';

const permission = {
    state: {
        routes: [],
        addRoutes: []
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes;
            state.routes = constantRoutes.concat(routes);
        }
    },
    actions: {
        GenerateRoutes({commit}) {
            return new Promise(((resolve, reject) => {
                getRoutes().then(res => {
                    const accessedRoutes = filterAsyncRouter(res.data.data);
                    accessedRoutes.push({path:'*', redirect: '/404', hidden: 'true'})
                    console.log(accessedRoutes);
                    commit('SET_ROUTES', accessedRoutes);
                    resolve(accessedRoutes);
                }).catch(error => {
                    reject(error);
                })
            }));
        }
    }
}

function filterAsyncRouter(asyncRouterMap) {
    return asyncRouterMap.filter(route => {
        if (route.component) {
            // Layout组件特殊处理
            if (route.component === 'Layout') {
                route.component = Layout
            } else {
                route.component = loadView(route.component)
            }
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
}

export const loadView = (view) => { // 路由懒加载
    return (resolve) =>  require([`@/views/${view}`], resolve)
}

export default permission;