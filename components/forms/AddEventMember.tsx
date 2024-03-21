import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useAddEventMemberForm } from "@/hooks/useAddEventMemberForm";
import { MemberItemFromPagination } from "@/services/api/eventMember";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

type Props = {
  addMember: (item: MemberItemFromPagination) => void;
}

export const AddEventMember = (props: Props) => {
  const {form, loading, onSubmit} = useAddEventMemberForm({addMember:props.addMember})
  const t = useTranslations("Event")
  
  return (
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* ------------- */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("tabs.members.addMemberForm.inputs.name.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("tabs.members.addMemberForm.inputs.email.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notifyByEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                      <FormLabel className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {t("tabs.members.addMemberForm.inputs.sendEmailCheckBox")}
                      </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("tabs.members.addMemberForm.inputs.details.label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("tabs.members.addMemberForm.inputs.details.placeholder")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" loading={loading}><PlusCircledIcon className="w-5 h-5 mr-2" />{t("tabs.members.addMemberForm.submit")}</Button>
          </form>
      </Form>
  );
};
