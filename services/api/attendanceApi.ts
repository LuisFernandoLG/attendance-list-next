import { axios } from "@/contants/axiosConfig"
import { handleError } from "@/helpers/handleAxiosErrors"

export const attendanceApi = () => {

  const register = ({eventId, memberCode}:{eventId: string, memberCode: string}) => {  
    try{
      const res = axios.post(`/attendance/${eventId}/${memberCode}`, {})
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