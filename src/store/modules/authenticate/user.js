import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default {
    state: {
        token: localStorage.getItem('token') || '',
        status: '',
        user: {},
        role: localStorage.getItem('role') || '',
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user, role) {
            state.status = 'success'
            state.token = token
            state.user = user
            state.role = role
        },
        auth_error(state) {
            state.status = 'error'
            state.token = ''
            state.user = {}
            state.role = ''
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.isLoggedIn = false
            state.role = ''
        },
    },
    getters: {
        isLoggedIn: state => !!localStorage.getItem("token"),
        token: state => state.token,
        status: state => state.status,
        role: state => state.role,//
        isSuperAdmin_Admin: state => state.role == 'superadmin' || state.role == 'admin',
        isEditor: state => state.role == 'editor',
        isContributor: state => state.role == 'contributor',
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('users/sign_in', user) // data => user
                    .then(response => {
                        const token = response.data.token
                        const role = response.data.role
                        localStorage.setItem('token', token);
                        localStorage.setItem('role', role);
                        axios.defaults.headers.common['Authorization'] = token
                        //console.log(token)
                        commit('auth_success', token, user, role)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('auth_error')
                        localStorage.clear();
                        reject(error)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout');
                console.log('Dang logout')
                axios.get('users/sign_out')
                    .then(response => {
                        localStorage.clear();
                        delete axios.defaults.headers.common['Authorization']
                        console.log("Logout thanh cong")
                        resolve();
                    })
                    .catch(error => {
                        location.reload();
                        reject(error);
                    })
            })
        }
    }
}