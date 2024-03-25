import { GetEventItemResponse, eventApi } from "@/services/api/eventApi";
import { useEffect, useState } from "react";
import { useFetchStatus } from "./useFetchStatus";
import { toast } from "sonner";
import { useQuery } from "react-query";

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
  const query = useQuery({
    queryKey: ["event", eventId],
    queryFn: ()=> eventApi().get(eventId),
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  })  


  return {
    event: query.data || defaultEvent,
    loading: query.isLoading,
    error: query.error,
    isError: query.isError
  }
}