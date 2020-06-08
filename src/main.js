import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Vuex from 'vuex'
import '@/components/Vant'
import store from './store/index'
import 'vant/lib/index.less'
import "./assets/iconfont/iconfont.css"
import api from './api'
Vue.prototype.$api = api; // 将api挂载到vue的原型上
// Vue.prototype.$axios = Axios; //全局注册，使用方法为:this.$axios
//
// // import axios from 'axios'
// Vue.prototype.$axios = axios;


// axios.defaults.baseURL = '/goods';
// Vue.config.productionTip = false;


new Vue({
  router,
  Vuex,
  store,
  render: h => h(App),
}).$mount('#app');
