"use client";

import { useFetchStatus } from "@/hooks/useFetchStatus";
import { attendanceApi } from "@/services/api/attendanceApi";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

export const RegisterAsistance = () => {
  const t = useTranslations("Attendance");
  const fetchStatus = useFetchStatus(false);
  const params = useParams<{ eventId: string; memberCode: string }>();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    fetchStatus.startLoading();
    try {
      const res = await attendanceApi().register({
        eventId: params.eventId,
        memberCode: params.memberCode,
      });
      setSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      fetchStatus.stopLoading();
      toast.success("Asistencia registrada");
    }
  };

  if(success) return <>
  <Button variant="success" className="mt-4">
    Asistencia registrada <CheckCircledIcon className="ml-2"/> </Button>
  </>

  return (
    <>
      <Button
        loading={fetchStatus.loading}
        disabled={fetchStatus.loading}
        className="mt-4"
        onClick={handleSubmit}
      >
        {t("found.submit")}
      </Button>
    </>
  );
};
