import { Input } from '@/components/ui/input'
import React from 'react'
import { IoIosSearch } from 'react-icons/io'

const AdminSearch = () => {

    return (
        <div className='md:w-[350px]'>
            <div>
                <Input
                    readOnly
                    className='rounded-full cursor-pointer'
                    placeholder='Search...'
                />
                <button type='button' className='absolute right-3 cursor-default'>
                    <IoIosSearch/>
                </button>
            </div>
        </div>
    )
}

export default AdminSearch