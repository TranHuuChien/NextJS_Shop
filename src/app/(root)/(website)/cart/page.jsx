'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { WEBSITE_CART, WEBSITE_CHECKOUT, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { HiMinus, HiPlus } from 'react-icons/hi2'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Button } from '@/components/ui/button'
import imgPlaceholder from '@public/assets/images/img-placeholder.webp'
import { useCart, useUpdateCartItem, useDeleteCartItem, useDeleteCartItems } from '@/hooks/useCart'
import useAuth from '@/hooks/useAuth'

const breadcrumb = {
  title: 'Cart',
  links: [{ label: 'Cart', href: WEBSITE_CART }],
}

const formatVND = (n) => n?.toLocaleString('vi-VN') + '₫'

const SkeletonRow = () => (
  <div className='grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl border border-gray-100 animate-pulse'>
    <div className='col-span-1 h-4 w-4 bg-gray-200 rounded' />
    <div className='col-span-5 flex items-center gap-3'>
      <div className='w-16 h-16 bg-gray-200 rounded-lg shrink-0' />
      <div className='flex-1 space-y-2'>
        <div className='h-3 bg-gray-200 rounded w-3/4' />
        <div className='h-3 bg-gray-200 rounded w-1/2' />
      </div>
    </div>
    <div className='col-span-2 h-4 bg-gray-200 rounded mx-auto w-16' />
    <div className='col-span-2 h-8 bg-gray-200 rounded mx-auto w-24' />
    <div className='col-span-2 h-4 bg-gray-200 rounded mx-auto w-16' />
  </div>
)

