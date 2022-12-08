import { getDay, getHours, getMinutes, isThisWeek, isToday, isYesterday, parseISO } from 'date-fns'

export function dateFormatter(date: string) {
  const formattedDate = new Date(date)
  if(isYesterday(formattedDate)) {
    return "Ontem"
  }

  if(isToday(formattedDate)) {
    return getHoursAndMinutes(date)
  }

  if(isThisWeek(formattedDate)) {
    const dayOfWeek = getDay(formattedDate)
    return dayOfWeek
  }
  return Intl.DateTimeFormat('pt-BR').format(formattedDate)
  
}

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: "currency",
  currency: "BRL"
})

export function getHoursAndMinutes(date: string) {
  const formattedDate = new Date(date)
  const hours = getHours(formattedDate)
    const minutes = getMinutes(formattedDate)
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
}