import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default {
    actions: {
        createParentCategory(commit, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/category/parents/', data)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    console.log("Ko them duoc")
                })
            })
        },
        createChildCategory(commit, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/category/children/', data)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        console.log("Ko them duoc")
                    })
            })
        },
        fetchData() {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/release_numbers')
                    .then(response => {
                        resolve();
                        console.log(" Lay thanh cong")
                    })
                    .catch(error => {
                        console.log("Ko lay duoc data")
                        reject(error);
                    })
            })
        },
        edit(commit, data) {
            alert(data)
            return new Promise((resolve, reject) => {
                axios.patch('v1/admin/release_numbers', data)
                    .then((response) => {
                        resolve(response);
                        console.log(" Sua thanh cong")
                    })
                    .catch(error => {
                        console.log("Loi ...")
                        reject(error);
                    })
            })
        }
    }
}