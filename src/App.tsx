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
import {api, InterfacesAPI} from "./api/API"


export default function App() {

  const [
    settings,
    setSettings,
  ] = useRecoilState<InterfacesAPI.Config>(ConfigState)

  const [, setError] = useRecoilState<IError>(ErrorState);
  const {t} = useTranslation();

  useEffect(() => {
    api.GetConfig().then(response=>{
      setSettings({...response.data, is_init: true})
    }).catch((err) =>{
      setSettings({...settings, is_init: true})
      setError({
        title: t('unable_get_project_settings'),
        description: `request-id: ${err.response.headers.get('request-id')}`
      })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!settings.is_init) {
    return (<Loader />)
  }

  return (
    <div>
      <ToastError />
      <RouterProvider router={router} />
    </div>
  );
}
