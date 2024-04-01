import {
  MemberItemFromPagination,
  Pagination,
  eventMember,
} from "@/services/api/eventMember";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchStatus } from "./useFetchStatus";
import { toast } from "sonner";
import { useQuery } from "react-query";
import { useTranslations } from "next-intl";
import { successMessages } from "@/contants/successMessages";

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
  const [page, setPage] = useState(1)

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,

  } = useQuery({
    queryKey: ['membersPagination', page],
    queryFn: () => eventMember().getFromEvent(params.id, page),
    keepPreviousData : true
  })

  const fetchStatusDeleting = useFetchStatus();
  const httpSuccessT = useTranslations("httpSuccess");
  const httpErrorsT = useTranslations("httpErrors");
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

      const msg = httpSuccessT(successMessages["deleted successfully"]);
      toast.success(msg)
      removeMemberFromMembers(item);
    } catch (e) {
      if(error instanceof Error){
        toast.error(httpErrorsT(error.message) || httpErrorsT("default"))
        return
      }
      toast.error(httpErrorsT("default"));
    } finally {
      fetchStatusDeleting.stopLoading();
    }
  };

  const addMember = (item: MemberItemFromPagination) => {
    setMembers([item, ...members]);
  }

  const incrementPage = () => setPage(old=> old + 1)
  const decrementPage = () => setPage(old=> old - 1)
  const assignPage = (page: number) => setPage(page)


  useEffect(() => {
    if (data) {
      setMembers(data.data)
      setPaginationResults(data)
    }
  }
  , [data])


  return {
    members: members,
    paginationResults: paginationResults,
    fetchTableItemsStatus:{
      loading: isLoading,
      error: isError,
      data: data,
      isFetching: isFetching,
      isPreviousData: members ? true : false
    },
    deleteMember,
    fetchStatusDeleting,
    selectedMember,
    addMember,
    incrementPage,
    decrementPage,
    page,
    assignPage,
    isPreviousData
  };
};
