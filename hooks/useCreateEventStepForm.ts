import { createEventStepFormContext } from "@/contexts/CreateEventStepFormContext";
import { useContext } from "react";

export const useCreateEventStepForm = () => {
  const {
    changeSection,
    addGeneralFormData,
    mainForm,
    currentSection,
    addDatesFormData,
    addEventFormData,
  } = useContext(createEventStepFormContext);

  return {
    changeSection,
    addGeneralFormData,
    mainForm,
    currentSection,
    addDatesFormData,
    addEventFormData,
  };
};
