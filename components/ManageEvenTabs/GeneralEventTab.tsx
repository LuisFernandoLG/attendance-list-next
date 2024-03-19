import { EventItemFromResponse } from "@/services/api/eventApi";
import { Separator } from "../ui/separator";

export const GeneralEventTab = ({event}:{event:EventItemFromResponse})=>{

    return <>
    <h1 className="mt-5 font-bold text-2xl">{event.name}</h1>
    <Separator/>

    <h2>Configuración general</h2>
    </>
}