import GuestNav from "@/components/GuestNav"
import Logo from "@/components/assets/Logo"
import React from "react"

interface Props {
    children: React.ReactNode
}

export default function layout(props:Props){
    return <div>
        <GuestNav/>
        {props.children}
    </div>
}