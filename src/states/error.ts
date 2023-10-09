import {atom} from "recoil";


export interface IError {
  title?: string
  description?: string
  request_id?: string
}


export const ErrorState = atom<IError>({
  key: 'errors',
  default: {},
})
