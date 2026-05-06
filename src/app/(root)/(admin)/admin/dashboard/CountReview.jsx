import React from 'react'
import Link from 'next/link'
import { BiCategory } from 'react-icons/bi'
import { IoShirtOutline } from 'react-icons/io5'
import { LuUserRound } from 'react-icons/lu'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { ADMIN_CATEGORY_SHOW, ADMIN_PRODUCT_SHOW, ADMIN_CUSTOMER_SHOW } from '@/routes/AdminPanelRoute'

const STATS = [
  { label: 'Total Categories', value: '—', icon: BiCategory, color: 'text-green-600', bg: 'bg-green-100', border: 'border-l-green-500', href: ADMIN_CATEGORY_SHOW },
  { label: 'Total Products',   value: '—', icon: IoShirtOutline, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-l-blue-500', href: ADMIN_PRODUCT_SHOW },
  { label: 'Total Customers',  value: '—', icon: LuUserRound, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-l-amber-500', href: ADMIN_CUSTOMER_SHOW },
  { label: 'Total Orders',     value: '—', icon: MdOutlineShoppingBag, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-l-purple-500', href: '#' },
]

const CountOverview = () => (
  <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
    {STATS.map((stat) => {
      const Icon = stat.icon
      return (
        <Link key={stat.label} href={stat.href}>
          <div className={`flex items-center justify-between p-5 rounded-xl bg-white dark:bg-gray-900 border border-l-4 ${stat.border} shadow-sm hover:shadow-md transition-shadow`}>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>{stat.label}</p>
              <p className='text-2xl font-bold text-gray-800 dark:text-white'>{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <Icon size={22} className={stat.color} />
            </div>
          </div>
        </Link>
      )
    })}
  </div>
)

export default CountOverview
