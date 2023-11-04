import {atom, selector} from "recoil";
import {InterfacesAPI} from "../api/API";
import {instanceAxios} from "../api/Client";

export const ConfigState = atom<InterfacesAPI.Config>({
  key: 'Config',
  default: {
    captcha: null,
    captcha_usage: [],
    recaptcha_site_key: null,
    jwt_iss: 'FastID',
    password_policy_min_length: 6,
    password_policy_max_length: 200,
  },
})
