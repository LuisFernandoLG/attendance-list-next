"use client";

import { useFetchStatus } from "@/hooks/useFetchStatus";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { registerAttendance } from "@/app/[locale]/actions";

export const RegisterAsistance = () => {
  const t = useTranslations("Attendance");
  const httpT = useTranslations("httpErrors");
  const fetchStatus = useFetchStatus(false);
  const params = useParams<{ eventId: string; memberCode: string }>();
  const [success, setSuccess] = useState(false);
  const [m, setM] = useState("before")

  const handleSubmit = async () => {
    console.log("Initiating: Server action from CLIENT")
    const { message, error, success } = await registerAttendance({error:"", message:"", success:false}, {
      eventId: params.eventId,
      memberCode: params.memberCode,
    })
    setM(message);
    
    
    if(success) {
      toast.success("Asistencia registrada")
      setSuccess(true)
    }else{
      const errorT = httpT(error) || httpT("default");
      toast.error(errorT)
    }
  }

  if(success) return <>
  <Button variant="success" className="mt-4">
    Asistencia registrada <CheckCircledIcon className="ml-2"/> </Button>
  </>

  return (
    <div>

      <Button
        onClick={handleSubmit}
        loading={fetchStatus.loading}
        disabled={fetchStatus.loading}
        className="mt-4"
      >
        {t("found.submit")}
      </Button>
        </div>

  );
};
