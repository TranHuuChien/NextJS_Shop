import Image from 'next/image'
import React from 'react'
import logo from '@public/assets/images/logo-black.png'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-gray-50 border-t'>
      <div className='grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4'>
        <div className='lg:col-span-1 md:col-span-2 col-span-1'>
          <Image
            src={logo}
            alt='logo'
            width={383}
            height={146}
            className='lg:w-32 w-24 mb-24'/>
            <p></p>
        </div>

        <div>
          <h4 className='text-xl font-bold uppercase mb-5'>Categories</h4>
          <ul>
            <li className='mb-2 text-gray-500'>
              <Link href="">T-shirt</Link>
            </li>
            <li className='mb-2 text-gray-500'>
              <Link href="">Hoodies</Link>
            </li>
            <li className='mb-2 text-gray-500'>
              <Link href="">Oversized</Link>
            </li>
            <li className='mb-2 text-gray-500'>
              <Link href="">Full Sleeves</Link>
            </li>
             <li className='mb-2 text-gray-500'>
              <Link href="">Polo</Link>
            </li>
          </ul>
        </div>

         <div>
          <h4 className='text-xl font-bold uppercase mb-5'>Userfull Links</h4>
          <ul>
            <li className='mb-2 text-gray-500'>
              <Link href="">Home</Link>
            </li>
            <li className='mb-2 text-gray-500'>
              <Link href="">Shop</Link>
            </li>
            <li className='mb-2 text-gray-500'>
              <Link href="">About</Link>
            </li>
            <li className='mb-2 text-gray-500'>
              <Link href="">Full Sleeves</Link>
            </li>
             <li className='mb-2 text-gray-500'>
              <Link href="">Polo</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer