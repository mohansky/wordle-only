"use client"
import { parseISO, format } from 'date-fns'

export default function DateFormatFull({ dateString }: { dateString: string}) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'do LLL yyyy')}</time>
}
