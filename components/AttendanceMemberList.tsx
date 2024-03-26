import { MemberWithAttendance } from "@/services/api/eventMember";
import { AttendanceTableSkeleton } from "./skeletons/AttendanceTableSkeleton";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { EmptyUsersIllustration } from "./illustrations/emptyIllustrations/EmptyUsersIllustration";
import { useTranslations } from "next-intl";

export function AttendanceMemberList({
  members,
}: {
  members: MemberWithAttendance[];
}) {

  const t = useTranslations("Event")

  

  return (
    <article
      className="grid gap-5"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr)" }}
    >
      {members.map((item) => {
        const twoLettersFromWord = item.member.name[0] + item.member.name[1];

        return (
          <div
            key={item.id}
            className="border p-5 rounded-md flex gap-2 
          [&:nth-child(1)]:bg-green-600
          [&:nth-child(2)]:bg-pink-600
          [&:nth-child(3)]:bg-purple-600
          [&:nth-child(4)]:bg-rose-600
          [&:nth-child(5)]:bg-fuchsia-600
          [&:nth-child(6)]:bg-sky-600
          text-white

          "
          >
            <div>
              <Avatar>
                <AvatarFallback className="text-black">
                  {twoLettersFromWord}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1>{item.member.name}</h1>
              <h2>{item.member.email}</h2>
            </div>
          </div>
        );
      })}

      {
        !members.length && (
          <div className="text-center text-gray-400">
            <EmptyUsersIllustration className="w-1/6 h-auto mx-auto" />
            <p>{
            t("tabs.members.table.empty")}
            </p>
          </div>
        )
      }
    </article>
  );
}
