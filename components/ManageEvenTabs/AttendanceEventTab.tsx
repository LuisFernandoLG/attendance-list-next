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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTranslations } from "next-intl";

export function AttendanceEventTab() {

  const params = useParams<{ id: string }>();
  const query = useQuery(['attendance', params.id], () => eventMember().getAttendance(params.id))
  const t = useTranslations("Event")
  const commonT = useTranslations("common")

  const refetchMembers = ()=> query.refetch()

  if (query.isLoading) {
     return <AttendanceTableSkeleton />;
  }

  if(query.isError){
    return <div className="flex flex-col gap-2 justify-center items-center">
      <NotFoundIllustration className="w-1/6 h-auto mx-auto" />
      <Button variant="outline" onClick={() => query.refetch()}>{commonT("tryAgain")}<ReloadIcon className="ml-2"/></Button>
    </div>
  }

  return <Card>
  
  <CardContent>
    <CardHeader>
<CardTitle>{t("tabs.attendance.title")}</CardTitle>
<CardDescription>{t("tabs.attendance.description")}</CardDescription>
  <Button className="w-fit" loading={query.isFetching}  variant="default" onClick={refetchMembers}><ReloadIcon className=""/></Button>
    </CardHeader>
  <AttendanceMemberList members={query.data?.data || []}/>
  </CardContent>
  </Card>
}