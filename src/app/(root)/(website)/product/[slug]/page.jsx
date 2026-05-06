'use client'
import React, { useState } from 'react'
import { useProductDetail } from '@/hooks/useProducts'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { IoStarSharp } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import {ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD} from "@/routes/AdminPanelRoute";
import BreadCrumb from "@/components/application/admin/BreadCrumb";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_CATEGORY_SHOW, label: 'Category' },
  { href: ADMIN_CATEGORY_ADD, label: "Edit Category" }
]

const ProductPage = ({ params }) => {
  const slug = params?.slug
  const { data: product, isLoading, isError } = useProductDetail(slug)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  if (isLoading) {
    return (
      <div className='lg:px-32 px-4 my-10 animate-pulse'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='aspect-square bg-gray-200 rounded-lg' />
          <div className='space-y-4'>
            <div className='h-8 bg-gray-200 rounded w-3/4' />
            <div className='h-4 bg-gray-200 rounded w-1/4' />
            <div className='h-6 bg-gray-200 rounded w-1/3' />
            <div className='h-24 bg-gray-200 rounded' />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className='flex justify-center items-center py-20'>
        <h1 className='text-2xl font-semibold text-gray-400'>Product not found</h1>
      </div>
    )
  }

  const activeVariant = selectedVariant ?? product.variants?.[0]
  const displayImage =
    selectedImage ??
    product.images?.find((i) => i.isDefault)?.image ??
    product.images?.[0]?.image

  const price = activeVariant?.itemPrice
  const promoPrice = activeVariant?.promotionalItemPrice
  const hasPromo = promoPrice && promoPrice < price

  return (
    <div className='lg:px-32 px-4 my-10'>
      {/* Breadcrumb */}
      <BreadCrumb breadcrumbData={breadcrumbData}/>

      <div className='mb-6'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={WEBSITE_SHOP}>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main content */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Images */}
        <div>
          <div className='aspect-square rounded-lg overflow-hidden bg-gray-50 border mb-3'>
            {displayImage ? (
              <img src={displayImage} alt={product.name} className='w-full h-full object-cover' />
            ) : (
              <div className='w-full h-full flex items-center justify-center text-gray-300'>No image</div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className='flex gap-2 flex-wrap'>
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.image)}
                  className={`w-16 h-16 rounded border-2 overflow-hidden ${
                    displayImage === img.image ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img.image} alt='' className='w-full h-full object-cover' />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className='space-y-4'>
          <div>
            <p className='text-sm text-gray-400'>{product.productCategory?.name}</p>
            <h1 className='text-2xl font-bold mt-1'>{product.name}</h1>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-2'>
            <div className='flex'>
              {Array.from({ length: 5 }).map((_, i) => (
                <IoStarSharp
                  key={i}
                  size={16}
                  className={i < Math.round(product.rating ?? 0) ? 'text-yellow-400' : 'text-gray-200'}
                />
              ))}
            </div>
            <span className='text-sm text-gray-500'>{product.rating?.toFixed(1)} · {product.sold} sold</span>
          </div>

          {/* Price */}
          <div className='flex items-baseline gap-3'>
            {hasPromo ? (
              <>
                <span className='text-2xl font-bold text-primary'>
                  {promoPrice?.toLocaleString('vi-VN')}₫
                </span>
                <span className='text-gray-400 line-through text-sm'>
                  {price?.toLocaleString('vi-VN')}₫
                </span>
              </>
            ) : (
              <span className='text-2xl font-bold text-primary'>
                {price?.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div>
              <p className='text-sm font-medium mb-2'>Variant</p>
              <div className='flex flex-wrap gap-2'>
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={v.status !== 'ACTIVE' || v.quantity === 0}
                    className={`px-3 py-1.5 border rounded text-sm transition-colors
                      ${activeVariant?.id === v.id ? 'border-primary bg-primary/5 text-primary font-medium' : 'hover:border-gray-400'}
                      ${(v.status !== 'ACTIVE' || v.quantity === 0) ? 'opacity-40 cursor-not-allowed' : ''}
                    `}
                  >
                    {v.name}
                    {v.quantity === 0 && <span className='ml-1 text-xs'>(Out)</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          <p className='text-sm text-gray-500'>
            In stock: <span className='font-medium text-gray-700'>{activeVariant?.quantity ?? product.actualInventory}</span>
          </p>

          {/* Brand */}
          {product.brand && (
            <p className='text-sm text-gray-500'>
              Brand: <span className='font-medium text-gray-700'>{product.brand.name}</span>
            </p>
          )}

          {/* Add to cart and payment order*/}
          <div className='flex gap-3 pt-2'>
            <Button className='flex-1 bg-primary text-white'>Add to Cart</Button>
            <Button variant='outline' className='flex-1'>Buy Now</Button>
          </div>

          {/* Description */}
          {product.description && (
            <div className='pt-4 border-t'>
              <h3 className='font-semibold mb-2'>Description</h3>
              <p className='text-sm text-gray-600 leading-relaxed whitespace-pre-line'>
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductPage