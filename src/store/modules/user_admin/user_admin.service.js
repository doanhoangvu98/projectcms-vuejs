import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default {
    state: {
        user_admin: [],
    },
    mutations: {
        change_user_admin(state, list) {
            state.user_admin = list
        },
    },
    getters: {
        getUserAdmin(state) {
            return state.user_admin
        },
    },
    actions: {
        createUserAdmin({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/user_admin/', data)
                    .then(response => {
                        // commit('change_user_admin', response.data.user_admin)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        editUserAdmin(commit, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                axios.patch('v1/admin/user_admin/' + data.id, data)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        fetchUserAdmin({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/user_admin')
                    .then(response => {
                        commit('change_user_admin', response.data.user_admin)
                        resolve()
                    })
                    .catch(error => {
                        console.log("Ko lay duoc data")
                        reject(error);
                    })
            })
        },
        searchArticles({ commit }, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/articles/', data)
                    .then(response => {
                        console.log(response.data)
                        // commit('change_articles', response.data.articles)
                        resolve()
                        // console.log(" Lay thanh cong")
                    })
                    .catch(error => {
                        console.log("Ko lay duoc data")
                        reject(error);
                    })
            })
        },
    }
}
