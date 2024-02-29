import SignUpForm from "@/components/forms/SignUpForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <>
      <Card className="max-w-[500px] mx-auto mt-5">
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
        <CardDescription>Inicia creando una cuenta.</CardDescription>
      </CardHeader>
        <CardContent>
          <SignUpForm className="space-y-5" />
        </CardContent>
      </Card>
    </>
  );
}
