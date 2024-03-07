import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"

function Page(){
    console.log("Dashboard page rendered")
    return <section>
        <h1 className="text-5xl font-black">Mis pases de lista</h1>
        <Link href="/dashboard/new-event"  className={buttonVariants({variant:"default"})}>Crear evento</Link>
    </section>
}


export default (Page)