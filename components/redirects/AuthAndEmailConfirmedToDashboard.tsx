"use client"
import { useAuthUser } from "@/hooks/useAuthUser";
import { useRedirect } from "@/hooks/useRedirect";
import { useEffect } from "react";

export const AuthAndEmailConfirmedToDashboard = ()=>{
  const { user, auth } = useAuthUser()
  const _redirect = useRedirect()

  
  useEffect(()=>{
    if(!auth) _redirect("/auth/login")
    if(auth && user.email_verified_at) _redirect("/dashboard")
  },[])

  return <></>
}