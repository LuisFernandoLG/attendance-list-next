import { GetAttendancePagination, MemberWithAttendance } from "@/services/api/eventMember";
import { generateColorRGB } from "@marko19907/string-to-color";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { EmptyUsersIllustration } from "./illustrations/emptyIllustrations/EmptyUsersIllustration";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { es, enUS } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { PaginationComponent, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Button } from "./ui/button";
import { usePagination } from "@/hooks/usePagination";
import { AttendanceItemCard } from "./cards/AttendanceItemCard";

export function AttendanceMemberList({
  members,
}: {
  members: MemberWithAttendance[];
  pagination?:GetAttendancePagination
}) {

  const t = useTranslations("Event")
  const locale = useLocale()
  const calendarLocale = locale === "es" ? es : enUS; 

  return (<div></div>);
}

