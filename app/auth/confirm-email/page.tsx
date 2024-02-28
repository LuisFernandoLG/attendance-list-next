import ConfirmEmailForm from "@/components/forms/ConfirmEmailForm";
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

        <CardFooter>
          <Link href={"/#"} className="text-center">
            Reenviar el código nuevamente
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
