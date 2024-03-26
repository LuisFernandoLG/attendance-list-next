"use client"
import GuestNav from "@/components/GuestNav";
import SignUpForm from "@/components/forms/SignUpForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "@/components/navigation";
import { useRedirect } from "@/hooks/useRedirect";
import { useTranslations } from "next-intl";

export default function SignUpPage() {
  const { auth } = useSelector((state: RootState) => state.authUser)
  const _redirect = useRedirect()
  const t = useTranslations("SignUp")
  console.log("Sign-up page rendered")

  useEffect(()=>{
    if(auth) _redirect("/dashboard")
  },[])

  return (
    <>
    <GuestNav />
      <Card className="max-w-[500px] mx-auto mt-5">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
        <CardContent>
          <SignUpForm className="space-y-5" />
        </CardContent>
      </Card>
    </>
  );
}
