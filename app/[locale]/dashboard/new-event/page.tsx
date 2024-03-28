import { CreateEventMultiStepForm } from "@/components/CreateEventMultiSetpForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  "title": "New Event",
  "description": "Create a new event."
}

export default async function Page() {
  const t = await getTranslations("NewEvent")
  return (
    <>
      <h1 className="text-center font-black text-4xl">
        {t("title")}
      </h1>
      <CreateEventMultiStepForm />
    </>
   );
}
