"use client";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function QueryProvider({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
