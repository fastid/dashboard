import React, {useEffect} from 'react'
import {useRecoilState} from "recoil"
import {ConfigState} from "./states/Config"
import Loader from "./layers/Loader"
import './i18n';
import {ErrorState, IError} from "./states/error";
import {ToastError} from "./components/ToastError";
import {useTranslation} from "react-i18next";
import {router} from "./routers";
import {RouterProvider} from "react-router-dom";
import {InterfacesAPI, API} from "./api/API"

export default function App() {
  const [, setError] = useRecoilState<IError>(ErrorState);
  const {t} = useTranslation();

  const [
    config,
    setConfig,
  ] = useRecoilState<InterfacesAPI.Config>(ConfigState)

  const restApi = new API()

  useEffect(() => {

    restApi.t = t
    restApi.setError = setError

    restApi.Config().then(response => {
        setConfig({...response, is_init: true})
    }).catch(() => setConfig({...config, is_init: true}))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!config.is_init) {
    return (<Loader/>)
  }

  return (
    <div>
      <ToastError/>
      <RouterProvider router={router}/>
    </div>
  );
}
