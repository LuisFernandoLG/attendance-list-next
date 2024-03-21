/* eslint-disable @next/next/no-img-element */
import { getType } from "@/contants/createEventStepForm";
import { Badge } from "./ui/badge";
import { LocationIllustration } from "./illustrations/LocationIllustration";
import { Link } from "./navigation";

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
    <Link href={link} className="group shadow p-2 border text-ellipsis overflow-hidden flex gap-2 rounded-md cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all">
      <LocationIllustration className="w-16 h-16 group-hover:animate-wiggle-more animate-alternate" />
      <div className="p-2">
        <h3 className="  text-xl font-bold text-clip overflow-hidden text-nowrap">
          {name}
        </h3>
        <Badge variant="outline">{type_found}</Badge>
      </div>
    </Link>
  );
};
