'use client'
import React, { useState } from 'react'
import {
  FiSearch, FiFilter, FiChevronLeft, FiChevronRight,
  FiEye, FiSlash, FiCheck, FiUsers, FiRefreshCw,
} from 'react-icons/fi'
import { useUserList, useDisableUser, useEnableUser } from '@/hooks/useUsers'

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  ACTIVE:      { label: 'Active',      badge: 'bg-green-100 text-green-700 border-green-200' },
  INACTIVE:    { label: 'Inactive',    badge: 'bg-gray-100 text-gray-500 border-gray-200' },
  BLOCK:       { label: 'Blocked',     badge: 'bg-red-100 text-red-600 border-red-200' },
  UNCONFIRMED: { label: 'Unconfirmed', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
}
const PAGE_SIZES = [10, 20, 50]
const formatDate = (s) => s ? new Date(s).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ user }) => {
  const initials = `${user.firstName?.[0] ?? '?'}${user.lastName?.[0] ?? ''}`.toUpperCase()
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500']
  const color = colors[(user.id?.charCodeAt(user.id.length - 1) ?? 0) % colors.length]
  return user.avatar
    ? <img src={user.avatar} alt={initials} className='w-8 h-8 rounded-full object-cover shrink-0' />
    : <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{initials}</div>
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className='animate-pulse'>
    {Array.from({ length: 8 }).map((_, i) => (
      <td key={i} className='px-5 py-4'>
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
      </td>
    ))}
  </tr>
)

