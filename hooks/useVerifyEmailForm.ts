import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/services/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFetchStatus } from "@/hooks/useFetchStatus";

const OTPForm = z
  .object({
    code: z.string().length(6, "Please, enter the full code"),
  })
  .required();

OTPForm;

type OTPFormType = z.infer<typeof OTPForm>;
const initialForm = {
  code: "",
};

export default function useVerifyEmailForm() {
  const router = useRouter();
  const fetchStatus = useFetchStatus();
  const [otpValue, setOtpValue] = useState<OTPFormType>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<OTPFormType>({
    resolver: zodResolver(OTPForm),
    defaultValues: initialForm,
    mode: "onSubmit",
  });

  const handleOtpChange = (value: string) => {
    // Implement the OTP change handling if necessary
    setValue("code", value);
  };

  const onSubmit = (values: OTPFormType) => {
    fetchStatus.startLoading();

    authApi()
      .verifyEmail({ code: values.code, email: "grave281@gmail.com" })
      .then(() => {
        toast.success("Email verified");
        router.push("/dashboard");
      })
      .catch((error: Error) => {
        toast.error(error.message);
      })
      .finally(() => {
        fetchStatus.stopLoading();
      });
  };

  return {
    onSubmit,
    handleOtpChange,
    handleSubmit,
    register,
    loading: fetchStatus.loading,
    error: errors.code,
  };
}
