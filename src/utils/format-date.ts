import { format } from 'date-fns'

export const formatDate = (date: Date) => {
    const result = new Date(date)

    const formatedDate = format(result, 'dd/MM/yyyy')

    return formatedDate
} 