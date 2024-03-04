import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export const useAuthUser = ()=>{
    const {user, auth} = useSelector((state:RootState)=>state.authUser)

    return {
        user,
        auth
    }
}