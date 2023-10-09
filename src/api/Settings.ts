import {instanceAxios} from './Client';

export enum ISettingsCaptcha {
  none = 'none',
  recaptcha = 'recaptcha',
  hcaptcha = 'hcaptcha',
}

export interface ISettings {
  is_init: boolean
  captcha: ISettingsCaptcha,
  captcha_usage: string[],
  hcaptcha_site_key?: string
  recaptcha_site_key?: string
}

export async function GetSettings() {
  return instanceAxios.get<ISettings>('/settings/')
}
