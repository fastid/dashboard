import {instanceAxios} from "./Client";

interface ISignUp {
  access_token: string
  refresh_token: string
}

export async function SignUpAdmin(
  {email, password, captcha} : { email: string, password: string, captcha?: string }
) {
  return instanceAxios.post<ISignUp>('/admin/signup/', {
    email: email,
    password: password,
  })
}
