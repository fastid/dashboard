import {atom, selector} from "recoil";
import {api, InterfacesAPI} from "../api/API";
import {set} from "react-hook-form";

export const ConfigState = atom<InterfacesAPI.Config>({
  key: 'Config',
  default: {
    is_init: false,
    is_setup: false,
    captcha: null,
    captcha_usage: [],
    recaptcha_site_key: null,
  },
})

export const ConfigSelector = selector({
  key: 'ConfigSelector',
  get: ({get}) => {
    const config = get(ConfigState)

    api.GetConfig().then(response => {
      config.is_init = true
      config.is_setup = response.data.is_setup
      config.captcha = response.data.captcha
      config.captcha_usage = response.data.captcha_usage
      config.recaptcha_site_key = response.data.recaptcha_site_key

    }).catch(error=> {

    })
    return config;
  },
  set: ({set}, newVal) => {
    set(ConfigState, newVal)
  }
});
