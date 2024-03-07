import {
  initialMainForm,
  sectionNamesObject,
} from "@/contants/createEventStepForm";
import {
  DatesForm,
  EventForm,
  GeneralFrom,
  MainForm,
  Section,
} from "@/models/createEventStepForm";
import { ReactNode, createContext, useState } from "react";

const createEventStepFormContext = createContext<{
  currentSection: Section;
  changeSection: (section: Section) => void;
  mainForm: MainForm;
  addGeneralFormData: (props: GeneralFrom) => void;
  addEventFormData: (props: EventForm) => void;
  addDatesFormData: (props: DatesForm) => void;
}>({
  currentSection: sectionNamesObject.GENERAL,
  changeSection: () => {},
  mainForm: initialMainForm,
  addGeneralFormData: () => {},
  addEventFormData: () => {},
  addDatesFormData: () => {},
});
const CreateEventStepFormProvider = ({ children }: { children: ReactNode }) => {
  const [currentSection, setCurrentSection] = useState(
    sectionNamesObject.GENERAL
  );

  const [mainForm, setMainForm] = useState<MainForm>(initialMainForm);

  const changeSection = (section: Section) => {
    setCurrentSection(section);
  };

  const addGeneralFormData = (props: GeneralFrom) => {
    setMainForm({ ...mainForm, GENERAL_FORM: props });
  };

  const addEventFormData = (props: EventForm) => {
    setMainForm({ ...mainForm, EVENT_FORM: props });
  };

  const addDatesFormData = (props: DatesForm) => {
    setMainForm({ ...mainForm, DATES_FORM: props });
  };

  const value = {
    currentSection,
    mainForm,
    changeSection,
    addGeneralFormData,
    addEventFormData,
    addDatesFormData,
  };

  return (
    <createEventStepFormContext.Provider value={value}>
      {children}
    </createEventStepFormContext.Provider>
  );
};

export default CreateEventStepFormProvider;
export { createEventStepFormContext };
