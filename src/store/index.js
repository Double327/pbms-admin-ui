import Vue from 'vue';
import Vuex from 'vuex';
import user from "@/store/module/user";
import permission from "@/store/module/permission";
import getters from "@/store/getters";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        permission
    },
    getters
})

export default store;