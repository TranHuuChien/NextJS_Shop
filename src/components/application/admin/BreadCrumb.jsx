import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'

const BreadCrumb = ({ breadcrumbData}) => {
  return (
    <Breadcrumb className='mb-5 ml-5'>
        <BreadcrumbList>
            {breadcrumbData.length > 0 && breadcrumbData.map((data, index) => {
                return (
                  index !== breadcrumbData.length - 1
                  ? <div key={index} className='flex justify-center items-center'>
                      <BreadcrumbItem>
                          <BreadcrumbLink href={data.href}>{data.label}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className='ms-1 mt-1'/>
                    </div>
                  :
                  <div key={index}>
                      <BreadcrumbItem>
                          <BreadcrumbLink href={data.href}>{data.label}</BreadcrumbLink>
                      </BreadcrumbItem>
                    </div>
                )
            })}
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb