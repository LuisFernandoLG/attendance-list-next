import { QRCodesWizzardContext } from "@/contexts/QRCodeWizzardContext";
import { Pagination } from "@/services/api/eventMember";
import { useContext } from "react";

type Props = {
  pagination: Pagination;
}

export const useMembersTable = ({pagination}:Props) => {
  const prevPage =
    pagination.current_page - 1 > 0 ? pagination.current_page - 1 : 1;
  const nextPage =
    pagination.current_page + 1 > pagination.last_page
      ? pagination.last_page
      : pagination.current_page + 1;

  const numberLinks = Array.from(
    { length: pagination.last_page },
    (_, i) => i + 1
  );

  const { openDrawer } = useContext(QRCodesWizzardContext);

  return {
    prevPage,
    nextPage,
    numberLinks,
    openDrawer
  }
};
