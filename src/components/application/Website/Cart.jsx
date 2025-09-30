'use client'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import React, { useState } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import imgPlaceHolder from '@public/assets/images/img-placeholder.webp'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { WEBSITE_CART, WEBSITE_CHECKOUT } from '@/routes/WebsiteRoute'
import { showToast } from '@/lib/showToast'

const cart = {
  product: [
    {
      variantId: "v1",
      name: "Áo thun nam",
      description: "Chất liệu cotton, thoáng mát",
      media: "",
      quantity: 12,
      sellingPrice: 1000
    },
    {
      variantId: "v2",
      name: "Quần jeans",
      description: "Quần jean xanh basic",
      media: "",
      quantity: 12,
      sellingPrice: 1000
    },
    {
      variantId: "v3",
      name: "Giày sneaker",
      description: "Giày thể thao phong cách",
      media: "",
      quantity: 12,
      sellingPrice: 1000
    }
  ]
}

const Cart = () => {
  const [open , setOpen] = useState(false)
  //const cart = useSelector(store => store.cartStore)
  const dispatch = useDispatch()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='relative'>
        <BsCart2 size={25} className='text-gray-500 hover:text-primary'/>
      </SheetTrigger>
      <SheetContent  className="bg-white">
        <SheetHeader>
          <SheetTitle className='text-2xl'>My Cart</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className='h-[calc(100vh-40px)] pb-10 pt-2'>
          <div className='h-[calc(100%-120px)] border border-red-500 overflow-auto pe-2'>
              {cart.count === 0 && <div className='h-full flex justify-center items-center text-xl font-semibold'>
                  Your Cart is empty

                </div>}

                {cart?.product?.map(product => (
                  <div key={product.variantId} className='flex justify-center items-center gap-5 mb-4
                  border-b pb-4'>
                      <div className='flex gap-5 items-center'>
                        <Image src={product?.media || imgPlaceHolder.src} 
                            height={100} width={100} 
                            alt={product?.name}
                            className='w-20 h-20 rounded'
                        />
                        <div>
                          <h4 className='text-lg mb-1'>{product?.name}</h4>
                          <p className='text-gray-500'>{product?.description}</p>
                        </div>
                      </div>

                      <div>
                        <button type='button' className='text-red-500 underline underline-offset-1 mb-2'>
                              Remove
                        </button>
                        <p className='font-semibold text-lg'>
                          {product.quantity} X {product.sellingPrice}
                        </p>
                      </div>
                  </div>
                ))}
          </div>

          <div className='  h-32 border-t pt-5 px-2'>
              <h4 className='flex justify-between items-center  font-semibold'><span>Subtotal</span>
              <span>0</span></h4>
              
              <h4 className='flex justify-between items-center  font-semibold'><span>Discount</span>
              <span>0</span></h4>

              <div className='flex justify-between gap-10'>
                <Button type='button' asChild variant='secondary' className='w-1/2' onClick={() => setOpen(false)}>
                  <Link href={WEBSITE_CART}>View Cart</Link>
                </Button>
                <Button type='button' asChild variant='secondary' className='w-1/2' onClick={() => setOpen(false)}>
                  { cart.count ? 
                      <Link href={WEBSITE_CHECKOUT}>Checkout</Link>
                    : <button type='button' className='' onClick={() => showToast('error', 'Your cart is empty')}>Checkout</button>
                  }
                  
                </Button>
              </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Cart