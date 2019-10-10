import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import userservice from './modules/authenticate/user'
import release from "./modules/release/release_service"
import category from "./modules/category/category_service"
import articleservice from "./modules/article/article_service"
import useradminservice from "./modules/user_admin/user_admin.service"
import settingservice from "./modules/settings/settings.service"
import memberservice from "./modules/member/member.service"
import imageservice from "./modules/images/image.service"
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userservice,
        release,
        category,
        articleservice,
        useradminservice,
        settingservice,
        memberservice,
        imageservice
    },
    plugins: [
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: false })
        })
    ]
});