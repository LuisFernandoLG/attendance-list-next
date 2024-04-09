export const MESSAGE_AXIOS_ERRORS : { [key: string]: string } = {
    "The email does not belong to any user" : "The email does not belong to any user",
    "Invalid password": "Invalid password",
    "Validation error": "Validation error",
    "Email has been already taken": "Email has been already taken",
    "Event not today": "Event not today",
    "OTP does not exist": "OTP does not exist",
    "OTP Expired": "OTP Expired",
    "OTP is not valid": "OTP is not valid",
    "Unauthenticated.": "Unauthenticated",
}

export const CODE_AXIOS_ERRORS: { [key: string]: string } = {
    "ERR_NETWORK": "ERR_NETWORK",
    "ECONNABORTED": "ERR_NETWORK",
    "Network Error": "Network Error",
}

export const DEFAULT_AXIOS_ERROR = "default"
export const DEFAULT_UNKNOWN_ERROR_FROM_SERVER = "Uknown message error from server"