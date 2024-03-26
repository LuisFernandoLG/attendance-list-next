import { format } from "date-fns"

export const formatDateForHuman = (item: Date, locale: any) => {
    return format(item, 'eeee, d MMMM yyyy', { locale: locale })
}