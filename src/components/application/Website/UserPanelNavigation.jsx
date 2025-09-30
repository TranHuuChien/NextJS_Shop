'use client'
import { Button } from '@/components/ui/button'
import { showToast } from '@/lib/showToast'
import { USER_DASHBOARD, USER_ORDER, USER_PROFILE } from '@/routes/WebsiteRoute'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const UserPanelNavigation = () => {
    const pathName = usePathname()
    console.log(pathName)
    const handleLogout = () => {
        console.log("toast")
        showToast('error', "Thanh cong")
    }
    return (
        <div className='border shadow-sm p-4 rounded'>
            <ul>
                <li className='mb-2'>
                    <Link href={USER_DASHBOARD} className={`block p-3 text-sm hover:bg-[var(--primary)] hover:text-white 
                        ${pathName.startsWith(USER_DASHBOARD) ? 'bg-[var(--primary)] text-white' : ''}`}>Dashboard</Link>
                </li>
                 <li className='mb-2'>
                    <Link href={USER_PROFILE} className={`block p-3 text-sm hover:bg-[var(--primary)] hover:text-white 
                        ${pathName.startsWith() ? 'bg-[var(--primary)] text-white' : ''}`}>Profile</Link>
                </li>
                 <li className='mb-2'>
                    <Link href={USER_ORDER} className={`block p-3 text-sm hover:bg-[var(--primary)] hover:text-white 
                        ${pathName.startsWith(USER_ORDER) ? 'bg-[var(--primary)] text-white' : ''}`}>Orders</Link>
                </li>
                <li className='mb-2'>
                    <Button type='button' onClick={handleLogout()} className='w-full bg-[var(--destructive)]'>Logout</Button>
                </li>
            </ul>
        </div>
    )
}

export default UserPanelNavigation