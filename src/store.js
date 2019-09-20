import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Promise } from 'q';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('accessToken') || '',
        loggingIn: false,
        loginError: null,
        status: ''
    },
    mutations: {
        loginStart: state => state.loggingIn = true,
        loginStop: (state, errorMessage) => {
            state.loggingIn = false;
            state.loginError = errorMessage;
        },
        updateAccessToken: (state, accessToken) => {
            state.accessToken = accessToken;
        },
        logout: (state) => {
            state.accessToken = '';
        }
    },
    getters: {
        isLoggedIn: state => !!state.accessToken
    },
    actions: {
        login({commit}, data) {
            return new Promise((resolve, reject) => {
                commit('loginStart');
                commit('auth_request');
                axios.post('https://reqres.in/api/login', {
                    ...data
                })
                .then(response => {
                    const accessToken = response.data.token;
                    localStorage.setItem('accessToken', accessToken);
                    axios.defaults.headers.common['Authorization'] = accessToken
                    commit('loginStop', null);
                    commit('updateAccessToken', accessToken);
                    resolve(true)
                })
                .catch(error => {
                    commit('loginStop', error.response.data.error);
                    localStorage.removeItem('accessToken')
                    reject(false)
                })
            })           
        },
        fetchAccessToken({ commit }) {
            commit('updateAccessToken', localStorage.getItem('accessToken'));
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.removeItem('accessToken');
                resolve();
            })
        }
    }
})