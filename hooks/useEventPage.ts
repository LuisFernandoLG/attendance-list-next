import { GetEventItemResponse, eventApi } from "@/services/api/eventApi";
import { useEffect, useState } from "react";
import { useFetchStatus } from "./useFetchStatus";
import { toast } from "sonner";

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
  const [event, setEvent] = useState<GetEventItemResponse>(defaultEvent);
  const { loading, startLoading, stopLoading } = useFetchStatus();

  const fetchEvent = async () => {
    try {
      startLoading();
      const item = await eventApi().get(eventId);
      setEvent(item);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return {
    event,
    loading,
  }
}