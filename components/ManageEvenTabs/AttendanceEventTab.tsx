"use client";
import { eventMember } from "@/services/api/eventMember";
import { useParams } from "next/navigation";
import {  useState } from "react";
import { useQuery } from "react-query";
import { NotFoundIllustration } from "../illustrations/NotFoundIllustration";
import { Button } from "../ui/button";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useLocale, useTranslations } from "next-intl";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { formatDateForHuman } from "@/helpers/formatDateForHuman";
import { es, enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { usePagination } from "@/hooks/usePagination";
import { MembersPagination } from "../MembersPagination";
import { MemberAttendanceTable } from "../tables/MemberAttendanceTable";
import { formatInTimeZone, zonedTimeToUtc } from "date-fns-tz";

export function AttendanceEventTab() {
  const {
    page,
    perPage,
    decrementPage,
    incrementPage,
    nextPage,
    numberLinks,
    prevPage,
    setPageNumber,
    updatePagination,
    updatePerPage,
  } = usePagination();
  const params = useParams<{ id: string }>();
  const [date, setDate] = useState(new Date());
  const locale = useLocale();

  const dateToUTC = (item: Date) => {
    //  set 00:00:00
    item.setHours(0, 0, 0, 0)
    const utcTime = formatInTimeZone(item, 'UTC', 'yyyy-MM-dd HH:mm:ss')
    return utcTime;
  }

  const query = useQuery({
    queryKey: [
      "getAttendance",
      params.id,
      dateToUTC(date),
      page,
      perPage,
    ],
    queryFn: () =>
      eventMember().getAttendance({
        eventId: params.id,
        date: dateToUTC(date),
        page,
        perPage,
      }),
    keepPreviousData: true,
    onSuccess: (data) => {
      updatePagination({ _lastPage: data.last_page });
    },
  });
  const t = useTranslations("Event");
  const commonT = useTranslations("common");

  const refetchMembers = () => query.refetch();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{t("tabs.attendance.title")}</CardTitle>
            <CardDescription>
              {t("tabs.attendance.description")}
            </CardDescription>
          </div>
          <AttendanceEventTabHeader
            isFetching={query.isFetching}
            refetchMembers={refetchMembers}
            date={date}
            locale={locale}
            setDate={setDate}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[40vh] flex flex-col items-center justify-center">
          <MemberAttendanceTable
            items={query.data?.data || []}
            loading={query.isLoading}
            isRefetching={query.isRefetching}
            isFetchingPreviousData={query.isPreviousData}
            isError={query.isError}
          />

          <MembersPagination
            isError={query.isError}
            loading={query.isLoading || query.isFetching}
            className={cn("flex flex-col justify-center items-center gap-2 mt-5")}
            decrementPage={decrementPage}
            incrementPage={incrementPage}
            nextPage={nextPage}
            page={page}
            perPage={perPage}
            prevPage={prevPage}
            setPageNumber={setPageNumber}
            numberLinks={numberLinks}
            updatePerPage={updatePerPage}
          />
        </div>
      </CardContent>
    </Card>
  );
}

const AttendanceEventTabHeader = ({
  isFetching,
  refetchMembers,
  date,
  locale,
  setDate,
}: {
  isFetching: boolean;
  refetchMembers: () => void;
  date: Date;
  locale: string;
  setDate: (date: Date) => void;
}) => {
  return (
    <div className="flex gap-2">
      <Button
        className="w-fit"
        loading={isFetching}
        variant="default"
        onClick={refetchMembers}
      >
        <ReloadIcon className="" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date ? formatDateForHuman(date, locale === "es" ? es : enUS) : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            locale={locale === "es" ? es : enUS}
            onSelect={(d) => {
              if (d instanceof Date) setDate(d);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
