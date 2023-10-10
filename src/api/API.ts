import {instanceAxios} from "./Client";


export namespace InterfacesAPI {
    export enum CaptchaType {
      none = 'none',
      recaptcha = 'recaptcha',
  }

  export interface Settings {
    is_init: boolean
    captcha: CaptchaType,
    captcha_usage: string[],
    hcaptcha_site_key?: string
    recaptcha_site_key?: string
  }

  export interface SignUpAdmin {
    access_token: string
    refresh_token: string
  }


}


class API {
  GetSettings() {
    return instanceAxios.get<InterfacesAPI.Settings>('/settings/')
  }

  SignUpAdmin({email, password} : { email: string, password: string}) {
    return instanceAxios.post<InterfacesAPI.SignUpAdmin>('/admin/signup/', {
      email: email,
      password: password,
    })
  }

}

export const api = new API()
