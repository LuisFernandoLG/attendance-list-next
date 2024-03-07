"use client";
import { CreateEventMultiStepForm } from "@/components/CreateEventMultiSetpForm";
import CreateEventStepFormProvider from "@/contexts/CreateEventStepFormContext";

export default function Page() {
  return (
    <CreateEventStepFormProvider>
      <h1 className="text-center font-black text-4xl">
        Cuéntanos un poco del evento 📅
      </h1>
      <CreateEventMultiStepForm />
    </CreateEventStepFormProvider>
  );
}
