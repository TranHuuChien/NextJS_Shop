'use client'
import Image from 'next/image'
import React from 'react'
import logo from '@public/assets/images/logo-black.png'
import Link from 'next/link'
import { WEBSITE_HOME, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'

const COMPANY_LINKS = [
  { label: 'About Us', href: WEBSITE_HOME },
  { label: 'Shop', href: WEBSITE_SHOP },
  { label: 'Blog', href: WEBSITE_HOME },
  { label: 'Careers', href: WEBSITE_HOME },
]

const SUPPORT_LINKS = [
  { label: 'FAQ', href: WEBSITE_HOME },
  { label: 'Shipping Policy', href: WEBSITE_HOME },
  { label: 'Return & Refund', href: WEBSITE_HOME },
  { label: 'Contact Us', href: WEBSITE_HOME },
  { label: 'Privacy Policy', href: WEBSITE_HOME },
]

const SOCIAL = [
  { Icon: FiFacebook, href: '#', label: 'Facebook' },
  { Icon: FiInstagram, href: '#', label: 'Instagram' },
  { Icon: FiTwitter, href: '#', label: 'Twitter' },
  { Icon: FiYoutube, href: '#', label: 'YouTube' },
]

const Footer = () => {
  return (
    <footer className='bg-gray-50 border-t border-gray-200'>
      {/* Main footer */}
      <div className='lg:px-32 px-4 py-12'>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10'>
          {/* Brand column */}
          <div className='lg:col-span-1 md:col-span-2'>
            <Link href={WEBSITE_HOME}>
              <Image src={logo} alt='Green Craze' width={383} height={146} className='w-28 mb-4' />
            </Link>
            <p className='text-sm text-gray-500 leading-relaxed mb-5'>
              Cửa hàng sản phẩm xanh sạch — mang thiên nhiên vào cuộc sống của bạn. Chúng tôi cung cấp các sản phẩm hữu cơ, thân thiện môi trường.
            </p>
            <div className='flex items-center gap-3'>
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-150'
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4'>Company</h4>
            <ul className='space-y-2.5'>
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='text-sm text-gray-500 hover:text-primary transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4'>Support</h4>
            <ul className='space-y-2.5'>
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='text-sm text-gray-500 hover:text-primary transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4'>Newsletter</h4>
            <p className='text-sm text-gray-500 mb-4'>Đăng ký nhận tin để không bỏ lỡ ưu đãi và sản phẩm mới nhất.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className='flex flex-col gap-2'
            >
              <input
                type='email'
                placeholder='your@email.com'
                className='px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
              />
              <button
                type='submit'
                className='px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-gray-200'>
        <div className='lg:px-32 px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2'>
          <p className='text-xs text-gray-400'>
            © {new Date().getFullYear()} Green Craze. All rights reserved.
          </p>
          <div className='flex items-center gap-4'>
            <Link href={WEBSITE_HOME} className='text-xs text-gray-400 hover:text-primary transition-colors'>
              Terms of Service
            </Link>
            <Link href={WEBSITE_HOME} className='text-xs text-gray-400 hover:text-primary transition-colors'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
