'use client'
import Link from 'next/link'
import React from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { useProductList } from '@/hooks/useProducts'
import { WEBSITE_SHOP, WEBSITE_PRODUCT_DETAILS } from '@/routes/WebsiteRoute'
import { IoStarSharp } from 'react-icons/io5'

const ProductFeature = () => {
  const { data, isLoading } = useProductList({ page: 1, size: 8, status: true, columnName: 'sold', isSortAscending: false })
  const products = data?.items ?? []

  return (
    <section className='lg:px-32 px-4 sm:py-10'>
      <div className='flex justify-between items-center mb-5'>
        <h2 className='sm:text-4xl text-2xl font-semibold'>Featured Products</h2>
        <Link href={WEBSITE_SHOP} className='flex items-center gap-2 underline underline-offset-4 hover:text-primary'>
          View All <IoIosArrowRoundForward />
        </Link>
      </div>

      {isLoading ? (
        <div className='grid md:grid-cols-4 grid-cols-2 sm:gap-6 gap-3'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='rounded-lg border overflow-hidden animate-pulse'>
              <div className='aspect-square bg-gray-200' />
              <div className='p-3 space-y-2'>
                <div className='h-4 bg-gray-200 rounded' />
                <div className='h-3 bg-gray-200 rounded w-1/2' />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className='text-center py-10 text-gray-400'>No products found</div>
      ) : (
        <div className='grid md:grid-cols-4 grid-cols-2 sm:gap-6 gap-3'>
          {products.map((product) => {
            const image = product.images?.find((i) => i.isDefault)?.image ?? product.images?.[0]?.image
            const variant = product.variants?.[0]
            return (
              <Link key={product.id} href={WEBSITE_PRODUCT_DETAILS(product.slug)} className='group block rounded-lg border hover:shadow-md transition-shadow overflow-hidden'>
                <div className='aspect-square bg-gray-50 overflow-hidden'>
                  {image ? (
                    <img src={image} alt={product.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-200 text-xs'>No image</div>
                  )}
                </div>
                <div className='p-3'>
                  <h4 className='text-sm font-medium line-clamp-2 mb-1'>{product.name}</h4>
                  <div className='flex items-center gap-1 mb-1'>
                    <IoStarSharp size={12} className='text-yellow-400' />
                    <span className='text-xs text-gray-400'>{product.rating?.toFixed(1)}</span>
                  </div>
                  {variant && (
                    <p className='text-sm font-semibold text-primary'>
                      {variant.itemPrice?.toLocaleString('vi-VN')}₫
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ProductFeature
