import Vue from 'vue';
import App from './App.vue';

import '@/assets/icons';
import store from "@/store";


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 全局样式
import '@/assets/style/index.scss';

import router from './router';

import {parseTime, resetForm, addDateRange, selectDictLabel, download, handleTree} from "@/utils/PBMSUtils";


Vue.config.productionTip = false
/*使用Element-UI*/
Vue.use(ElementUI)


Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

Vue.prototype.msgSuccess = function (msg) {
    this.$message({showClose: true, message: msg, type: "success"})
}

Vue.prototype.msgError = function (msg) {
    this.$message({showClose: true, message: msg, type: "error"})
}

Vue.prototype.msgInfo = function (msg) {
    this.$message({showClose: true, message: msg, type: "info"})
}


new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
