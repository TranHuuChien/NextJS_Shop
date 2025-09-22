import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { sortings } from '@/lib/utils'
import React from 'react'
import { IoFilter } from 'react-icons/io5'

const Sorting = ({ limit, setLimit, sorting, setSorting, mobileFilterOpen, setMobileFilterOpen }) => {
  return (
    <div className='flex justify-between items-center  gap-2 p-2 bg-gray-100'>
        <Button className='lg:hidden' type='button' onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
            Filter
            <IoFilter/>
        </Button>
        <ul className='flex items-center gap-4'>
            <li className='font-semibold'>Show</li>
            {[5,10,15].map(limitNum => (
                <li key={limitNum}>
                    <button type='button' onClick={() => setLimit(limitNum)} className={`${limitNum === limit ? 
                        'w-8 h-8 flex justify-center items-center rounded-full bg-primary text-white text-sm' : ''}`}>
                        {limitNum}
                    </button>
                </li>
            ))}
        </ul>
        <Select value={sorting} onValueChange={(value) => (setSorting(value))}>
            <SelectTrigger className='md:w-[180px] w-full bk-white'>
                <SelectValue placeholder='Default Sorting'/>
            </SelectTrigger>
            <SelectContent>
                {sortings.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}

export default Sorting