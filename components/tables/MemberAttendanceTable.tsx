import { MemberWithAttendance } from "@/services/api/eventMember";
import { EmptyUsersIllustration } from "../illustrations/emptyIllustrations/EmptyUsersIllustration";
import { useTranslations } from "next-intl";
import { AttendanceItemCard } from "../cards/AttendanceItemCard";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const MemberAttendanceTable = ({
  items,
  loading,
  isRefetching,
  isFetchingPreviousData,
  isError,
  className
}: Props) => {
  if (loading) return <SkeletonState/>

  if(isRefetching && isFetchingPreviousData) return <SkeletonState/>

  if (isError) return <span>Error...</span>;

  const isEmpty = items.length === 0;
  if (isEmpty) return <EmptyState />;

  return (
    <div className={cn([className, "gap-5 w-full"])} style={{display:"grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr)" }}>
      {items.map((item) => {
        return (
          <AttendanceItemCard
            key={item.id}
            id={item.id}
            attendances={item.attendances}
            name={item.member.name}
            email={item.member.email}
            created_at={String(item.created_at)}
          />
        );
      })}
    </div>
  );
};

const EmptyState = () => {
  const t = useTranslations("Event");
  return (
    <div className="text-center text-gray-400 relative">
      <EmptyUsersIllustration className="w-full h-[-90%] absolute" />
      <AttendanceItemCard
        className="sticky top-0 invisible"
        id={99999}
        attendances={1}
        name="Invisible Card"
        email="fake@gmail.com"
        created_at="2021-09-01T00:00:00"
      />
      <p>{t("tabs.members.table.empty")}</p>
    </div>
  );
};

const SkeletonState = () => {
  return (
    <div className="gap-5 w-full" style={{display:"grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr)" }}>
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
      <Skeleton className="w-full h-36" />
    </div>
  );
}

type Props = {
  items: MemberWithAttendance[];
  loading: boolean;
  isError: boolean;
  className?:string;
  isRefetching: boolean;
  isFetchingPreviousData: boolean;
};