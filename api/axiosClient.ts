import axios from 'axios'
import queryString from 'query-string'

const baseURL = 'http://localhost:5000/api/v1/'
const getToken = () => ''

const axiosClient = axios.create({
    baseURL,
    // paramsSerializer: (params) => queryString.stringify({ params }),
})

axiosClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getToken()}`,
        },
    }
})

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data
        return response
    },
    (err) => {
        if (!err.response) {
            throw err
        }
        throw err.response
    }
)

export default axiosClient
