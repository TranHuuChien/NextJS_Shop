import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { title } from 'process'
import React from 'react'

const breadcrumb = {
  title: 'checkout',
  links: [
    { label: "Checkout" }
  ]
}

const CheckoutPage = () => {
  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb}/>
      <div>
        
      </div>
    </div>
  )
}

export default CheckoutPage