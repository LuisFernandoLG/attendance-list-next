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

export const InfoSummary = () => {
  const { mainForm, changeSection } = useCreateEventStepForm();

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
          {mainForm.DATES_FORM.dates.map((item, i)=>{
            return <Badge variant="secondary" key={`${i}-date`}>{item}</Badge>
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
        <Button className="ml-auto">Crear evento</Button>
      </CardFooter>
    </Card>
  );
};
