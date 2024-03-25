"use client";

import { DashboardEventList } from "@/components/DashboardEventList";
import { Link } from "@/components/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

function Page() {
  const t = useTranslations("Dashboard")

  return (
    <section>
      <Card className="p-2 shadow-md min-h-[70vh]">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Link
            href="/dashboard/new-event"
            className={buttonVariants({ variant: "default" })}
          >
            <PlusCircledIcon className="w-5 h-5 mr-2" />
            {t("createEvent")}
          </Link>
          <DashboardEventList className="mt-5"/>
        </CardContent>
      </Card>
    </section>
  );
}

export default Page;
