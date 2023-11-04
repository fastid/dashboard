import {useEffect} from "react";
import {useToast, UseToastOptions} from "@chakra-ui/react";
import {useRecoilState, useResetRecoilState} from "recoil";
import {ErrorState, IError} from "../states/error";
import {useTranslation} from "react-i18next";

export const ToastError = () => {

  const {t} = useTranslation();
  const toast = useToast()
  const [error] = useRecoilState<IError>(ErrorState);
  const errorReset = useResetRecoilState(ErrorState);

  useEffect(() => {
    if (error.title) {
      toast.closeAll()

      const option: UseToastOptions = {
        title: t(error.title),
        description: t(error.description),
        status: 'error',
        duration: 20000,
        position: "top",
        isClosable: true,
      }

      if (error.description) {
        option.description = error.description
      }

      toast(option)
      errorReset()
    }
  })

  return <></>
}
