import { axios } from "@/contants/axiosConfig";
import { handleError } from "@/helpers/handleAxiosErrors";

type Event = {
    name: string;
    description: string;
    image_url?: string;
    type: string;
    attandance_type: string;
    user_id: number;
    created_at: string;
    updated_at?: string;
    dates : string[];
}

type CreateEventProps = {
    name: string;
    description: string;
    image_url?: string;
    type: string;
    dates : string[];
}


export const eventApi = ()=>{
    const create = async (props: CreateEventProps) => {
        try {
            console.log(axios.defaults)
            const response = await axios.post("/events", props);
            return response.data;
        } catch (e) {
            const error = new Error(handleError(e))
            throw error
        }
    }


    return {
        create
    }
}