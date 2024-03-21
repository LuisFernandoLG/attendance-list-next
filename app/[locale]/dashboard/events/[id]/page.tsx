"use client";
import { AttendanceEventTab } from "@/components/ManageEvenTabs/AttendanceEventTab";
import { DatesEventTab } from "@/components/ManageEvenTabs/DatesEventTab";
import { GeneralEventTab } from "@/components/ManageEvenTabs/GeneralEventTab";
import { MemberEventTab } from "@/components/ManageEvenTabs/MembersEventTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEventPage } from "@/hooks/useEventPage";
import { GearIcon, PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

export default function Page({ params }: { params: { id: string } }) {
  const { event, loading } = useEventPage(params.id);
  const t = useTranslations("Event")

  console.log({event})

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
