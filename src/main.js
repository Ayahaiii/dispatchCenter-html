// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {
  httpGet,
  httpPost,
  baseUrl
} from './utils/httpService'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios.interceptors.request.use(config => {
//   console.log(config)
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 在最后必须 return config
//   return config
// })
// //axios拦截器，目的是为了在请求头上带上token
// axios.interceptors.request.use(
//   config => {
//     // if (window.localStorage.getItem('token')) {
//     //token字段是要和后端协商好的
//     // config.headers.commoÎn["tokenWeb"] = localStorage.getItem('token');
//     // debugger
//     // }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });
// axios.defaults.headers.common["tokenWeb"] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiYmEzMmNjNjA2ZDFiNDAyZGI4NGQwOWMyOTllYzI4ZWUifQ.Mhd1tllCqdLwUBSKHHjNUckN36lb5pr0bu-0UVgBeU4'
Vue.prototype.$axios = axios

/* 引入element UI框架 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
  zIndex: 3000
});

/* 引入字体图标 */
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon);

/* global definitions */
Vue.config.productionTip = false
Vue.prototype.httpGet = httpGet;
Vue.prototype.httpPost = httpPost;
Vue.prototype.baseUrl = baseUrl;

/*引入vue-quill-editor*/
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')