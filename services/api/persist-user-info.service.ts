import { User } from "@/models/userTypes";

export const setAndPersistDbUserState = (user:User)=>{
    localStorage.setItem("user", JSON.stringify(user))
}

export const clearDbUserStatePersistance = ()=>{
    localStorage.removeItem("user")
}

export const setAndPersistDbToken = (token:string)=>{
    localStorage.setItem("token", token)
}

export const ClearAndPersistDbToken = ()=>{
    localStorage.removeItem("token")
}

