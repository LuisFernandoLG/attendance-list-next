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

}: Props) => {

  const { nextPage, numberLinks, openDrawer, prevPage} = useMembersTable({pagination})
  const t = useTranslations("Event")

  if (loading || isPreviousData) return <MembersTableSkeleton/>

  return (
    <div className="space-y-5">
      <Card className="relative overflow-x-auto  min-h-[60vh] rounded-sm  max-h-[60vh] overflow-y-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-sm">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                className="border-b dark:bg-gray-800 dark:border-gray-700"
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
                  <Button
                    onClick={() => openDrawer(item)}
                    variant="outline"
                    size="icon"
                  >
                    <QRIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Pencil1Icon className="h-4 w-4" />
                  </Button>

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
      </Card>
    <PaginationComponent className=" w-fit p-2 rounded-md">
      <PaginationContent>
        <Button variant="outline" disabled={!pagination.prev_page_url} onClick={decrementPage}>
          <PaginationPrevious>Anterior</PaginationPrevious>
        </Button>

        {numberLinks.map((number, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => assignPage(number)}
              isActive={number === pagination.current_page}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

          <Button variant="outline" disabled={!pagination.next_page_url}  onClick={incrementPage}>
            <PaginationNext>Siguiente</PaginationNext>
          </Button>
         </PaginationContent>
    </PaginationComponent>
     
      
</div>
  );
};
