import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default {
    state: {

    },
    mutations: {

    },
    actions: {
        createReleaseNumber(commit, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
            axios.post('v1/admin/release_numbers', data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        editReleaseNumber(commit, data){
            return new Promise((resolve, reject) => {
                axios.patch('v1/admin/release_numbers/'+ data.id, data)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        fetchData(){
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
        fetchDataById(commit, data) {
            alert("File js: " + data.id)
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/release_numbers'+ data.id, data)
                alert("File js: "+ data.id)
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
    }
}