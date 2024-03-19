import { useFetchStatus } from "@/hooks/useFetchStatus";
import { EventItemFromResponse, eventApi } from "@/services/api/eventApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DashboardEventItem } from "./DashboardEventItem";

export const DashboardEventList = () => {
  const { loading, startLoading, stopLoading } = useFetchStatus();
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

  return (
    <div
      className="grid mt-5 g"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
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
  );
};
