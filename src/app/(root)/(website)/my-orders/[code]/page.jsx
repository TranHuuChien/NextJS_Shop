'use client'
import React from 'react'
import { use } from 'react'
import Link from 'next/link'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
import { USER_ORDER } from '@/routes/WebsiteRoute'
import { useOrderDetail } from '@/hooks/useOrders'
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiArrowLeft } from 'react-icons/fi'

const STATUS_CONFIG = {
  NOT_PROCESSED: { label: 'Pending',    color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: FiClock },
  PROCESSING:    { label: 'Processing', color: 'bg-blue-100 text-blue-700 border-blue-200',       icon: FiPackage },
  SHIPPED:       { label: 'Shipped',    color: 'bg-purple-100 text-purple-700 border-purple-200', icon: FiTruck },
  DELIVERED:     { label: 'Delivered',  color: 'bg-green-100 text-green-700 border-green-200',    icon: FiCheckCircle },
  CANCELLED:     { label: 'Cancelled',  color: 'bg-red-100 text-red-700 border-red-200',          icon: FiXCircle },
}

const STEPS = ['NOT_PROCESSED', 'PROCESSING', 'SHIPPED', 'DELIVERED']

const formatVND = (n) => Number(n)?.toLocaleString('vi-VN') + '₫'
const formatDate = (s) => s ? new Date(s).toLocaleString('vi-VN') : '—'

const OrderDetailPage = ({ params }) => {
  const { code } = use(params)
  const { data: order, isLoading, isError } = useOrderDetail(code)

  const breadcrumb = {
    title: `Order #${code}`,
    links: [
      { label: 'My Orders', href: USER_ORDER },
      { label: `#${code}`, href: '#' },
    ],
  }

  if (isLoading) {
    return (
      <div>
        <WebsiteBreadcrumb props={breadcrumb} />
        <UserPanelLayout>
          <div className='space-y-4 animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-48' />
            <div className='h-32 bg-gray-200 rounded-xl' />
            <div className='h-48 bg-gray-200 rounded-xl' />
          </div>
        </UserPanelLayout>
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div>
        <WebsiteBreadcrumb props={breadcrumb} />
        <UserPanelLayout>
          <div className='flex flex-col items-center justify-center py-20 gap-3'>
            <p className='text-gray-400'>Order not found</p>
            <Link href={USER_ORDER} className='text-primary hover:underline text-sm'>
              ← Back to orders
            </Link>
          </div>
        </UserPanelLayout>
      </div>
    )
  }

  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.NOT_PROCESSED
  const Icon = cfg.icon
  const currentStep = STEPS.indexOf(order.status)
  const isCancelled = order.status === 'CANCELLED'

  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <UserPanelLayout>
        <div className='space-y-5'>
          {/* Back + title */}
          <div className='flex items-center gap-3'>
            <Link href={USER_ORDER} className='text-gray-400 hover:text-primary transition-colors'>
              <FiArrowLeft size={20} />
            </Link>
            <div>
              <h2 className='text-xl font-bold'>Order #{order.code}</h2>
              <p className='text-xs text-gray-400'>{formatDate(order.createAt)}</p>
            </div>
            <span className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${cfg.color}`}>
              <Icon size={12} />
              {cfg.label}
            </span>
          </div>

          {/* Progress tracker */}
          {!isCancelled && (
            <div className='bg-white border rounded-xl p-5'>
              <h3 className='text-sm font-semibold text-gray-600 mb-4'>Order Progress</h3>
              <div className='flex items-center'>
                {STEPS.map((step, i) => {
                  const stepCfg = STATUS_CONFIG[step]
                  const StepIcon = stepCfg.icon
                  const done = i <= currentStep
                  const active = i === currentStep
                  return (
                    <React.Fragment key={step}>
                      <div className='flex flex-col items-center gap-1.5'>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors
                          ${done ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
                          <StepIcon size={16} />
                        </div>
                        <span className={`text-xs font-medium ${active ? 'text-primary' : done ? 'text-gray-600' : 'text-gray-300'}`}>
                          {stepCfg.label}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 mb-5 ${i < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          )}

          {/* Cancellation info */}
          {isCancelled && (order.cancelReason || order.otherCancelReason) && (
            <div className='bg-red-50 border border-red-200 rounded-xl p-4'>
              <p className='text-sm font-medium text-red-700 mb-1'>Cancellation Reason</p>
              <p className='text-sm text-red-600'>
                {order.cancelReason?.name ?? order.otherCancelReason}
              </p>
            </div>
          )}

          {/* Order items */}
          <div className='bg-white border rounded-xl overflow-hidden'>
            <div className='px-5 py-3 border-b bg-gray-50'>
              <h3 className='text-sm font-semibold text-gray-700'>
                Items ({order.items?.length ?? 0})
              </h3>
            </div>
            <div className='divide-y'>
              {order.items?.map((item) => (
                <div key={item.id} className='flex items-center gap-4 px-5 py-4'>
                  <div className='w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 shrink-0'>
                    <FiPackage size={20} />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-700'>Variant #{item.variantId}</p>
                    <p className='text-xs text-gray-400 mt-0.5'>Qty: {item.quantity}</p>
                  </div>
                  <p className='text-sm font-semibold text-primary shrink-0'>
                    {formatVND(item.totalPrice)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary + payment */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Order summary */}
            <div className='bg-white border rounded-xl p-5 space-y-3'>
              <h3 className='text-sm font-semibold text-gray-700'>Order Summary</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between text-gray-500'>
                  <span>Subtotal</span>
                  <span>{formatVND(order.totalAmount - order.shippingCost)}</span>
                </div>
                <div className='flex justify-between text-gray-500'>
                  <span>Shipping</span>
                  <span>{formatVND(order.shippingCost)}</span>
                </div>
                {order.tax > 0 && (
                  <div className='flex justify-between text-gray-500'>
                    <span>Tax ({(order.tax * 100).toFixed(0)}%)</span>
                    <span>{formatVND(order.totalAmount * order.tax)}</span>
                  </div>
                )}
                <div className='flex justify-between font-semibold border-t pt-2'>
                  <span>Total</span>
                  <span className='text-primary'>{formatVND(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Payment info */}
            <div className='bg-white border rounded-xl p-5 space-y-3'>
              <h3 className='text-sm font-semibold text-gray-700'>Payment</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between text-gray-500'>
                  <span>Method</span>
                  <span className='font-medium text-gray-700'>{order.transaction?.paymentMethod ?? '—'}</span>
                </div>
                <div className='flex justify-between text-gray-500'>
                  <span>Status</span>
                  <span className={`font-medium ${order.paymentStatus ? 'text-green-600' : 'text-orange-500'}`}>
                    {order.paymentStatus ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                {order.transaction?.paidAt && (
                  <div className='flex justify-between text-gray-500'>
                    <span>Paid at</span>
                    <span>{formatDate(order.transaction.paidAt)}</span>
                  </div>
                )}
                <div className='flex justify-between text-gray-500'>
                  <span>Delivery</span>
                  <span className='font-medium text-gray-700'>{order.deliveryMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {order.note && (
            <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-4'>
              <p className='text-xs font-medium text-yellow-700 mb-1'>Note</p>
              <p className='text-sm text-yellow-800'>{order.note}</p>
            </div>
          )}
        </div>
      </UserPanelLayout>
    </div>
  )
}

export default OrderDetailPage
