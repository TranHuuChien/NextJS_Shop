'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { adminAppSidebarMenu } from '@/lib/adminMenuSidebar'
import { LuChevronDown } from 'react-icons/lu'
import logoBlack from '@public/assets/images/logo-black.png'
import logoWhite from '@public/assets/images/logo-white.png'

const AppSidebar = () => {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState({})

  const toggle = (title) =>
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }))

  const isActive = (url) => url !== '#' && pathname.startsWith(url)

  return (
    <aside className='w-64 shrink-0 h-screen sticky top-0 flex flex-col bg-white dark:bg-gray-900 border-r overflow-y-auto'>
      {/* Logo */}
      <div className='h-16 flex items-center px-5 border-b shrink-0'>
        <Image src={logoBlack.src} height={36} width={120} className='block dark:hidden h-9 w-auto' alt='logo' />
        <Image src={logoWhite.src} height={36} width={120} className='hidden dark:block h-9 w-auto' alt='logo' />
      </div>

      {/* Nav */}
      <nav className='flex-1 px-3 py-4 space-y-1'>
        {adminAppSidebarMenu.map((menu) => {
          const Icon = menu.icon
          const hasSubmenu = menu.submenu?.length > 0
          const open = openMenus[menu.title]
          const active = isActive(menu.url) || menu.submenu?.some((s) => isActive(s.url))

          return (
            <div key={menu.title}>
              {hasSubmenu ? (
                <button
                  type='button'
                  onClick={() => toggle(menu.title)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${active ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <Icon size={18} className='shrink-0' />
                  <span className='flex-1 text-left'>{menu.title}</span>
                  <LuChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  />
                </button>
              ) : (
                <Link
                  href={menu.url}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${active ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <Icon size={18} className='shrink-0' />
                  {menu.title}
                </Link>
              )}

              {/* Submenu */}
              {hasSubmenu && open && (
                <div className='ml-7 mt-1 space-y-0.5 border-l pl-3'>
                  {menu.submenu.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.url}
                      className={`block px-2 py-2 rounded-lg text-sm transition-colors
                        ${isActive(sub.url)
                          ? 'text-primary font-medium'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className='px-4 py-3 border-t text-xs text-gray-400 shrink-0'>
        © 2025 GreenCraze Admin
      </div>
    </aside>
  )
}

export default AppSidebar
