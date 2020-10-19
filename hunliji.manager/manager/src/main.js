// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './components/common/directives';
import store from './store'

import filters from './components/filters'// filters = {date,fillzero}


Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]));//注册全局过滤器

Vue.config.productionTip = false

Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
// Vue.prototype.$axios = axios;
Vue.prototype.$ajax=axios

// axios.defaults.withCredentials = true



// // 拦截器
// axios.interceptors.request.use(function (config) {
//   if(getCookie('token')){
//     this.$router.push({ path: '/login' })
//   }
//   store.dispatch('SHOW_LOADING');


  
//   return config;
// }, function (error) {
//   console.log("",error)
//   return Promise.reject(error);
// });


const i18n = new VueI18n({
    locale: 'zh',
    messages
})

new Vue({
  router,store,
  i18n,
  render: h => h(App)
}).$mount('#app')
