import GuestNav from "@/components/GuestNav";
import React from "react";

export default function Layout({children}:{children:React.ReactNode}){
    return <>
      <GuestNav />
        {children}
    </>
}