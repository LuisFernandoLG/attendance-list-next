"use client";

import {  eventApi } from "@/services/api/eventApi";
import { toast } from "sonner";
import { DashboardEventItem } from "./DashboardEventItem";
import { DashboardEventListSkeleton } from "./skeletons/DashboardEventListSkeleton";
import {  EmptyBoxIllustration } from "./illustrations/emptyIllustrations/EmptyBoxIllustration";
import { useQuery } from "react-query";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const DashboardEventList = ({className}:{className?:string}) => {
  const queryClient = useQuery(["events"], eventApi().getAll, {
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  })
      
  if(queryClient.isLoading) return <DashboardEventListSkeleton />
  if(queryClient.isError) {
 
  return <div className="flex justify-center items-center gap-2 ">
    <ExclamationTriangleIcon />  There was an error 
  </div>
  }

  const isEmpty = queryClient.data?.items.length === 0

  return (
    <div className={className}>
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
        gap: "1rem",
      }}
    >
      {queryClient.data?.items.map((item) => (
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
      isEmpty && <div className="flex mx-auto justify-center w-full flex-col items-center">
       <EmptyBoxIllustration className="w-auto h-56"/>
        <p>No tienes eventos aún</p>
      </div>
    }
      </div>
  );
};
