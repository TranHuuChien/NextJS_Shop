'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { IoShirtOutline } from 'react-icons/io5'
import { MdOutlineShoppingBag } from 'react-icons/md'
import LogoutButton from './LogoutButton'
// import adminLogo from '@public/assets/images/'

const UserDropdown = () => {
  const auth = useSelector((store) => store?.authStore?.auth)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage height={50} width={50} src='https://github.com/shadcn.png'/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='me-5 w-44'>
        <DropdownMenuLabel>
          <p className='font-semibold'>{auth?.name ? auth?.name : "User default"}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem asChild>
          <Link href='' className='cursor-pointer'>
            <IoShirtOutline/>
            New Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='' className='cursor-pointer'>
            <MdOutlineShoppingBag/>
            Orders
          </Link>
        </DropdownMenuItem>
        
        <LogoutButton/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown