import { sectionNamesObject } from "@/contants/createEventStepForm";
import { useCreateEventStepForm } from "@/hooks/useCreateEventStepForm";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { compareAsc } from "date-fns";
import { formatDateForHuman } from "@/helpers/formatDateForHuman";
import { useRegisterEvent } from "@/hooks/useRegisterEvent";


export const InfoSummary = () => {
  const { mainForm, changeSection } = useCreateEventStepForm();
  const { handleCreateEvent, loading} = useRegisterEvent()





  return (
    <Card className="max-w-[500px] mx-auto shadows">
      <CardHeader>
        <CardTitle>Resumen</CardTitle>
        <CardDescription>
          <p>Revisa los detalles del evento</p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <h4 className="text-base font-bold">Nombre</h4>
        <p className="text-xs">{mainForm.GENERAL_FORM.name}</p>
        <h4 className="text-base font-bold">Descripción</h4>
        <p className="text-xs">{mainForm.GENERAL_FORM.description}</p>
        <Button
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={() => changeSection(sectionNamesObject.GENERAL)}
        >
          <Pencil1Icon className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Separator className="mt-5" />

        <h4 className="text-base font-bold">Tipo</h4>
        <p className="text-xs">{mainForm.EVENT_FORM.type}</p>
        <Button
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={() => changeSection(sectionNamesObject.EVENT)}
        >
          <Pencil1Icon className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Separator className="mt-5" />

        <h4 className="text-base font-bold">Fechas seleccionadas</h4>
        <div>
          {mainForm.DATES_FORM.dates.sort(compareAsc).map((item, i)=>{
            return <Badge variant="secondary" key={`${i}-date`}>{formatDateForHuman(item)}</Badge>
          })}
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={() => changeSection(sectionNamesObject.DATES)}
        >
          <Pencil1Icon className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </CardContent>

      <CardFooter>
        <Button className="ml-auto" loading={loading} onClick={()=>handleCreateEvent(mainForm)}>Crear evento</Button>
      </CardFooter>
    </Card>
  );
};
