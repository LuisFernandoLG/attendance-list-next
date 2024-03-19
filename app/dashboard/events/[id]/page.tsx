"use client";
import { AttendanceEventTab } from "@/components/ManageEvenTabs/AttendanceEventTab";
import { DatesEventTab } from "@/components/ManageEvenTabs/DatesEventTab";
import { GeneralEventTab } from "@/components/ManageEvenTabs/GeneralEventTab";
import { MemberEventTab } from "@/components/ManageEvenTabs/MembersEventTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEventPage } from "@/hooks/useEventPage";

export default function Page({ params }: { params: { id: string } }) {
  const { event, loading } = useEventPage(params.id);

  console.log({event})

  return (
    <>
      <Tabs defaultValue="members" className="w-[100%]">
        <TabsList>
          <div className="border p-1 rounded-sm">
            <TabsTrigger value="members">Participantes</TabsTrigger>
            <TabsTrigger value="attendance">Asistencia</TabsTrigger>
            <TabsTrigger value="dates">Fechas</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
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
