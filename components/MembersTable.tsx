"use client";

import {
  PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  MemberItemFromPagination,
  Pagination,
} from "@/services/api/eventMember";
import { Button } from "./ui/button";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { QRIcon } from "./ui/icons/QRIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Loader } from "./Loader";
import { useMembersTable } from "@/hooks/useMembersTable";
import { MembersTableSkeleton } from "./skeletons/MembersTableSkeleton";
import { EmptyUsersIllustration } from "./illustrations/emptyIllustrations/EmptyUsersIllustration";
import { useTranslations } from "next-intl";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { EditEventMember } from "./forms/EditEventMember";
import { QRCodeCardForm } from "./forms/QRCodeCardForm";


type Props = {
  data: MemberItemFromPagination[];
  pagination: Pagination;
  loading: boolean;
  deleteMember: (item: MemberItemFromPagination) => void;
  isDeleting: boolean;
  selectedMember: MemberItemFromPagination | null;
  decrementPage: () => void;
  incrementPage: () => void;
  page: number;
  assignPage: (page: number) => void;
  isPreviousData: boolean;
  openDrawer: (item: MemberItemFromPagination) => void;
  numberLinks: number[]
  nextPage: boolean,
  prevPage: boolean,
  setPageNumber: (page: number) => void

}

export const MembersTable = ({
  data,
  pagination,
  loading,
  deleteMember,
  isDeleting,
  selectedMember,
  decrementPage,
  incrementPage,
  page,
  assignPage,
  isPreviousData,
  openDrawer, 
  numberLinks,
  nextPage,
  prevPage,
  setPageNumber

}: Props) => {

  const t = useTranslations("Event")
  const tCommon = useTranslations("common")

  if (loading || isPreviousData) return <MembersTableSkeleton/>

  return (
    <div className="space-y-5">
        <table className="w-full text-sm text-left rtl:text-right relative overflow-x-auto  rounded-sm  max-h-[60vh] overflow-y-auto">
          <thead className="text-xs  uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("tabs.members.table.header.id")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("tabs.members.table.header.name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("tabs.members.table.header.email")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("tabs.members.table.header.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="">
          {
        data.length === 0 && (
          <tr className="text-center text-gray-500 dark:text-gray-400">
            <td colSpan={4} className="p-5">
              <EmptyUsersIllustration className="w-1/6 h-auto mx-auto" />
              {t("tabs.members.table.empty")}
            </td>
          </tr>
        )
      }
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b "
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Badge variant="secondary">
                  {item.custom_id}
                  </Badge>
                </th>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4 flex gap-2">
                  <QRCodeCardForm member={item}/>
                  
                  {/* <Button variant="outline" size="icon">
                    
                  </Button> */}
                  <EditEventMember id={String(item.id)} name={item.name} email={typeof(item?.email) === "string" ? item.email : "???"} details={typeof(item?.details) === "string" ? item.details : "???"} eventId={item.event_id}/>

                  <AlertDialog>
                    <AlertDialogTrigger disabled={isDeleting}>
                      <Button
                        variant="destructive"
                        size="icon"
                        loading={isDeleting && selectedMember?.id === item.id}
                      >
                        {isDeleting && selectedMember?.id === item.id ? null : (
                          <TrashIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Estás seguro de eliminar a &quot;{item.name}&quot;?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no puede deshacerse. Esto eliminará a tu miembro permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMember(item)}>
                          Sí, borrar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      <PaginationComponent className=" w-fit p-2 rounded-md">
      <PaginationContent>
        <Button variant="outline" disabled={prevPage} onClick={decrementPage}>
          <PaginationPrevious text={tCommon("previous")}>Anterior</PaginationPrevious>
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

          <Button variant="outline" disabled={nextPage}  onClick={incrementPage}>
            <PaginationNext text={tCommon("next")}>Siguiente</PaginationNext>
          </Button>
         </PaginationContent>
    </PaginationComponent>
</div>
  );
};
