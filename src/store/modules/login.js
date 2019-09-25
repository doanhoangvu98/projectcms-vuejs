import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/v1'

export default {
    state: {
        token: localStorage.getItem('token') || '',
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
        updateToken: (state, token) => {
            state.token = token;
        },
        logout: (state) => {
            state.token = '';
        }
    },
    getters: {
        isLoggedIn: state => !!state.token
    },
    actions: {
        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                commit('loginStart');
                axios.post('users/sign_in', data)
                    .then(response => {
                        const token = response.data.token;
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = "token"
                        commit('loginStop', null);
                        commit('updateToken', token);
                        resolve(response)
                    })
                    .catch(error => {
                        commit('loginStop', error.response.data.error);
                        localStorage.removeItem('token')
                        reject(false)
                    })
            })
        },
        fetchToken({ commit }) {
            commit('updateToken', localStorage.getItem('token'));
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout');
                axios.get('users/sign_out')
                    .then(response => {
                        localStorage.removeItem('token');
                        delete axios.defaults.headers.common['Authorization']
                        resolve(response);
                    })
                    .catch(error => {
                        //location.reload();
                        reject(error);
                    })
            })
        }
    }
}