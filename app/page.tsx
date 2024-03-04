"use client"
import GuestNav from "@/components/GuestNav";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {



  return (
    <>
    <GuestNav/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <pre>
          LANDING PAGE
        </pre>
        
      </div>
    </main>
    </>
  );
}
