import { EventManagerContainer } from "@/components/containers/EventManagerContainer";
import QRCodesWizzardProvider from "@/contexts/QRCodeWizzardContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  "title": "Event",
  "description": "Manage your event."
}

export default function Page({ params }: { params: { id: string } }) {

  return  <QRCodesWizzardProvider>
  <EventManagerContainer eventId={params.id} />
  </QRCodesWizzardProvider>
}
