import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import {InterfacesAPI} from "./API";


interface ErrorI18n {
  message: string
  params: any
}

interface Error {
  message: string
  i18n: ErrorI18n
}

export interface ValidationErrors {
  errors: Record<string, Error>
}

export interface ValidationError {
  error: Error
}

export const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: Number(process.env.REACT_APP_API_TIMEOUT),
})

// const AccessToken = selector({
//   key: 'AccessToken',
//   get: ({get}) => {
//     const token = get(TokenState);
//     console.log(token.access_token)
//   },
// });

instanceAxios.interceptors.request.use(
  (config) => {

    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`
    }

    config.headers['Request-ID'] = uuidv4()
    return config
  },
)

instanceAxios.interceptors.response.use(response => response, error => {
  const status = error.response ? error.response.status : null

  if (status === 401) {
    const refresh_token = localStorage.getItem('refresh_token')

    return axios.post<InterfacesAPI.RefreshToken>(
      `${process.env.REACT_APP_API_BASE_URL}/refresh_token/`, {refresh_token: refresh_token})
      .then(res=>{
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        error.config.headers['Authorization'] = `Bearer ${res.data.access_token}`
        return instanceAxios(error.config)
    }).catch(err=> {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location.href = '/signin/'
      // throw err
    })
  }
  throw error
})

// instanceAxios.interceptors.response.use(function (response) {
//   // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
//   // Здесь можете сделать что-нибудь с ответом
//   return response
// }, function (error) {
//   console.log(error)
//   // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
//   // Здесь можете сделать что-то с ошибкой ответа
//   throw error
//   // return Promise.reject(error);
// });
