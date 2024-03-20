import { es } from 'date-fns/locale';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { sectionNamesObject } from "@/contants/createEventStepForm";
import { useCreateEventStepForm } from "@/hooks/useCreateEventStepForm";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, CalendarIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { compareAsc, format } from 'date-fns';
import { formatDateForHuman } from '@/helpers/formatDateForHuman';


const formSchema = z
  .object({
    dates: z.array(z.date()).min(1, "Select at least a date")
  })
  .required();

type Form = z.infer<typeof formSchema>;

export const DatesForm = () => {
  const { changeSection, addDatesFormData, mainForm } = useCreateEventStepForm();
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dates: mainForm.DATES_FORM.dates.map((dateString) => new Date(dateString)),
    },
  });

  const fields = form.watch("dates")


  const onSubmit = (values: Form) => {
    changeSection(sectionNamesObject.summary);
    addDatesFormData({
      dates: values.dates,
      ok: true,
    });

  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[500px] mx-auto shadow"
      >
        <Card>
          <CardHeader>
            <CardTitle>Fechas del evento</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="dates"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Selecciona las fechas del evento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            {field.value.length > 0 ? (
                                <span>
                                    {field.value.length} fechas seleccionadas
                                </span>
                            ) : (
                                <span>Seleccionar</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="multiple"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={es}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Fechas seleccionadas:
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 flex-wrap my-2">
                {fields.sort(compareAsc).map((item, i) => 
                    <Badge variant="secondary" key={i} className="text-sm">{
                      formatDateForHuman(item)
                    }</Badge>
                )
                }
            </div>
          </CardContent>
          <CardFooter>
            <Button  className="ml-auto" type="submit">Siguiente
            <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
