'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { RiMenu4Fill } from 'react-icons/ri'
import { useTheme } from 'next-themes'

const OptionMenu = () => {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu className='border border-solid'>
      <DropdownMenuTrigger asChild>
        <Button type='button' size='icon' className='ms-2'>
            <RiMenu4Fill/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Account</DropdownMenuItem>
        <DropdownMenuItem >Profile</DropdownMenuItem>
        <DropdownMenuItem >Login</DropdownMenuItem>
        <DropdownMenuItem >Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OptionMenu