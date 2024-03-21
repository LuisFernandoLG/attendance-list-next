import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export const EventTypeHelpSection = () => {
  const t = useTranslations("NewEvent")

    return <>
     <Accordion type="single" collapsible className="mt-5">
          <AccordionItem value="item-1">
            <AccordionTrigger>{t("eventTypeForm.questions.controlledAttendance.title")}</AccordionTrigger>
            <AccordionContent>
              {t("eventTypeForm.questions.controlledAttendance.answer")}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>{t("eventTypeForm.questions.uncontrolledAttendance.title")}</AccordionTrigger>
            <AccordionContent>
              {t("eventTypeForm.questions.uncontrolledAttendance.answer")}
            </AccordionContent>
          </AccordionItem>

        </Accordion></>

}
