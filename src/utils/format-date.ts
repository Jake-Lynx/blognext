import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const formatDate = (date: Date) => {
    const result = new Date(date)

    const formatedDate = format(result, 'dd MMM yyyy', {locale: fr})

    return formatedDate
}