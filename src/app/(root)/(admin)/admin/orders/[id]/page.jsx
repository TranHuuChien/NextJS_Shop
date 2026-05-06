'use client'
import React, { use, useState } from 'react'
import Link from 'next/link'
import { ADMIN_ORDER_SHOW } from '@/routes/AdminPanelRoute'
import {
  FiArrowLeft, FiPackage, FiTruck, FiCheckCircle,
  FiClock, FiXCircle, FiEdit2, FiUser, FiMail,
  FiPhone, FiMapPin, FiMessageSquare, FiChevronDown,
} from 'react-icons/fi'
import { MdOutlineShoppingBag } from 'react-icons/md'

// ─── Mock data (replace with useOrderDetail(id) when API ready) ───────────────
const MOCK_ORDER = {
  id: 1001,
  code: 'ORD-334902445',
  status: 'PROCESSING',
  paymentStatus: true,
  totalAmount: 1890000,
  shippingCost: 30000,
  tax: 0.08,
  note: 'Please deliver before 6pm.',
  deliveryMethod: 'Express Delivery',
  createAt: '2025-01-06T09:48:00Z',
  updateAt: '2025-01-06T10:00:00Z',
  transaction: { paymentMethod: 'PAYPAL', totalPay: 1890000, paidAt: '2025-01-06T09:50:00Z', completedAt: null },
  cancelReason: null,
  otherCancelReason: null,
  user: { firstName: 'Alex', lastName: 'Sender', email: 'alex.sender@gmail.com', phone: '+84283075041' },
  address: {
    receiver: 'Alex Sender',
    phone: '+84283075041',
    street: '1226 University Drive',
    ward: { name: 'Menlo Park' },
    district: { name: 'CA 94025' },
    province: { name: 'United States' },
  },
  items: [
    { id: 1, variantId: 101, variantName: 'Macbook Air', sku: 'MBA-M2-256', quantity: 1, totalPrice: 1860000, image: '', category: 'Laptop', variant: 'Medium · Black' },
    { id: 2, variantId: 102, variantName: 'Magic Mouse', sku: 'MM-WHT', quantity: 2, totalPrice: 30000, image: '', category: 'Accessory', variant: 'White' },
  ],
  timeline: [
    { actor: 'System', action: 'Order created', time: '2025-01-06T09:48:00Z' },
    { actor: 'Alex Sender', action: 'Payment confirmed via PayPal', time: '2025-01-06T09:50:00Z' },
    { actor: 'Admin', action: 'Order moved to Processing', time: '2025-01-06T10:00:00Z' },
  ],
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  NOT_PROCESSED: { label: 'Pending',    badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: FiClock },
  PROCESSING:    { label: 'Processing', badge: 'bg-blue-100 text-blue-700 border-blue-200',       icon: FiPackage },
  SHIPPED:       { label: 'Shipped',    badge: 'bg-purple-100 text-purple-700 border-purple-200', icon: FiTruck },
  DELIVERED:     { label: 'Delivered',  badge: 'bg-green-100 text-green-700 border-green-200',    icon: FiCheckCircle },
  CANCELLED:     { label: 'Cancelled',  badge: 'bg-red-100 text-red-700 border-red-200',          icon: FiXCircle },
}
const STATUS_OPTIONS = Object.keys(STATUS_CONFIG)
const formatVND = (n) => Number(n)?.toLocaleString('vi-VN') + '₫'
const formatDate = (s) => s ? new Date(s).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'

