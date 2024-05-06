import { MemberItemFromPagination, eventMember } from "@/services/api/eventMember";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useFetchStatus } from "./useFetchStatus";
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useTranslations } from "next-intl";
import { useI18nZodErrors } from "./useI18nZodErrors";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  details: z.string().max(255),
  notifyByEmail: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  email: "",
  details: "",
  notifyByEmail: false,
};

type Props = {
  addMember: (item: MemberItemFromPagination) => void;
}

export const useAddEventMemberForm = ({addMember}:Props)=>{
  useI18nZodErrors()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const params = useParams<{id:string}>()
  const fetchStatus = useFetchStatus()
  const t = useTranslations("Event")
  const httpErrorsT = useTranslations("httpErrors")

  const onSubmit = async (values: FormSchema) => {
    fetchStatus.startLoading()
    try{
      console.log({id:params.id})
      const res = await eventMember().create(params.id, {
        name: values.name, 
        email: values.email, 
        details: values.details,
        verifyByEmail: false,
      })

      console.log({res})
      addMember({
       id: res.member.id,
       email: res.member.email,
       details: res.member.details,
        name: res.member.name,
        custom_id: res.member.custom_id,
        notifyByEmail: false,
        notifyByPhone: false,
        event_id: parseInt(params.id),
        created_at: new Date(),
        updated_at: new Date(),
        url_attendance: res.url_attendance
      })
      form.reset()
      const msg = t("tabs.members.addMemberForm.success", {name: res.member.name})
      toast.success(msg)
    }catch(error){
      if(error instanceof Error){
        toast.error(httpErrorsT(error.message) || httpErrorsT("default"))
        return
      }
      toast.error("Unknown Error")
    }
  finally{
    fetchStatus.stopLoading()
  }
  };



  return {
    onSubmit,
    form,
    loading: fetchStatus.loading

  }
}