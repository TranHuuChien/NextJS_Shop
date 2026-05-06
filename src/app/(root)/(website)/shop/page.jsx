'use client'
import React, { useState } from 'react'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import useWindowSize from '@/hooks/useWindowSize'
import { WEBSITE_SHOP, WEBSITE_PRODUCT_DETAILS } from '@/routes/WebsiteRoute'
import { useProductList, useCategoryList, useBrandList } from '@/hooks/useProducts'
import Link from 'next/link'
import Image from 'next/image'
import { FiFilter } from 'react-icons/fi'
import { IoStarSharp } from 'react-icons/io5'

const breadcrumb = {
  title: 'Shop',
  links: [{ label: 'Shop', href: WEBSITE_SHOP }],
}

const ProductCard = ({ product }) => {
  const defaultImage = product.images?.find((i) => i.isDefault)?.image ?? product.images?.[0]?.image
  const minVariant = product.variants?.reduce(
    (min, v) => (v.itemPrice < min.itemPrice ? v : min),
    product.variants?.[0]
  )

  return (
    <Link href={WEBSITE_PRODUCT_DETAILS(product.slug)} className='group block'>
      <div className='border rounded-lg overflow-hidden hover:shadow-md transition-shadow'>
        <div className='relative aspect-square bg-gray-50 overflow-hidden'>
          {defaultImage ? (
            <img
              src={defaultImage}
              alt={product.name}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-300 text-sm'>No image</div>
          )}
        </div>
        <div className='p-3'>
          <p className='text-xs text-gray-400 mb-1'>{product.productCategory?.name}</p>
          <h3 className='font-medium text-sm line-clamp-2 mb-2'>{product.name}</h3>
          <div className='flex items-center gap-1 mb-2'>
            <IoStarSharp className='text-yellow-400' size={13} />
            <span className='text-xs text-gray-500'>{product.rating?.toFixed(1) ?? '0.0'}</span>
            <span className='text-xs text-gray-400'>({product.sold} sold)</span>
          </div>
          {minVariant && (
            <p className='text-primary font-semibold text-sm'>
              {minVariant.itemPrice?.toLocaleString('vi-VN')}₫
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

const ShopPage = () => {
  const size = useWindowSize()
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(12)
  const [search, setSearch] = useState('')
  const [categorySlug, setCategorySlug] = useState('')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [sortCol, setSortCol] = useState('id')
  const [sortAsc, setSortAsc] = useState(true)

  const { data: productData, isLoading } = useProductList({
    page,
    size: pageSize,
    isSortAscending: sortAsc,
    columnName: sortCol,
    search: search || undefined,
    categorySlug: categorySlug || undefined,
    status: true,
  })

  const { data: categoryData } = useCategoryList({ all: true, status: true })
  const { data: brandData } = useBrandList({ all: true, status: true })

  const products = productData?.items ?? []
  const meta = productData?.meta
  const categories = categoryData?.items ?? []
  const brands = brandData?.items ?? []

  const FilterPanel = () => (
    <div className='space-y-6'>
      {/* Search */}
      <div>
        <h4 className='font-semibold mb-2 text-sm'>Search</h4>
        <input
          type='text'
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder='Search products...'
          className='w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
        />
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h4 className='font-semibold mb-2 text-sm'>Categories</h4>
          <ul className='space-y-1'>
            <li>
              <button
                onClick={() => { setCategorySlug(''); setPage(1) }}
                className={`text-sm w-full text-left py-1 px-2 rounded hover:bg-gray-100 ${!categorySlug ? 'text-primary font-medium' : 'text-gray-600'}`}
              >
                All
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => { setCategorySlug(cat.slug); setPage(1) }}
                  className={`text-sm w-full text-left py-1 px-2 rounded hover:bg-gray-100 ${categorySlug === cat.slug ? 'text-primary font-medium' : 'text-gray-600'}`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <h4 className='font-semibold mb-2 text-sm'>Brands</h4>
          <ul className='space-y-1'>
            {brands.map((brand) => (
              <li key={brand.id} className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.id)}
                  onChange={(e) => {
                    setSelectedBrands((prev) =>
                      e.target.checked ? [...prev, brand.id] : prev.filter((b) => b !== brand.id)
                    )
                    setPage(1)
                  }}
                  className='accent-primary'
                />
                <label htmlFor={`brand-${brand.id}`} className='text-sm text-gray-600 cursor-pointer'>
                  {brand.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <section className='lg:flex lg:px-32 px-4 my-10 gap-6'>
        {/* Sidebar filter — desktop */}
        {size.width > 1024 ? (
          <div className='w-64 shrink-0'>
            <div className='sticky top-4 p-4 rounded-lg bg-gray-50 border'>
              <FilterPanel />
            </div>
          </div>
        ) : (
          <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
            <SheetTrigger asChild>
              <button
                className='flex items-center gap-2 mb-4 border px-3 py-2 rounded text-sm'
                onClick={() => setMobileFilterOpen(true)}
              >
                <FiFilter /> Filter
              </button>
            </SheetTrigger>
            <SheetContent side='left' className='bg-white'>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                <SheetDescription />
              </SheetHeader>
              <div className='mt-5'>
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* Product grid */}
        <div className='flex-1'>
          {/* Toolbar */}
          <div className='flex justify-between items-center mb-4 flex-wrap gap-2'>
            <p className='text-sm text-gray-500'>
              {meta ? `${meta.totalElements} products` : ''}
            </p>
            <div className='flex items-center gap-2'>
              <label className='text-sm text-gray-500'>Sort:</label>
              <select
                className='border rounded px-2 py-1 text-sm'
                value={`${sortCol}-${sortAsc}`}
                onChange={(e) => {
                  const [col, asc] = e.target.value.split('-')
                  setSortCol(col)
                  setSortAsc(asc === 'true')
                  setPage(1)
                }}
              >
                <option value='id-true'>Default</option>
                <option value='cost-true'>Price: Low to High</option>
                <option value='cost-false'>Price: High to Low</option>
                <option value='sold-false'>Best Selling</option>
                <option value='rating-false'>Top Rated</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {Array.from({ length: pageSize }).map((_, i) => (
                <div key={i} className='border rounded-lg overflow-hidden animate-pulse'>
                  <div className='aspect-square bg-gray-200' />
                  <div className='p-3 space-y-2'>
                    <div className='h-3 bg-gray-200 rounded w-1/2' />
                    <div className='h-4 bg-gray-200 rounded' />
                    <div className='h-3 bg-gray-200 rounded w-1/3' />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-20 text-gray-400'>
              <p className='text-lg'>No products found</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className='flex justify-center items-center gap-2 mt-8'>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className='px-3 py-1 border rounded text-sm disabled:opacity-40 hover:bg-gray-50'
              >
                Prev
              </button>
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 border rounded text-sm ${p === page ? 'bg-primary text-white border-primary' : 'hover:bg-gray-50'}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className='px-3 py-1 border rounded text-sm disabled:opacity-40 hover:bg-gray-50'
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ShopPage
