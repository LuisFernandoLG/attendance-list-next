import { CODE_AXIOS_ERRORS, DEFAULT_AXIOS_ERROR, MESSAGE_AXIOS_ERRORS } from "@/contants/axiosErrors";
import axios, { AxiosError } from "axios";

type ResponseDataError = {
    message: string;
    errors: [];
  };

export const handleError = (error: any): string => {
    console.log({resolvingError:error})
    if (axios.isAxiosError(error)) return handleAxiosError(error);
    return "Unknown Error";
  };
  
  
const handleAxiosError = (error: AxiosError<ResponseDataError>): string => {
        if (typeof(error.response?.data?.message) === "string"){
          if(!MESSAGE_AXIOS_ERRORS[error.response?.data?.message]) return "There was an error with the response"
          return MESSAGE_AXIOS_ERRORS[error.response?.data.message];
        }
        if (typeof(error.code) === "string") 
        {
          if(!CODE_AXIOS_ERRORS[error.code]) return DEFAULT_AXIOS_ERROR
          return CODE_AXIOS_ERRORS[error.code]
        }
        
        return DEFAULT_AXIOS_ERROR;
};
  