import { axios } from "@/contants/axiosConfig";
import { handleError } from "@/helpers/handleAxiosErrors";

type CreateMember = {
  name: string;
  email: string;
  details: string;
  verifyByEmail: boolean;
};

export interface CreateEventMemberResponse {
  message:        string;
  item:           MemberFromCreateResponse;
  url_attendance: string;
}

export interface MemberFromCreateResponse {
  name:       string;
  custom_id:  string;
  email:      null;
  phone:      null;
  event_id:   string;
  updated_at: Date;
  created_at: Date;
  details:    string;
  id:         number;
}


export interface GetPaginationMembersResponse {
  message:    string;
  pagination: Pagination;
}

export interface Pagination {
  current_page:   number;
  data:           MemberItemFromPagination[];
  first_page_url: string;
  from:           number;
  last_page:      number;
  last_page_url:  string;
  links:          Link[];
  next_page_url:  string | null;
  path:           string;
  per_page:        number;
  prev_page_url:  string | null;
  to:             number;
  total:          number;
}

export interface MemberItemFromPagination {
  id:             number;
  name:           string;
  custom_id:      string;
  email?:          string | null;
  phone?:          string | null;
  details?:        string | null;
  image_url?:      string | null;
  notifyByEmail:  boolean;
  notifyByPhone:  boolean;
  event_id:       number;
  created_at:     Date;
  updated_at:     Date;
  url_attendance: string;
}

export interface Link {
  url:    null | string;
  label:  string;
  active: boolean;
}

export interface DeleteMemberFromEventResponse {
  message: string;
  item:    Item;
  event:   Event;
}

export interface Event {
  id:              number;
  name:            string;
  description:     string;
  image_url:       string;
  type:            string;
  attandance_type: null;
  user_id:         number;
  created_at:      Date;
  updated_at:      Date;
}

export interface Item {
  id:            number;
  name:          string;
  custom_id:     string;
  email:         string;
  phone:         null;
  details:       null;
  image_url:     null;
  notifyByEmail: number;
  notifyByPhone: number;
  event_id:      number;
  created_at:    Date;
  updated_at:    Date;
}

export const eventMember = () => {
  const create = async (eventId: string, member: CreateMember) => {
    try {
      const response = await axios.post(`/events/${eventId}/members`, member);
      const data = response.data as CreateEventMemberResponse
      return {
        member:data.item,
        url_attendance: data.url_attendance
      }
    } catch (e) {
      const error = new Error(handleError(e))
      throw error
    }
  };

  const getFromEvent = async (eventId: string, page: number) => {
    try {
      const response = await axios.get(`/events/${eventId}/members?page=${page}`);
      const data = response.data as GetPaginationMembersResponse
      return data.pagination
    } catch (e) {
      const error = new Error(handleError(e))
      throw error
    }
  }



  const deleteFromEvent = async (evenId:string, memberId: string)=>{
    try{
      const response = await axios.delete(`/events/${evenId}/members/${memberId}`)
      const data =  response.data as DeleteMemberFromEventResponse
      return data.item
    }catch(e){
      const error = new Error(handleError(e))
      throw error
    }
  }

  const getAttendance = async ({eventId, date, page, perPage}:{eventId:string, date:string, page:number, perPage:number})  => {
    try {
      console.log({eventId, date})
      const response = await axios.post(`/events/${eventId}/attendance?perPage=${perPage}&page=${page}`, {
        date
      });
      const data = response.data as GetAttendanceResponse;
      console.log({
        ...data,
        pagination:[]
      })
      return data.pagination
    } catch (e) {
      const error = new Error(handleError(e))
      throw error
    }
  }

  // 
interface UpdateMemberResponse {
    message: string;
    item:    Item;
    event:   Event;
}

interface Event {
    id:              number;
    name:            string;
    description:     string;
    image_url:       string;
    type:            string;
    attandance_type: null;
    user_id:         number;
    created_at:      Date;
    updated_at:      Date;
}

interface Item {
    id:            number;
    name:          string;
    custom_id:     string;
    email:         string;
    phone:         string;
    details:       string;
    image_url:     null;
    notifyByEmail: number;
    notifyByPhone: number;
    event_id:      number;
    created_at:    Date;
    updated_at:    Date;
}
  // 

  const updateMember = async ({eventId, member}:{eventId:string, member:{id:string, name:string, email:string, details:string}})=>{
    try{
      const res = await axios.put(`/events/${eventId}/members/${member.id}`, member)
      const data = res.data as UpdateMemberResponse
      return data
    }
    catch(e){
      const error = new Error(handleError(e))
      throw error
    }
  }

  

  return {
    create,
    getFromEvent,
    deleteFromEvent,
    getAttendance,
    updateMember
  };
};


export interface GetAttendanceResponse {
  date:         Date;
  userTimezone: string;
  message:      string;
  pagination: GetAttendancePagination;
}

export interface GetAttendancePagination {
  current_page:   number;
  data:           MemberWithAttendance[];
  first_page_url: string;
  from:           number;
  last_page:      number;
  last_page_url:  string;
  links:          Link[];
  next_page_url:  null;
  path:           string;
  per_page:       number;
  prev_page_url:  null;
  to:             number;
  total:          number;
}

export interface MemberWithAttendance {
  id:              number;
  member_id:       number;
  event_id:        number;
  created_at:      Date;
  updated_at:      Date;
  last_attendance: Date;
  attendances:     number;
  member:          Item;
}