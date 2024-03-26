"use client"
import AppNav from "@/components/AppNav";
import { ResendEmailCodeButton } from "@/components/ResendEmailCodeButton";
import ConfirmEmailForm from "@/components/forms/ConfirmEmailForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useRedirect } from "@/hooks/useRedirect";
import { useTranslations } from "next-intl";
import { useEffect } from "react";



export default function ConfirmEmailPage() {
  const { user, auth } = useAuthUser()
  const _redirect = useRedirect()
  const t = useTranslations("ConfirmEmail")

  
  useEffect(()=>{
    if(!auth) _redirect("/auth/login")
    if(auth && user.email_verified_at) _redirect("/dashboard")
  },[])

  
  return (
    <>
    <AppNav/>
      <Card className="max-w-[550px] mx-auto mt-5">
        <CardHeader>
          <CardTitle className="text-center">{t("title")}</CardTitle>
          <CardDescription className="text-center">
          {t("description")} {user.email}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex justify-center">
          <ConfirmEmailForm/>
        </CardContent>

      </Card>
        <div className="flex flex-col items-center justify-center mt-3">
          <div className="text-sm">{t("didntReceive")}</div>
          <ResendEmailCodeButton/>
        </div>
    </>
  );
}
