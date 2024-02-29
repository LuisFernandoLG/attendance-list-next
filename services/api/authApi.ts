import {
  LoginResponse,
  RegisterProps,
  RegisterResponse,
} from "@/models/authApiTypes";
import { User } from "@/models/userTypes";
import axios, { AxiosError } from "axios";
const apiUrl = process.env.NEXT_PUBLIC_MY_ATTENDANCE_API;

axios.defaults.baseURL = `${apiUrl}/auth`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const authApi = () => {
  const login = async (props: {
    email: string;
    password: string;
  }): Promise<User> => {
    try {
      const response = await axios.post("/login", props);
      const data = response.data() as LoginResponse;

      return data.user;
    } catch (error) {
      const errorMsg = new Error(handleError(error))
      throw errorMsg
    }
  };

  const register = async (
    props: RegisterProps
  ): Promise<User> => {
    try {
      const response = await axios.post("/register", props);
      const data = response.data as RegisterResponse;

      return data.user;
    } catch (error) {
      console.log(error)
      const errorMsg = new Error(handleError(error))
      throw errorMsg
    }
  };

  const verifyEmail = async (props:{email:string, code:string}): Promise<boolean> =>{
    try {
      const response = await axios.post("/verify-email", props)
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
    verifyEmail
  };
};

const handleError = (error: any): string => {
  if (axios.isAxiosError(error)) return handleAxiosError(error);
  return "Unknown Error";
};

type ResponseDataError = {
  message: string;
  errors: [];
};

const handleAxiosError = (error: AxiosError<ResponseDataError>): string => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    if (
      error.response.data.message === "The email does not belong to any user"
    )
      return "Email provided is not registered";
    if (error.response.data.message === "Invalid password")
      return "Invalid password";
    if (error.response.data.message === "Validation error")
      return "Validation Error";
    if (error.response.data.message === "Email has been already taken")
      return "Email has been already taken";
  }

  if(error.message === 'Request failed with status code 404') return "Endpoint not found"

  return "Axios: Unknown error.";
};
