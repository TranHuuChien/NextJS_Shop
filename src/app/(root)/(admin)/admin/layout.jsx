'use client'
import React, { useState } from 'react'
import AppSidebar from '@/components/Application/Admin/AppSidebar'
import TopBar from '@/components/Application/Admin/Topbar'
import ThemeProvider from '@/components/Application/Admin/ThemeProvider'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <div className='flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden'>
        {/* Sidebar — desktop */}
        <div className='hidden lg:block'>
          <AppSidebar />
        </div>

        {/* Sidebar — mobile sheet */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side='left' className='p-0 w-64 bg-white dark:bg-gray-900'>
            <SheetHeader className='sr-only'>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription />
            </SheetHeader>
            <AppSidebar />
          </SheetContent>
        </Sheet>

        {/* Main */}
        <div className='flex-1 flex flex-col overflow-hidden'>
          <TopBar toggleDrawer={() => setMobileOpen(true)} />
          <main className='flex-1 overflow-y-auto p-6'>
            {children}
          </main>
          <footer className='h-10 border-t flex items-center justify-center text-xs text-gray-400 bg-white dark:bg-gray-900 shrink-0'>
            © 2025 GreenCraze — All rights reserved
          </footer>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AdminLayout
