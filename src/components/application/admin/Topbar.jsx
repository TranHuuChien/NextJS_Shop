'use client'
import React from 'react'
import dynamic from "next/dynamic";
import ThemeSwitch from './ThemeSwitch'
import UserDropdown from './UserDropdown'
import { Button } from '@/components/ui/button'
import { RiMenu4Fill } from 'react-icons/ri'
import OptionMenu from './OptionMenu'
import AdminSearch from './AdminSearch'
import Image from 'next/image'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar
} from "@/components/ui/sidebar"
import logoBlack from '@public/assets/images/logo-black.png'
import logoWhite from '@public/assets/images/logo-white.png'
import AdminSearchMobile from './AdminSearchMobile'
import HeaderChangeLanguages from './HeaderChangeLanguages'
import { HiMiniBars3 } from 'react-icons/hi2';



const TopBar = ({ toggleDrawer, open }) => {
  //const { toggleSidebar } = useSidebar()
  const [isMobileMenu, setIsMobileMenu] = React.useState(false)
  const toggleDrawer1 = () => {
    console.log(toggleDrawer)
    //setOpen(!open)
  }
  return (
    <div className='absolute border h-14 w-full top-0 z-30 p-2
             flex justify-between items-center bg-white dark:bg-card'>
        {/* <div>Search component</div> */}
        <div className='flex items-center md:hidden'>
            <Image src={logoBlack.src} height={20} width={logoBlack.width} className='block dark:hidden h-[50px] w-auto' alt='logo dark' />
            <Image src={logoWhite.src} height={50} width={logoWhite.width} className='hidden dark:block h-[50px] w-auto' alt='logo white'/>
        </div>
        <div className='md:block hidden'>
          <AdminSearch/>
        </div>

        <div className='flex items-center'>
          <AdminSearchMobile />
          <ThemeSwitch/>
          
          <UserDropdown/>

          <HeaderChangeLanguages/>
          {/* <Button type='button' size='icon' className='ms-2' onClick={toggleSidebar}>
            <RiMenu4Fill/>
          </Button> */}
          {/* <OptionMenu/> */}
          
          <button type='button' className='lg:hidden block' onClick={toggleDrawer}>
            <HiMiniBars3 size={25} className='text-gray-500 hover:text-primary'/>
          </button>
        </div>
    </div>
  )
}

export default TopBar