// ─── Sub-components ───────────────────────────────────────────────────────────
const Section = ({ title, children, action }) => (
  <div className='bg-white dark:bg-gray-900 rounded-xl border shadow-sm overflow-hidden'>
    <div className='flex items-center justify-between px-5 py-4 border-b'>
      <h3 className='font-semibold text-gray-800 dark:text-white text-sm'>{title}</h3>
      {action}
    </div>
    <div className='px-5 py-4'>{children}</div>
  </div>
)

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.NOT_PROCESSED
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.badge}`}>
      <Icon size={11} />
      {cfg.label}
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
const AdminOrderDetailPage = ({ params }) => {
  const { id } = use(params)
  const [order] = useState(MOCK_ORDER)   // swap: const { data: order } = useOrderDetail(id)
  const [comment, setComment] = useState('')
  const [statusOpen, setStatusOpen] = useState(false)

  if (!order) return null

  const subtotal = order.items.reduce((s, i) => s + i.totalPrice, 0)
  const taxAmount = subtotal * (order.tax ?? 0)
  const customerName = order.user ? `${order.user.firstName} ${order.user.lastName}` : '—'

  return (
    <div className='space-y-5'>
      {/* ── Top bar ── */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <div className='flex items-center gap-3 flex-wrap'>
            <Link href={ADMIN_ORDER_SHOW} className='text-gray-400 hover:text-primary transition-colors'>
              <FiArrowLeft size={18} />
            </Link>
            <h1 className='text-xl font-bold text-gray-800 dark:text-white'>
              Order ID: <span className='text-primary'>#{order.code}</span>
            </h1>
            <StatusBadge status={order.status} />
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
              ${order.paymentStatus ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
              {order.paymentStatus ? 'Paid' : 'Unpaid'}
            </span>
          </div>
          <p className='text-xs text-gray-400 mt-1 ml-7'>{formatDate(order.createAt)}</p>
        </div>

        {/* Status change */}
        <div className='relative'>
          <button
            type='button'
            onClick={() => setStatusOpen((v) => !v)}
            className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors'
          >
            <FiEdit2 size={14} />
            Update Status
            <FiChevronDown size={14} className={`transition-transform ${statusOpen ? 'rotate-180' : ''}`} />
          </button>
          {statusOpen && (
            <div className='absolute right-0 top-full mt-1 z-50 bg-white dark:bg-gray-800 border rounded-xl shadow-xl py-1 min-w-[160px]'>
              {STATUS_OPTIONS.map((s) => {
                const c = STATUS_CONFIG[s]
                return (
                  <button key={s} type='button'
                    onClick={() => setStatusOpen(false)}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2
                      ${order.status === s ? 'font-semibold text-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                    <span className={`w-2 h-2 rounded-full border ${c.badge}`} />
                    {c.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── 2-column layout ── */}
      <div className='flex flex-col lg:flex-row gap-5 items-start'>

        {/* ── LEFT column ── */}
        <div className='flex-1 space-y-5 min-w-0'>

          {/* Order Items */}
          <Section title='Order Items'>
            <div className='space-y-4'>
              {order.items.map((item) => (
                <div key={item.id} className='flex items-center gap-4'>
                  {/* Image */}
                  <div className='w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 border'>
                    {item.image
                      ? <img src={item.image} alt={item.variantName} className='w-full h-full object-cover rounded-lg' />
                      : <FiPackage size={20} className='text-gray-300' />
                    }
                  </div>

                  {/* Info */}
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs text-gray-400'>{item.category}</p>
                    <p className='font-medium text-sm text-gray-800 dark:text-white'>{item.variantName}</p>
                    <p className='text-xs text-gray-400 mt-0.5'>{item.variant}</p>
                  </div>

                  {/* Qty × price */}
                  <div className='text-right shrink-0'>
                    <p className='text-sm text-gray-500'>×{item.quantity} · {formatVND(item.totalPrice / item.quantity)}</p>
                    <p className='font-semibold text-sm text-gray-800 dark:text-white'>{formatVND(item.totalPrice)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Order Summary */}
          <Section title='Order Summary'>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between text-gray-500'>
                <span>Subtotal</span>
                <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''} · {formatVND(subtotal)}</span>
              </div>
              <div className='flex justify-between text-gray-500'>
                <span>Discount</span>
                <span className='text-green-600'>—</span>
              </div>
              <div className='flex justify-between text-gray-500'>
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? 'Free shipping' : formatVND(order.shippingCost)}</span>
              </div>
              {order.tax > 0 && (
                <div className='flex justify-between text-gray-500'>
                  <span>Tax ({(order.tax * 100).toFixed(0)}%)</span>
                  <span>{formatVND(taxAmount)}</span>
                </div>
              )}
              <div className='flex justify-between font-bold text-base border-t pt-3 mt-1 text-gray-800 dark:text-white'>
                <span>Total</span>
                <span className='text-primary'>{formatVND(order.totalAmount)}</span>
              </div>
            </div>

            <div className='mt-4 pt-4 border-t space-y-1 text-sm'>
              <div className='flex justify-between text-gray-500'>
                <span>Paid by customer</span>
                <span>{order.paymentStatus ? formatVND(order.transaction?.totalPay) : formatVND(0)}</span>
              </div>
              <div className='flex justify-between text-gray-500'>
                <span>Payment method</span>
                <span className='font-medium text-gray-700 dark:text-gray-300'>{order.transaction?.paymentMethod ?? '—'}</span>
              </div>
              {order.transaction?.paidAt && (
                <div className='flex justify-between text-gray-500'>
                  <span>Paid at</span>
                  <span>{formatDate(order.transaction.paidAt)}</span>
                </div>
              )}
            </div>
          </Section>

          {/* Timeline */}
          <Section title='Timeline'>
            <div className='space-y-4'>
              {order.timeline.map((event, i) => (
                <div key={i} className='flex gap-3'>
                  <div className='flex flex-col items-center'>
                    <div className='w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                      <span className='text-primary text-xs font-bold'>{event.actor[0]}</span>
                    </div>
                    {i < order.timeline.length - 1 && (
                      <div className='w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1' />
                    )}
                  </div>
                  <div className='pb-4 min-w-0'>
                    <p className='text-sm text-gray-700 dark:text-gray-300'>
                      <span className='font-medium'>{event.actor}</span> — {event.action}
                    </p>
                    <p className='text-xs text-gray-400 mt-0.5'>{formatDate(event.time)}</p>
                  </div>
                </div>
              ))}

              {/* Comment input */}
              <div className='flex gap-3 pt-2 border-t'>
                <div className='w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0'>
                  <span className='text-white text-xs font-bold'>A</span>
                </div>
                <div className='flex-1'>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Leave a comment...'
                    rows={2}
                    className='w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                  />
                  {comment && (
                    <button
                      type='button'
                      className='mt-2 px-4 py-1.5 bg-primary text-white text-xs rounded-lg hover:bg-primary/90 transition-colors'
                    >
                      Post comment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* ── RIGHT sidebar ── */}
        <div className='lg:w-72 shrink-0 space-y-4'>

          {/* Notes */}
          <Section title='Notes' action={<button type='button' className='text-gray-400 hover:text-primary'><FiEdit2 size={14} /></button>}>
            {order.note
              ? <p className='text-sm text-gray-600 dark:text-gray-400'>{order.note}</p>
              : <p className='text-sm text-gray-400 italic'>No notes for this order.</p>
            }
          </Section>

          {/* Customer */}
          <Section title='Customer'>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                  <FiUser size={14} className='text-primary' />
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-800 dark:text-white'>{customerName}</p>
                  <p className='text-xs text-gray-400'>1 Order</p>
                </div>
              </div>

              <div className='border-t pt-3 space-y-2'>
                <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Contact</p>
                {order.user?.email && (
                  <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                    <FiMail size={13} className='shrink-0 text-gray-400' />
                    <span className='truncate'>{order.user.email}</span>
                  </div>
                )}
                {order.user?.phone && (
                  <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                    <FiPhone size={13} className='shrink-0 text-gray-400' />
                    <span>{order.user.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* Shipping address */}
          <Section title='Shipping Address'>
            {order.address ? (
              <div className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                <div className='flex items-start gap-2'>
                  <FiMapPin size={13} className='shrink-0 text-gray-400 mt-0.5' />
                  <div>
                    <p className='font-medium text-gray-800 dark:text-white'>{order.address.receiver}</p>
                    <p>{order.address.street}</p>
                    <p>{order.address.ward?.name}, {order.address.district?.name}</p>
                    <p>{order.address.province?.name}</p>
                    {order.address.phone && <p className='mt-1'>{order.address.phone}</p>}
                  </div>
                </div>
              </div>
            ) : (
              <p className='text-sm text-gray-400 italic'>No address on file.</p>
            )}
          </Section>

          {/* Billing address */}
          <Section title='Billing Address'>
            <p className='text-sm text-gray-500'>Same as shipping address</p>
          </Section>

          {/* Cancellation */}
          {(order.cancelReason || order.otherCancelReason) && (
            <Section title='Cancellation Reason'>
              <p className='text-sm text-red-600'>
                {order.cancelReason?.name ?? order.otherCancelReason}
              </p>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetailPage
