import {atom} from "recoil";
import {InterfacesAPI} from "../api/API";

export const InfoState = atom<InterfacesAPI.Info>({
  key: 'Info',
  default: {
    user_id: null,
    email: null,
    created_at: new Date(),
    updated_at: new Date(),
    profile: {
      last_name: null,
      first_name: null,
      language: 'english',
      locate: 'en-us',
      timezone: 'UTC',
      date_birth: null,
      gender: null
    }
  }
})
