import React from 'react'
import Link from 'next/link'
import { WEBSITE_HOME } from '@/routes/WebsiteRoute'
import { FiChevronRight, FiHome } from 'react-icons/fi'

const WebsiteBreadcrumb = ({ props }) => {
  return (
    <div className='bg-gradient-to-r from-primary/5 via-emerald-50 to-transparent border-b border-gray-100'>
      <div className='lg:px-32 px-4 py-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>{props?.title}</h1>
        <nav className='flex items-center gap-1.5 text-sm'>
          <Link href={WEBSITE_HOME} className='flex items-center gap-1 text-gray-400 hover:text-primary transition-colors'>
            <FiHome size={13} />
            Home
          </Link>
          {props?.links?.map((item, index) => (
            <React.Fragment key={index}>
              <FiChevronRight size={13} className='text-gray-300' />
              <span className='text-primary font-medium'>{item.label}</span>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default WebsiteBreadcrumb
