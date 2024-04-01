import { authApi } from "@/services/api/authApi";
import { useAuthUser } from "./useAuthUser";
import { useFetchStatus } from "./useFetchStatus";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { successMessages } from "@/contants/successMessages";

export const useResendVerificationEmailCode = () => {
  const { user } = useAuthUser();
  const fetchStatus = useFetchStatus()
  const httpSuccessT = useTranslations("httpSuccess");
  const httpErrorsT = useTranslations("httpErrors");

  const sendVEmailVerificationCode = async () => {
    fetchStatus.startLoading()
    try {
      await authApi().resendVerificationEmailCode(user.email);
      const msg = httpSuccessT(successMessages["email sent"])
      toast.success(msg);
    } catch (error) {
      if (error instanceof Error) {
        const msg = httpErrorsT(error.message) || httpErrorsT("default");
        toast.error(msg);
      } else {
        toast.error(httpErrorsT("default"));
      }
    }finally{
        fetchStatus.stopLoading()
    }
  };

  return {
    sendVEmailVerificationCode,
    loading: fetchStatus.loading
  }
};
