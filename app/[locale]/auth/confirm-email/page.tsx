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
import { useEffect } from "react";



export default function ConfirmEmailPage() {
  const { user, auth } = useAuthUser()
  const _redirect = useRedirect()
  console.log("Confirm-email page rendered")

  
  useEffect(()=>{
    if(!auth) _redirect("/auth/login")
    if(auth && user.email_verified_at) _redirect("/dashboard")
  },[])

  
  return (
    <>
    <AppNav/>
      <Card className="max-w-[550px] mx-auto mt-5">
        <CardHeader>
          <CardTitle className="text-center">Verifica tu cuenta</CardTitle>
          <CardDescription className="text-center">
            Ingresa el código enviado a {user.email}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex justify-center">
          <ConfirmEmailForm/>
        </CardContent>

      </Card>
        <div className="flex flex-col items-center justify-center mt-3">
          <div className="text-sm">¿No recibiste el código?</div>
          <ResendEmailCodeButton/>
        </div>
    </>
  );
}
