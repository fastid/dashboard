import {atom} from "recoil";
import {InterfacesAPI} from "../api/API";

export const TokenState = atom<InterfacesAPI.Token>({
  key: 'Token',
  default: {
    access_token: null,
    refresh_token: null,
  },
})
