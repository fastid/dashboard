import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {InterfacesAPI} from "../api/API";
import {ConfigState} from "../states/Config";
import {useEffect} from "react";

export interface JwtPayload {
  iss: string;
  sub?: string;
  aud?: string[] | string;
  exp: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export function CheckAuth() {
  const navigate = useNavigate();
  const [config] = useRecoilState<InterfacesAPI.Config>(ConfigState)

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')

    let d = new Date();
    const timestampUnFormat = d.valueOf() / 1000
    const timestamp = Number(timestampUnFormat.toFixed(0))

    if (!config.is_setup) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigate('/admin/signup/')
      return
    }

    if(access_token && refresh_token){
      const decoded_access_token = jwt_decode<JwtPayload>(access_token);
      const decoded_refresh_token = jwt_decode<JwtPayload>(refresh_token);

      if(decoded_access_token.iss !== config.jwt_iss) {
        console.error(`JWT token access_token not match ${config.jwt_iss}`)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/signin/')
        return
      }

      if(decoded_refresh_token.iss !== config.jwt_iss) {
        console.error(`JWT token refresh_token not match ${config.jwt_iss}`)
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
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/signin/')
        return
      }
    }
    else {
      navigate('/signin/')
      return
    }
  }, [config.is_setup, navigate, config])

  return <></>
}
