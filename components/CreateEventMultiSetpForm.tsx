"use client";
import { StepForm } from "./StepForm";
import {  StepFormNav } from "./StepFormNav";
import { GeneralForm } from "./createEventForms/GeneralForm";
import { EventForm } from "./createEventForms/EventForm";
import { DatesForm } from "./createEventForms/DatesForm";
import { sectionNamesObject } from "@/contants/createEventStepForm";
import { InfoSummary } from "./createEventForms/InfoSummary";
import CreateEventStepFormProvider from "@/contexts/CreateEventStepFormContext";
import { formatInTimeZone } from "date-fns-tz";
import { Separator } from "./ui/separator";

export const CreateEventMultiStepForm = () => {

  const given = "2024-04-25 23:00:00"
  const now = new Date(given);
  const convertion1 = formatInTimeZone(now, 'UTC', 'yyyy-MM-dd HH:mm:ss')

  const checkDay = new Date('2024-04-25 23:00:00')
  const UTCCheckDay = formatInTimeZone(checkDay, 'UTC', 'yyyy-MM-dd HH:mm:ss')

  // const isSameDay = (date1:Date)=>{
  //   return date1.toDateString() === convertion1.
  // }

  return (
    <CreateEventStepFormProvider>
    <div>
        <StepFormNav className="flex justify-center gap-2 mt-4 mb-8" />
        <StepForm item={sectionNamesObject.GENERAL}>
          <GeneralForm />
        </StepForm>
        
        <StepForm item={sectionNamesObject.EVENT}>
          <EventForm />
        </StepForm>
        
        <StepForm item={sectionNamesObject.DATES}>
          <DatesForm />
        </StepForm>

        <StepForm item={sectionNamesObject.summary}>
          <InfoSummary/>
        </StepForm>
    </div>
    </CreateEventStepFormProvider>
  );
};
