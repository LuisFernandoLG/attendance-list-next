import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/services/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFetchStatus } from "@/hooks/useFetchStatus";
import { debounce } from "@/helpers/debounce";
import { useDispatch, useSelector } from "react-redux";
import { confirmEmail } from "@/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/store";

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
  const dispatch = useDispatch<AppDispatch>()
  const {user} = useSelector((state:RootState)=>state.authUser)
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
      .verifyEmail({ code: values.code, email: user.email })
      .then(() => {
        dispatch(confirmEmail());
        toast.success("Email verified");
        debounce(()=>{
          router.push("/dashboard");
        }, 3000);
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
