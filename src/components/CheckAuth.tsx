import jwt_decode from "jwt-decode";
import {LoaderFunctionArgs, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {API, InterfacesAPI} from "../api/API";
import {ConfigState} from "../states/Config";
import {InfoState} from "../states/Info";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {AxiosError} from "axios";

export interface JwtPayload {
  iss: string;
  sub?: string;
  aud?: string[] | string;
  exp: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export const CheckAuthRouter = (args: LoaderFunctionArgs) => {
  const api = new API()

  api.Info().then(res=>res).catch((error: AxiosError) => {
    if (process.env.NODE_ENV === 'development') {
      console.dir(error)
      console.debug('session termination due to an error receiving data from api.Info')
    }

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = '/signin/'
    return args
  })

  return args
}


export const CheckAuth = () => {
  const navigate = useNavigate();
  const {i18n} = useTranslation();
  const [config] = useRecoilState<InterfacesAPI.Config>(ConfigState)
  const [, setInfo] = useRecoilState<InterfacesAPI.Info>(InfoState)

  useEffect(() => {
    const api = new API()

    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')

    const nowDate = new Date();
    const utcTimestamp = Date.UTC(
        nowDate.getUTCFullYear(),
        nowDate.getUTCMonth(),
        nowDate.getUTCDate(),
        nowDate.getUTCHours(),
        nowDate.getUTCMinutes(),
        nowDate.getUTCSeconds(),
        nowDate.getUTCMilliseconds(),
    )

    const timestampUnFormat = utcTimestamp.valueOf() / 1000
    const timestamp = Number(timestampUnFormat.toFixed(0))

    if(access_token && refresh_token){
      const decoded_access_token = jwt_decode<JwtPayload>(access_token);
      const decoded_refresh_token = jwt_decode<JwtPayload>(refresh_token);

      if(decoded_access_token.iss !== config.jwt_iss) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        if (process.env.NODE_ENV === 'development') {
          console.debug(`Token deleted because no iss (${config.jwt_iss}) is found in access_token`)
        }

        navigate('/signin/')
        return
      }

      if(decoded_refresh_token.iss !== config.jwt_iss) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        if (process.env.NODE_ENV === 'development') {
          console.debug(`Token deleted because no iss (${config.jwt_iss}) is found in refresh_token`)
        }

        navigate('/signin/')
        return
      }

      if(timestamp >= decoded_refresh_token.exp) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        if (process.env.NODE_ENV === 'development') {
          console.debug('The tokens is deleted because its lifetime has come to an end')
        }

        navigate('/signin/')
        return
      }

      if(timestamp >= decoded_access_token.exp) {
        api.RefreshToken({refresh_token:refresh_token}).then(response=>{
          const access_token = response.access_token
          const refresh_token = response.refresh_token
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)

          if (process.env.NODE_ENV === 'development') {
            console.debug('The tokens have been renewed as they have expired.')
          }

        }).catch(() => {})
        navigate('/')
        return
      }

      //
      api.Info().then(response=>{
        setInfo({
          user_id: response.user_id,
          email: response.email,
          created_at: response.created_at,
          updated_at: response.updated_at,
          profile: response.profile,
        })

        if (response.profile.language === 'ru') {
          i18n.changeLanguage('ru').then(res=>res).catch(err=>err)
        } else {
          i18n.changeLanguage('en').then(res=>res).catch(err=>err)
        }

      }).catch(() => {
        if (process.env.NODE_ENV === 'development') {
          console.debug('Tokens are deleted because api.Info request ended with an error')
        }
        navigate('/')
        return
      })

    }
    else {
      if (process.env.NODE_ENV === 'development') {
        console.debug('session termination due to missing token access_token or refresh_token')
      }
      navigate('/signin/')
      return
    }
  }, [config.jwt_iss, i18n, navigate, setInfo])

  return <></>
}
