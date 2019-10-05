import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:3000'

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
})

// axios.defaults.baseURL = 'http://localhost:3000/'

// const token = localStorage.getItem('token')
// if (token) {
//     axios.defaults.headers.common['Authorization'] = token
// }