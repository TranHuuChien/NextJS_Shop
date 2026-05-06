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

const UserDropdown = ({ user, logout }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on outside click
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
        <div className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold'>
          {initial}
        </div>
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50 overflow-hidden'>
          {/* User info */}
          <div className='px-4 py-3 border-b bg-gray-50'>
            <p className='text-sm font-semibold text-gray-800 truncate'>{user?.username}</p>
            <p className='text-xs text-gray-400 truncate'>{user?.email}</p>
          </div>

          {/* Menu items */}
          <ul className='py-1'>
            <li>
              <Link
                href={USER_PROFILE}
                onClick={() => setOpen(false)}
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors'
              >
                <FiUser size={15} />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href={WEBSITE_CART}
                onClick={() => setOpen(false)}
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors'
              >
                <FiShoppingCart size={15} />
                My Cart
              </Link>
            </li>
            <li>
              <Link
                href={USER_ORDER}
                onClick={() => setOpen(false)}
                className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors'
              >
                <FiShoppingBag size={15} />
                My Orders
              </Link>
            </li>
          </ul>

          {/* Logout */}
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

  return (
    <div className='bg-white border-b lg:px-32 px-4 w-full'>
      <div className='flex justify-between items-center lg:py-5 py-3'>
        <Image src={logo} alt='logo' width={383} height={146} className='lg:w-32 w-24' />

        <div className='flex items-center gap-16'>
          {/* Nav */}
          <nav
            className={`lg:relative lg:w-auto lg:top-0 lg:left-0 lg:h-auto lg:p-0 bg-white
              fixed z-50 top-0 w-full h-screen transition-all ${isMobileMenu ? 'left-0' : '-left-full'}`}
          >
            <div className='lg:hidden flex justify-between items-center bg-gray-50 py-3 border-b px-3'>
              <Link href={WEBSITE_HOME}>
                <Image src={logo} alt='logo' width={383} height={146} className='w-32' />
              </Link>
              <button type='button' onClick={() => setIsMobileMenu(false)}>
                <IoMdClose size={25} className='text-gray-500 hover:text-primary' />
              </button>
            </div>

            <ul className='lg:flex justify-center items-center gap-10 px-3'>
              <li className='hover:text-primary hover:font-semibold'>
                <Link href={WEBSITE_HOME} className='block py-2 text-sm'>Home</Link>
              </li>
              <li className='hover:text-primary hover:font-semibold'>
                <Link href={WEBSITE_HOME} className='block py-2 text-sm'>About</Link>
              </li>
              <li className='hover:text-primary hover:font-semibold'>
                <Link href={WEBSITE_SHOP} className='block py-2 text-sm'>Shop</Link>
              </li>
              <li className='hover:text-primary hover:font-semibold'>
                <Link href={WEBSITE_HOME} className='block py-2 text-sm'>T-shirt</Link>
              </li>
              <li className='hover:text-primary hover:font-semibold'>
                <Link href={WEBSITE_HOME} className='block py-2 text-sm'>Hoodies</Link>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className='flex items-center gap-5'>
            <button type='button'>
              <IoIosSearch className='text-gray-500 hover:text-primary cursor-pointer' size={22} />
            </button>

            {/*<Link href={WEBSITE_CART} className='text-gray-500 hover:text-primary'>*/}
            {/*  <FiShoppingCart size={22} />*/}
            {/*</Link>*/}

            <Cart />

            {!user ? (
              <Link href={WEBSITE_LOGIN}>
                <VscAccount className='text-gray-500 hover:text-primary cursor-pointer' size={22} />
              </Link>
            ) : (
              <UserDropdown user={user} logout={logout} />
            )}

            <button type='button' className='lg:hidden block' onClick={() => setIsMobileMenu(true)}>
              <HiMiniBars3 size={25} className='text-gray-500 hover:text-primary' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header