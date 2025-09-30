import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { PRODUCT_DETAILS, WEBSITE_HOME, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import Link from 'next/link'


const ProductDetail = ({product, variant, colors, sizes, reviewCounts}) => {
  return (
    <div className='lg:px-32 px-4'>
        <div className='my-10'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={PRODUCT_DETAILS}></Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    </div>
  )
}

export default ProductDetail