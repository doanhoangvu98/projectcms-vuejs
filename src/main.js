import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import VueRouter from 'vue-router'
import LoginPage from "./views/Login.vue"
import AdminPage from "./views/Admin.vue"
import NotfoundPage from "./views/404page.vue"
import Axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@fortawesome/fontawesome-free/css/all.css"
import '@fortawesome/fontawesome-free/js/all.js'
import store from "./store/index.js"

Vue.use(Vuex)
Vue.use(VueRouter)

Vue.prototype.$http = Axios;

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: LoginPage },
    { 
      path: '/admin', 
      component: AdminPage, 
      name: 'admin',
      meta: {
        requiresAuth: true
      }
    },
    { path: '/notfound', component: NotfoundPage },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
}) 

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
