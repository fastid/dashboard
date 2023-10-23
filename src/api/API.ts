import {instanceAxios} from "./Client";


export namespace InterfacesAPI {
    export enum CaptchaType {
      none = 'none',
      recaptcha = 'recaptcha',
  }

  export interface Config {
    is_init: boolean
    is_setup: boolean
    captcha: CaptchaType | null,
    captcha_usage: string[],
    recaptcha_site_key: string | null
    jwt_iss: string
    password_policy_max_length: number
    password_policy_min_length: number
  }

  export interface SignUpAdmin {
    access_token: string
    refresh_token: string
  }
}


class API {
  GetConfig() {
    return instanceAxios.get<InterfacesAPI.Config>('/config/')
  }

  SignUpAdmin({email, password} : { email: string, password: string}) {
    return instanceAxios.post<InterfacesAPI.SignUpAdmin>('/admin/signup/', {
      email: email,
      password: password,
    })
  }

}

export const api = new API()
