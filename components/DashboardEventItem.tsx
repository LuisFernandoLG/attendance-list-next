/* eslint-disable @next/next/no-img-element */
import { getType } from "@/contants/createEventStepForm";
import { Badge } from "./ui/badge";
import Link from "next/link";

type Props = {
  id: number;
  image_url: string;
  name: string;
  type: string;
};

export const DashboardEventItem = ({ id, image_url, name, type }: Props) => {
  const type_found = getType(type);
  const link = `dashboard/events/${id}`

  return (
    <Link href={link} className="shadow p-2 border text-ellipsis overflow-hidden flex gap-2 rounded-md bg-muted cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all">
      <img
        src={image_url}
        alt={name}
        className="size-16 object-cover rounded-md pointer-events-none"
      /> 
      <div className="p-2">
        <h3 className="text-xl font-bold text-clip overflow-hidden text-nowrap">
          {name}
        </h3>
        <Badge variant="outline">{type_found}</Badge>
      </div>
    </Link>
  );
};
