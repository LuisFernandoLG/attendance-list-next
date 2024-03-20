import { useFetchStatus } from "@/hooks/useFetchStatus";
import { EventItemFromResponse, eventApi } from "@/services/api/eventApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DashboardEventItem } from "./DashboardEventItem";
import { DashboardEventListSkeleton } from "./skeletons/DashboardEventListSkeleton";
import {  EmptyBoxIllustration } from "./illustrations/emptyIllustrations/EmptyBoxIllustration";

export const DashboardEventList = () => {
  const { loading, startLoading, stopLoading } = useFetchStatus(true);
  const [events, setEvents] = useState<EventItemFromResponse[]>([]);

  const handleLoadEvents = async () => {
    startLoading();
    try {
      const response = await eventApi().getAll();
      console.log({ response });
      setEvents(response.items);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    handleLoadEvents();
  }, []);

      
  if(loading) return <DashboardEventListSkeleton />

  return (
    <>
    <div
      className="grid mt-5"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
        gap: "1rem",
      }}
    >
      {events.map((item) => (
        <DashboardEventItem
          id={item.id}
          type={item.type}
          name={item.name}
          image_url={item.image_url}
          key={item.id}
        />
      ))}
    </div>
    {
      events.length === 0 && <div className="flex mx-auto justify-center w-full flex-col items-center">
       <EmptyBoxIllustration className="w-auto h-56"/>
        <p>No tienes eventos aún</p>
      </div>
    }
      </>
  );
};
