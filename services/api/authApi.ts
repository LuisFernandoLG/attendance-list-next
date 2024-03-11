import { axios } from "@/contants/axiosConfig";
import { handleError } from "@/helpers/handleAxiosErrors";
import {
  LoginResponse,
  RegisterProps,
  RegisterResponse,
} from "@/models/authApiTypes";


export const authApi = () => {
  const login = async (props: {
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    try {
      const response = await axios.post("/auth/login", props);
      const data = response.data as LoginResponse;
      return data
    } catch (error) {
      const errorMsg = new Error(handleError(error))
      throw errorMsg
    }
  };

  const register = async (
    props: RegisterProps
  ): Promise<RegisterResponse> => {
    try {
      const response = await axios.post("/auth/register", props);
      const data = response.data as RegisterResponse;
      return data;
    } catch (error) {
      console.log(error)
      const errorMsg = new Error(handleError(error))
      throw errorMsg
    }
  };

  const resendVerificationEmailCode = async (email:string)=>{
    try{
      const res = await axios.post("/auth/resend-email", {email})
      return true
    }catch(error){
      console.log(error)
      const errorMsg = new Error(handleError(error))
      return errorMsg
    }
  }

  const verifyEmail = async (props:{email:string, code:string}): Promise<boolean> =>{
    try {
      const response = await axios.post("/auth/verify-email", props)
      const data = response.data
      return true
    } catch (error) {
      console.log(error)
      const errorMsg = new Error(handleError(error))
      throw errorMsg
    }
  }

  return {
    login,
    register,
    verifyEmail,
    resendVerificationEmailCode
  };
};


