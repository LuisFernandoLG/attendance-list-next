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
    addMember,
    incrementPage,
    decrementPage,
    page,
    assignPage,
    isPreviousData
  } = useMemberTab();
  const t = useTranslations("Event")

  return (
    <>
      <section className="flex mb-5 justify-between">
        <div>
      <h2 className="text-xl font-bold">{t("tabs.members.title")}</h2>
      <h3 className="">{t("tabs.members.description")}</h3>
        </div>

        <AddNewMember addMember={addMember} />
      </section>

      <MembersTable
        loading={fetchTableItemsStatus.loading || fetchTableItemsStatus.isFetching && !fetchTableItemsStatus.data}
        data={members}
        pagination={paginationResults}
        deleteMember={deleteMember}
        isDeleting={fetchStatusDeleting.loading}
        selectedMember={selectedMember}
        incrementPage={incrementPage}
        decrementPage={decrementPage}
        page={page}
        assignPage={assignPage}
        isPreviousData={isPreviousData}
      />
      <QRCodeCardForm />
    </>
  );
};
