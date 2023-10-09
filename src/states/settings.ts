import {atom} from "recoil";
import {ISettings, ISettingsCaptcha} from "../api/settings";

export const SettingsState = atom<ISettings>({
  key: 'settings',
  default: {
    is_init: false,
    captcha: ISettingsCaptcha.recaptcha,
    captcha_usage: [],
    recaptcha_site_key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    hcaptcha_site_key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  },
})
