'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
import { USER_ORDER, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { useMyOrders, useCancelOrder } from '@/hooks/useOrders'
import useAuth from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import {
  HiOutlineShoppingBag,
  HiOutlineChevronRight,
  HiOutlineXCircle,
} from 'react-icons/hi2'
import {
  FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle,
} from 'react-icons/fi'

const breadcrumb = {
  title: 'My Orders',
  links: [{ label: 'My Orders', href: USER_ORDER }],
}

const STATUS_TABS = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'NOT_PROCESSED' },
  { label: 'Processing', value: 'PROCESSING' },
  { label: 'Shipped', value: 'SHIPPED' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Cancelled', value: 'CANCELLED' },
]

const STATUS_CONFIG = {
  NOT_PROCESSED: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: FiClock },
  PROCESSING:    { label: 'Processing', color: 'bg-blue-100 text-blue-700', icon: FiPackage },
  SHIPPED:       { label: 'Shipped', color: 'bg-purple-100 text-purple-700', icon: FiTruck },
  DELIVERED:     { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: FiCheckCircle },
  CANCELLED:     { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: FiXCircle },
}

const formatVND = (n) => Number(n)?.toLocaleString('vi-VN') + '₫'
const formatDate = (s) => s ? new Date(s).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—'

const OrderSkeleton = () => (
  <div className='border rounded-xl p-5 animate-pulse space-y-3'>
    <div className='flex justify-between'>
      <div className='h-4 bg-gray-200 rounded w-32' />
      <div className='h-5 bg-gray-200 rounded w-20' />
    </div>
    <div className='h-3 bg-gray-200 rounded w-48' />
    <div className='flex gap-3'>
      <div className='w-14 h-14 bg-gray-200 rounded-lg' />
      <div className='w-14 h-14 bg-gray-200 rounded-lg' />
    </div>
    <div className='flex justify-between pt-2 border-t'>
      <div className='h-4 bg-gray-200 rounded w-24' />
      <div className='h-4 bg-gray-200 rounded w-20' />
    </div>
  </div>
)

const CancelModal = ({ order, onClose, onConfirm, loading }) => {
  const [reason, setReason] = useState('')
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-xl'>
        <h3 className='font-semibold text-lg mb-1'>Cancel Order</h3>
        <p className='text-sm text-gray-500 mb-4'>
          Order <span className='font-medium text-gray-700'>#{order.code}</span> will be cancelled.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder='Reason for cancellation (optional)'
          rows={3}
          className='w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none mb-4'
        />
        <div className='flex gap-3'>
          <Button variant='outline' className='flex-1' onClick={onClose} disabled={loading}>
            Keep Order
          </Button>
          <Button
            className='flex-1 bg-red-500 hover:bg-red-600 text-white'
            onClick={() => onConfirm(order.id, reason)}
            disabled={loading}
          >
            {loading ? 'Cancelling...' : 'Cancel Order'}
          </Button>
        </div>
      </div>
    </div>
  )
}

