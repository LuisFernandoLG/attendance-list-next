import { Console } from "console";
import { useEffect, useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const numberLinks = Array.from({ length: lastPage }, (_, i) => i + 1);

  const incrementPage = () => setPage((prev) => prev + 1);
  const decrementPage = () => setPage((prev) => prev - 1);
  const setPageNumber = (pageNumber: number) => setPage(pageNumber);

  const updatePagination = ({_lastPage}:{_lastPage:number}) => {
    const disableNextPage = page + 1 > _lastPage || page > _lastPage;
    const disbalePrevPage = page - 1 < 1 || page < 1;
    setLastPage(_lastPage);
    setPrevPage(disbalePrevPage);
    setNextPage(disableNextPage);

  }

  const updatePerPage = (perPage:number) => {
    setPerPage(perPage);
    setPage(1);

  }

  return {
    page,
    perPage,
    prevPage,
    nextPage,
    numberLinks,
    incrementPage,
    decrementPage,
    setPageNumber,

    updatePagination,
    updatePerPage,

  }
};
