import { GetEventItemResponse, eventApi } from "@/services/api/eventApi";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { es } from "date-fns/locale";
import { Badge } from "../ui/badge";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { compareAsc, formatISO9075 } from "date-fns";
import { formatDateForHuman } from "@/helpers/formatDateForHuman";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  event: GetEventItemResponse;
};


const formSchema = z
  .object({
    dates: z.array(z.date()).min(1, "Select at least a date")
  })
  .required();

type Form = z.infer<typeof formSchema>;


export function DatesEventTab({ event }: Props) {

  const datesProps = event.dates.map((date) => date.date)

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dates: [],
    },
  });

  useEffect(()=>{
    if(event){
      form.setValue("dates", datesProps.map((dateString) => new Date(dateString)))
    }
  },[event])

  const fields = form.watch("dates")

  const onSubmit = (values: Form) => {
    const formattedDates = values.dates.map((date) => formatISO9075(date))
    updateEvent(formattedDates)
  }

  const updateEvent = async (_dates:string[])=>{
    try{
      const tempEvent = {...event, dates: _dates, attendance_type: null}
      const res = await eventApi().update(event.id.toString(), tempEvent)
      toast.success("Event updated")
    }catch(e){
      console.log(e)
      if(e instanceof Error) toast.error(e.message)
    }
  }


  return (
    <div>
      <h2 className="text-xl font-bold">Administra las fechas de tu evento</h2>
      <h3 className="">{event.name}</h3>
      <p className="mb-5">{event.description}</p>

      <div>
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
            <Button  className="ml-auto" type="submit">Siguiente</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
      </div>
    </div>
  );
}
