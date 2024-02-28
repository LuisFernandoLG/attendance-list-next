"use client"
import OTPPInput from "@/components/OtpInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function ConfirmEmailPage() {
  const [otpValue, setOtpValue] = useState()

  const handleOtpChange = (value:string)=>{
    console.log(value)
  }

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
          <OTPPInput handleChange={handleOtpChange} />
        </CardContent>

        <CardFooter>
          <Button className="mx-auto">Verificar</Button>
        </CardFooter>
      </Card>
    </>
  );
}
