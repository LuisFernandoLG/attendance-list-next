"use client";

import OTPPInput from "@/components/OTPInput";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useVerifyEmailForm from "@/hooks/useVerifyEmailForm";
import { useTranslations } from "next-intl";
import { useAuthUser } from "@/hooks/useAuthUser";
import { CardDescription } from "../ui/card";

export default function ConfirmEmailForm() {
  const { onSubmit, handleSubmit, loading, error, handleOtpChange, register } = useVerifyEmailForm()
  const t = useTranslations("ConfirmEmail");
  const { user } = useAuthUser()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
      <CardDescription className="text-center mb-3"> {t("description")} <span className="font-bold underline"> {user.email}</span> </CardDescription>
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
