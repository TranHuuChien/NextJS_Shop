'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { BsCart2 } from 'react-icons/bs'
import { HiMinus, HiPlus } from 'react-icons/hi2'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { WEBSITE_CART, WEBSITE_CHECKOUT } from '@/routes/WebsiteRoute'
import imgPlaceholder from '@public/assets/images/img-placeholder.webp'
import { useCart, useUpdateCartItem, useDeleteCartItem } from '@/hooks/useCart'
import useAuth from '@/hooks/useAuth'

const formatVND = (n) => n?.toLocaleString('vi-VN') + '₫'

const CartItemSkeleton = () => (
  <div className='flex gap-3 pb-4 border-b animate-pulse'>
    <div className='w-16 h-16 rounded-lg bg-gray-200 shrink-0' />
    <div className='flex-1 space-y-2 pt-1'>
      <div className='h-3 bg-gray-200 rounded w-3/4' />
      <div className='h-3 bg-gray-200 rounded w-1/2' />
      <div className='h-3 bg-gray-200 rounded w-1/4' />
    </div>
  </div>
)

const Cart = () => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  const { data: items = [], isLoading } = useCart(open && !!user)
  const updateMutation = useUpdateCartItem()
  const deleteMutation = useDeleteCartItem()

  const handleQty = (id, currentQty, delta, stock) => {
    const next = Math.max(1, Math.min(stock, currentQty + delta))
    if (next !== currentQty) {
      updateMutation.mutate({ id, quantity: next })
    }
  }

  const handleDelete = (id) => deleteMutation.mutate(id)

  const subtotal = items.reduce((sum, i) => {
    const price = i.promotionalItemPrice < i.itemPrice ? i.promotionalItemPrice : i.itemPrice
    return sum + price * i.quantity
  }, 0)

  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0)
  const freeShippingThreshold = 500000

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button type='button' className='relative'>
          <BsCart2 size={22} className='text-gray-500 hover:text-primary transition-colors' />
          {totalQty > 0 && (
            <span className='absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center'>
              {totalQty > 9 ? '9+' : totalQty}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className='bg-white flex flex-col p-0 w-[380px]'>
        <SheetHeader className='px-5 pt-5 pb-3 border-b'>
          <SheetTitle className='text-lg font-semibold flex items-center gap-2'>
            <BsCart2 size={20} />
            My Cart
            {!isLoading && totalQty > 0 && (
              <span className='ml-1 text-sm font-normal text-gray-400'>({totalQty} items)</span>
            )}
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        {/* Items */}
        <div className='flex-1 overflow-y-auto px-5 py-3 space-y-4'>
          {!user ? (
            <div className='h-full flex flex-col items-center justify-center gap-3 py-16 text-center'>
              <BsCart2 size={48} className='text-gray-200' />
              <p className='text-gray-400 font-medium'>Login to view your cart</p>
              <Button size='sm' className='bg-primary text-white' onClick={() => setOpen(false)} asChild>
                <Link href='/auth/login'>Login</Link>
              </Button>
            </div>
          ) : isLoading ? (
            <>
              <CartItemSkeleton />
              <CartItemSkeleton />
              <CartItemSkeleton />
            </>
          ) : items.length === 0 ? (
            <div className='h-full flex flex-col items-center justify-center gap-3 py-16 text-center'>
              <BsCart2 size={48} className='text-gray-200' />
              <p className='text-gray-400 font-medium'>Your cart is empty</p>
              <Button variant='outline' size='sm' onClick={() => setOpen(false)} asChild>
                <Link href='/shop'>Browse Products</Link>
              </Button>
            </div>
          ) : (
            items.map((item) => {
              const price = item.promotionalItemPrice < item.itemPrice
                ? item.promotionalItemPrice
                : item.itemPrice
              const hasPromo = item.promotionalItemPrice < item.itemPrice

              return (
                <div key={item.id} className='flex gap-3 pb-4 border-b last:border-0'>
                  {/* Image */}
                  <Link
                    href={item.productSlug ? `/product/${item.productSlug}` : '#'}
                    onClick={() => setOpen(false)}
                    className='w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0'
                  >
                    <img
                      src={item.productImage || imgPlaceholder.src}
                      alt={item.productName}
                      className='w-full h-full object-cover hover:scale-105 transition-transform'
                    />
                  </Link>

                  {/* Info */}
                  <div className='flex-1 min-w-0'>
                    <Link
                      href={item.productSlug ? `/product/${item.productSlug}` : '#'}
                      onClick={() => setOpen(false)}
                      className='text-sm font-medium line-clamp-1 hover:text-primary transition-colors'
                    >
                      {item.productName}
                    </Link>
                    <p className='text-xs text-gray-400 mt-0.5'>{item.variantName}</p>

                    {/* Price */}
                    <div className='flex items-center gap-1.5 mt-1'>
                      <span className='text-sm font-semibold text-primary'>{formatVND(price)}</span>
                      {hasPromo && (
                        <span className='text-xs text-gray-400 line-through'>{formatVND(item.itemPrice)}</span>
                      )}
                    </div>

                    {/* Qty + delete */}
                    <div className='flex items-center justify-between mt-2'>
                      <div className='flex items-center border rounded-lg overflow-hidden'>
                        <button
                          type='button'
                          onClick={() => handleQty(item.id, item.quantity, -1, item.stock)}
                          disabled={item.quantity <= 1 || updateMutation.isPending}
                          className='w-7 h-7 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors'
                        >
                          <HiMinus size={11} />
                        </button>
                        <span className='w-7 text-center text-sm'>{item.quantity}</span>
                        <button
                          type='button'
                          onClick={() => handleQty(item.id, item.quantity, 1, item.stock)}
                          disabled={item.quantity >= item.stock || updateMutation.isPending}
                          className='w-7 h-7 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors'
                        >
                          <HiPlus size={11} />
                        </button>
                      </div>

                      <button
                        type='button'
                        onClick={() => handleDelete(item.id)}
                        disabled={deleteMutation.isPending}
                        className='text-gray-300 hover:text-red-500 transition-colors p-1 disabled:opacity-40'
                      >
                        <RiDeleteBin6Line size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {user && !isLoading && items.length > 0 && (
          <div className='border-t px-5 py-4 space-y-3 bg-gray-50'>
            {/* Free shipping progress */}
            {subtotal < freeShippingThreshold && (
              <div>
                <p className='text-xs text-gray-500 mb-1'>
                  Add <span className='font-medium text-primary'>{formatVND(freeShippingThreshold - subtotal)}</span> more for free shipping
                </p>
                <div className='w-full h-1.5 bg-gray-200 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-primary rounded-full transition-all'
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
            {subtotal >= freeShippingThreshold && (
              <p className='text-xs text-green-600 font-medium'>🎉 You qualify for free shipping!</p>
            )}

            <div className='flex justify-between text-sm'>
              <span className='text-gray-500'>Subtotal</span>
              <span className='font-semibold'>{formatVND(subtotal)}</span>
            </div>

            <div className='flex gap-2'>
              <Button variant='outline' className='flex-1 h-10 text-sm' onClick={() => setOpen(false)} asChild>
                <Link href={WEBSITE_CART}>View Cart</Link>
              </Button>
              <Button className='flex-1 h-10 text-sm bg-primary text-white' onClick={() => setOpen(false)} asChild>
                <Link href={WEBSITE_CHECKOUT}>Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart
