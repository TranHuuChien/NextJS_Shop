'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import useWindowSize from '@/hooks/useWindowSize'
import { WEBSITE_SHOP, WEBSITE_PRODUCT_DETAILS, WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import { useProductList, useCategoryList, useBrandList } from '@/hooks/useProducts'
import { useAddToCart } from '@/hooks/useCart'
import useAuth from '@/hooks/useAuth'
import { showToast } from '@/lib/showToast'
import Link from 'next/link'
import { FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { IoStarSharp } from 'react-icons/io5'
import { BsCart2 } from 'react-icons/bs'

const breadcrumb = {
  title: 'Shop',
  links: [{ label: 'Shop', href: WEBSITE_SHOP }],
}

const ProductCardSkeleton = () => (
  <div className='rounded-xl border border-gray-100 overflow-hidden animate-pulse bg-white'>
    <div className='aspect-square bg-gray-100' />
    <div className='p-4 space-y-2'>
      <div className='h-3 bg-gray-100 rounded w-1/3' />
      <div className='h-4 bg-gray-100 rounded' />
      <div className='h-4 bg-gray-100 rounded w-2/3' />
      <div className='h-4 bg-gray-100 rounded w-1/4' />
    </div>
  </div>
)

const ProductCard = ({ product }) => {
  const { user } = useAuth()
  const router = useRouter()
  const addToCart = useAddToCart()

  const defaultImage = product.images?.find((i) => i.isDefault)?.image ?? product.images?.[0]?.image
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
    <Link href={WEBSITE_PRODUCT_DETAILS(product.slug)} className='group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-primary/20 transition-all duration-200'>
      <div className='relative aspect-square bg-gray-50 overflow-hidden'>
        {defaultImage ? (
          <img
            src={defaultImage}
            alt={product.name}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-200 text-sm'>No image</div>
        )}

        {/* Quick add overlay */}
        <div className='absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200'>
          <button
            type='button'
            disabled={addToCart.isPending}
            className='flex items-center justify-center gap-2 w-full py-2 bg-primary text-white text-xs font-medium rounded-lg shadow-md hover:bg-primary/90 transition-colors disabled:opacity-60'
            onClick={handleQuickAdd}
          >
            <BsCart2 size={13} />
            {addToCart.isPending ? 'Adding...' : 'Quick Add'}
          </button>
        </div>
      </div>

      <div className='p-3.5'>
        <p className='text-[11px] text-primary/70 font-medium mb-0.5 uppercase tracking-wide'>{product.productCategory?.name}</p>
        <h3 className='font-medium text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-primary transition-colors'>{product.name}</h3>

        <div className='flex items-center gap-1 mb-2'>
          <IoStarSharp className='text-amber-400' size={12} />
          <span className='text-xs text-gray-500 font-medium'>{product.rating?.toFixed(1) ?? '0.0'}</span>
          <span className='text-xs text-gray-300 mx-0.5'>·</span>
          <span className='text-xs text-gray-400'>{product.sold} sold</span>
        </div>

        {minVariant && (
          <p className='text-primary font-bold text-sm'>
            {minVariant.itemPrice?.toLocaleString('vi-VN')}₫
          </p>
        )}
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
        <h4 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5'>Search</h4>
        <div className='relative'>
          <input
            type='text'
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder='Search products...'
            className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all'
          />
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h4 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5'>Categories</h4>
          <ul className='space-y-0.5'>
            <li>
              <button
                onClick={() => { setCategorySlug(''); setPage(1) }}
                className={`text-sm w-full text-left py-2 px-3 rounded-lg transition-colors ${
                  !categorySlug
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => { setCategorySlug(cat.slug); setPage(1) }}
                  className={`text-sm w-full text-left py-2 px-3 rounded-lg transition-colors ${
                    categorySlug === cat.slug
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
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
          <h4 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5'>Brands</h4>
          <ul className='space-y-2'>
            {brands.map((brand) => (
              <li key={brand.id}>
                <label className='flex items-center gap-2.5 cursor-pointer group'>
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
                    className='w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer'
                  />
                  <span className='text-sm text-gray-600 group-hover:text-gray-900 transition-colors'>
                    {brand.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  const totalPages = meta?.totalPages ?? 0

  return (
    <div className='min-h-screen bg-gray-50/30'>
      <WebsiteBreadcrumb props={breadcrumb} />

      <section className='lg:px-32 px-4 py-8'>
        <div className='flex gap-6'>
          {/* Sidebar filter — desktop */}
          {size.width > 1024 ? (
            <div className='w-60 shrink-0'>
              <div className='sticky top-20 p-5 rounded-xl bg-white border border-gray-100 shadow-sm'>
                <h3 className='font-semibold text-gray-900 mb-5'>Filters</h3>
                <FilterPanel />
              </div>
            </div>
          ) : (
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <button
                  className='flex items-center gap-2 mb-4 border border-gray-200 bg-white px-4 py-2.5 rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors shadow-sm'
                >
                  <FiFilter size={15} /> Filters
                </button>
              </SheetTrigger>
              <SheetContent side='left' className='bg-white w-72'>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription />
                </SheetHeader>
                <div className='mt-5 px-1'>
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Product grid */}
          <div className='flex-1 min-w-0'>
            {/* Toolbar */}
            <div className='flex justify-between items-center mb-5 flex-wrap gap-3'>
              <div className='flex items-center gap-2'>
                {!size.width || size.width <= 1024 ? (
                  <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                    <SheetTrigger asChild>
                      <button className='flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors'>
                        <FiFilter size={14} /> Filter
                      </button>
                    </SheetTrigger>
                  </Sheet>
                ) : null}
                <p className='text-sm text-gray-500'>
                  {meta ? (
                    <span><span className='font-semibold text-gray-900'>{meta.totalElements}</span> products</span>
                  ) : ''}
                </p>
              </div>

              <div className='flex items-center gap-2'>
                <label className='text-sm text-gray-500'>Sort by:</label>
                <select
                  className='border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary cursor-pointer'
                  value={`${sortCol}-${sortAsc}`}
                  onChange={(e) => {
                    const [col, asc] = e.target.value.split('-')
                    setSortCol(col)
                    setSortAsc(asc === 'true')
                    setPage(1)
                  }}
                >
                  <option value='id-true'>Default</option>
                  <option value='cost-true'>Price: Low → High</option>
                  <option value='cost-false'>Price: High → Low</option>
                  <option value='sold-false'>Best Selling</option>
                  <option value='rating-false'>Top Rated</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {Array.from({ length: pageSize }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-24 text-center'>
                <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
                  <BsCart2 size={28} className='text-gray-300' />
                </div>
                <p className='text-lg font-medium text-gray-700'>No products found</p>
                <p className='text-sm text-gray-400 mt-1'>Try adjusting your filters</p>
                <button
                  onClick={() => { setSearch(''); setCategorySlug(''); setSelectedBrands([]) }}
                  className='mt-4 px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors'
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='flex justify-center items-center gap-1.5 mt-10'>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className='w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg bg-white text-gray-500 disabled:opacity-40 hover:border-primary hover:text-primary transition-colors'
                >
                  <FiChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && p - arr[i - 1] > 1) acc.push('...')
                    acc.push(p)
                    return acc
                  }, [])
                  .map((p, i) =>
                    p === '...' ? (
                      <span key={`ellipsis-${i}`} className='w-9 h-9 flex items-center justify-center text-gray-400 text-sm'>…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 flex items-center justify-center border rounded-lg text-sm font-medium transition-all ${
                          p === page
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className='w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg bg-white text-gray-500 disabled:opacity-40 hover:border-primary hover:text-primary transition-colors'
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShopPage
