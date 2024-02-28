import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().trim().min(3).max(40),
    email: z.string().email(),
    password: z.string().trim().min(8).max(30).trim(),
  })
  .required()

type FormSchemaType = z.infer<typeof formSchema>;

const initialForm: FormSchemaType = {
  name: "",
  email: "",
  password: "",
};

export const useLoginForm = () => {
  const router = useRouter()
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialForm,
  });

  const handleSubmit = (values: FormSchemaType) => {
      router.push("/auth/confirm-email")
  };

  return {
    form,
    handleSubmit,
  };
};
