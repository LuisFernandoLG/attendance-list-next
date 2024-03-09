type EventType = "CONTROLLED" | "UNCONTROLLED";

export type Section = {
    id: number;
    name: string;
}

export type GeneralFrom = {
    name: string;
    description: string;
    ok: boolean;
}

export type EventForm = {
    // it must be an option of enum EVENT_TYPES
    type: EventType;
    ok: boolean;
}

export type DatesForm = {
    dates: Date[];
    ok: boolean;
}



export type MainForm = {
    GENERAL_FORM : GeneralFrom
    EVENT_FORM: EventForm
    DATES_FORM: DatesForm
}