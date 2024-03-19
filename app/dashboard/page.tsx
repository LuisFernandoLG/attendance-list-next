"use client";

import { DashboardEventList } from "@/components/DashboardEventList";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function Page() {
  return (
    <section>
      <Card className="p-2 shadow-md">
        <CardHeader>
          <CardTitle>Mis pases de lista</CardTitle>
        </CardHeader>
        <CardContent>
          <Link
            href="/dashboard/new-event"
            className={buttonVariants({ variant: "default" })}
          >
            Crear evento
          </Link>
          <DashboardEventList />
        </CardContent>
      </Card>
    </section>
  );
}

export default Page;
