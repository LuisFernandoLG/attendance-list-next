
import { MemberItemFromPagination } from '@/services/api/eventMember';
import { createContext, useState } from 'react';

type QRCodesWizzardContextType = {
  member: MemberItemFromPagination
  isOpen: boolean
  members: MemberItemFromPagination[]
  openDrawer: (member: MemberItemFromPagination) => void
  closeDrawer: () => void
}

const QRCodesWizzardContext = createContext<QRCodesWizzardContextType>({} as QRCodesWizzardContextType)
const initialMember: MemberItemFromPagination = {
  id: 0,
  name: "",
  custom_id: "",
  email: "",
  phone: "",
  details: "",
  image_url: "",
  notifyByEmail: false,
  notifyByPhone: false,
  event_id: 0,
  created_at: new Date(),
  updated_at: new Date(),
  url_attendance: ""

}

const QRCodesWizzardProvider = ({ children }: { children: React.ReactNode }) => {

  const [member, setMember] = useState<MemberItemFromPagination>(initialMember)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [members, setMembers] = useState<MemberItemFromPagination[]>([])

  const openDrawer = (member: MemberItemFromPagination) => {
    setMember(member)
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
    setMember(initialMember)
  }

  const value = {
    member,
    isOpen,
    members,
    openDrawer,
    closeDrawer
  }
  
  return <QRCodesWizzardContext.Provider value={value}>{children}</QRCodesWizzardContext.Provider>;
}

export { QRCodesWizzardContext }
export default QRCodesWizzardProvider