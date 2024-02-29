import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/api/authApi";
import {toast} from "sonner"
import { useFetchStatus } from "./useFetchStatus";

const formSchema = z
  .object({
    name: z.string().trim().min(3).max(40),
    email: z.string().email(),
    password: z.string().trim().min(8).max(30).trim(),
  })
  .required()

type FormSchemaType = z.infer<typeof formSchema>;

const initialForm: FormSchemaType = {
  name: "",
  email: "",
  password: "",
};

export const useSignUpForm = () => {
  const router = useRouter()
  const fetchStatus = useFetchStatus()
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialForm,
  });

  const handleSubmit = (values: FormSchemaType) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    fetchStatus.startLoading()
      
    authApi().register({
        ...values,
        timezone
      }).then((user)=>{
        console.log(user)
        router.push("/auth/confirm-email")
      }).catch((error: Error)=>{
        toast.error(error.message)
      }).finally(()=>{
        fetchStatus.stopLoading()
      })
       
  };
       

  return {
    form,
    handleSubmit,
    loading: fetchStatus.loading
  };
};
