'use client'
import { WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_SHOP, USER_PROFILE, USER_ORDER, WEBSITE_CART } from '@/routes/WebsiteRoute'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
import logo from '@public/assets/images/logo-black.png'
import { IoIosSearch } from 'react-icons/io'
import { VscAccount } from 'react-icons/vsc'
import { HiMiniBars3 } from 'react-icons/hi2'
import { IoMdClose } from 'react-icons/io'
import { FiUser, FiShoppingBag, FiLogOut, FiShoppingCart } from 'react-icons/fi'
import useAuth from '@/hooks/useAuth'
import Cart from './Cart'

const NAV_LINKS = [
  { label: 'Home', href: WEBSITE_HOME },
  { label: 'Shop', href: WEBSITE_SHOP },
  { label: 'About', href: WEBSITE_HOME },
  { label: 'Contact', href: WEBSITE_HOME },
]

const UserDropdown = ({ user, logout }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initial = user?.username?.[0]?.toUpperCase() ?? 'U'

  return (
    <div className='relative' ref={ref}>
      <button
        type='button'
        onClick={() => setOpen((v) => !v)}
        className='flex items-center gap-2 focus:outline-none'
      >
        <div className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold ring-2 ring-primary/20'>
          {initial}
        </div>
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden'>
          <div className='px-4 py-3 border-b bg-gradient-to-r from-primary/5 to-emerald-50'>
            <p className='text-sm font-semibold text-gray-800 truncate'>{user?.username}</p>
            <p className='text-xs text-gray-400 truncate'>{user?.email}</p>
          </div>

          <ul className='py-1'>
            <li>
              <Link
                href={USER_PROFILE}
                onClick={() => setOpen(false)}
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors'
              >
                <FiUser size={15} />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href={WEBSITE_CART}
                onClick={() => setOpen(false)}
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors'
              >
                <FiShoppingCart size={15} />
                My Cart
              </Link>
            </li>
            <li>
              <Link
                href={USER_ORDER}
                onClick={() => setOpen(false)}
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors'
              >
                <FiShoppingBag size={15} />
                My Orders
              </Link>
            </li>
          </ul>

          <div className='border-t py-1'>
            <button
              type='button'
              onClick={() => { setOpen(false); logout() }}
              className='flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors'
            >
              <FiLogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const Header = () => {
  const { user, logout } = useAuth()
  const [isMobileMenu, setIsMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm transition-shadow duration-200 ${
        scrolled ? 'shadow-sm border-b border-gray-100' : 'border-b border-gray-100'
      }`}
    >
      <div className='lg:px-32 px-4'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link href={WEBSITE_HOME} className='flex items-center gap-2 shrink-0'>
            <Image src={logo} alt='Green Craze' width={383} height={146} className='lg:w-28 w-20' />
          </Link>

          {/* Desktop Nav */}
          <nav className='hidden lg:flex items-center gap-1'>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-150'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className='flex items-center gap-3'>
            <button type='button' className='w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors'>
              <IoIosSearch className='text-gray-500 hover:text-primary' size={20} />
            </button>

            <Cart />

            {!user ? (
              <Link
                href={WEBSITE_LOGIN}
                className='hidden lg:flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors'
              >
                <VscAccount size={16} />
                Sign In
              </Link>
            ) : (
              <UserDropdown user={user} logout={logout} />
            )}

            {/* Mobile: sign in icon when not logged */}
            {!user && (
              <Link href={WEBSITE_LOGIN} className='lg:hidden'>
                <VscAccount className='text-gray-500 hover:text-primary' size={22} />
              </Link>
            )}

            {/* Hamburger */}
            <button
              type='button'
              className='lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors'
              onClick={() => setIsMobileMenu(true)}
            >
              <HiMiniBars3 size={22} className='text-gray-600' />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileMenu && (
        <div className='fixed inset-0 z-50 lg:hidden'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black/30 backdrop-blur-sm'
            onClick={() => setIsMobileMenu(false)}
          />

          {/* Drawer */}
          <div className='absolute top-0 left-0 h-full w-72 bg-white shadow-xl flex flex-col'>
            <div className='flex items-center justify-between px-5 h-16 border-b'>
              <Image src={logo} alt='Green Craze' width={383} height={146} className='w-24' />
              <button
                type='button'
                onClick={() => setIsMobileMenu(false)}
                className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100'
              >
                <IoMdClose size={20} className='text-gray-500' />
              </button>
            </div>

            <nav className='flex-1 px-4 py-6 space-y-1'>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenu(false)}
                  className='flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors'
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className='px-4 py-5 border-t'>
              {!user ? (
                <Link
                  href={WEBSITE_LOGIN}
                  onClick={() => setIsMobileMenu(false)}
                  className='flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors'
                >
                  <VscAccount size={16} />
                  Sign In
                </Link>
              ) : (
                <div className='space-y-1'>
                  <div className='px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider'>Account</div>
                  <Link href={USER_PROFILE} onClick={() => setIsMobileMenu(false)} className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors'>
                    <FiUser size={15} /> My Profile
                  </Link>
                  <Link href={USER_ORDER} onClick={() => setIsMobileMenu(false)} className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors'>
                    <FiShoppingBag size={15} /> My Orders
                  </Link>
                  <button
                    type='button'
                    onClick={() => { setIsMobileMenu(false); logout() }}
                    className='flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                  >
                    <FiLogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
