import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useFetchStatus } from "./useFetchStatus";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { registerUser } from "@/redux/authSlice";
import { debounce } from "@/helpers/debounce";
import { useRouter } from "@/components/navigation";
import { useTranslations } from "next-intl";
import { successMessages } from "@/contants/successMessages";

const formSchema = z
  .object({
    name: z.string().trim().min(3).max(40),
    email: z.string().email(),
    password: z.string().trim().min(8).max(30).trim(),
  })
  .required();

type FormSchemaType = z.infer<typeof formSchema>;

const initialForm: FormSchemaType = {
  name: "",
  email: "",
  password: "",
};

export const useSignUpForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const httpSuccessT = useTranslations("httpSuccess");
  const httpErrorsT = useTranslations("httpErrors");
  const router = useRouter();
  const fetchStatus = useFetchStatus();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialForm,
  });

  const handleSubmit = async (values: FormSchemaType) => {
    fetchStatus.startLoading()
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await dispatch(registerUser({ ...values, timezone })).unwrap()
      const msg = httpSuccessT(successMessages["verification code sent to"], { email: res?.user?.email })
      toast.info(msg)
      
      debounce(()=>{
        router.push("/auth/confirm-email");
      }, 1500)
      
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
    form,
    handleSubmit,
    loading: fetchStatus.loading,
  };
};
