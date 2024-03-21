"use client";
import { Button } from "../ui/button";
import { AddNewMember } from "../AddNewMember";
import { MembersTable } from "../MembersTable";
import { QRCodeCardForm } from "../forms/QRCodeCardForm";
import { useMemberTab } from "@/hooks/useMemberTab";
import { useTranslations } from "next-intl";

export const MemberEventTab = () => {
  const {
    deleteMember,
    fetchStatusDeleting,
    fetchTableItemsStatus,
    members,
    paginationResults,
    selectedMember,
    addMember
  } = useMemberTab();
  const t = useTranslations("Event")

  return (
    <>
      <h2 className="text-xl font-bold mt-5">{t("tabs.members.title")}</h2>
      <h3 className="mb-5">{t("tabs.members.description")}</h3>

      <section className=" mb-5">
        <AddNewMember addMember={addMember} />
      </section>

      <MembersTable
        loading={fetchTableItemsStatus.loading}
        data={members}
        pagination={paginationResults}
        deleteMember={deleteMember}
        isDeleting={fetchStatusDeleting.loading}
        selectedMember={selectedMember}
      />
      <QRCodeCardForm />
    </>
  );
};
