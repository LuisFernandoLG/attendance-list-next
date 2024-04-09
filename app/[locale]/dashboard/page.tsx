import { DashboardEventList } from "@/components/DashboardEventList";
import { Link } from "@/components/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  "title": "Dashboard",
  "description": "Dashboard page for the app."
}

async function Page() {
  const t = await getTranslations("Dashboard")

  return (
    <section className="p-3 md:p-5">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <Link
            href="/dashboard/new-event"
            className={buttonVariants({ variant: "default", className: "mt-5"})}
          >
            <PlusCircledIcon className="w-5 h-5 mr-2" />
            {t("createEvent")}
          </Link>

          <DashboardEventList className="mt-5"/>
          
    </section>
  );
}

export default Page;
