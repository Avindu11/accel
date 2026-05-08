import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const axiosInstance = (token) => {
    return axios.create({

        baseURL: BASE_URL,
        headers: {
            Authorization: token ? `Bearer ${token}` : ``,
        }

    })
}