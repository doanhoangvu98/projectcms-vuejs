import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import userservice from './modules/authenticate/user'
import release from "./modules/release/release_service"
import category from "./modules/category/category_service"
import createPersistedState from 'vuex-persistedstate' //
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userservice,
        release,
        category,
    },
    plugins: [
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: false })
        })
    ]
});