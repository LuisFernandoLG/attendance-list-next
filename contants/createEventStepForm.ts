import { MainForm } from "@/models/createEventStepForm";

export const EVENT_TYPES = {
  CONTROLLED: "CONTROLLED",
  UNCONTROLLED: "UNCONTROLLED",
};

export const getType = (value: string) => {
  if (value === EVENT_TYPES.CONTROLLED) return "Escanear QR";
  if (value === EVENT_TYPES.UNCONTROLLED) return "Formulario";
  return "Desconocido";
};

export const initialMainForm: MainForm = {
  GENERAL_FORM: {
    name: "",
    description: "",
    ok: false,
  },
  EVENT_FORM: {
    type: "CONTROLLED",
    ok: false,
  },
  DATES_FORM: {
    dates: [],
    ok: false,
  },
};

export const sectionNamesObject = {
  GENERAL: {
    id: 1,
    name: "1. General",
  },
  EVENT: {
    id: 2,
    name: "2. Evento",
  },
  DATES: {
    id: 3,
    name: "3. Fechas",
  },
  summary: {
    id: 4,
    name: "Resumen",
  },
};

export const sectionNamesArray = Object.values(sectionNamesObject);
