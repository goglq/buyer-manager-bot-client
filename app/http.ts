import axios from 'axios'

export const API_URL = process.env.API_URL

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  if (!config.headers) throw new Error('Axios request header is undefined')
  return config
})

$api.interceptors.response.use((config) => {
  return config
})

export default $api