// ─── Main page ────────────────────────────────────────────────────────────────
const CustomersPage = () => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState([])
  const [sortAsc, setSortAsc] = useState(true)

  // Debounce search
  React.useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1) }, 400)
    return () => clearTimeout(t)
  }, [search])

  const { data, isLoading, isError, refetch } = useUserList({
    page,
    size: pageSize,
    search: debouncedSearch || undefined,
    isSortAscending: sortAsc,
    columnName: 'createdAt',
  })

  const disableMutation = useDisableUser()
  const enableMutation = useEnableUser()

  // Client-side status filter (API doesn't support status filter param)
  const allItems = data?.items ?? []
  const filtered = statusFilter ? allItems.filter((u) => u.status === statusFilter) : allItems
  const meta = data?.meta ?? { totalElements: 0, totalPages: 1 }

  const toggleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((c) => c.id))

  const handleToggleStatus = (user) => {
    if (user.status === 'ACTIVE') {
      disableMutation.mutate(user.id)
    } else {
      enableMutation.mutate(user.id)
    }
  }

  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2'>
            <FiUsers size={24} className='text-primary' />
            Customers
          </h1>
          <p className='text-sm text-gray-500 mt-0.5'>
            {isLoading ? '...' : `${meta.totalElements} registered customers`}
          </p>
        </div>
        <button
          type='button'
          onClick={() => refetch()}
          className='flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors'
        >
          <FiRefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Toolbar */}
      <div className='flex flex-wrap items-center gap-3'>
        {/* Search */}
        <div className='flex items-center gap-2 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2.5 flex-1 min-w-[220px] max-w-sm shadow-sm'>
          <FiSearch size={15} className='text-gray-400 shrink-0' />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search name, email, code...'
            className='bg-transparent text-sm outline-none w-full text-gray-600 dark:text-gray-300 placeholder-gray-400'
          />
        </div>

        {/* Status filter */}
        <div className='flex items-center gap-2 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2.5 shadow-sm'>
          <FiFilter size={14} className='text-gray-400' />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='bg-transparent text-sm outline-none text-gray-600 dark:text-gray-300 cursor-pointer'
          >
            <option value=''>All Status</option>
            {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
              <option key={val} value={val}>{cfg.label}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <button
          type='button'
          onClick={() => setSortAsc((v) => !v)}
          className='flex items-center gap-2 bg-white dark:bg-gray-900 border rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-50 transition-colors'
        >
          {sortAsc ? '↑ Oldest' : '↓ Newest'}
        </button>

        {/* Bulk actions */}
        {selected.length > 0 && (
          <div className='flex items-center gap-2 ml-auto'>
            <span className='text-sm text-gray-500'>{selected.length} selected</span>
            <button
              type='button'
              onClick={() => selected.forEach((id) => disableMutation.mutate(id))}
              className='flex items-center gap-1.5 px-3 py-2 text-sm border rounded-lg text-red-500 hover:bg-red-50 transition-colors'
            >
              <FiSlash size={14} /> Disable all
            </button>
          </div>
        )}
      </div>

      {/* Error */}
      {isError && (
        <div className='bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600'>
          Failed to load customers. <button onClick={() => refetch()} className='underline'>Retry</button>
        </div>
      )}

      {/* Table */}
      <div className='bg-white dark:bg-gray-900 rounded-2xl border shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 uppercase tracking-wide border-b'>
                <th className='px-5 py-3.5 w-10'>
                  <input
                    type='checkbox'
                    checked={filtered.length > 0 && selected.length === filtered.length}
                    onChange={toggleAll}
                    className='accent-primary w-4 h-4 cursor-pointer'
                  />
                </th>
                <th className='text-left px-5 py-3.5 font-semibold'>Customer</th>
                <th className='text-left px-5 py-3.5 font-semibold'>Code</th>
                <th className='text-left px-5 py-3.5 font-semibold'>Email</th>
                <th className='text-left px-5 py-3.5 font-semibold'>Role</th>
                <th className='text-left px-5 py-3.5 font-semibold'>Status</th>
                <th className='text-left px-5 py-3.5 font-semibold'>Joined</th>
                <th className='text-center px-5 py-3.5 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y dark:divide-gray-800'>
              {isLoading ? (
                Array.from({ length: pageSize }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className='text-center py-16 text-gray-400'>
                    <FiUsers size={40} className='mx-auto mb-2 opacity-30' />
                    No customers found
                  </td>
                </tr>
              ) : (
                filtered.map((user) => {
                  const cfg = STATUS_CONFIG[user.status] ?? STATUS_CONFIG.INACTIVE
                  const isSelected = selected.includes(user.id)
                  const fullName = `${user.firstName} ${user.lastName}`
                  const isAdmin = user.roles?.some((r) => r === 'ADMIN' || r === 'ROLE_ADMIN')
                  const isMutating = disableMutation.isPending || enableMutation.isPending

                  return (
                    <tr
                      key={user.id}
                      className={`transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-800/40
                        ${isSelected ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className='px-5 py-4'>
                        <input
                          type='checkbox'
                          checked={isSelected}
                          onChange={() => toggleSelect(user.id)}
                          className='accent-primary w-4 h-4 cursor-pointer'
                        />
                      </td>

                      {/* Customer */}
                      <td className='px-5 py-4'>
                        <div className='flex items-center gap-3'>
                          <Avatar user={user} />
                          <div>
                            <p className='font-medium text-gray-800 dark:text-white'>{fullName}</p>
                            <p className='text-xs text-gray-400 capitalize'>
                              {user.gender?.toLowerCase() ?? '—'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Code */}
                      <td className='px-5 py-4 text-gray-500 font-mono text-xs'>
                        {user.code ?? '—'}
                      </td>

                      {/* Email */}
                      <td className='px-5 py-4 text-gray-600 dark:text-gray-400 max-w-[180px] truncate'>
                        {user.email}
                      </td>

                      {/* Role */}
                      <td className='px-5 py-4'>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium
                          ${isAdmin
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                          {isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className='px-5 py-4'>
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.badge}`}>
                          {cfg.label}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className='px-5 py-4 text-gray-500 whitespace-nowrap text-xs'>
                        {formatDate(user.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className='px-5 py-4'>
                        <div className='flex items-center justify-center gap-1'>
                          <button
                            type='button'
                            title='View'
                            className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors'
                          >
                            <FiEye size={15} />
                          </button>
                          <button
                            type='button'
                            title={user.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                            disabled={isMutating}
                            onClick={() => handleToggleStatus(user)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors disabled:opacity-40
                              ${user.status === 'ACTIVE'
                                ? 'hover:bg-red-50 text-red-400'
                                : 'hover:bg-green-50 text-green-500'
                              }`}
                          >
                            {user.status === 'ACTIVE' ? <FiSlash size={15} /> : <FiCheck size={15} />}
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
            Page {page} of {meta.totalPages} · {meta.totalElements} customers
          </p>

          <div className='flex items-center gap-1.5'>
            <button
              type='button'
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className='w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-white disabled:opacity-30 transition-colors'
            >
              <FiChevronLeft size={15} />
            </button>

            {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(meta.totalPages - 4, page - 2)) + i
              return (
                <button
                  key={p}
                  type='button'
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium border transition-colors
                    ${p === page
                      ? 'bg-primary text-white border-primary'
                      : 'hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                >
                  {p}
                </button>
              )
            })}

            <button
              type='button'
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages}
              className='w-8 h-8 flex items-center justify-center rounded-lg border hover:bg-white disabled:opacity-30 transition-colors'
            >
              <FiChevronRight size={15} />
            </button>
          </div>

          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <span>Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}
              className='border rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 outline-none cursor-pointer'
            >
              {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomersPage
