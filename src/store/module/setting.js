import defaultSettings from '@/settings';

const {showSettings, tagsView, fixedHeader, sidebarLogo} = defaultSettings


const state = {
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
}

const mutation = {
    CHANGE_SETTING: (state, {key, value}) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value;
        }
    }
}

const action = {
    changeSetting({commit}, data) {
        commit('CHANGE_SETTING', data);
    }
}


export default {
    namespace: true,
    state,
    mutation,
    action
}