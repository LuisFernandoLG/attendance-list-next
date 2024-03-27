"use server"

import { handleError } from "@/helpers/handleAxiosErrors"
import { isClientSide } from "@/helpers/isClientSide"
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
  try{
    const res = await attendanceApi().register(data)
    return {
      success: true,
      message: "register was successful",
      error: "",
    }
  }catch(e){
    const error = new Error(handleError(e))
   
    return {
      success: false,
      message: "There was an error registering the attendance",
      error: error.message
    }
  }
}