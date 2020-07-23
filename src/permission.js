import router from "@/router";
import store from "@/store";
import {getToken} from "@/utils/auth";
import {Message} from "element-ui";

const whiteList = ['/login', '/register'];


router.beforeEach((to, from, next) => {

    /* 如果有token，说明已经登录 */
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'})
        } else if (store.getters.roles.length === 0) {
            store.dispatch('GetInfo').then(res => {
                const roles = res.roles;
                store.dispatch('GenerateRoutes', {roles}).then(accessRoutes => {
                    router.addRoutes(accessRoutes);
                    next();
                })
            }).catch(error => {
                store.dispatch('FedLogOut').then(() => {
                    Message.error(error);
                    next({path: '/'});
                });
            });
        } else {
            next();
        }
    } else if (whiteList.indexOf(to.path) !== -1) {
        next();
    } else {
        next({path: '/login'});
    }
});