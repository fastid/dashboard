import {atom} from "recoil";


export interface ISuccess {
  title?: string
  description?: string
  request_id?: string
}


export const SuccessState = atom<ISuccess>({
  key: 'success',
  default: {},
})
