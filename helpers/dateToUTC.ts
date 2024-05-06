import { formatInTimeZone } from "date-fns-tz";

// LOCAL: 00:00:00, UTC; 07:00:00
export const dateToUTC = (localGivenDate: Date) => {
  localGivenDate.setHours(0)
  localGivenDate.setMinutes(0)
  localGivenDate.setSeconds(0)

  const utcTime = formatInTimeZone(localGivenDate, 'UTC', 'yyyy-MM-dd HH:mm:ss')

  return utcTime;
};
