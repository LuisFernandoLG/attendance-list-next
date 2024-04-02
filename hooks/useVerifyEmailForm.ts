import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/services/api/authApi";
import { toast } from "sonner";
import { useFetchStatus } from "@/hooks/useFetchStatus";
import { debounce } from "@/helpers/debounce";
import { useDispatch, useSelector } from "react-redux";
import { confirmEmail } from "@/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "@/components/navigation";
import { useTranslations } from "next-intl";
import { successMessages } from "@/contants/successMessages";
import { useI18nZodErrors } from "./useI18nZodErrors";

const OTPForm = z
  .object({
    code: z.string().length(6),
  })
  .required();

OTPForm;

type OTPFormType = z.infer<typeof OTPForm>;
const initialForm = {
  code: "",
};

export default function useVerifyEmailForm() {
  useI18nZodErrors()
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const {user} = useSelector((state:RootState)=>state.authUser)
  const fetchStatus = useFetchStatus();
  const httpErrorsT = useTranslations("httpErrors");
  const httpSuccessT = useTranslations("httpSuccess");
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

        const msg = httpSuccessT(successMessages["email verified"]);
        toast.success(msg);
        debounce(()=>{
          router.push("/dashboard");
        }, 1500);
      })
      .catch((error: Error) => {
        const msg = httpErrorsT(error.message) || httpErrorsT("default");
        toast.error(msg); 
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
