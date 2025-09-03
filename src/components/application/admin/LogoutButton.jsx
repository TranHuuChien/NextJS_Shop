import {DropdownMenuItem } from '@/components/ui/dropdown-menu'
import axios from 'axios'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/reducer/authSlice'
import { useRouter } from 'next/navigation'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'


const LogoutButton = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      // const { data: logoutResponse } = await axios.post('/api/auth/logout')
      // if(!logoutResponse?.success) {
      //   throw new Error(logoutResponse.message)
      // }
      dispatch(logout())
      router.push(WEBSITE_LOGIN)
    } catch (error) {
      
    }
  }
  return (
    <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
        <AiOutlineLogout color='red'/>
        Logout
    </DropdownMenuItem>
  )
}

export default LogoutButton