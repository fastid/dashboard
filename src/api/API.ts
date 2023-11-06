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
    captcha: CaptchaType | null,
    captcha_usage: string[],
    recaptcha_site_key: string | null
    jwt_iss: string
    password_policy_max_length: number
    password_policy_min_length: number
    link_github: boolean
    logo_url: string | null
    logo_title: string | null
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

  export interface RefreshToken {
    access_token: string
    refresh_token: string
    expires_in: number
    token_type: string
  }

  export interface Token {
    access_token: string | null
    refresh_token: string | null
  }

  export interface Profile {
    date_birth: Date | null
    first_name: string | null
    gender: string | null
    language: string
    last_name: string | null
    timezone: string
  }

  export interface Info {
    user_id: number | null
    email: string | null
    created_at: Date
    updated_at: Date
    profile: Profile
  }

  export interface Empty {}
}


export class API {
  t?: TFunction;
  setError?: SetterOrUpdater<IError>;

  ErrorMessage = (error: AxiosError, t: TFunction, setError: SetterOrUpdater<IError>) =>{

    if (error.response) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response.data.error) {

        setError({
          title: t('error'),
          description: t(error.response.data.error.i18n.message, error.response.data.error.i18n.params),
        })

      } else if(error.message && !error.response) {
        setError({
          title: t('error'),
          description: error.message
        })
      }
    } else if (error.request) {
      setError({
        title: t('error'),
        description: error.message
      })
    }
  }

  Config = () => instanceAxios.get<InterfacesAPI.Config>('/config/')
    .then(response=> response.data)
    .catch((error: AxiosError) => {
      throw error
    });

  Info = () => instanceAxios.get<InterfacesAPI.Info>('/info/')
    .then(response=> response.data)
    .catch((error: AxiosError) => {
      throw error;
    })

  RefreshToken = (
    {refresh_token} : { refresh_token: string}
  ) => instanceAxios.post<InterfacesAPI.RefreshToken>('/refresh_token/', {refresh_token: refresh_token})
    .then(response => response.data)
    .catch((error: AxiosError) => {
      throw error;
  })

  SignIn = (
    {email, password, captcha} : { email: string, password: string, captcha?: string}
  ) => instanceAxios.post<InterfacesAPI.SignIn>('/signin/', {
    email: email,
    password: password,
    captcha: captcha,
  }).then(response => response.data).catch((error: AxiosError) => {
      throw error
  })

  Logout = () => instanceAxios.post<InterfacesAPI.Empty>('/logout/', {})
    .then(response => response.data)
    .catch((error: AxiosError) => {
      throw error
    })

}

export const api = new API()
