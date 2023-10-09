import {instanceAxios} from "./Client";

interface IAuthentication {
  access_token: string
  refresh_token: string
}

export async function Authentication(
  {email, password, captcha} : { email: string, password: string, captcha?: string }
) {
  return instanceAxios.post<IAuthentication>('/authentication', {
    email: email,
    password: password,
    captcha: captcha,
  })
}
