'use client'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import { useAdminOrders, useUpdateOrderStatus } from '@/hooks/useOrders'
import { ADMIN_ORDER_DETAIL } from '@/routes/AdminPanelRoute'
import {
  FiSearch, FiFilter, FiChevronLeft, FiChevronRight,
  FiEye, FiEdit2, FiChevronDown,
} from 'react-icons/fi'
import { MdOutlineShoppingBag } from 'react-icons/md'

const STATUS_CONFIG = {
  NOT_PROCESSED: { label: 'Pending',    badge: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  PROCESSING:    { label: 'Processing', badge: 'bg-blue-100 text-blue-700 border-blue-200' },
  SHIPPED:       { label: 'Shipped',    badge: 'bg-purple-100 text-purple-700 border-purple-200' },
  DELIVERED:     { label: 'Delivered',  badge: 'bg-green-100 text-green-700 border-green-200' },
  CANCELLED:     { label: 'Cancelled',  badge: 'bg-red-100 text-red-700 border-red-200' },
}

const PAYMENT_BADGE = {
  true:  'text-green-600 font-medium',
  false: 'text-amber-500 font-medium',
}

const STATUS_OPTIONS = ['NOT_PROCESSED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']
const PAGE_SIZES = [6, 10, 20, 50]

const formatVND = (n) => Number(n)?.toLocaleString('vi-VN') + '₫'
const formatDate = (s) => s ? new Date(s).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

const SkeletonRow = () => (
  <tr className='animate-pulse'>
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i} className='px-5 py-4'>
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
      </td>
    ))}
  </tr>
)

const StatusDropdown = ({ order, onUpdate }) => {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const btnRef = React.useRef(null)
  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.NOT_PROCESSED

  const handleOpen = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX })
    }
    setOpen((v) => !v)
  }

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <>
      <button
        ref={btnRef}
        type='button'
        onClick={handleOpen}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.badge}`}
      >
        {cfg.label}
        <FiChevronDown size={11} />
      </button>

      {open && typeof window !== 'undefined' && ReactDOM.createPortal(
        <div
          style={{ position: 'absolute', top: pos.top, left: pos.left, zIndex: 9999 }}
          className='bg-white dark:bg-gray-800 border rounded-xl shadow-xl py-1 min-w-[150px]'
        >
          {STATUS_OPTIONS.map((s) => {
            const c = STATUS_CONFIG[s]
            return (
              <button
                key={s}
                type='button'
                onClick={() => { onUpdate(order.id, s); setOpen(false) }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2
                  ${order.status === s ? 'font-semibold' : ''}`}
              >
                <span className={`w-2 h-2 rounded-full border ${c.badge}`} />
                {c.label}
              </button>
            )
          })}
        </div>,
        document.body
      )}
    </>
  )
}

