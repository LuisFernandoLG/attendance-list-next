import { useState } from "react"

export const useFetchStatus = ()=>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const startLoading = ()=> setLoading(true)
    const stopLoading = ()=> setLoading(false)

    const addError = (e:string)=> setError(e)

    return {
        loading, error, startLoading, stopLoading, addError
    }
}