import { WEBSITE_HOME } from '@/routes/WebsiteRoute'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@public/assets/images/logo-black.png'
import { IoIosSearch } from 'react-icons/io'
import Cart from './Cart'
const Header = () => {
  return (
    <div className='bg-white border-b lg:px-32 px-4'>
      <div className='flex justify-between items-center lg:py-5 py-3'>
        <Link href={WEBSITE_HOME}>
          <Image 
            src={logo}
            alt='logo'
            width={383}
            height={146}
            className='lg:w-32 w-24'/>
        </Link>

        <div className='flex items-center gap-20 justify-center'>
          <nav className=''>
            <ul className='flex justify-center items-center gap-10 px-3'>
              <li className='text-grap-600 hover:text-primary hover:font-semibold'>
                <Link href={WEBSITE_HOME} className='block py-2'>
                  Home
                </Link>
              </li>
              <li className='text-grap-600 hover:text-primary hover:font-semibold'>
                <Link href={WEBSITE_HOME} className='block py-2'>
                  About
                </Link>
              </li>
              <li className='text-grap-600 hover:text-primary hover:font-semibold'>
                <Link href={WEBSITE_HOME} className='block py-2'>
                  Shop
                </Link>
              </li>
              <li className='text-grap-600 hover:text-primary hover:font-semibold'>
                <Link href={WEBSITE_HOME} className='block py-2'>
                  T-shirt
                </Link>
              </li>
              <li className='text-grap-600 hover:text-primary hover:font-semibold'>
                <Link href={WEBSITE_HOME} className='block py-2'>
                  Hoodies
                </Link>
              </li>
            </ul>
          </nav>

          <div className='flex justify-between items-cente gap-8'>
            <button type='button'>
              <IoIosSearch
                className='text-grap-500 hover:text-primary cursor-pointer'
                size={25}
              />
            </button>
            <Cart/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header