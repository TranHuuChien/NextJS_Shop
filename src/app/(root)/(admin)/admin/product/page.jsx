'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {
  FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2,
  FiChevronLeft, FiChevronRight, FiRefreshCw, FiEye,
  FiPackage, FiAlertTriangle,
} from 'react-icons/fi'
import { IoStarSharp } from 'react-icons/io5'
import { useProductList, useDeleteProduct, useDeleteProducts, useCategoryList } from '@/hooks/useProducts'
import { ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_EDIT } from '@/routes/AdminPanelRoute'

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  ACTIVE:   { label: 'Active',   badge: 'bg-green-100 text-green-700 border-green-200' },
  INACTIVE: { label: 'Inactive', badge: 'bg-gray-100 text-gray-500 border-gray-200' },
}
const PAGE_SIZES = [10, 20, 50]
const formatVND = (n) => Number(n)?.toLocaleString('vi-VN') + '₫'
const formatDate = (s) => s ? new Date(s).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className='animate-pulse'>
    {Array.from({ length: 9 }).map((_, i) => (
      <td key={i} className='px-4 py-4'>
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
      </td>
    ))}
  </tr>
)

// ─── Confirm delete modal ─────────────────────────────────────────────────────
const ConfirmModal = ({ count, onConfirm, onClose, loading }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
    <div className='bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-xl'>
      <div className='flex items-center gap-3 mb-3'>
        <div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center'>
          <FiAlertTriangle size={18} className='text-red-500' />
        </div>
        <h3 className='font-semibold text-gray-800 dark:text-white'>Delete {count} product{count > 1 ? 's' : ''}?</h3>
      </div>
      <p className='text-sm text-gray-500 mb-5'>This action cannot be undone.</p>
      <div className='flex gap-3'>
        <button type='button' onClick={onClose} disabled={loading}
          className='flex-1 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-40'>
          Cancel
        </button>
        <button type='button' onClick={onConfirm} disabled={loading}
          className='flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors disabled:opacity-40'>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  </div>
)