// Mock data for UI preview (replace with real API when ready)
const MOCK_ORDERS = Array.from({ length: 12 }, (_, i) => ({
  id: 1000 + i + 1,
  code: `ORD-${String(1001 + i).padStart(4, '0')}`,
  status: STATUS_OPTIONS[i % 5],
  totalAmount: Math.floor(Math.random() * 2000000) + 100000,
  paymentStatus: i % 3 !== 1,
  deliveryMethod: i % 2 === 0 ? 'Standard' : 'Express',
  createAt: new Date(2025, 3, i + 1).toISOString(),
  transaction: { paymentMethod: i % 2 === 0 ? 'COD' : 'PAYPAL' },
  user: { firstName: ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang'][i % 5], lastName: ['Van A', 'Thi B', 'Van C', 'Thi D', 'Van E'][i % 5] },
  items: [{ id: i }],
}))

const AdminOrdersPage = () => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sortAsc, setSortAsc] = useState(false)

  const updateMutation = useUpdateOrderStatus()

  // Use mock data for now — swap with useAdminOrders when API is ready
  // const { data, isLoading } = useAdminOrders({ page, size: pageSize, search, isSortAscending: sortAsc })
  const isLoading = false
  const filtered = MOCK_ORDERS.filter((o) => {
    const matchSearch = !search || o.code.toLowerCase().includes(search.toLowerCase()) ||
      `${o.user.firstName} ${o.user.lastName}`.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !statusFilter || o.status === statusFilter
    return matchSearch && matchStatus
  })
  const totalPages = Math.ceil(filtered.length / pageSize)
  const orders = filtered.slice((page - 1) * pageSize, page * pageSize)
  const meta = { totalElements: filtered.length, totalPages }

  const handleStatusUpdate = (id, status) => {
    updateMutation.mutate({ id, status })
  }

  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2'>
            <MdOutlineShoppingBag size={26} className='text-primary' />
            Orders
          </h1>
          <p className='text-sm text-gray-500 mt-0.5'>{meta.totalElements} total orders</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className='flex flex-wrap items-center gap-3'>
        {/* Search */}
        <div className='flex items-center gap-2 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2.5 flex-1 min-w-[220px] max-w-sm shadow-sm'>
          <FiSearch size={16} className='text-gray-400 shrink-0' />
          <input
            type='text'
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder='Search orders, customers...'
            className='bg-transparent text-sm outline-none w-full text-gray-600 dark:text-gray-300 placeholder-gray-400'
          />
        </div>

        {/* Status filter */}
        <div className='flex items-center gap-2 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2.5 shadow-sm'>
          <FiFilter size={15} className='text-gray-400' />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className='bg-transparent text-sm outline-none text-gray-600 dark:text-gray-300 cursor-pointer'
          >
            <option value=''>All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <button
          type='button'
          onClick={() => setSortAsc((v) => !v)}
          className='flex items-center gap-2 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-50 transition-colors'
        >
          <FiChevronDown size={15} className={`transition-transform ${sortAsc ? 'rotate-180' : ''}`} />
          {sortAsc ? 'Oldest first' : 'Newest first'}
        </button>
      </div>

      {/* Table */}
      <div className='bg-white dark:bg-gray-900 rounded-2xl border shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 uppercase tracking-wide border-b'>
                <th className='text-left px-5 py-3.5 font-semibold'>Order</th>
                <th className='text-left px-5 py-3.5 font-semibold'>Date</th>
                <th className='text-left px-5 py-3.5 font-semibold'>Customer</th>
                <th className='text-left px-5 py-3.5 font-semibold'>Payment</th>
                <th className='text-left px-5 py-3.5 font-semibold'>Delivery</th>
                <th className='text-left px-5 py-3.5 font-semibold'>Status</th>
                <th className='text-right px-5 py-3.5 font-semibold'>Total</th>
                <th className='text-center px-5 py-3.5 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y dark:divide-gray-800'>
              {isLoading ? (
                Array.from({ length: pageSize }).map((_, i) => <SkeletonRow key={i} />)
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className='text-center py-16 text-gray-400'>
                    <MdOutlineShoppingBag size={40} className='mx-auto mb-2 opacity-30' />
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const customerName = order.user
                    ? `${order.user.firstName} ${order.user.lastName}`
                    : '—'

                  return (
                    <tr key={order.id} className='hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors'>
                      {/* Order code */}
                      <td className='px-5 py-4'>
                        <span className='font-semibold text-gray-700 dark:text-gray-200'>
                          #{order.code}
                        </span>
                        <p className='text-xs text-gray-400 mt-0.5'>{order.items?.length ?? 0} items</p>
                      </td>

                      {/* Date */}
                      <td className='px-5 py-4 text-gray-500 whitespace-nowrap'>
                        {formatDate(order.createAt)}
                      </td>

                      {/* Customer */}
                      <td className='px-5 py-4'>
                        <span className='font-medium text-gray-700 dark:text-gray-300'>{customerName}</span>
                      </td>

                      {/* Payment */}
                      <td className='px-5 py-4'>
                        <div>
                          <span className={PAYMENT_BADGE[String(order.paymentStatus)]}>
                            {order.paymentStatus ? 'Paid' : 'Unpaid'}
                          </span>
                          <p className='text-xs text-gray-400 mt-0.5'>
                            {order.transaction?.paymentMethod ?? '—'}
                          </p>
                        </div>
                      </td>

                      {/* Delivery */}
                      <td className='px-5 py-4 text-gray-500 text-xs'>
                        {order.deliveryMethod}
                      </td>

                      {/* Status — editable dropdown */}
                      <td className='px-5 py-4'>
                        <StatusDropdown order={order} onUpdate={handleStatusUpdate} />
                      </td>

                      {/* Total */}
                      <td className='px-5 py-4 text-right font-semibold text-gray-800 dark:text-white whitespace-nowrap'>
                        {formatVND(order.totalAmount)}
                      </td>

                      {/* Actions */}
                      <td className='px-5 py-4'>
                        <div className='flex items-center justify-center gap-1'>
                          <Link
                            href={ADMIN_ORDER_DETAIL(order.id)}
                            className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors'
                            title='View'
                          >
                            <FiEye size={15} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.totalPages > 0 && (
          <div className='flex items-center justify-between px-5 py-4 border-t bg-gray-50/50 dark:bg-gray-800/30'>
            <p className='text-sm text-gray-500'>
              Page {page} of {meta.totalPages} &nbsp;·&nbsp; {meta.totalElements} orders
            </p>

            <div className='flex items-center gap-1.5'>
              <button
                type='button'
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className='w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-white disabled:opacity-30 transition-colors'
              >
                <FiChevronLeft size={15} />
              </button>

              {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                const p = Math.max(1, Math.min(meta.totalPages - 4, page - 2)) + i
                return (
                  <button
                    key={p}
                    type='button'
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium border transition-colors
                      ${p === page
                        ? 'bg-primary text-white border-primary'
                        : 'hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                  >
                    {p}
                  </button>
                )
              })}

              <button
                type='button'
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className='w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-white disabled:opacity-30 transition-colors'
              >
                <FiChevronRight size={15} />
              </button>
            </div>

            {/* Page size */}
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <span>Rows:</span>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}
                className='border rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 outline-none cursor-pointer'
              >
                {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrdersPage
