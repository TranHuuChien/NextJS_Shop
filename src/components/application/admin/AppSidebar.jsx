"use client";

import React from 'react'
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
import Image from 'next/image'
import logoBlack from '@public/assets/images/logo-black.png'
import logoWhite from '@public/assets/images/logo-white.png'
import { Button } from '@/components/ui/button'
import { LuChevronRight } from 'react-icons/lu'
import { IoMdClose } from 'react-icons/io'
import { adminAppSidebarMenu } from '@/lib/adminMenuSidebar'
import { Collapsible } from '@/components/ui/collapsible'
import { CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IconButton, Toolbar } from '@mui/material';
import IconifyIcon from '@/components/customs/icons';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const AppSidebar = ({ toggleDrawer, open }) => {
    const { toggleSidebar } = useSidebar()
    //console.log(toggleSidebar)
    return (
        <Sidebar className={``}>

            <SidebarHeader className='border-b h-14 p-0'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='flex justify-between items-center px-4'>
                            <Image src={logoBlack.src} height={50} width={logoBlack.width} className='block dark:hidden h-[50px] w-auto' alt='logo dark' />

                            <Image src={logoWhite.src} height={50} width={logoWhite.width} className='hidden dark:block h-[50px] w-auto' alt='logo white' />
                            <Button onClick={toggleSidebar} className='' type='button' size="icon" variant="ghost" >
                                <IoMdClose color='#7f0369ff' size={50} className='border '/>
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </SidebarHeader>
            <SidebarContent className='p-3'>
                <SidebarMenu>
                    {adminAppSidebarMenu.map((menu, index) => (
                        <Collapsible key={index} className='group/collapsible'>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild className='font-semibold px-2 py-5'>
                                        <Link href={menu?.url}>
                                            <menu.icon />
                                            {menu.title}
                                            {menu.submenu && menu.submenu.length > 0 &&
                                                <LuChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />}
                                        </Link>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                {menu.submenu && menu.submenu.length > 0 &&
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {menu.submenu.map((submenuItem, submenuIndex) => (
                                                <SidebarMenuSubItem key={submenuIndex}>
                                                    <SidebarMenuSubButton asChild className='px-2 py-5'>
                                                        <Link href={submenuItem?.url}>
                                                            {submenuItem.title}
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                }
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar