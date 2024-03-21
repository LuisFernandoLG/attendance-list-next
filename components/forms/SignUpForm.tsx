"use client";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import { PasswordInput } from "../ui/password-input";
import { useTranslations } from "next-intl";

export default function SignUpForm({className}:{className?:string}) {
  const { form, handleSubmit, loading } = useSignUpForm();
  const t = useTranslations("SignUp");

  return (
    <Form {...form}>
      <form className={className} onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>

        <Button loading={loading} className="w-full">
        {t("submit")} <PaperPlaneIcon className="ml-2 h-4 w-4" />
        </Button>
      </form>

      {/* {JSON.stringify(loading, null, 2)} */}
    </Form>
  );
}
