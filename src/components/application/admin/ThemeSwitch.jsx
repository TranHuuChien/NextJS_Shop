"use client"
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import React from 'react'

import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'

const ThemeSwitch = () => {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost">
          <IoSunnyOutline className="dark:hidden" />
          <IoMoonOutline className="hidden dark:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='me-5 w-20'>
        <DropdownMenuItem onClick={() => setTheme('light')} className='cursor-pointer'>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className='cursor-pointer'>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className='cursor-pointer'>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitch