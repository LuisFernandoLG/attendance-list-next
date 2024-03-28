"use client"
import { Loader } from "@/components/Loader";
import { AttendanceEventTab } from "@/components/ManageEvenTabs/AttendanceEventTab";
import { DatesEventTab } from "@/components/ManageEvenTabs/DatesEventTab";
import { GeneralEventTab } from "@/components/ManageEvenTabs/GeneralEventTab";
import { MemberEventTab } from "@/components/ManageEvenTabs/MembersEventTab";
import { GearIcon, HomeIcon, PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import { NotFoundIllustration } from "@/components/illustrations/NotFoundIllustration";
import { Link } from "@/components/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEventPage } from "@/hooks/useEventPage";
import { useTranslations } from "next-intl";

export const EventManagerContainer = ({eventId}:{eventId:string}) => {

  const { event, loading, isError, error } = useEventPage(eventId);
  const t = useTranslations("Event")
  const commonT = useTranslations("common")

  if(loading) return <div>
    <Skeleton className="w-1/3 h-12"/>
    <Skeleton className="mt-5 w-full h-96"/>
  </div>
  if(isError) return <div className="flex justify-center items-center flex-col gap-2">
    <NotFoundIllustration className="max-w-64"/>
    <p className="mt-2 text-sm">{commonT("sourceNotFound")}</p>
    <Link href="/dashboard"  className={buttonVariants({variant:"outline"})}><HomeIcon className="mr-2"/>{commonT("goHome")}</Link>
  </div>

  return (
    <>
      <Tabs defaultValue="members" className="w-[100%]">
        <TabsList>
          <div className="border p-1 rounded-sm">
            <TabsTrigger value="members"> <PersonIcon className="mr-1"/>  {t("tabs.members.tabName")}</TabsTrigger>
            <TabsTrigger value="attendance"> <ReaderIcon className="mr-1"/>  {t("tabs.attendance.tabName")}</TabsTrigger>
            <TabsTrigger value="dates"> <GearIcon className="mr-1"/> {t("tabs.settings.tabName")}</TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="general">
          <GeneralEventTab event={event} />
        </TabsContent>
        <TabsContent value="dates">
          <DatesEventTab event={event}/>
        </TabsContent>
        <TabsContent value="members">
          <MemberEventTab />
        </TabsContent>
        <TabsContent value="attendance">
          <AttendanceEventTab/>
        </TabsContent>
      </Tabs>
    </>
  );

}