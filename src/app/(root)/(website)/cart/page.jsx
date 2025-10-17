'use client'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { Button } from '@/components/ui/button'
import { WEBSITE_CART, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import imgPLaceholder from '@public/assets/images/img-placeholder.webp'
import { HiMinus, HiPlus } from 'react-icons/hi2'
import ItemCartProduct from "./ItemCartProduct";

const breadcrumb = {
  title: 'Cart',
  links: [
    { label: "Cart", href: WEBSITE_CART },
  ]
}

const cart = {
  products: [
    { _id: 1, name: "Shirt Blue", color: "Red", size: "M", url: "shirt-red-m", quantity: 10, price: 1000 },
    { _id: 2, name: "Quần Jean", color: "Xanh", size: "M", url: "shirt-red-m", quantity: 10, price: 1000 }
  ]
};

const CartPage = () => {
  function handleQuantity() {

  }
  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <ItemCartProduct/>
      {cart.length === 0 ?
        <div className='w-screen h-[500px] flex justify-center items-center py-32'>
          <div className='text-center'>
            <h4 className='text-4xl font-semibold mb-5'>Your cart is empty!</h4>
            <Button type='button' asChild>
              <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
        :
        <div className='flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4'>
          <div className='lg:w-[70%] w-full'>
            <table className='w-full border'>
              <thead className='border-b bg-gray-50 md:table-header-group hidden'>
                <tr>
                  <th className='text-start p-3'>Product</th>
                  <th className='text-center p-3'>Price</th>
                  <th className='text-center p-3'>Quantity</th>
                  <th className='text-center p-3'>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart?.products?.map(product => (
                  <tr key={product._id} className='md:table-row block border-b'>
                    <td className='p-3 px-5'>
                      <div className='flex items-center gap-5'>
                        <Image src={product?.media || imgPLaceholder.src}
                          height={60} width={60}
                          alt={product?.name} />
                        <div>
                          <h4 className='text-lg font-medium line-clamp-1'>
                            <Link href={WEBSITE_PRODUCT_DETAILS(product?.url)}>{product?.name}</Link>
                          </h4>
                          <p className='text-sm'>Color: {product?.color}</p>
                          <p className='text-sm'>Size: {product?.size}</p>
                        </div>
                      </div>
                    </td>

                    <td className='md:table-cell flex justify-between md:p-3 px-5 pb-2 text-center'>
                      <span className='md:hidden font-medium'>Price</span>
                      <span>{product?.price}$</span>
                    </td>
                    <td className='md:table-cell flex justify-between md:p-3 px-5 pb-2'>
                      <span className='md:hidden font-medium'>Quantity</span>
                      <div className='flex justify-center items-center h-10 border w-fit rounded-full'>
                        <button type='button' className='h-full w-10 flex justify-center items-center'
                        onClick={() => handleQuantity('desc')}>
                          <HiMinus/>
                        </button>
                        <input type='text' className='w-14 text-center' value={product?.quantity} readOnly/>
                        <button type='button' className='h-full w-10 flex justify-center items-center'
                        onClick={() => handleQuantity('inc')}>
                          <HiPlus/>
                        </button>
                      </div>
                    </td>
                     <td className='md:table-cell flex justify-between md:p-3 px-5 pb-2 text-center'>
                      <span className='md:hidden font-medium'>Total</span>
                      <span>{product?.price * product?.quantity}$</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='lg:w-[30%] w-full'>
            <div className='rounded bg-gray-50 p-5 sticky top-5'>
                <h4 className='text-lg font-semibold mb-5'>Order Summary</h4>
                <div>
                  <table className='w-full'>
                    <tbody>
                      <tr>
                        <td className='font-semibold py-2'>Subtotal</td>
                        <td className='text-end py-2'></td>
                      </tr>
                      <tr>
                        <td className='font-semibold py-2'>Discount</td>
                        <td className='text-end py-2'></td>
                      </tr>
                      <tr>
                        <td className='font-semibold py-2'>Total</td>
                        <td className='text-end py-2'></td>
                      </tr>
                    </tbody>
                  </table>  
                </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default CartPage