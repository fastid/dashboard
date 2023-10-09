import React, {useEffect} from 'react'
import {useRecoilState} from "recoil"
import {SettingsState} from "./states/settings"
import Loader from "./layers/Loader"
import './i18n';
import {GetSettings, ISettings} from "./api/settings"
import {ErrorState, IError} from "./states/error";
import {ToastError} from "./components/ToastError";
import {AxiosError} from "axios";
import {IValidationError} from "./api/client";
import {useTranslation} from "react-i18next";
import {router} from "./routers";
import {RouterProvider} from "react-router-dom";


export default function App() {
  const [settings, setSettings] = useRecoilState<ISettings>(SettingsState)
  const [, setError] = useRecoilState<IError>(ErrorState);
  const {t} = useTranslation();

  useEffect(() => {

    // Getting the settings from the server
    GetSettings().then(response=>{
      setSettings({...response.data, is_init: true})
    }).catch((err: Error | AxiosError<IValidationError>) =>{
      setSettings({...settings, is_init: true})
      setError({title: t('unable_get_project_settings'), description: err.message})
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
