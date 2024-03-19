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


type Props = {
  data: MemberItemFromPagination[];
  pagination: Pagination;
  loading: boolean;
  deleteMember: (item: MemberItemFromPagination) => void;
  isDeleting: boolean;
  selectedMember: MemberItemFromPagination | null;
}

export const MembersTable = ({
  data,
  pagination,
  loading,
  deleteMember,
  isDeleting,
  selectedMember,
}: Props) => {

  const { nextPage, numberLinks, openDrawer, prevPage} = useMembersTable({pagination})

  if (loading) return <MembersTableSkeleton/>

  return (
    <div className="space-y-5">
      <div className="relative overflow-x-auto bg-slate-200 p-5 min-h-[70vh] rounded-sm">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-sm">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Código
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Correo
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.custom_id}
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
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
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
      </div>
      <PaginationComponent className="bg-slate-200 w-fit p-2 rounded-md">
        <PaginationContent>
          {prevPage !== pagination.current_page && (
            <PaginationPrevious href={`?page=${prevPage}`}>
              Anterior
            </PaginationPrevious>
          )}

          {numberLinks.map((number, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${number}`}
                isActive={number === pagination.current_page}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          {nextPage !== pagination.current_page && (
            <PaginationNext href={`?page=${nextPage}`}>
              Siguiente
            </PaginationNext>
          )}
        </PaginationContent>
      </PaginationComponent>
    </div>
  );
};
