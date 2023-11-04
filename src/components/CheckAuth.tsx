import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {API, InterfacesAPI} from "../api/API";
import {ConfigState} from "../states/Config";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {ErrorState, IError} from "../states/error";

export interface JwtPayload {
  iss: string;
  sub?: string;
  aud?: string[] | string;
  exp: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export const CheckAuth = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [config] = useRecoilState<InterfacesAPI.Config>(ConfigState)
  const [, setError] = useRecoilState<IError>(ErrorState);

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
        navigate('/signin/')
        return
      }

      if(decoded_refresh_token.iss !== config.jwt_iss) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/signin/')
        return
      }

      if(timestamp >= decoded_refresh_token.exp) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/signin/')
        return
      }

      if(timestamp >= decoded_access_token.exp) {
        api.RefreshToken({refresh_token:refresh_token}).then(response=>{
          const access_token = response.access_token
          const refresh_token = response.refresh_token
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)
        }).catch(() => {})
        navigate('/')
        return
      }

    }
    else {
      navigate('/signin/')
      return
    }
  }, [navigate, config, t, setError])

  return <></>
}
