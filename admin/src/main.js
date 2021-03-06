import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import http from "./http";
Vue.prototype.$http = http;

import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/bootstrap-grid.min.css";
import "@/assets/css/style.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.mixin({
    methods: {
        getAuthToken() {
            return {
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    },
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");