import { axios } from "@/contants/axiosConfig";
import { handleError } from "@/helpers/handleAxiosErrors";

export interface GetAllEventsResponse {
    message: string;
    items:   EventItemFromResponse[];
}

export interface EventItemFromResponse {
    id:              number;
    name:            string;
    description:     string;
    image_url:       string;
    type:            string;
    attandance_type: null;
    user_id:         number;
    created_at:      string;
    updated_at:      string;
}

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

    const getAll = async (): Promise<GetAllEventsResponse> =>{
        try {
            const response = await axios.get("/events");
            const data = response.data as GetAllEventsResponse;
            return data
        } catch (e) {
            console.log(e)
            const error = new Error(handleError(e))
            throw error
        }
    }


    return {
        create,
        getAll
    }
}