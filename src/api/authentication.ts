import {instanceAxios} from "./client";

interface IAuthentication {
  access_token: string
  refresh_token: string
}

export async function Authentication(
  {email, password, captcha} : { email: string, password: string, captcha?: string }
) {
  return instanceAxios.post<IAuthentication>('/api/v1/authentication', {
    email: email,
    password: password,
    captcha: captcha,
  })
}
