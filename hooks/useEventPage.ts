import { GetEventItemResponse, eventApi } from "@/services/api/eventApi";
import { useEffect, useState } from "react";
import { useFetchStatus } from "./useFetchStatus";
import { toast } from "sonner";
import { useQuery } from "react-query";
import { useTranslations } from "next-intl";

const defaultEvent: GetEventItemResponse = {
  id: 0,
  name: "Default",
  description: "",
  image_url: "",
  type: "",
  attendance_type: null,
  user_id: 0,
  created_at: "",
  updated_at: "",
  dates: [],
};

export const useEventPage = (eventId:string)=>{
  const httpErrorsT = useTranslations("httpErrors")
  const query = useQuery({
    queryKey: ["event", eventId],
    queryFn: ()=> eventApi().get(eventId),
    onError: (error:Error) => {
      const msg = httpErrorsT(error.message) || httpErrorsT("default")
      toast.error(msg)
    }
  })  


  return {
    event: query.data || defaultEvent,
    loading: query.isLoading,
    error: query.error,
    isError: query.isError
  }
}