// ─── Main page ────────────────────────────────────────────────────────────────
const AdminProductPage = () => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [categorySlug, setCategorySlug] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sortAsc, setSortAsc] = useState(false)
  const [selected, setSelected] = useState([])
  const [deleteTarget, setDeleteTarget] = useState(null) // { ids: number[], count: number }

  // Debounce search
  React.useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1) }, 400)
    return () => clearTimeout(t)
  }, [search])

  const { data, isLoading, isError, refetch } = useProductList({
    page,
    size: pageSize,
    search: debouncedSearch || undefined,
    isSortAscending: sortAsc,
    columnName: 'createdAt',
    categorySlug: categorySlug || undefined,
    status: statusFilter === 'ACTIVE' ? true : statusFilter === 'INACTIVE' ? false : undefined,
  })

  const { data: categoryData } = useCategoryList({ all: true, status: true })
  const deleteMutation = useDeleteProduct()
  const deletesMutation = useDeleteProducts()

  const products = data?.items ?? []
  const meta = data?.meta ?? { totalElements: 0, totalPages: 1 }
  const categories = categoryData?.items ?? []

  const toggleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  const toggleAll = () =>
    setSelected(selected.length === products.length ? [] : products.map((p) => p.id))

  const handleDeleteOne = (id) => setDeleteTarget({ ids: [id], count: 1 })
  const handleDeleteSelected = () => setDeleteTarget({ ids: selected, count: selected.length })

  const confirmDelete = () => {
    if (!deleteTarget) return
    const mutation = deleteTarget.ids.length === 1 ? deleteMutation : deletesMutation
    const arg = deleteTarget.ids.length === 1 ? deleteTarget.ids[0] : deleteTarget.ids
    mutation.mutate(arg, {
      onSuccess: () => { setDeleteTarget(null); setSelected([]) },
    })
  }

  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2'>
            <FiPackage size={24} className='text-primary' />
            Products
          </h1>
          <p className='text-sm text-gray-500 mt-0.5'>
            {isLoading ? '...' : `${meta.totalElements} products`}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <button type='button' onClick={() => refetch()}
            className='flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors'>
            <FiRefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <Link href={ADMIN_PRODUCT_ADD}
            className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors'>
            <FiPlus size={16} />
            Add Product
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className='flex flex-wrap items-center gap-3'>
        {/* Search */}
        <div className='flex items-center gap-2 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2.5 flex-1 min-w-[220px] max-w-sm shadow-sm'>
          <FiSearch size={15} className='text-gray-400 shrink-0' />
          <input type='text' value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder='Search products...'
            className='bg-transparent text-sm outline-none w-full text-gray-600 dark:text-gray-300 placeholder-gray-400' />
        </div>

        {/* Category filter */}
        <div className='flex items-center gap-2 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2.5 shadow-sm'>
          <FiFilter size={14} className='text-gray-400' />
          <select value={categorySlug} onChange={(e) => { setCategorySlug(e.target.value); setPage(1) }}
            className='bg-transparent text-sm outline-none text-gray-600 dark:text-gray-300 cursor-pointer max-w-[140px]'>
            <option value=''>All Categories</option>
            {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
        </div>

        {/* Status filter */}
        <div className='flex items-center gap-2 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2.5 shadow-sm'>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className='bg-transparent text-sm outline-none text-gray-600 dark:text-gray-300 cursor-pointer'>
            <option value=''>All Status</option>
            <option value='ACTIVE'>Active</option>
            <option value='INACTIVE'>Inactive</option>
          </select>
        </div>

        {/* Sort */}
        <button type='button' onClick={() => setSortAsc((v) => !v)}
          className='flex items-center gap-2 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2.5 text-sm text-gray-600 shadow-sm hover:bg-gray-50 transition-colors'>
          {sortAsc ? '↑ Oldest' : '↓ Newest'}
        </button>

        {/* Bulk delete */}
        {selected.length > 0 && (
          <button type='button' onClick={handleDeleteSelected}
            className='flex items-center gap-2 px-3 py-2.5 border border-red-200 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors ml-auto'>
            <FiTrash2 size={14} />
            Delete ({selected.length})
          </button>
        )}
      </div>

      {/* Error */}
      {isError && (
        <div className='bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600'>
          Failed to load products. <button onClick={() => refetch()} className='underline'>Retry</button>
        </div>
      )}

      {/* Table */}
      <div className='bg-white dark:bg-gray-900 rounded-2xl border shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 uppercase tracking-wide border-b'>
                <th className='px-4 py-3.5 w-10'>
                  <input type='checkbox'
                    checked={products.length > 0 && selected.length === products.length}
                    onChange={toggleAll}
                    className='accent-primary w-4 h-4 cursor-pointer' />
                </th>
                <th className='text-left px-4 py-3.5 font-semibold'>Product</th>
                <th className='text-left px-4 py-3.5 font-semibold'>Category</th>
                <th className='text-left px-4 py-3.5 font-semibold'>Brand</th>
                <th className='text-right px-4 py-3.5 font-semibold'>Price</th>
                <th className='text-center px-4 py-3.5 font-semibold'>Stock</th>
                <th className='text-center px-4 py-3.5 font-semibold'>Rating</th>
                <th className='text-center px-4 py-3.5 font-semibold'>Status</th>
                <th className='text-center px-4 py-3.5 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y dark:divide-gray-800'>
              {isLoading ? (
                Array.from({ length: pageSize }).map((_, i) => <SkeletonRow key={i} />)
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={9} className='text-center py-16 text-gray-400'>
                    <FiPackage size={40} className='mx-auto mb-2 opacity-30' />
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const cfg = STATUS_CONFIG[product.status] ?? STATUS_CONFIG.INACTIVE
                  const isSelected = selected.includes(product.id)
                  const defaultImage = product.images?.find((i) => i.isDefault)?.image ?? product.images?.[0]?.image
                  const minPrice = product.variants?.length
                    ? Math.min(...product.variants.map((v) => v.itemPrice))
                    : product.cost
                  const totalStock = product.variants?.reduce((s, v) => s + (v.quantity ?? 0), 0) ?? product.actualInventory

                  return (
                    <tr key={product.id}
                      className={`transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/40
                        ${isSelected ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                      {/* Checkbox */}
                      <td className='px-4 py-4'>
                        <input type='checkbox' checked={isSelected} onChange={() => toggleSelect(product.id)}
                          className='accent-primary w-4 h-4 cursor-pointer' />
                      </td>

                      {/* Product */}
                      <td className='px-4 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 border'>
                            {defaultImage
                              ? <img src={defaultImage} alt={product.name} className='w-full h-full object-cover' />
                              : <div className='w-full h-full flex items-center justify-center text-gray-300'><FiPackage size={18} /></div>
                            }
                          </div>
                          <div className='min-w-0'>
                            <p className='font-medium text-gray-800 dark:text-white line-clamp-1'>{product.name}</p>
                            <p className='text-xs text-gray-400 font-mono mt-0.5'>{product.code}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className='px-4 py-4 text-gray-600 dark:text-gray-400 text-xs'>
                        {product.productCategory?.name ?? '—'}
                      </td>

                      {/* Brand */}
                      <td className='px-4 py-4 text-gray-600 dark:text-gray-400 text-xs'>
                        {product.brand?.name ?? '—'}
                      </td>

                      {/* Price */}
                      <td className='px-4 py-4 text-right font-semibold text-gray-800 dark:text-white whitespace-nowrap'>
                        {formatVND(minPrice)}
                      </td>

                      {/* Stock */}
                      <td className='px-4 py-4 text-center'>
                        <span className={`text-sm font-medium ${totalStock === 0 ? 'text-red-500' : totalStock <= 5 ? 'text-amber-500' : 'text-gray-700 dark:text-gray-300'}`}>
                          {totalStock}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className='px-4 py-4 text-center'>
                        <div className='flex items-center justify-center gap-1'>
                          <IoStarSharp size={13} className='text-yellow-400' />
                          <span className='text-xs text-gray-600 dark:text-gray-400'>
                            {product.rating?.toFixed(1) ?? '—'}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className='px-4 py-4 text-center'>
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.badge}`}>
                          {cfg.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className='px-4 py-4'>
                        <div className='flex items-center justify-center gap-1'>
                          <Link href={`/product/${product.slug}`} target='_blank'
                            className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors'
                            title='View'>
                            <FiEye size={15} />
                          </Link>
                          <Link href={ADMIN_PRODUCT_EDIT(product.id)}
                            className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-amber-500 transition-colors'
                            title='Edit'>
                            <FiEdit2 size={15} />
                          </Link>
                          <button type='button' onClick={() => handleDeleteOne(product.id)}
                            className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 transition-colors'
                            title='Delete'>
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-between px-5 py-4 border-t bg-gray-50/50 dark:bg-gray-800/30 flex-wrap gap-3'>
          <p className='text-sm text-gray-500'>
            Page {page} of {meta.totalPages} · {meta.totalElements} products
          </p>

          <div className='flex items-center gap-1.5'>
            <button type='button' onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className='w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-white disabled:opacity-30 transition-colors'>
              <FiChevronLeft size={15} />
            </button>
            {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(meta.totalPages - 4, page - 2)) + i
              return (
                <button key={p} type='button' onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium border transition-colors
                    ${p === page ? 'bg-primary text-white border-primary' : 'hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                  {p}
                </button>
              )
            })}
            <button type='button' onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))} disabled={page === meta.totalPages}
              className='w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-white disabled:opacity-30 transition-colors'>
              <FiChevronRight size={15} />
            </button>
          </div>

          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <span>Rows:</span>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}
              className='border rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 outline-none cursor-pointer'>
              {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <ConfirmModal
          count={deleteTarget.count}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          loading={deleteMutation.isPending || deletesMutation.isPending}
        />
      )}
    </div>
  )
}

export default AdminProductPage
