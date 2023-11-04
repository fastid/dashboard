import React, {useEffect, useState} from 'react'
import {useRecoilState} from "recoil"
import {ConfigState} from "./states/Config"
import {Loader} from "./layers/Loader"
import './i18n';
import {ErrorState, IError} from "./states/error";
import {ToastError} from "./components/ToastError";
import {useTranslation} from "react-i18next";
import {RouterProvider} from "react-router-dom";
import {InterfacesAPI, API} from "./api/API"
import {Error500} from "./layers/Error";
import Routers from "./Routers";
import {AxiosError} from "axios";

export default function App() {
  const [, setError] = useRecoilState<IError>(ErrorState);
  const {t} = useTranslation();

  const [,setConfig] = useRecoilState<InterfacesAPI.Config>(ConfigState)

  const [isInit, setIsInit] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);


  useEffect(() => {
    const api = new API()
    api.Config()
      .then(response=> {
        setConfig({...response})
        setIsInit(true)
      })
      .catch((error: AxiosError) =>{
        api.ErrorMessage(error, t, setError)
        setIsError(true)
      })

  }, [setConfig, t, setError]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // Call an error if we can't load the project
  if (isError) {
    return (<><Error500 message={'unable_get_project_settings'}/></>)
  }

  if (!isInit) {
    return (<Loader/>)
  }

  return (
    <div>
      <ToastError/>
      <RouterProvider router={Routers}/>
    </div>
  );
}
