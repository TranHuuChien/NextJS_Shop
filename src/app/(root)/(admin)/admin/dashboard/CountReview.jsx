'use client'
import Link from "next/link"
import { BiCategory } from "react-icons/bi"

const CountOverview = () => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-5">
      <Link href=''>
        <div className="flex items-center justify-between p-3 rounded-lg border shadow border-l-4 
        border-l-green-400 bg-white dark:bg-card dark:border-gray-500 dark:border-l-green-400">
          <div>
            <h4 className="font-medium text-gray-500">Total Categories</h4>
            <span className="text-xl font-bold">10</span>
          </div>
          <div className="">
            <span className="w-12 h-12 border flex justify-center items-center rounded-full bg-green-400 text-white"><BiCategory color="green"/></span>
          </div>
        </div>
      </Link>

      <Link href=''>
        <div className="flex items-center justify-between p-3 rounded-lg border shadow border-l-4 
        border-l-blue-400 bg-white dark:bg-card dark:border-gray-500 dark:border-l-blue-400">
          <div>
            <h4 className="font-medium text-gray-500">Total Products</h4>
            <span className="text-xl font-bold">10</span>
          </div>
          <div className="">
            <span className="w-12 h-12 border flex justify-center items-center rounded-full bg-blue-400 text-white"><BiCategory color="blue"/></span>
          </div>
        </div>
      </Link>

      <Link href=''>
        <div className="flex items-center justify-between p-3 rounded-lg border shadow border-l-4 
        border-l-yellow-400 bg-white dark:bg-card dark:border-gray-500 dark:border-l-yellow-400">
          <div>
            <h4 className="font-medium text-gray-500">Total Customers</h4>
            <span className="text-xl font-bold">10</span>
          </div>
          <div className="">
            <span className="w-12 h-12 border flex justify-center items-center rounded-full bg-border-400 text-white"><BiCategory color="border"/></span>
          </div>
        </div>
      </Link>


      <Link href=''>
        <div className="flex items-center justify-between p-3 rounded-lg border shadow border-l-4 
        border-l-cyan-400 bg-white dark:bg-card dark:border-gray-500 dark:border-l-cyan-400">
          <div>
            <h4 className="font-medium text-gray-500">Total Orders</h4>
            <span className="text-xl font-bold">10</span>
          </div>
          <div className="">
            <span className="w-12 h-12 border flex justify-center items-center rounded-full bg-cyan-400 text-white"><BiCategory color="cyan"/></span>
          </div>
        </div>
      </Link>


    </div>
  )
}

export default CountOverview