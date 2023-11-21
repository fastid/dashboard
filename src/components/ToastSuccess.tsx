import {useEffect} from "react";
import {useToast, UseToastOptions} from "@chakra-ui/react";
import {useRecoilState, useResetRecoilState} from "recoil";
import {useTranslation} from "react-i18next";
import {ISuccess, SuccessState} from "../states/Success";

export const ToastSuccess = () => {

  const {t} = useTranslation();
  const toast = useToast()
  const [success] = useRecoilState<ISuccess>(SuccessState);
  const successReset = useResetRecoilState(SuccessState);

  useEffect(() => {
    if (success.title) {
      toast.closeAll()

      const option: UseToastOptions = {
        title: t(success.title),
        description: t(success.description),
        status: 'success',
        duration: 5000,
        position: "top-right",
        isClosable: true,
      }

      if (success.description) {
        option.description = success.description
      }

      toast(option)
      successReset()
    }
  })

  return <></>
}
