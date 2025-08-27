import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import UserDropdown from './UserDropdown'
import { Button } from '@/components/ui/button'
import { RiMenu4Fill } from 'react-icons/ri'
import OptionMenu from './OptionMenu'
import AdminSearch from './AdminSearch'

const TopBar = () => {
  return (
    <div className='absolute border h-14 w-full top-0 z-30 p-2
             flex justify-between items-center bg-white dark:bg-card'>
        {/* <div>Search component</div> */}
        <AdminSearch/>

        <div className='flex items-center'>
          <ThemeSwitch/>
          <UserDropdown/>
          {/* <Button type='button' size='icon' className='ms-2'>
            <RiMenu4Fill/>

          </Button> */}
          {/* <OptionMenu/> */}
        </div>
    </div>
  )
}

export default TopBar