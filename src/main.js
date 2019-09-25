import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import Axios from 'axios'
import App from './App'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@fortawesome/fontawesome-free/css/all.css"
import '@fortawesome/fontawesome-free/js/all.js'
import store from "./store/index.js"
import router from "./router/router"

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.prototype.$http = Axios;
Vue.config.productionTip = false

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/v1'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
