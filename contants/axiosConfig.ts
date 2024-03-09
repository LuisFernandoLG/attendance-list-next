import _axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_MY_ATTENDANCE_API;

_axios.defaults.baseURL = apiUrl
_axios.defaults.headers.common["Content-Type"] = "application/json";
_axios.defaults.headers.common["Accept"] = "application/json";
// barear token
_axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;    

export const axios = _axios;