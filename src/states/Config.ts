import {atom} from "recoil";
import {InterfacesAPI} from "../api/API";

export const ConfigState = atom<InterfacesAPI.Config>({
  key: 'Config',
  default: {
    is_init: false,
    is_setup: false,
    captcha: InterfacesAPI.CaptchaType.recaptcha,
    captcha_usage: [],
    recaptcha_site_key: undefined,
  },
})