import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

export const EventTypeHelpSection = () => {

    return <>
     <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>¿Qué es la asistencia controlada?</AccordionTrigger>
            <AccordionContent>
              Los participantes deben escanear un código QR para registrar su asistencia.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>¿Qué es la asistencia descontrolada?</AccordionTrigger>
            <AccordionContent>
              Los participantes deben llegar un formulario para registrar su asistencia.
            </AccordionContent>
          </AccordionItem>

        </Accordion></>

}
