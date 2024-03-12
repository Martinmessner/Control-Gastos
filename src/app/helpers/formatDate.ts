import { format } from '@formkit/tempo'

export default function formatDate(date: Date | string | number): string {
  if (typeof date === 'number') {
    date = new Date(date)
  }

  return format(date, 'short')
}
