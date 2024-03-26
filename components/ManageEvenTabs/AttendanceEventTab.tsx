"use client"
import {
  MemberWithAttendance,
  eventMember,
} from "@/services/api/eventMember";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchStatus } from "@/hooks/useFetchStatus";
import { AttendanceMemberList } from "../AttendanceMemberList";
import { useQuery } from "react-query";
import { AttendanceTableSkeleton } from "../skeletons/AttendanceTableSkeleton";
import { NotFoundIllustration } from "../illustrations/NotFoundIllustration";
import { Button } from "../ui/button";
import { ReloadIcon, ResetIcon } from "@radix-ui/react-icons";

export function AttendanceEventTab() {

  const [members, setMembers] = useState<MemberWithAttendance[]>([]);
  const params = useParams<{ id: string }>();
  const fetchStatus = useFetchStatus(true)
  const query = useQuery(['attendance', params.id], () => eventMember().getAttendance(params.id))

  if (query.isLoading) {
     return <AttendanceTableSkeleton />;
  }

  if(query.isError){
    return <div className="flex flex-col gap-2 justify-center items-center">
      <NotFoundIllustration className="w-1/6 h-auto mx-auto" />
      <Button variant="outline" onClick={() => query.refetch()}>Try again <ReloadIcon className="ml-2"/></Button>
    </div>
  }

  return <div>

  <AttendanceMemberList members={query.data?.data || []}/>
  </div>
}