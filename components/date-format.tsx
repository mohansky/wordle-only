"use client"
import { parseISO, format } from 'date-fns'

export default function DateFormat({ dateString }: { dateString: string}) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'dd LLL')}</time>
}
