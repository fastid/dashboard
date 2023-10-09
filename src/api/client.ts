import axios from "axios";
import {v4 as uuidv4} from 'uuid';

// interface ValidationError {
//   eror: string;
//   errors: Record<string, string[]>
// }

interface IValidationErrorParams {
  any: any
}


interface IValidationErrorError {
  key: string
  message: string
  params: IValidationErrorParams
}

export interface IValidationErrors {
  any: IValidationErrorError
}

export interface IValidationError {
  error?: IValidationErrorError
  errors?: IValidationErrors
}

export const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: Number(process.env.REACT_APP_API_TIMEOUT),
})

instanceAxios.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.headers['X-Jsio-Token'] = 'cac12b1f0ed70394f14709b048201559'
    }
    config.headers['Request-ID'] = uuidv4()
    return config
  },
)
