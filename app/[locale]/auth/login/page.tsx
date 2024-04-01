import GuestNav from "@/components/GuestNav"
import LoginForm from "@/components/forms/LoginForm"
import { AuthToDashboard } from "@/components/redirects/AuthToDashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
    "title": "Login",
    "description": "Login to your account."
  }

export default async function LoginPage(){
    const t = await getTranslations("Login")
   
    return <>
    <GuestNav />
    <AuthToDashboard/>
    <Card className="max-w-[500px] mx-auto mt-5 shadow">
        <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
            <LoginForm/>
        </CardContent>
    </Card>
    </>
}