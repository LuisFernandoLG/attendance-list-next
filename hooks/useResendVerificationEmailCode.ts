import { authApi } from "@/services/api/authApi";
import { useAuthUser } from "./useAuthUser";
import { useFetchStatus } from "./useFetchStatus";
import { toast } from "sonner";

export const useResendVerificationEmailCode = () => {
  const { user } = useAuthUser();
  const fetchStatus = useFetchStatus()

  const sendVEmailVerificationCode = async () => {
    fetchStatus.startLoading()
    try {
      await authApi().resendVerificationEmailCode(user.email);
      toast.success("Email sent successfuly");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      toast.error("Unknown error");
    }finally{
        fetchStatus.stopLoading()
    }
  };

  return {
    sendVEmailVerificationCode,
    loading: fetchStatus.loading
  }
};
