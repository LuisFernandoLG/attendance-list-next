"use client";
import { StepForm } from "./StepForm";
import {  StepFormNav } from "./StepFormNav";
import { GeneralForm } from "./createEventForms/GeneralForm";
import { EventForm } from "./createEventForms/EventForm";
import { DatesForm } from "./createEventForms/DatesForm";
import { sectionNamesObject } from "@/contants/createEventStepForm";
import { InfoSummary } from "./createEventForms/InfoSummary";

export const CreateEventMultiStepForm = () => {
  return (
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
  );
};
