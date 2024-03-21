"use client"
import GuestNav from "@/components/GuestNav"
import LoginForm from "@/components/forms/LoginForm"
import { useRouter } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRedirect } from "@/hooks/useRedirect"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function LoginPage(){
    const { auth } = useSelector((state: RootState) => state.authUser)
    console.log("Login page rendered")
    const _redirect = useRedirect()
    
    useEffect(()=>{
        if(auth) return _redirect("/dashboard")
    },[])

    return <>
    <GuestNav />
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