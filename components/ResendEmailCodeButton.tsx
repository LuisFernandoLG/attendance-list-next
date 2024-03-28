"use client"
import { useResendVerificationEmailCode } from "@/hooks/useResendVerificationEmailCode";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export function ResendEmailCodeButton() {
  const { loading, sendVEmailVerificationCode } =
    useResendVerificationEmailCode();
  const t = useTranslations("ConfirmEmail");

  return (
    <Button
      loading={loading}
      onClick={sendVEmailVerificationCode}
      size="sm"
      variant="link"
    >
      {t("resend")}
    </Button>
  );
}
