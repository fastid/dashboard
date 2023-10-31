import {useFormContext} from "react-hook-form";
import {useTranslation} from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import {Input, useColorMode} from "@chakra-ui/react";
import React from "react";

/*
  In this version (ReCAPTCHA v3.1.0), there is a problem with switching from a dark theme to a light one and back
  https://github.com/dozoisch/react-google-recaptcha/issues/271
 */

export function ReCaptcha(
  {siteKey, recaptchaRef, tabIndex = 0}:
  { siteKey: string, recaptchaRef: React.RefObject<ReCAPTCHA>, tabIndex?: number }
) {
  const form = useFormContext()
  const {i18n} = useTranslation();
  const {colorMode} = useColorMode()

  let styleProps = {}
  if (colorMode === 'dark') {
    styleProps = {
      width: 300,
      height: 75,
      borderRadius: 1,
      overflow: "hidden",
    }
  }

  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        hl={i18n.language}
        theme={colorMode}
        tabindex={tabIndex}
        style={styleProps}
        onChange={(value) => {
          if (value) {
            form.setValue('captcha', value)
          }
        }}
        onExpired={() => {
          form.setValue('captcha', undefined)
        }}
        onErrored={() => {
          form.setValue('captcha', undefined)
        }}
      />

      <Input
        type="hidden"
        {...form.register(
          "captcha",
          {required: 'Pass the reCAPTCHA check'},
        )}
      />
    </>
  )
}
