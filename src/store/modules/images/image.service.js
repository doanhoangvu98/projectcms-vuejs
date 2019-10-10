import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default {
    state: {
        images: [],
        images_list: [],
    },
    mutations: {
        change_images(state, list){
            state.images = list
        },
        add_Image_To_List(state, data){
            state.images_list.push(data)
        },
        reset_image_list(state){
            state.images_list = []
        }
    },
    getters: {
        getImages(state){
            return state.images
        },
        getImageList(state){
            return state.images_list
        }
    },
    actions: {
        createImage({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('v1/admin/images', data)
                    .then(response => {
                        console.log(response.data)
                        commit('add_Image_To_List', response.data.data)
                        // console.log(response.data.data)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        fetchImages({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('v1/admin/images')
                    .then(response => {
                        commit('change_images', response.data)
                        resolve();
                    })
                    .catch(error => {
                        console.log("Ko lay duoc data")
                        reject(error);
                    })
            })
        },
        resetImageList({commit}){
            commit('reset_image_list')
        }
    }
}