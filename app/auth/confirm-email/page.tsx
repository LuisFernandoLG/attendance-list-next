import ConfirmEmailForm from "@/components/forms/ConfirmEmailForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ConfirmEmailPage() {
  
  return (
    <>
      <Card className="max-w-[550px] mx-auto mt-5">
        <CardHeader>
          <CardTitle className="text-center">Verifica tu cuenta</CardTitle>
          <CardDescription className="text-center">
            Ingresa el código enviado a tu correo electrónico
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex justify-center">
          <ConfirmEmailForm/>
        </CardContent>

      </Card>
        <div className="flex flex-col items-center justify-center mt-3">
          <div className="text-sm">¿No recibiste el código?</div>
          <Button size="sm" variant="link">
            Reenviar
          </Button>
        </div>
    </>
  );
}
