"use client";
import { Button } from "../ui/button";
import { AddNewMember } from "../AddNewMember";
import { MembersTable } from "../MembersTable";
import { QRCodeCardForm } from "../forms/QRCodeCardForm";
import { useMemberTab } from "@/hooks/useMemberTab";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

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
    isPreviousData,
    numberLinks, openDrawer, 
    nextPage, prevPage, setPageNumber

  } = useMemberTab();
  const t = useTranslations("Event")

  return (
    <Card>
        <CardHeader className="flex-row justify-between">
      <div>
        <CardTitle>
          {t("tabs.members.title")}
        </CardTitle>
        <CardDescription>
          {t("tabs.members.description")}
        </CardDescription>
      </div>
        <AddNewMember addMember={addMember} />
        </CardHeader>

      <CardContent>

      </CardContent>


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
        numberLinks={numberLinks}
        openDrawer={openDrawer}
        nextPage={nextPage}
        prevPage={prevPage}
        setPageNumber={setPageNumber}
        
      />
    </Card>
  );
};
