import {atom} from "recoil";
import {InterfacesAPI} from "../api/API";

export const ConfigState = atom<InterfacesAPI.Config>({
  key: 'Config',
  default: {
    is_init: false,
    is_setup: false,
    captcha: null,
    captcha_usage: [],
    recaptcha_site_key: null,
    jwt_iss: 'FastID',
    password_policy_min_length: 6,
    password_policy_max_length: 200,
  },
})
