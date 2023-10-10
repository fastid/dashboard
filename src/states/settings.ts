import {atom} from "recoil";
import {InterfacesAPI} from "../api/API";

export const SettingsState = atom<InterfacesAPI.Settings>({
  key: 'settings',
  default: {
    is_init: false,
    captcha: InterfacesAPI.CaptchaType.recaptcha,
    captcha_usage: [],
    recaptcha_site_key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    hcaptcha_site_key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  },
})
