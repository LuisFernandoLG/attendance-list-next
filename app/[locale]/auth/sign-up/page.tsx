import GuestNav from "@/components/GuestNav";
import SignUpForm from "@/components/forms/SignUpForm";
import { AuthToDashboard } from "@/components/redirects/AuthToDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  "title": "Sign Up",
  "description": "Create an account."
}

export default async function SignUpPage() {
  const t = await getTranslations("SignUp")

  return (
    <>
    <GuestNav />
    <AuthToDashboard/>
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
