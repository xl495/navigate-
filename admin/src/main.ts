import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Avue from '@smallwei/avue';
import App from './App.vue';
import '@smallwei/avue/lib/index.css';
import router from './router';
import store from './store';
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
});
Vue.use(Avue);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
