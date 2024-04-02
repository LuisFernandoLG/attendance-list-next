import { makeZodI18nMap } from "@/lib/makeZodI18nMap";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useI18nZodErrors = () => {
  const t = useTranslations('zod');
  const tForm = useTranslations('form');
  z.setErrorMap(makeZodI18nMap({ t, tForm }));
};
