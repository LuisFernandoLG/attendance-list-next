import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";

type Props = {
  perPage: number;
  page: number;
  incrementPage: () => void;
  decrementPage: () => void;
  nextPage: boolean;
  prevPage: boolean;
  setPageNumber: (number: number) => void;
  numberLinks: number[];
  updatePerPage: (perPage: number) => void;
  loading: boolean;
  className:string;
  isError:boolean;
};

export const MembersPagination = ({
  perPage,
  page,
  incrementPage,
  nextPage,
  prevPage,
  decrementPage,
  numberLinks,
  setPageNumber,
  updatePerPage,
  className,
  loading,
  isError
}: Props) => {

  if(isError) return null;

  if(loading) return <div className={cn(["mx-auto w-full flex justify-center gap-2 flex-col items-center", className])}>
    <Skeleton className="w-1/12 h-12" />
    <Skeleton className="w-1/5 h-12" />
  </div>


  return (
    <div className={className}>
      <Select
        onValueChange={(item) => updatePerPage(Number(item))}
        value={String(perPage)}
      >
        <SelectTrigger className="w-[120px] border">
          <SelectValue placeholder="items per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"10"}>10</SelectItem>
          <SelectItem value={"20"}>20</SelectItem>
          <SelectItem value={"30"}>30</SelectItem>
        </SelectContent>
      </Select>

      <PaginationComponent className="w-fit p-2 rounded-md mx-0">
        <PaginationContent>
          <Button variant="outline" disabled={prevPage} onClick={incrementPage}>
            <PaginationPrevious>Anterior</PaginationPrevious>
          </Button>

          {numberLinks.map((number, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setPageNumber(number)}
                isActive={number === page}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          <Button variant="outline" disabled={nextPage} onClick={decrementPage}>
            <PaginationNext>Siguiente</PaginationNext>
          </Button>
        </PaginationContent>
      </PaginationComponent>
    </div>
  );
};
