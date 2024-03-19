import {
  MemberItemFromPagination,
  Pagination,
  eventMember,
} from "@/services/api/eventMember";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchStatus } from "./useFetchStatus";
import { toast } from "sonner";

const initialPaginationResults: Pagination = {
  current_page: 1,
  data: [],
  first_page_url: "",
  from: 1,
  last_page: 1,
  last_page_url: "",
  links: [],
  next_page_url: "",
  path: "",
  per_page: 1,
  prev_page_url: "",
  to: 1,
  total: 1,
};

const memberItemFromPagination: MemberItemFromPagination = {
  id: 1,
  name: "name",
  custom_id: "custom_id",
  notifyByEmail: true,
  notifyByPhone: true,
  event_id: 1,
  created_at: new Date(),
  updated_at: new Date(),
  url_attendance: "url_attendance",
};

type PageParams = {
  id: string;
}

export const useMemberTab = () => {
  const [members, setMembers] = useState<MemberItemFromPagination[]>([]);
  const params = useParams<PageParams>();
  const query = useSearchParams();
  const page = query.get("page") ? parseInt(query.get("page") as string) : 1;
  const fetchTableItemsStatus = useFetchStatus(true);
  const fetchStatusDeleting = useFetchStatus();
  const [selectedMember, setSelectedMember] =
    useState<MemberItemFromPagination>(memberItemFromPagination);
  const [paginationResults, setPaginationResults] = useState<Pagination>(
    initialPaginationResults
  );


  const removeMemberFromMembers = async (item: MemberItemFromPagination) => {
    setMembers(members.filter((member) => member.id !== item.id));
  };

  const deleteMember = async (item: MemberItemFromPagination) => {
    try {
      setSelectedMember(item);
      fetchStatusDeleting.startLoading();
      await eventMember().deleteFromEvent(params.id, item.id.toString());
      toast.success("Participante eliminado");
      removeMemberFromMembers(item);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    } finally {
      fetchStatusDeleting.stopLoading();
    }
  };

  const addMember = (item: MemberItemFromPagination) => {
    setMembers([item, ...members]);
  }

  const loadTableItems = async () => {
    try {
      fetchTableItemsStatus.startLoading();
      const res = await eventMember().getFromEvent(params.id, page);
      setMembers(res.data);
      setPaginationResults(res);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    } finally {
      fetchTableItemsStatus.stopLoading();
    }
  };

  useEffect(() => {
    loadTableItems();
  }, []);

  return {
    members,
    paginationResults,
    fetchTableItemsStatus,
    deleteMember,
    fetchStatusDeleting,
    selectedMember,
    addMember
  };
};
