import {
  MemberItemFromPagination,
  MemberWithAttendance,
  eventMember,
} from "@/services/api/eventMember";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function AttendanceEventTab() {
  const [members, setMembers] = useState<MemberWithAttendance[]>([]);
  const params = useParams<{ id: string }>();

  const fetchMember = async () => {
    try {
      const response = await eventMember().getAttendance(params.id);
      console.log(response.data);
      setMembers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <article
      className="p-5 grid"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr)" }}
    >
      {members.map((item) => {

        const twoLettersFromWord = item.member.name[0] + item.member.name[1];

        return (
          <div key={item.id} className="border p-5 m-2 rounded-md flex gap-2 
          [&:nth-child(1)]:bg-green-600
          [&:nth-child(2)]:bg-pink-600
          [&:nth-child(3)]:bg-purple-600
          [&:nth-child(4)]:bg-rose-600
          [&:nth-child(5)]:bg-fuchsia-600
          [&:nth-child(6)]:bg-sky-600
          text-white

          ">
            <div>
              <Avatar>
                <AvatarFallback className="text-black">{twoLettersFromWord}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1>{item.member.name}</h1>
              <h2>{item.member.email}</h2>
            </div>
          </div>
        );
      })}
    </article>
  );
}
