'use client'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowRight } from 'react-icons/fi'
import { useProductList } from '@/hooks/useProducts'
import { WEBSITE_SHOP, WEBSITE_PRODUCT_DETAILS, WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import { useAddToCart } from '@/hooks/useCart'
import useAuth from '@/hooks/useAuth'
import { showToast } from '@/lib/showToast'
import { IoStarSharp } from 'react-icons/io5'
import { BsCart2 } from 'react-icons/bs'

const FeaturedProductCard = ({ product }) => {
  const { user } = useAuth()
  const router = useRouter()
  const addToCart = useAddToCart()

  const image = product.images?.find((i) => i.isDefault)?.image ?? product.images?.[0]?.image
  const minVariant = product.variants?.reduce(
    (min, v) => (v.itemPrice < min.itemPrice ? v : min),
    product.variants?.[0]
  )

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      showToast({ type: 'warn', message: 'Vui lòng đăng nhập để thêm vào giỏ hàng' })
      router.push(WEBSITE_LOGIN)
      return
    }
    if (!minVariant?.id) return
    addToCart.mutate(
      { variantId: minVariant.id, quantity: 1 },
      {
        onSuccess: () => showToast({ type: 'success', message: 'Đã thêm vào giỏ hàng!' }),
        onError: () => showToast({ type: 'error', message: 'Không thể thêm vào giỏ hàng. Vui lòng thử lại.' }),
      }
    )
  }

  return (
    <Link
      href={WEBSITE_PRODUCT_DETAILS(product.slug)}
      className='group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-primary/20 transition-all duration-200'
    >
      <div className='relative aspect-square bg-gray-50 overflow-hidden'>
        {image ? (
          <img
            src={image}
            alt={product.name}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-200 text-xs'>No image</div>
        )}

        <div className='absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200'>
          <button
            type='button'
            disabled={addToCart.isPending}
            className='flex items-center justify-center gap-1.5 w-full py-2 bg-primary text-white text-xs font-medium rounded-lg shadow-md hover:bg-primary/90 transition-colors disabled:opacity-60'
            onClick={handleQuickAdd}
          >
            <BsCart2 size={12} />
            {addToCart.isPending ? 'Adding...' : 'Quick Add'}
          </button>
        </div>
      </div>

      <div className='p-3.5'>
        <h4 className='text-sm font-medium text-gray-800 line-clamp-2 mb-1.5 group-hover:text-primary transition-colors'>{product.name}</h4>
        <div className='flex items-center gap-1 mb-2'>
          <IoStarSharp size={12} className='text-amber-400' />
          <span className='text-xs text-gray-400 font-medium'>{product.rating?.toFixed(1) ?? '0.0'}</span>
        </div>
        {minVariant && (
          <p className='text-sm font-bold text-primary'>
            {minVariant.itemPrice?.toLocaleString('vi-VN')}₫
          </p>
        )}
      </div>
    </Link>
  )
}

const ProductFeature = () => {
  const { data, isLoading } = useProductList({ page: 1, size: 8, status: true, columnName: 'sold', isSortAscending: false })
  const products = data?.items ?? []

  return (
    <section className='lg:px-32 px-4 py-12 bg-gray-50/50'>
      <div className='flex justify-between items-end mb-8'>
        <div>
          <p className='text-xs font-semibold text-primary uppercase tracking-widest mb-2'>Our Products</p>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>Featured Products</h2>
        </div>
        <Link
          href={WEBSITE_SHOP}
          className='hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-150'
        >
          View All <FiArrowRight size={16} />
        </Link>
      </div>

      {isLoading ? (
        <div className='grid md:grid-cols-4 grid-cols-2 sm:gap-5 gap-3'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='rounded-xl border border-gray-100 bg-white overflow-hidden animate-pulse'>
              <div className='aspect-square bg-gray-100' />
              <div className='p-3.5 space-y-2'>
                <div className='h-3 bg-gray-100 rounded w-1/3' />
                <div className='h-4 bg-gray-100 rounded' />
                <div className='h-4 bg-gray-100 rounded w-2/3' />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className='text-center py-16 text-gray-400'>No products found</div>
      ) : (
        <div className='grid md:grid-cols-4 grid-cols-2 sm:gap-5 gap-3'>
          {products.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className='mt-6 flex justify-center sm:hidden'>
        <Link
          href={WEBSITE_SHOP}
          className='inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary hover:text-white transition-colors'
        >
          View All Products <FiArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}

export default ProductFeature
