import axios from 'axios'

export const axiosInstance = (token) => {
    return axios.create({

        baseURL: 'http://localhost:4100/api',
        headers: {
            Authorization: token ? `Bearer ${token}` : ``,
        }

    })
}