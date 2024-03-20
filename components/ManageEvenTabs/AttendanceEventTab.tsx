import {
  MemberItemFromPagination,
  MemberWithAttendance,
  eventMember,
} from "@/services/api/eventMember";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchStatus } from "@/hooks/useFetchStatus";
import { AttendanceMemberList } from "../AttendanceMemberList";

export function AttendanceEventTab() {

  const [members, setMembers] = useState<MemberWithAttendance[]>([]);
  const params = useParams<{ id: string }>();
  const fetchStatus = useFetchStatus(true)

  const fetchMember = async () => {
    try {
      fetchStatus.startLoading()
      const response = await eventMember().getAttendance(params.id);
      console.log(response.data);
      setMembers(response.data);
    } catch (e) {
      console.log(e);
    }finally{
      fetchStatus.stopLoading()
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  return <div>

  <AttendanceMemberList members={members} loading={fetchStatus.loading} />
  </div>
}