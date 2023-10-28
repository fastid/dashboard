import {instanceAxios, ValidationError} from "./Client";
import {TFunction} from "i18next";
import axios, {AxiosError} from "axios";
import {SetterOrUpdater} from "recoil";
import {IError} from "../states/error";


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
    expires_in: number
    token_type: string
  }

  export interface SignIn {
    access_token: string
    refresh_token: string
  }
}


export class API {
  t?: TFunction;
  setError?: SetterOrUpdater<IError>;

  GlobalErrorMessage = (error: AxiosError) =>{
    if (error.response && this.setError) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response.data.error) {
        this.setError({
          title: this.t(error.response.data.error.i18n.message, error.response.data.error.i18n.params),
          description: `request-id: ${error.response?.headers['request-id'] ?? 'n/a'}`,
        })
      } else if(error.message) {
          this.setError({
              title: error.message,
          })
      }
    } else if (error.request && this.setError) {
      this.setError({
        title: error.message,
      })
    }
  }

  Config = () => instanceAxios.get<InterfacesAPI.Config>('/config/')
    .then(response=> response.data)
    .catch((error: AxiosError) => {
      if (error.response && this.t && this.setError) {
        this.setError({
          title: this.t('unable_get_project_settings'),
          description: `request-id: ${error.response.headers['request-id']}`
        })
      } else if (error.request && this.t && this.setError) {
        this.setError({
          title: this.t('unable_get_project_settings'),
          description: error.message
        })
      }
      throw error;
  });

  AdminSignUp = (
    {email, password} : { email: string, password: string}
  ) => instanceAxios.post<InterfacesAPI.SignUpAdmin>('/admin/signup/', {email: email, password: password})
    .then(response=> response.data)
    .catch((error: AxiosError) => {
      this.GlobalErrorMessage(error)
      throw error;
  })

  SignIn({email, password, captcha} : { email: string, password: string, captcha?: string}) {
    return instanceAxios.post<InterfacesAPI.SignIn>('/users/signin/', {
      email: email,
      password: password,
      captcha: captcha,
    })

  }


}

export const api = new API()
