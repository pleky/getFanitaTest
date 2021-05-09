import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://private-c9a09d-fanitaprojecttest.apiary-mock.com' 
})

export default instance