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

  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')

  useEffect(() => {
    let d = new Date();
    const timestampUnFormat = d.valueOf() / 1000
    const timestamp = Number(timestampUnFormat.toFixed(0))

    if (!config.is_setup) {
      navigate('/admin/signup/')
    }

    if(access_token && refresh_token){
      const decoded = jwt_decode<JwtPayload>(access_token);

      if(decoded.iss !== 'FastID') {
        console.error('JWT token not match FastID')
        navigate('/signin/')
      }

      if(timestamp >= decoded.exp) {
        navigate('/signin/')
      }
    }
    else {
      navigate('/signin/')
    }
  }, [config.is_setup, navigate, access_token, refresh_token])

  return <></>
}
