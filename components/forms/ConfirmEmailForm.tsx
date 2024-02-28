"use client";

import OTPPInput from "@/components/OTPInput";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const OTPForm = z
  .object({
    code: z.string().length(6, "Please, enter the full code"),
  })
  .required();

OTPForm

type OTPFormType = z.infer<typeof OTPForm>;
const initialForm = {
  code: "",
};

// Importing other components and libraries...

export default function ConfirmEmailForm() {
  const [otpValue, setOtpValue] = useState<OTPFormType>();
  const { handleSubmit, register, formState: { errors }, setValue, setError } = useForm<OTPFormType>({
    resolver: zodResolver(OTPForm),
    defaultValues: initialForm,
    mode: "onSubmit"
  });

  const handleOtpChange = (value: string) => {
    // Implement the OTP change handling if necessary
    setValue("code", value)
    
  };

  const onSubmit = (values: OTPFormType) => {
    const code = values.code

    if(code === "111222") alert(JSON.stringify(values, null, 2));
    else setError("code", {
      type:"manual",
      message:"It must be 111222"
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* Display OTP input with validation */}
      <OTPPInput handleChange={handleOtpChange} />

      {/* Display input field with validation and error message */}
      <Input hidden className="hidden" {...register("code")} />
      {errors.code && <span className="text-red-500">{errors.code.message}</span>}

      <Button type="submit" className="mx-auto mt-5">
        Verificar
      </Button>
    </form>
  );
}
