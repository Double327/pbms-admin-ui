import {getToken, removeToken, setToken} from "@/utils/auth";
import {getUserInfo, login, logout} from "@/api/login";

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        permissions: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }
    },

    actions: {
        Login({commit}, userInfo) {
            const username = userInfo.username;
            const password = userInfo.password;
            const code = userInfo.code;
            const uuid = userInfo.uuid;

            return new Promise((resolve, reject) => {
                login(username, password, code, uuid).then(res => {
                    console.log(res);
                    setToken(res.token);
                    commit('SET_TOKEN', res.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        Logout({commit, state}) {
            return new Promise(((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    commit('SET_PERMISSIONS', []);
                    removeToken();
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            }));
        },
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(res => {
                    const user = res.data;
                    const avatar = user.avatar === '' ? require('@/assets/img/avatar.jpg') : user.avatar;
                    if (user.roles && user.roles.length > 0) {
                        commit('SET_ROLES', user.roles);
                        commit('SET_PERMISSIONS', user.permissions);
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT'])
                    }
                    commit('SET_NAME', user.username);
                    commit('SET_AVATAR', avatar)
                    resolve(user);
                }).catch(error => {
                    reject(error);
                })
            });
        },
        FedLogout({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user;