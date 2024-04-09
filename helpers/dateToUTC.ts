import {addMinutes} from "date-fns"

export const dateToUTC = (localGivenDate: Date) => {
  const utcTimestamp = Date.UTC(localGivenDate.getFullYear(), localGivenDate.getMonth(), localGivenDate.getDate(), localGivenDate.getHours(), localGivenDate.getMinutes(), localGivenDate.getSeconds())
  const date = addMinutes(new Date(utcTimestamp), new Date().getTimezoneOffset() * 2)
  return date
}