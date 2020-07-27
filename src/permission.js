import router from "@/router";
import {getToken} from "@/utils/auth";
import {Message} from "element-ui";
import store from "@/store";

const whiteList = ['/login', '/register'];


router.beforeEach((to, from, next) => {

    if (getToken()) {
        /* 如果有token，说明已经登录 */
        if (to.path === '/login') {
            Message.success('您已登录！')
            next({path: '/'})
        } else {
            if (store.getters.roles.length === 0) {
                /*尚未获取用户信息*/
                store.dispatch('GetInfo').then(res => {
                    const roles = res.roles;
                    store.dispatch('GenerateRoutes', {roles}).then(accessRoutes => {
                        /*添加路由*/
                        router.addRoutes(accessRoutes);
                        next(to);
                    })
                }).catch(error => {
                    store.dispatch('FedLogout').then(() => {
                        Message.error(error);
                        next({path: '/'});
                    });
                });
            } else {
                next();
            }
        }
    } else {
        /*没有token，尚未登录*/
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next({path: '/login'});
        }
    }
});
