"use client";

import { DashboardEventList } from "@/components/DashboardEventList";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-5">Mis pases de lista</h1>
      <Link
        href="/dashboard/new-event"
        className={buttonVariants({ variant: "default" })}
      >
        Crear evento
      </Link>
      <DashboardEventList />
    </section>
  );
}

export default Page;
