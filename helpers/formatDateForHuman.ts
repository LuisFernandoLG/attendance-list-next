import { format } from "date-fns"
import { es } from 'date-fns/locale';

export const formatDateForHuman = (item: Date) => {
    return format(item, 'eeee, d MMMM yyyy', { locale: es })
}