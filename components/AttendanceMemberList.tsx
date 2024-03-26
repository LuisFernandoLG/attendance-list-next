import { MemberWithAttendance } from "@/services/api/eventMember";
import { generateColorRGB } from "@marko19907/string-to-color";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { EmptyUsersIllustration } from "./illustrations/emptyIllustrations/EmptyUsersIllustration";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { es, enUS } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function AttendanceMemberList({
  members,
}: {
  members: MemberWithAttendance[];
}) {

  const t = useTranslations("Event")
  const locale = useLocale()
  const calendarLocale = locale === "es" ? es : enUS;


  

  return (
    <>
    <article
      className="grid gap-5"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr)" }}
    >
      {members.map((item) => {
        const twoLettersFromWord = item.member.name[0] + item.member.name[1];
        const time = format(new Date(item.member.created_at), "MM/dd/yyyy HH:mm", {
          locale:calendarLocale
        })
        const color = generateColorRGB(item.member.name);

        return (
          <Card
            key={item.id}
            className="w-full relative overflow-hidden shadow-md"
          >
            <div className="size-10 w-full round" style={{ 
              position: "absolute",
              top:0,
              left:0,
              backgroundColor: color,
             }}>
            
            </div>
            <CardHeader className="flex flex-col justify-center items-center">
            <Avatar>
                <AvatarFallback className="text-current mx-auto">
                  {twoLettersFromWord}
                </AvatarFallback>
              </Avatar>
              <CardDescription>{item.member.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 justify-center items-center">
              <Badge variant="secondary">{item.member.email}</Badge>
              <Badge variant="outline">
              {time}
              </Badge>
            </CardContent>
          </Card>
        );
      })}

    </article>
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
              </>
  );
}
