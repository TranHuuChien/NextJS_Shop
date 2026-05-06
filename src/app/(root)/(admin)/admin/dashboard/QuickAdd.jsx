import React from 'react'
import Link from 'next/link'
import { BiCategory } from 'react-icons/bi'
import { IoShirtOutline } from 'react-icons/io5'
import { RiCoupon2Line } from 'react-icons/ri'
import { MdOutlinePermMedia } from 'react-icons/md'
import { ADMIN_CATEGORY_ADD, ADMIN_PRODUCT_ADD, ADMIN_COUPON_ADD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPanelRoute'

const QUICK_ACTIONS = [
  { label: 'Add Category', icon: BiCategory,       href: ADMIN_CATEGORY_ADD, color: 'text-green-600', bg: 'bg-green-50 hover:bg-green-100' },
  { label: 'Add Product',  icon: IoShirtOutline,   href: ADMIN_PRODUCT_ADD,  color: 'text-blue-600',  bg: 'bg-blue-50 hover:bg-blue-100' },
  { label: 'Add Coupon',   icon: RiCoupon2Line,    href: ADMIN_COUPON_ADD,   color: 'text-amber-600', bg: 'bg-amber-50 hover:bg-amber-100' },
  { label: 'Media',        icon: MdOutlinePermMedia, href: ADMIN_MEDIA_SHOW, color: 'text-purple-600', bg: 'bg-purple-50 hover:bg-purple-100' },
]

const QuickAdd = () => (
  <div>
    <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3'>Quick Actions</h3>
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon
        return (
          <Link key={action.label} href={action.href}>
            <div className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-colors cursor-pointer ${action.bg} dark:bg-gray-800 dark:hover:bg-gray-700`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-gray-700 shadow-sm`}>
                <Icon size={20} className={action.color} />
              </div>
              <span className='text-xs font-medium text-gray-700 dark:text-gray-300'>{action.label}</span>
            </div>
          </Link>
        )
      })}
    </div>
  </div>
)

export default QuickAdd
