import { apiUrl } from "@/contants/axiosConfig"
import { handleError } from "@/helpers/handleAxiosErrors"
import axios from "axios"

export const attendanceApi = () => {

  // called from app/[locale]/actions.ts , Server action
  const register = async ({eventId, memberCode}:{eventId: string, memberCode: string}) => {  
    try{
      const res = await axios.post(`${apiUrl}/attendance/${eventId}/${memberCode}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      return res
    }
    catch(e){
     const error = new Error(handleError(e))
     return error
    }
  }

  return {
    register
  }
}