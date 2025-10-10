import React from 'react'
import CountOverview from './CountReview'
import QuickAdd from './QuickAdd'
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <div className='p-4'>
      <CountOverview/>
      <QuickAdd/>

      <div className='mt-10 flex-wrap lg:flex-nowrap gap-10'>
        <Card className='rounded-lg lg:w-[70%] w-full'>
          <CardHeader >
            <div className='flex justify-between'>
              <span className='font-semibold'>Order Overview</span>
              <Button >
                <Link href={'/admin/orders'}>View all</Link>
              </Button>
            </div>
          </CardHeader>
        </Card>


        <Card className='rounded-lg lg:w-[30%] w-full'>
          <CardHeader >
            <div className='flex justify-between'>
              <span className='font-semibold'>Order Summary</span>
              <Button >
                <Link href={'/admin/orders'}>View all</Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default page