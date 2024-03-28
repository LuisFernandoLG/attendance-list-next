import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "@/components/navigation";
import {  buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  "title": "Profile",
  "description": "Update your profile."
}

export default async function Page() {

  const t = await getTranslations("Profile")
  const commonT = await getTranslations("common")

  return <>
  <Link href="/dashboard" className={buttonVariants({variant:"secondary"})}>
  <ArrowLeftIcon className="w-5 h-5 mr-2"/> {commonT("back")}
  </Link>

  <Card className="px-5 mt-5">
    <CardHeader>
      <CardTitle>{t("title")}</CardTitle>
      <CardDescription>{t("description")}</CardDescription>
    </CardHeader>
    <Separator /> 

    <CardContent className="py-2">
    <h2 className="text-lg mb-2">{t("language.switchTitle")}</h2>
    <LanguageSwitcher/>

    </CardContent>
    
  </Card>
  </>
}