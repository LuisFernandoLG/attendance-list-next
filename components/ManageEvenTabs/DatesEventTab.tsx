"use client"
import { EventItemFromResponse, GetEventItemResponse, eventApi } from "@/services/api/eventApi";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, CheckCircledIcon, CheckIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { es, enUS } from "date-fns/locale";
import { Badge } from "../ui/badge";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { compareAsc, format, formatISO9075 } from "date-fns";
import { formatDateForHuman } from "@/helpers/formatDateForHuman";
import { useEffect } from "react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { useMutation, useQuery } from "react-query";
import { successMessages } from "@/contants/successMessages";
import { useI18nZodErrors } from "@/hooks/useI18nZodErrors";
import {utcToZonedTime, formatInTimeZone} from 'date-fns-tz'
import { addMinutes } from "date-fns"
import { UTCToLocalDate } from "@/helpers/UTCToLocalDate";
import { dateToUTC } from "@/helpers/dateToUTC";

type Props = {
  event: GetEventItemResponse;
};


const formSchema = z
  .object({
    dates: z.array(z.date()).min(1),
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
  })
  .required();

type Form = z.infer<typeof formSchema>;


export function DatesEventTab({ event }: Props) {
  useI18nZodErrors()
  const datesProps = event.dates.map((date) => date.date)
  const t = useTranslations("Event")
  const httpErrors = useTranslations("httpErrors")
  const httpSuccess = useTranslations("httpSuccess")
  const locale = useLocale()
  const calendarLocale = locale === "es" ? es : enUS;
  const mutation = useMutation({
    mutationFn: (props:updateEventProps) =>{
      const eventId = event.id.toString()
      return eventApi().update(eventId, props)
    },
    onSuccess: () => {
      const msg = httpSuccess(successMessages["updated successfully"] || successMessages["defualt"])  
      toast.success(msg)
    },
    onError: (error:Error) => {
      const msg = httpErrors(error.message) || httpErrors("default")
      toast.error(msg)
    }
  })

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dates: [],
      name: event.name,
      description: event.description,
    },
  });

  type updateEventProps = EventItemFromResponse & {dates:string[]};

  // Rest of the code remains the same
  useEffect(()=>{
    if(event){
      // becomes to UTC
      form.setValue("dates", datesProps.map((utcTimeString) => {
        const time = UTCToLocalDate(new Date(utcTimeString))
        return time
      }))
    }
  },[event])

  const fields = form.watch("dates")

  const onSubmit = (values: Form) => {
    const formattedDates = values.dates.map((date) => {
      const utcTime = dateToUTC(date)
      return utcTime
    })
    mutation.mutate({
      ...event,
      ...values,
      dates: formattedDates,
    })
  }


  return (
    <div>
      <div>
      <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[500px] mx-auto shadow"
      >
        <Card>
          <CardHeader>
            <CardTitle>{t("tabs.settings.datesForm.title")}</CardTitle>
          </CardHeader>
          <CardContent>
          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>{t("tabs.settings.datesForm.inputs.name.label")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
          <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>{t("tabs.settings.datesForm.inputs.description.label")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

            
            <FormField
              control={form.control}
              name="dates"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("tabs.settings.datesForm.inputs.dates.label")}</FormLabel>
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
                                <Badge>
                                    {field.value.length}
                                </Badge>
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
                        locale={calendarLocale}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                  {t("tabs.settings.datesForm.inputs.selectedDatesLabel")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 flex-wrap my-2">
                {fields.sort(compareAsc).map((item, i) => 
                    <Badge variant="secondary" key={i} className="text-sm">{
                      formatDateForHuman(item, calendarLocale)
                    }
                    </Badge>
                )
                }
            </div>
          </CardContent>
          <CardFooter>
            <Button  className="ml-auto w-fit" type="submit" loading={mutation.isLoading} disabled={mutation.isLoading}>
             <CheckIcon/> {t("tabs.settings.datesForm.submit")}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
      </div>
    </div>
  );
}
