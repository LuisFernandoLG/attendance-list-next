import { MemberItemFromPagination } from "@/services/api/eventMember";
import { AddEventMember } from "./forms/AddEventMember";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

type Props = {
  addMember: (item: MemberItemFromPagination) => void;
}

export const AddNewMember = (props:Props) => {
  const t = useTranslations("Event")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircledIcon className="w-5 h-5 mr-2" /> {t("tabs.members.addMember")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("tabs.members.addMember")}</DialogTitle>
        </DialogHeader>
        <AddEventMember addMember={props.addMember} />
      </DialogContent>
    </Dialog>
  );
};
