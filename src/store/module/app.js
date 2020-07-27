import Cookie from 'js-cookie';

const state = {
    sidebar: {
        opened: Cookie.get('sidebarStatus') ? !!+Cookie.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop',
    size: Cookie.get('size') || 'medium'
}

const mutation = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
        if (Cookie.get('sidebarStatus')) {
            Cookie.set('sidebarStatus', 1);
        } else {
            Cookie.set('sidebarStatus', 0);
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookie.set('sidebarStatus', 1);
        state.sidebar.opened = false;
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device;
    },
    SET_SIZE: (state, size) => {
        state.size = size;
        Cookie.set('size', size);
    }
}

const actions = {
    toggleSidebar({commit}) {
        commit('TOGGLE_SIDEBAR');
    },
    closeSideBar({commit}, {withoutAnimation}) {
        commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    toggleDevice({commit}, device) {
        commit('TOGGLE_DEVICE', device);
    },
    setSize({commit}, size) {
        commit('SET_SIZE', size);
    }
}

export default {
    namespace: true,
    state,
    mutation,
    actions
}