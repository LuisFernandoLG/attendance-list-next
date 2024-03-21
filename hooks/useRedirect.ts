import { useLocale } from "next-intl"
import { redirect } from "next/navigation"


export const useRedirect = () => {
  const local = useLocale()

  const _redirect = (path: string) => {
    const to = `/${local}${path}`
    redirect(to)
  }

  return _redirect
}