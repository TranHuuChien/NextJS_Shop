import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const sortings = [
  { label: 'Defaut Sorting', value:'default-sorting'},
  { label: 'Ascending ', value: 'ascending'},
  { label: 'Descending', value: 'desc' },
  { label: 'Price: High to Low', value: 'price_low_high'
  },
  { label: 'Price: Low to High', value: 'price_high_low'}
]