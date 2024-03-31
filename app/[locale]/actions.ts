"use server"

import { attendanceApi } from "@/services/api/attendanceApi"

type Props = {
  success: boolean,
  message: string,
  error: string
}

type Data = {
  eventId: string,
  memberCode: string
}

export async function registerAttendance(prevState:Props, data:Data){
  // Server Side
  try{
    console.log("Try Server ------------------------")
    const res = await attendanceApi().register(data)
    console.log("Try #1 Success")
    return {
      success: true,
      message: "register was successful",
      error: "",
    }
  }catch(e){
    const error = e instanceof Error ? e.message : "Unknown error"
    return {
      success: false,
      message: error,
      error: error
    }
  }
}