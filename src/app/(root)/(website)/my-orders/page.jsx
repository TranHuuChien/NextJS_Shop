import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import React from 'react'
import Link from 'next/link'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { IoCartOutline } from 'react-icons/io5'
import { USER_ORDER } from '@/routes/WebsiteRoute'

const breadcrumb = {
    title: 'Orders',
    links: [
        { label: "Orders", href: USER_ORDER },
    ]
}


const OrderPage = () => {
  return (
    <div>
        <WebsiteBreadcrumb props={breadcrumb} />
        <UserPanelLayout>
            <div className='shadow rounded'>
                    <div className='p-5 text-xl font-semibold border'>
                        Orders
                    </div>
                    <div className='p-5'>

                        <div className='mt-5'>
                            <h4 className='font-semibold text-lg mb-1'>Recent Order</h4>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <td className='text-start p-2 text-sm border-b text-nowrap text-gray-500'>Sr.No</td>
                                        <td className='text-start p-2 text-sm border-b text-nowrap text-gray-500'>Order Id</td>
                                        <td className='text-start p-2 text-sm border-b text-nowrap text-gray-500'>Total Item</td>
                                        <td className='text-start p-2 text-sm border-b text-nowrap text-gray-500'>Amount</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {dashboardData && dashboardData?.data?.recentOrders?.map((order, index.tsx) => (
                                        <tr key={index.tsx}>
                                            <td className='text-start text-sm text-gray-500 p-2 font-bold'>{index.tsx + 1}</td>
                                            <td className='text-start text-sm text-gray-500 p-2 font-bold'>
                                                <Link href={WEBSITE_ORDER_DETAILS(order?.order_id)} 
                                                    className='underline hover:text-blue-500 underlioff2'
                                                >{order?.order_id}</Link>
                                            </td>
                                            <td className='text-start text-sm text-gray-500 p-2 font-bold'>{order?.product?.length}</td>
                                            <td className='text-start text-sm text-gray-500 p-2 font-bold'>{order?.amountTotal}</td>
                                        </tr>
                                    ))} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </UserPanelLayout>
    </div>
  )
}

export default OrderPage