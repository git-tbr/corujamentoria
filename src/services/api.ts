import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    /*timeout: 10000,*/
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        const tokenJwt = localStorage.getItem('tokenJwt')
        if(tokenJwt){
            config.headers.Authorization = `Bearer ${tokenJwt}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response.status === 401){
            localStorage.removeItem('tokenJwt')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    },
)

export default api