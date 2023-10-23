import axios from "axios";
import {v4 as uuidv4} from 'uuid';


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

instanceAxios.interceptors.request.use(
  (config) => {
    config.headers['Request-ID'] = uuidv4()
    return config
  },
)

// instanceAxios.interceptors.response.use(function (response) {
//   return response;
// }, function (error: AxiosError) {
//   if (axios.isAxiosError(error)) {
//     console.log(error)
//     return Promise.reject(error);
//   }
//
//   return Promise.reject(error);
// })
