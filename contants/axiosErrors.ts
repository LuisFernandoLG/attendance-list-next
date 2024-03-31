export const MESSAGE_AXIOS_ERRORS : { [key: string]: string } = {
    "The email does not belong to any user" : "The email does not belong to any user",
    "Invalid password": "Invalid password",
    "Validation error": "Validation error",
    "Email has been already taken": "Email has been already taken",
    "Event not today": "Event not today",
}

export const CODE_AXIOS_ERRORS: { [key: string]: string } = {
    "ERR_NETWORK": "There was an error with the conection",
    "ECONNABORTED": "Time out",
}

export const DEFAULT_AXIOS_ERROR = "Axios: Unknown error."