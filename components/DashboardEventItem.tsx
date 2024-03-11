/* eslint-disable @next/next/no-img-element */
import { getType } from "@/contants/createEventStepForm";
import { Badge } from "./ui/badge";

type Props = {
  image_url: string;
  name: string;
  type: string;
};

export const DashboardEventItem = ({ image_url, name, type }: Props) => {
  const type_found = getType(type);

  return (
    <div className="shadow border p-2 text-ellipsis overflow-hidden flex gap-2 rounded-md bg-white cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all">
      <img
        src={image_url}
        alt={name}
        className="w-28 h-28 object-cover rounded-md pointer-events-none"
      />
      <div>
        <h3 className="text-xl font-bold text-clip overflow-hidden text-nowrap">
          {name}
        </h3>
        <Badge variant="secondary">{type_found}</Badge>
      </div>
    </div>
  );
};
