'use client'
import AppSidebar from '@/components/Application/Admin/AppSidebar'
import ThemeProvider from '@/components/Application/Admin/ThemeProvider'
import TopBar from '@/components/Application/Admin/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { CssBaseline } from '@mui/material'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import useWindowSize from '@/hooks/useWindowSize'


const AdminLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  
  const toggleDrawer = () => {
    setOpen(!open)
  }
  
const size = useWindowSize()
  return (
    <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
      <CssBaseline />
      <SidebarProvider>

        {size.width > 1024 ? 
        <AppSidebar toggleDrawer={toggleDrawer} open={open}/> 
        :
        <Sheet className='lg:hidden' open={open} onOpenChange={toggleDrawer}>
                {/* <SheetTrigger>Open</SheetTrigger> */}
                <SheetContent side='left' className="bg-white">
                    <SheetHeader>
                        <SheetTitle>Sidebar</SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div className='mt-5'>
                        <AppSidebar toggleDrawer={toggleDrawer} open={open}/>
              
                    </div>
                </SheetContent>
            </Sheet>
        }
        <main className='border-2 md:w-[calc(100vw-16rem)] w-full'>
          <div className='pt-[70px]  min-h-[calc(100vh-40px)] pb-10 relative '>
            <TopBar toggleDrawer={toggleDrawer} open={open}/>
            {children}
          </div>
          <div className='border-t h-[40px] flex justify-center items-center bg-gray-500 dark:bg-background text-sm'>
            2025 Developer All right reserved
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default AdminLayout