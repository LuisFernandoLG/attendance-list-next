import GuestNav from "@/components/GuestNav"
import LoginForm from "@/components/forms/LoginForm"
import { AuthToDashboard } from "@/components/redirects/AuthToDashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
    "title": "Login",
    "description": "Login to your account."
  }

export default function LoginPage(){
   
    return <>
    <GuestNav />
    <AuthToDashboard/>
    <Card className="max-w-[500px] mx-auto mt-5 shadow">
        <CardHeader>
            <CardTitle>Inicio de sesión</CardTitle>
        </CardHeader>
        <CardContent>
            <LoginForm/>
        </CardContent>
    </Card>
    </>
}