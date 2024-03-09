"use client"
import { Button } from "@/components/ui/button";
import { eventApi } from "@/services/api/eventApi";
import { useState } from "react";

export default function Test(){

    const [form, setForm] = useState({
        name: "The best event ever!",
        description: "This is the best event ever!",
        type: "CONTROLLED",
        dates: ['2022-12-12 00:00:00']
    })

    const handleClick = async ()=>{
        const event = await eventApi().create(form);
        console.log(event);
    }

    return (
        <div>
            <Button onClick={handleClick}>Create</Button>
        </div>
    );
    }