'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitch from './ThemeSwitch'
import UserDropdown from './UserDropdown'
import { HiMiniBars3 } from 'react-icons/hi2'
import { IoIosSearch } from 'react-icons/io'
import { FiBell } from 'react-icons/fi'
import logoBlack from '@public/assets/images/logo-black.png'
import logoWhite from '@public/assets/images/logo-white.png'

// Build breadcrumb from pathname
const useBreadcrumb = () => {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(Boolean)
  return parts.map((part, i) => ({
    label: part.charAt(0).toUpperCase() + part.slice(1),
    href: '/' + parts.slice(0, i + 1).join('/'),
  }))
}

const TopBar = ({ toggleDrawer }) => {
  const [search, setSearch] = useState('')
  const crumbs = useBreadcrumb()

  return (
    <header className='h-16 w-full flex items-center justify-between px-5 border-b bg-white dark:bg-gray-900 sticky top-0 z-30'>
      {/* Left: hamburger (mobile) + breadcrumb */}
      <div className='flex items-center gap-3'>
        <button
          type='button'
          className='lg:hidden text-gray-500 hover:text-primary'
          onClick={toggleDrawer}
        >
          <HiMiniBars3 size={24} />
        </button>

        {/* Mobile logo */}
        <div className='lg:hidden'>
          <Image src={logoBlack.src} height={32} width={100} className='block dark:hidden h-8 w-auto' alt='logo' />
          <Image src={logoWhite.src} height={32} width={100} className='hidden dark:block h-8 w-auto' alt='logo' />
        </div>

        {/* Breadcrumb — desktop */}
        <nav className='hidden lg:flex items-center gap-1.5 text-sm text-gray-400'>
          {crumbs.map((crumb, i) => (
            <React.Fragment key={crumb.href}>
              {i > 0 && <span>/</span>}
              <Link
                href={crumb.href}
                className={i === crumbs.length - 1
                  ? 'text-gray-700 dark:text-gray-200 font-medium'
                  : 'hover:text-primary transition-colors'}
              >
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: search + actions */}
      <div className='flex items-center gap-2'>
        {/* Search */}
        <div className='hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 w-52'>
          <IoIosSearch size={16} className='text-gray-400 shrink-0' />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search...'
            className='bg-transparent text-sm outline-none w-full text-gray-600 dark:text-gray-300 placeholder-gray-400'
          />
        </div>

        {/* Notifications */}
        <button
          type='button'
          className='relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors'
        >
          <FiBell size={18} />
          <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full' />
        </button>

        <ThemeSwitch />
        <UserDropdown />
      </div>
    </header>
  )
}

export default TopBar
