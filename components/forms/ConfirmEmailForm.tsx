"use client";

import OTPPInput from "@/components/OTPInput";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useVerifyEmailForm from "@/hooks/useVerifyEmailForm";
import { useTranslations } from "next-intl";

export default function ConfirmEmailForm() {
  const { onSubmit, handleSubmit, loading, error, handleOtpChange, register } = useVerifyEmailForm()
  const t = useTranslations("ConfirmEmail");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* Display OTP input with validation */}
      <OTPPInput handleChange={handleOtpChange} />

      {/* Display input field with validation and error message */}
      <Input hidden className="hidden" {...register("code")} />
      {error && <span className="text-red-500 text-center mt-2">{error.message}</span>}

      <Button loading={loading} type="submit" className="mx-auto mt-5">
        {t("verify")} 
      </Button>
    </form>
  );
}
