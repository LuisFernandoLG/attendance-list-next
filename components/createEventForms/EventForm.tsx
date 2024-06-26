import { sectionNamesObject } from "@/contants/createEventStepForm";
import { useCreateEventStepForm } from "@/hooks/useCreateEventStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormIcon } from "../ui/icons/FormIcon";
import { QRIcon } from "../ui/icons/QRIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EventTypeHelpSection } from "../EventTypeHelpSection";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useI18nZodErrors } from "@/hooks/useI18nZodErrors";

const formSchema = z
  .object({
    type: z.enum(["CONTROLLED", "UNCONTROLLED"]),
  })
  .required();

type Form = z.infer<typeof formSchema>;

export const EventForm = () => {
  useI18nZodErrors();
  const { changeSection, addEventFormData, mainForm } = useCreateEventStepForm()
  const t = useTranslations("NewEvent");
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: mainForm.EVENT_FORM,
  });


  const onSubmit = (values: Form) => {
    changeSection(sectionNamesObject.DATES);
    addEventFormData({type:values.type, ok: true });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[500px] mx-auto shadows"
      >
        <Card>
          <CardHeader>
            <CardTitle>{t("eventTypeForm.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("eventTypeForm.inputType.label")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo de asistencia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CONTROLLED">
                      <QRIcon className="inline size-5 mr-2"/> {
                        t("eventTypeForm.inputType.options.controlledAttendance")}
                      </SelectItem>
                      {/* <SelectItem value="UNCONTROLLED">
                      <FormIcon className="inline size-5 mr-2"/> 
                      {t("eventTypeForm.inputType.options.uncontrolledAttendance")}
                      </SelectItem> */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button  className="ml-auto" type="submit">{
              t("eventTypeForm.submit")
            }
            <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      <EventTypeHelpSection/>
      </form>

    </Form>
  );
};
