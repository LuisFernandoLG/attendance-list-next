"use client"
import AppNav from "@/components/AppNav"
import WithAuth from "@/components/HOC/WithAuth"
import { WithVerifiedEmail } from "@/components/HOC/WithVerifiedEmail"
import React from "react"

interface Props {
    children: React.ReactNode
}

function layout(props:Props){
    return <div>
        <AppNav/>
        <div className="p-5">
        {props.children}
        </div>
    </div>
}

export default WithAuth(WithVerifiedEmail(layout))