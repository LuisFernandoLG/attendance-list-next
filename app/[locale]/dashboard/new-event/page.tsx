"use client";
import { CreateEventMultiStepForm } from "@/components/CreateEventMultiSetpForm";
import CreateEventStepFormProvider from "@/contexts/CreateEventStepFormContext";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("NewEvent")
  return (
    <CreateEventStepFormProvider>
      <h1 className="text-center font-black text-4xl">
        {t("title")}
      </h1>
      <CreateEventMultiStepForm />
    </CreateEventStepFormProvider>
  );
}
