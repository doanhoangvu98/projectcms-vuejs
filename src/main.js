import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App'
import BootstrapVue from "bootstrap-vue"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@fortawesome/fontawesome-free/css/all.css"
import '@fortawesome/fontawesome-free/js/all.js'
// import 'vue2-dropzone/dist/vue2Dropzone.min.css'
// import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.js'
import CKEditor from '@ckeditor/ckeditor5-vue';
import Vue2Editor from "vue2-editor"; //
import Datepicker from 'vuejs-datepicker';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Qs from 'qs'//
import store from "./store/index.js"
import router from "./router/router"

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(Datepicker)
Vue.use(VueSweetalert2);
Vue.use(CKEditor)
Vue.use(Vue2Editor)
Vue.use(Qs)//
// Vue.use(vue2Dropzone)
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/'

const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
