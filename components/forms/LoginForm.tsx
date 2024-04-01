"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { authApi } from "@/services/api/authApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/authSlice";
import { toast } from "sonner";
import { useFetchStatus } from "@/hooks/useFetchStatus";
import { debounce } from "@/helpers/debounce";
import { EnterIcon } from "@radix-ui/react-icons";
import {useTranslations} from "next-intl"
import { useRouter } from "../navigation";
import { successMessages } from "@/contants/successMessages";

const loginFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
  })
  .required();

type LoginFormType = z.infer<typeof loginFormSchema>;

const initialForm: LoginFormType = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: initialForm,
  });
  const dispatch = useDispatch<AppDispatch>()
  const fetchStatus = useFetchStatus()
  const httpErrorsT = useTranslations("httpErrors")
  const httpSuccessT = useTranslations("httpSuccess")
  const route = useRouter()
  const t = useTranslations("Login")

  const handleSubmit = async (values:LoginFormType)=>{
    try{
      fetchStatus.startLoading()
      const res = await authApi().login(values)
      dispatch(login(res))
      
      const msg = httpSuccessT(successMessages["welcome again x"], {name: res.user.name}) || httpSuccessT("default")
      toast.success(msg)
      route.push("/dashboard")

    }catch(error){
      if(error instanceof Error){
        toast.error(httpErrorsT(error.message) || httpErrorsT("default"))
        return
      }
      toast.error("Unknown Error")
    }finally{
      fetchStatus.stopLoading()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button loading={fetchStatus.loading  } className="mt-5 w-full">
            {t("submit")}
            <EnterIcon  className="w-5 h-5 ml-2"/>
        </Button>
      </form>
    </Form>
  );
}
