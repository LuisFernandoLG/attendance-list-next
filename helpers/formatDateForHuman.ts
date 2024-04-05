import { Locale, format } from "date-fns"
import {es} from "date-fns/locale"

export const formatDateForHuman = (item: Date, locale: Locale) => {
    return format(item, 'eeee, d MMMM yyyy', { locale })
}