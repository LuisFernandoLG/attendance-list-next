import { isClientSide } from "@/helpers/isClientSide";
import _axios from "axios";
export const apiUrl = process.env.NEXT_PUBLIC_MY_ATTENDANCE_API;

_axios.defaults.baseURL = apiUrl
_axios.defaults.headers.common["Content-Type"] = "application/json";
_axios.defaults.headers.common["Accept"] = "application/json";
// barear token

const token = isClientSide() ? localStorage.getItem("token") : "";

_axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;    

export const axios = _axios;