"use client"
import { useRedirect } from "@/hooks/useRedirect"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"


export const AuthToDashboard = ()=>{
  const { auth } = useSelector((state: RootState) => state.authUser)
  console.log("Login page rendered")
  const _redirect = useRedirect()
  
  useEffect(()=>{
      if(auth) return _redirect("/dashboard")
  },[])

  return <></>
}