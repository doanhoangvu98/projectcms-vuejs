import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import { Promise } from 'q';
import login from './modules/authenticate/login';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
    }
});