const CartPage = () => {
  const { user } = useAuth()
  const { data: items = [], isLoading } = useCart(!!user)
  const updateMutation = useUpdateCartItem()
  const deleteMutation = useDeleteCartItem()
  const deleteListMutation = useDeleteCartItems()

  const [selected, setSelected] = useState([])

  // Sync selected when items load
  React.useEffect(() => {
    setSelected(items.map((i) => i.id))
  }, [items.length])

  const toggleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const toggleAll = () =>
    setSelected(selected.length === items.length ? [] : items.map((i) => i.id))

  const handleQty = (id, currentQty, delta, stock) => {
    const next = Math.max(1, Math.min(stock, currentQty + delta))
    if (next !== currentQty) updateMutation.mutate({ id, quantity: next })
  }

  const handleDelete = (id) => {
    deleteMutation.mutate(id)
    setSelected((prev) => prev.filter((x) => x !== id))
  }

  const handleDeleteSelected = () => {
    deleteListMutation.mutate(selected)
    setSelected([])
  }

  const selectedItems = items.filter((i) => selected.includes(i.id))
  const subtotal = selectedItems.reduce((sum, i) => {
    const price = i.promotionalItemPrice < i.itemPrice ? i.promotionalItemPrice : i.itemPrice
    return sum + price * i.quantity
  }, 0)
  const shipping = subtotal > 500000 ? 0 : 30000
  const total = subtotal + shipping

  // Not logged in
  if (!user) {
    return (
      <div>
        <WebsiteBreadcrumb props={breadcrumb} />
        <div className='flex flex-col items-center justify-center py-32 gap-4'>
          <p className='text-gray-400 text-lg'>Please login to view your cart</p>
          <Button asChild className='bg-primary text-white px-8'>
            <Link href='/auth/login'>Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Empty cart
  if (!isLoading && items.length === 0) {
    return (
      <div>
        <WebsiteBreadcrumb props={breadcrumb} />
        <div className='flex flex-col items-center justify-center py-32 gap-4'>
          <img src='/cart.png' alt='empty cart' className='w-28 opacity-20' />
          <h2 className='text-2xl font-semibold text-gray-400'>Your cart is empty</h2>
          <Button asChild className='bg-primary text-white px-8'>
            <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />

      <div className='lg:px-32 px-4 my-10'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold'>
            Shopping Cart
            {!isLoading && (
              <span className='text-gray-400 text-base font-normal ml-2'>({items.length} items)</span>
            )}
          </h1>
          {selected.length > 0 && (
            <button
              type='button'
              onClick={handleDeleteSelected}
              disabled={deleteListMutation.isPending}
              className='text-sm text-red-500 hover:underline disabled:opacity-40'
            >
              Remove selected ({selected.length})
            </button>
          )}
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left — items */}
          <div className='flex-1'>
            {/* Table header */}
            <div className='hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-lg text-xs font-medium text-gray-500 uppercase tracking-wide mb-3'>
              <div className='col-span-1 flex items-center'>
                <input
                  type='checkbox'
                  checked={!isLoading && selected.length === items.length && items.length > 0}
                  onChange={toggleAll}
                  className='accent-primary w-4 h-4 cursor-pointer'
                />
              </div>
              <div className='col-span-5'>Product</div>
              <div className='col-span-2 text-center'>Price</div>
              <div className='col-span-2 text-center'>Quantity</div>
              <div className='col-span-2 text-center'>Total</div>
            </div>

            <div className='space-y-3'>
              {isLoading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : (
                items.map((item) => {
                  const price = item.promotionalItemPrice < item.itemPrice
                    ? item.promotionalItemPrice
                    : item.itemPrice
                  const hasPromo = item.promotionalItemPrice < item.itemPrice
                  const isSelected = selected.includes(item.id)

                  return (
                    <div
                      key={item.id}
                      className={`grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl border transition-colors
                        ${isSelected ? 'border-primary/30 bg-primary/5' : 'border-gray-100 bg-white'}`}
                    >
                      {/* Checkbox */}
                      <div className='col-span-1 flex items-center'>
                        <input
                          type='checkbox'
                          checked={isSelected}
                          onChange={() => toggleSelect(item.id)}
                          className='accent-primary w-4 h-4 cursor-pointer'
                        />
                      </div>

                      {/* Product */}
                      <div className='col-span-11 md:col-span-5 flex items-center gap-3'>
                        <Link href={WEBSITE_PRODUCT_DETAILS(item.productSlug)} className='w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0'>
                          <img
                            src={item.productImage || imgPlaceholder.src}
                            alt={item.productName}
                            className='w-full h-full object-cover hover:scale-105 transition-transform'
                          />
                        </Link>
                        <div className='min-w-0'>
                          <Link
                            href={WEBSITE_PRODUCT_DETAILS(item.productSlug)}
                            className='font-medium text-sm line-clamp-2 hover:text-primary transition-colors'
                          >
                            {item.productName}
                          </Link>
                          <p className='text-xs text-gray-400 mt-0.5'>{item.variantName}</p>
                          {item.stock <= 3 && item.stock > 0 && (
                            <span className='text-xs text-orange-500'>Only {item.stock} left</span>
                          )}
                        </div>
                      </div>

                      {/* Price — desktop */}
                      <div className='hidden md:flex col-span-2 flex-col items-center'>
                        <span className='text-sm font-medium'>{formatVND(price)}</span>
                        {hasPromo && (
                          <span className='text-xs text-gray-400 line-through'>{formatVND(item.itemPrice)}</span>
                        )}
                      </div>

                      {/* Quantity — desktop */}
                      <div className='hidden md:flex col-span-2 justify-center'>
                        <div className='flex items-center border rounded-lg overflow-hidden'>
                          <button
                            type='button'
                            onClick={() => handleQty(item.id, item.quantity, -1, item.stock)}
                            disabled={item.quantity <= 1 || updateMutation.isPending}
                            className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors'
                          >
                            <HiMinus size={12} />
                          </button>
                          <span className='w-8 text-center text-sm font-medium'>{item.quantity}</span>
                          <button
                            type='button'
                            onClick={() => handleQty(item.id, item.quantity, 1, item.stock)}
                            disabled={item.quantity >= item.stock || updateMutation.isPending}
                            className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors'
                          >
                            <HiPlus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Total + delete — desktop */}
                      <div className='hidden md:flex col-span-2 justify-center items-center gap-3'>
                        <span className='text-sm font-semibold text-primary'>
                          {formatVND(price * item.quantity)}
                        </span>
                        <button
                          type='button'
                          onClick={() => handleDelete(item.id)}
                          disabled={deleteMutation.isPending}
                          className='text-gray-300 hover:text-red-500 transition-colors disabled:opacity-40'
                        >
                          <RiDeleteBin6Line size={16} />
                        </button>
                      </div>

                      {/* Mobile row */}
                      <div className='md:hidden col-span-11 flex items-center justify-between mt-2'>
                        <div className='flex items-center border rounded-lg overflow-hidden'>
                          <button type='button' onClick={() => handleQty(item.id, item.quantity, -1, item.stock)}
                            disabled={item.quantity <= 1}
                            className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30'>
                            <HiMinus size={12} />
                          </button>
                          <span className='w-8 text-center text-sm'>{item.quantity}</span>
                          <button type='button' onClick={() => handleQty(item.id, item.quantity, 1, item.stock)}
                            disabled={item.quantity >= item.stock}
                            className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30'>
                            <HiPlus size={12} />
                          </button>
                        </div>
                        <span className='text-sm font-semibold text-primary'>{formatVND(price * item.quantity)}</span>
                        <button type='button' onClick={() => handleDelete(item.id)}
                          className='text-gray-300 hover:text-red-500'>
                          <RiDeleteBin6Line size={16} />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className='mt-4'>
              <Link href={WEBSITE_SHOP} className='text-sm text-primary hover:underline'>
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right — summary */}
          <div className='lg:w-80 shrink-0'>
            <div className='sticky top-4 bg-white border rounded-xl p-5 space-y-4'>
              <h3 className='font-semibold text-lg'>Order Summary</h3>

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between text-gray-500'>
                  <span>Subtotal ({selectedItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>{formatVND(subtotal)}</span>
                </div>
                <div className='flex justify-between text-gray-500'>
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-500 font-medium' : ''}>
                    {shipping === 0 ? 'Free' : formatVND(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className='text-xs text-gray-400'>Free shipping on orders over {formatVND(500000)}</p>
                )}
              </div>

              <div className='border-t pt-3 flex justify-between font-semibold'>
                <span>Total</span>
                <span className='text-primary text-lg'>{formatVND(total)}</span>
              </div>

              {/* Coupon */}
              <div className='flex gap-2'>
                <input
                  type='text'
                  placeholder='Coupon code'
                  className='flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
                />
                <button className='px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors'>
                  Apply
                </button>
              </div>

              <Button
                asChild
                disabled={selectedItems.length === 0}
                className='w-full bg-primary text-white h-11 text-sm font-medium disabled:opacity-40'
              >
                <Link href={selectedItems.length > 0 ? WEBSITE_CHECKOUT : '#'}>
                  Checkout ({selectedItems.length})
                </Link>
              </Button>

              <p className='text-xs text-center text-gray-400'>Secure checkout · Free returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
