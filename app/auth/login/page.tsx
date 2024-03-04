"use client"
import GuestNav from "@/components/GuestNav"
import LoginForm from "@/components/forms/LoginForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RootState } from "@/redux/store"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function LoginPage(){
    const { auth } = useSelector((state: RootState) => state.authUser)
    console.log("Login page rendered")
    
    useEffect(()=>{
        if(auth) redirect("/dashboard")
    },[])

    return <>
    <GuestNav />
    <Card className="max-w-[500px] mx-auto mt-5">
        <CardHeader>
            <CardTitle>Inicio de sesión</CardTitle>
        </CardHeader>
        <CardContent>
            <LoginForm/>
        </CardContent>
    </Card>
    </>
}