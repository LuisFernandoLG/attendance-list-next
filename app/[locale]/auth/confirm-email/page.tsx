import AppNav from "@/components/AppNav";
import { ResendEmailCodeButton } from "@/components/ResendEmailCodeButton";
import ConfirmEmailForm from "@/components/forms/ConfirmEmailForm";
import { AuthAndEmailConfirmedToDashboard } from "@/components/redirects/AuthAndEmailConfirmedToDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";


export const metadata: Metadata = {
  "title": "Confirm email",
  "description": "Confirm your email address to continue."
}

export default async function ConfirmEmailPage() {
  const t = await getTranslations("ConfirmEmail")
  
  return (
    <>
    <AppNav/>
    <AuthAndEmailConfirmedToDashboard/>
      <Card className="max-w-[550px] mx-auto mt-5">
        <CardHeader>
          <CardTitle className="text-center">{t("title")}</CardTitle>
          
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
