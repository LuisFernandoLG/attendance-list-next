import { Button } from "./ui/button";
import {
  PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export const TablePagination = ({
  incrementPage,
  decrementPage,
  setPageNumber,
  numberLinks,
  prevPage,
  nextPage,
  currentPage,
}: {
  prevPage: boolean;
  nextPage: boolean;
  currentPage: number;
  incrementPage: () => void;
  decrementPage: () => void;
  setPageNumber: (pageNumber: number) => void;
  numberLinks: number[];
}) => {
  return (
    <>
      <PaginationComponent className=" w-fit p-2 rounded-md">
        <PaginationContent>
          <Button variant="outline" disabled={prevPage} onClick={incrementPage}>
            <PaginationPrevious>Anterior</PaginationPrevious>
          </Button>

          {numberLinks.map((number, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setPageNumber(number)}
                isActive={number === currentPage}
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
    </>
  );
};
