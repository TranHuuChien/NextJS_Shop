import MainSlider from '@/components/application/Website/MainSlider'
import React from 'react'
import Footer from '@/components/Application/Website/Footer'
import Header from '@/components/Application/Website/Header'
import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { IoCartOutline } from 'react-icons/io5'
import { USER_DASHBOARD, WEBSITE_ORDER_DETAILS, WEBSITE_PRODUCT_DETAILS } from '@/routes/WebsiteRoute'
import useFetch from '@/hooks/useFetch'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const breadcrumb = {
    title: 'Dashboard',
    links: [
        { label: "Dashboard", href: USER_DASHBOARD },
    ]
}

const dashboardData = {
  data: {
    recentOrders: [
      {
        order_id: "ORD123456",
        product: [
          { id: "P001", name: "iPhone 15 Pro", quantity: 1, price: 1200 },
          { id: "P002", name: "AirPods Pro 2", quantity: 1, price: 250 }
        ],
        amountTotal: 1450
      },
      {
        order_id: "ORD123457",
        product: [
          { id: "P003", name: "MacBook Pro 14\"", quantity: 1, price: 2200 }
        ],
        amountTotal: 2200
      },
      {
        order_id: "ORD123458",
        product: [
          { id: "P004", name: "Apple Watch Ultra 2", quantity: 1, price: 900 },
          { id: "P005", name: "iPad Pro 12.9", quantity: 1, price: 1500 }
        ],
        amountTotal: 2400
      }
    ]
  }
}


const MyAccount = ({ children }) => {
    // const { data: dashboardData } = useFetch('/api/dashboard/user')
    // const cartStore = useSelector(store => store.cartStore)
    return (
        <div>
            <WebsiteBreadcrumb props={breadcrumb} />

            <UserPanelLayout>
                <div className='shadow rounded'>
                    <div className='p-5 text-xl font-semibold border'>
                        Dashboard
                    </div>
                    <div className='p-5'>
                        <div className='grid lg:grid-cols-2 gap-10'>
                            <div className='flex items-center justify-between gap-5 border rounded p-3'>
                                <div>
                                    <h4 className='font-semibold text-lg mb-1'>Total Order</h4>
                                    <span>0</span>
                                </div>
                                <div className='w-16 h-16 bg-[var(--primary)] rounded-full flex justify-center items-center'>
                                    <HiOutlineShoppingBag className='text-white' size={25} />
                                </div>
                            </div>
                            <div className='flex items-center justify-between gap-5 border rounded p-3'>
                                <div>
                                    <h4 className='font-semibold text-lg mb-1'>Items In Cart</h4>
                                    <span>0</span>
                                </div>
                                <div className='w-16 h-16 bg-[var(--primary)] rounded-full flex justify-center items-center'>
                                    <IoCartOutline className='text-white' size={25} />
                                </div>
                            </div>
                        </div>

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
                                    {dashboardData && dashboardData?.data?.recentOrders?.map((order, index) => (
                                        <tr key={index}>
                                            <td className='text-start text-sm text-gray-500 p-2 font-bold'>{index + 1}</td>
                                            <td className='text-start text-sm text-gray-500 p-2 font-bold'>
                                                <Link href={WEBSITE_ORDER_DETAILS(order?.order_id)} 
                                                    className='underline hover:text-blue-500 underlioff2'
                                                >{order?.order_id}</Link>
                                            </td>
                                            <td className='text-start text-sm text-gray-500 p-2 font-bold'>{order?.product?.length}</td>
                                            <td className='text-start text-sm text-gray-500 p-2 font-bold'>{order?.amountTotal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </UserPanelLayout>
        </div>
    )
}

export default MyAccount