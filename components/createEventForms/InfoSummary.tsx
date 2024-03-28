import { sectionNamesObject } from "@/contants/createEventStepForm";
import { useCreateEventStepForm } from "@/hooks/useCreateEventStepForm";
import { PaperPlaneIcon, Pencil1Icon } from "@radix-ui/react-icons";
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
import { useLocale, useTranslations } from "next-intl";
import { es, enUS } from 'date-fns/locale';


export const InfoSummary = () => {
  const { mainForm, changeSection } = useCreateEventStepForm();
  const { handleCreateEvent, loading} = useRegisterEvent()
  const t = useTranslations("NewEvent")
  const locale = useLocale()

  const lan = locale === "es" ? es : enUS;

  return (
    <Card className="max-w-[500px] mx-auto shadows">
      <CardHeader>
        <CardTitle>{t("summary.title")}</CardTitle>
        <CardDescription>
          <p>{t("summary.description")}</p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <h4 className="text-base font-bold">{t("summary.nameField")}</h4>
        <p className="text-xs">{mainForm.GENERAL_FORM.name}</p>
        <h4 className="text-base font-bold">{t("summary.descriptionField")}</h4>
        <p className="text-xs">{mainForm.GENERAL_FORM.description}</p>
        <Button
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={() => changeSection(sectionNamesObject.GENERAL)}
        >
          <Pencil1Icon className="h-4 w-4 mr-2" />
          {t("summary.editButton")}
        </Button>
        <Separator className="mt-5" />

        <h4 className="text-base font-bold">{t("summary.eventTypeField")}</h4>
        <p className="text-xs">{mainForm.EVENT_FORM.type}</p>
        <Button
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={() => changeSection(sectionNamesObject.EVENT)}
        >
          <Pencil1Icon className="h-4 w-4 mr-2" />
          {t("summary.editButton")}
        </Button>
        <Separator className="mt-5" />

        <h4 className="text-base font-bold">{t("summary.datesField")}</h4>
        <div>
          {mainForm.DATES_FORM.dates.sort(compareAsc).map((item, i)=>{
            return <Badge variant="secondary" key={`${i}-date`}>{formatDateForHuman(item, lan)}</Badge>
          })}
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={() => changeSection(sectionNamesObject.DATES)}
        >
          <Pencil1Icon className="h-4 w-4 mr-2" />
          {t("summary.editButton")}
        </Button>
      </CardContent>

      <CardFooter>
        <Button className="ml-auto" loading={loading} onClick={()=>handleCreateEvent(mainForm)}>
          {t("summary.submitButton")} <PaperPlaneIcon className="w-5 h-5 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};