const OrderCard = ({ order, onCancel }) => {
  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.NOT_PROCESSED
  const Icon = cfg.icon
  const canCancel = order.status === 'NOT_PROCESSED'

  return (
    <div className='border rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white'>
      {/* Header */}
      <div className='flex items-center justify-between px-5 py-3 bg-gray-50 border-b'>
        <div className='flex items-center gap-3'>
          <span className='text-sm font-semibold text-gray-700'>#{order.code}</span>
          <span className='text-xs text-gray-400'>{formatDate(order.createAt)}</span>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
          <Icon size={12} />
          {cfg.label}
        </span>
      </div>

      {/* Items preview */}
      <div className='px-5 py-4'>
        <div className='flex items-center gap-2 mb-3'>
          {order.items?.slice(0, 4).map((item, i) => (
            <div key={item.id} className='relative'>
              <div className='w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300'>
                <FiPackage size={20} />
              </div>
              {i === 3 && order.items.length > 4 && (
                <div className='absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center'>
                  <span className='text-white text-xs font-bold'>+{order.items.length - 4}</span>
                </div>
              )}
            </div>
          ))}
          {(!order.items || order.items.length === 0) && (
            <p className='text-sm text-gray-400'>No items</p>
          )}
        </div>

        {/* Info row */}
        <div className='flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500'>
          <span>{order.items?.length ?? 0} item{order.items?.length !== 1 ? 's' : ''}</span>
          <span>Delivery: {order.deliveryMethod}</span>
          <span>Payment: {order.transaction?.paymentMethod ?? '—'}</span>
          {order.paymentStatus && (
            <span className='text-green-600 font-medium'>✓ Paid</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className='flex items-center justify-between px-5 py-3 border-t bg-gray-50/50'>
        <div>
          <span className='text-xs text-gray-400'>Total</span>
          <p className='font-semibold text-primary'>{formatVND(order.totalAmount)}</p>
        </div>
        <div className='flex items-center gap-2'>
          {canCancel && (
            <button
              type='button'
              onClick={() => onCancel(order)}
              className='text-xs text-red-500 hover:underline flex items-center gap-1'
            >
              <HiOutlineXCircle size={14} />
              Cancel
            </button>
          )}
          <Link
            href={`/my-orders/${order.code}`}
            className='flex items-center gap-1 text-xs text-primary hover:underline font-medium'
          >
            View Details
            <HiOutlineChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

const OrdersPage = () => {
  const { user } = useAuth()
  const [activeStatus, setActiveStatus] = useState('')
  const [page, setPage] = useState(1)
  const [cancelTarget, setCancelTarget] = useState(null)

  const { data, isLoading } = useMyOrders(
    { page, size: 8, status: activeStatus || undefined },
    !!user
  )
  const cancelMutation = useCancelOrder()

  const orders = data?.items ?? []
  const meta = data?.meta

  const handleTabChange = (val) => {
    setActiveStatus(val)
    setPage(1)
  }

  const handleConfirmCancel = (id, reason) => {
    cancelMutation.mutate(
      { id, reason },
      { onSuccess: () => setCancelTarget(null) }
    )
  }

  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <UserPanelLayout>
        <div className='space-y-5'>
          {/* Title */}
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
              <HiOutlineShoppingBag size={22} />
              My Orders
            </h2>
            {meta && (
              <span className='text-sm text-gray-400'>{meta.totalElements} orders</span>
            )}
          </div>

          {/* Status tabs */}
          <div className='flex gap-1 overflow-x-auto pb-1 scrollbar-hide'>
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                type='button'
                onClick={() => handleTabChange(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${activeStatus === tab.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {!user ? (
            <div className='flex flex-col items-center justify-center py-20 gap-3'>
              <p className='text-gray-400'>Please login to view your orders</p>
              <Button asChild className='bg-primary text-white'>
                <Link href='/auth/login'>Login</Link>
              </Button>
            </div>
          ) : isLoading ? (
            <div className='space-y-4'>
              {Array.from({ length: 3 }).map((_, i) => <OrderSkeleton key={i} />)}
            </div>
          ) : orders.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-20 gap-4 text-center'>
              <HiOutlineShoppingBag size={56} className='text-gray-200' />
              <p className='text-gray-400 font-medium'>No orders found</p>
              <Button asChild variant='outline'>
                <Link href={WEBSITE_SHOP}>Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className='space-y-4'>
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} onCancel={setCancelTarget} />
                ))}
              </div>

              {/* Pagination */}
              {meta && meta.totalPages > 1 && (
                <div className='flex justify-center items-center gap-2 pt-2'>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className='px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50'
                  >
                    Prev
                  </button>
                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-sm border transition-colors
                        ${p === page ? 'bg-primary text-white border-primary' : 'hover:bg-gray-50'}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                    disabled={page === meta.totalPages}
                    className='px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50'
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </UserPanelLayout>

      {/* Cancel modal */}
      {cancelTarget && (
        <CancelModal
          order={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirm={handleConfirmCancel}
          loading={cancelMutation.isPending}
        />
      )}
    </div>
  )
}

export default OrdersPage
