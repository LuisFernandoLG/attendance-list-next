import { useResendVerificationEmailCode } from "@/hooks/useResendVerificationEmailCode";
import { Button } from "./ui/button";

export function ResendEmailCodeButton() {
  const { loading, sendVEmailVerificationCode } =
    useResendVerificationEmailCode();

  return (
    <Button
      loading={loading}
      onClick={sendVEmailVerificationCode}
      size="sm"
      variant="link"
    >
      Reenviar
    </Button>
  );
}
