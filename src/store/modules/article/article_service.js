import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default {
    state: {
        parent_category: {},
        children_category: {},
        child_category: {},
        release_number_date: {},
        articles: {},
    },
    mutations: {
        change_parent_category(state, list){
            state.parent_category = list
        },
        change_children_category(state, list) {
            state.children_category = list
        },
        change_release_number_date(state, list){
            state.release_number_date = list
        },
        change_articles(state, list){
            state.articles = list
        },
        change_children_category_withID(state, list){
            state.child_category = list
        }
    },
    getters: {
        getParentCategory(state) {
            return state.parent_category
        },
        getChildrenCategory(state) {
            return state.children_category
        },
        getReleaseNumberDate(state){
            return state.release_number_date
        },
        getArticles(state){
            return state.articles
        },
        getArticle(state){
            return state.article
        },
        getChildrenCategoryWithID(state){
            return state.child_category
        }
    },
    actions: {
        fetchParentCategory({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/category/parents')
                .then(response => {
                    commit('change_parent_category', response.data.category_parents)
                    resolve()
                    // console.log(" Lay thanh cong")
                })
                .catch(error => {
                    console.log("Ko lay duoc data category cha")
                    reject(error);
                })
            })
        },
        fetchChildrenCategory({commit}, data){
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/category/parents/' + data)
                    .then(response => {
                        commit('change_children_category', response.data.category_children)
                        resolve()
                    })
                    .catch(error => {
                        console.log("Ko lay duoc data category con")
                        reject(error);
                    })
            })
        },
        fetchChildrenCategoryWithID({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/category/children/'+ data)
                    .then(response => {
                        commit('change_children_category_withID', response.data.child_category)
                        resolve()
                    })
                    .catch(error => {
                        console.log("Ko lay duoc data category con")
                        reject(error);
                    })
            })
        },
        fetchReleaseNumberDate({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/release_numbers/')
                    .then(response => {
                        commit('change_release_number_date', response.data.release_number)
                        resolve()
                        // // console.log(" Lay thanh cong")
                    })
                    .catch(error => {
                        console.log("Ko lay duoc data release number")
                        reject(error);
                    })
            })
        },
        createArticle({commit}, data){
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/articles/', data)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        editArticle(commit, data){
            return new Promise((resolve, reject) => {
                axios.patch('v1/admin/articles/' + data.id, data)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        fetchArticles({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/articles')
                    .then(response => {
                        commit('change_articles', response.data.articles)
                        resolve()
                        // console.log(" Lay thanh cong")
                    })
                    .catch(error => {
                        console.log("Ko lay duoc data")
                        reject(error);
                    })
            })
        },
        fetchArticleWithID(commit, data) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/articles/'+ data.id)
                    .then(response => {
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
