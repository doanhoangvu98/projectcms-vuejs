import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default {
    state: {
        number_page: {},
    },
    mutations: {
        change_number_page(state, list) {
            state.number_page = list
        },
    },
    getters: {
        getNumberPage(state) {
            return state.number_page
        },
    },
    actions: {
        createNumberPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/settings/', data)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        editNumberPage({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.patch('v1/admin/settings/' + data.id, data)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        fetchNumberPage({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/settings')
                    .then(response => {
                        commit('change_number_page', response.data)
                        // console.log(response.data)
                        resolve()
                    })
                    .catch(error => {
                        console.log("Ko lay duoc data")
                        reject(error);
                    })
            })
        },
    }
}
