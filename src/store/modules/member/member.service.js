import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default {
    state: {
        members: [],
    },
    mutations: {
        change_members(state, list) {
            state.members = list
        },
    },
    getters: {
        getMembers(state) {
            return state.members
        },
    },
    actions: {
        createMember({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/members/', data)
                    .then(response => {
                        // commit('change_user_admin', response.data.user_admin)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        editMember(commit, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                axios.patch('v1/admin/members/' + data.id, data)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        fetchMembers({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/members')
                    .then(response => {
                        // commit('change_user_admin', response.data.user_admin)
                        commit('change_members', response.data)
                        resolve()
                    })
                    .catch(error => {
                        console.log("Ko lay duoc data")
                        reject(error);
                    })
            })
        },
        // searchMembers({ commit }, data) {
        //     console.log(data)
        //     return new Promise((resolve, reject) => {
        //         axios.get('v1/admin/articles/', data)
        //             .then(response => {
        //                 console.log(response.data)
        //                 // commit('change_articles', response.data.articles)
        //                 resolve()
        //                 // console.log(" Lay thanh cong")
        //             })
        //             .catch(error => {
        //                 console.log("Ko lay duoc data")
        //                 reject(error);
        //             })
        //     })
        // },
    }
}
