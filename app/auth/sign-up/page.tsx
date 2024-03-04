"use client"
import GuestNav from "@/components/GuestNav";
import SignUpForm from "@/components/forms/SignUpForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SignUpPage() {
  const { auth } = useSelector((state: RootState) => state.authUser)
  const router = useRouter()
  console.log("Sign-up page rendered")

  useEffect(()=>{
    if(auth) redirect("/dashboard")
  },[])

  return (
    <>
    <GuestNav />
      <Card className="max-w-[500px] mx-auto mt-5">
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
        <CardDescription>Inicia creando una cuenta.</CardDescription>
      </CardHeader>
        <CardContent>
          <SignUpForm className="space-y-5" />
        </CardContent>
      </Card>
    </>
  );
}
