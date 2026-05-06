import React from 'react'
import Link from 'next/link'
import CountOverview from './CountReview'
import QuickAdd from './QuickAdd'
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi'

// Mock recent orders
const RECENT_ORDERS = [
  { code: 'ORD-001', customer: 'Nguyen Van A', total: 450000, status: 'DELIVERED',     date: '2025-05-01' },
  { code: 'ORD-002', customer: 'Tran Thi B',   total: 890000, status: 'PROCESSING',    date: '2025-05-02' },
  { code: 'ORD-003', customer: 'Le Van C',      total: 199000, status: 'NOT_PROCESSED', date: '2025-05-03' },
  { code: 'ORD-004', customer: 'Pham Thi D',   total: 1200000, status: 'SHIPPED',      date: '2025-05-03' },
  { code: 'ORD-005', customer: 'Hoang Van E',  total: 350000, status: 'CANCELLED',     date: '2025-05-04' },
]

const STATUS_BADGE = {
  NOT_PROCESSED: 'bg-yellow-100 text-yellow-700',
  PROCESSING:    'bg-blue-100 text-blue-700',
  SHIPPED:       'bg-purple-100 text-purple-700',
  DELIVERED:     'bg-green-100 text-green-700',
  CANCELLED:     'bg-red-100 text-red-700',
}

const STATUS_LABEL = {
  NOT_PROCESSED: 'Pending',
  PROCESSING:    'Processing',
  SHIPPED:       'Shipped',
  DELIVERED:     'Delivered',
  CANCELLED:     'Cancelled',
}

const formatVND = (n) => Number(n).toLocaleString('vi-VN') + '₫'

const DashboardPage = () => {
  return (
    <div className='space-y-6'>
      {/* Page title */}
      <div>
        <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Dashboard</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-0.5'>Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats */}
      <CountOverview />

      {/* Quick actions */}
      <QuickAdd />

      {/* Recent orders */}
      <div className='bg-white dark:bg-gray-900 rounded-xl border shadow-sm overflow-hidden'>
        <div className='flex items-center justify-between px-5 py-4 border-b'>
          <div className='flex items-center gap-2'>
            <FiShoppingBag size={18} className='text-primary' />
            <h3 className='font-semibold text-gray-800 dark:text-white'>Recent Orders</h3>
          </div>
          <Link href='/admin/orders' className='flex items-center gap-1 text-sm text-primary hover:underline'>
            View all <FiArrowRight size={14} />
          </Link>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 uppercase tracking-wide'>
                <th className='text-left px-5 py-3'>Order</th>
                <th className='text-left px-5 py-3'>Customer</th>
                <th className='text-left px-5 py-3'>Date</th>
                <th className='text-right px-5 py-3'>Total</th>
                <th className='text-center px-5 py-3'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y dark:divide-gray-800'>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.code} className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors'>
                  <td className='px-5 py-3.5 font-medium text-gray-700 dark:text-gray-300'>
                    #{order.code}
                  </td>
                  <td className='px-5 py-3.5 text-gray-600 dark:text-gray-400'>{order.customer}</td>
                  <td className='px-5 py-3.5 text-gray-500'>{order.date}</td>
                  <td className='px-5 py-3.5 text-right font-semibold text-gray-800 dark:text-white'>
                    {formatVND(order.total)}
                  </td>
                  <td className='px-5 py-3.5 text-center'>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_BADGE[order.status]}`}>
                      {STATUS_LABEL[order.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
