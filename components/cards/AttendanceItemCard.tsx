import { formatDateForHuman } from "@/helpers/formatDateForHuman";
import { generateColorRGB } from "@marko19907/string-to-color";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { useLocale } from "next-intl";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

export const AttendanceItemCard = ({
  id,
  attendances,
  name,
  email,
  created_at,
  className
}: Props) => {

  

  const locale = useLocale();

  const twoLettersFromWord = name[0] + name[1] || "x";
  const time = format(new Date(created_at), "MM/dd/yyyy HH:mm", {
    locale: locale === "es" ? es : enUS,
  });

  const color = generateColorRGB(name);

  return (
    <div key={id} className={cn(["relative w-full h-full", className])}>
      <div
        className="absolute -top-2 -right-2 z-10 py-2 px-3 text-sm bg-red-500 text-white rounded-full"
        style={{ visibility: attendances > 1 ? "visible" : "hidden",}}
      >
        <OcurrencesTooltip attendances={attendances} />
      </div>

      <Card className="w-full relative overflow-hidden shadow-md">
        <div
          className="size-10 w-full round"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: color,
          }}
        ></div>
        <CardHeader className="flex flex-col justify-center items-center">
          <Avatar>
            <AvatarFallback className="text-current mx-auto">
              {twoLettersFromWord}
            </AvatarFallback>
          </Avatar>
          <CardDescription className="text-center">{name}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 justify-center items-center">
          <Badge variant="secondary">{email}</Badge>
          <Badge variant="outline">{time}</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

const OcurrencesTooltip = ({ attendances }: { attendances: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{attendances}</TooltipTrigger>
        <TooltipContent>
          <p>Número de asistencias tomadas de hoy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type Props = {
  id: number;
  attendances: number;
  name: string;
  email: string;
  created_at: string;
  className?: string;
};
