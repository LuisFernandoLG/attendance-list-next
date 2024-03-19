"use client"

import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { redirect, useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function WithAuth(Component: any){    
    return function WithAuth(props: any){
        const {auth} = useSelector((state:RootState)=>state.authUser)

        useEffect(()=>{
            if(!auth) redirect("/auth/login")
        },[])
        
        return <Component {...props}/>        
    }
}