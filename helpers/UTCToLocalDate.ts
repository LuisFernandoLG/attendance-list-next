import {addMinutes} from "date-fns"

export const UTCToLocalDate = (utcGivenDate: Date) => {
  let offSetMinutes = utcGivenDate.getTimezoneOffset()
  const result = addMinutes(utcGivenDate, -(offSetMinutes))
  return result
}