import Vue from 'vue';
import Vuex from 'vuex';
import user from "@/store/module/user";
import tagsView from "@/store/module/tagsView";
import setting from "@/store/module/setting";
import app from "@/store/module/app";
import permission from "@/store/module/permission";
import getters from "@/store/getters";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        tagsView,
        setting,
        app,
        permission
    },
    getters
})

export default store;