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
import { Input } from "../ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
}).required();

type Form = z.infer<typeof formSchema>;

export const GeneralForm = () => {
  const { mainForm, changeSection, addGeneralFormData } = useCreateEventStepForm()
  const t = useTranslations("NewEvent")

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: mainForm.GENERAL_FORM,
  });


  const onSubmit = (values: Form) => {
    changeSection(sectionNamesObject.EVENT)
    addGeneralFormData({...values, ok:true})
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[500px] mx-auto shadow">
        <Card>
          <CardHeader>
            <CardTitle>{t("generalForm.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("generalForm.inputName.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("generalForm.inputName.placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("generalForm.inputDescription.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("generalForm.inputDescription.placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" type="submit"> {t("generalForm.submit")} 
            <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
