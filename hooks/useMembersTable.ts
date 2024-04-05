import { QRCodesWizzardContext } from "@/contexts/QRCodeWizzardContext";
import { useContext } from "react";
import { usePagination } from "./usePagination";

export const useMembersTable = () => {
  const {
    nextPage,
    numberLinks,
    prevPage,
    decrementPage,
    incrementPage,
    page,
    perPage,
    setPageNumber,
    updatePagination,
    updatePerPage,
  } = usePagination();

  const { openDrawer } = useContext(QRCodesWizzardContext);

  return {
    prevPage,
    nextPage,
    numberLinks,
    openDrawer,
    decrementPage,
    incrementPage,
    page,
    perPage,
    setPageNumber,
    updatePagination,
    updatePerPage,
  };
};
