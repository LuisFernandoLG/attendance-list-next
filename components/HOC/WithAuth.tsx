"use client"

import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import React, { useEffect } from "react"
import { useRedirect } from "@/hooks/useRedirect"

export default function WithAuth(Component: any){    
    return function WithAuth(props: any){
        const {auth} = useSelector((state:RootState)=>state.authUser)
        const _redirect = useRedirect()

        useEffect(()=>{
            if(!auth) _redirect("/auth/login")
        },[])
        
        return <Component {...props}/>        
    }
}