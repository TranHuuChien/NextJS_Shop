import Image from 'next/image'
import React from 'react'

import imgPLaceholder from '@public/assets/images/img-placeholder.webp'
import Link from 'next/link'

const ProductBox = ({ product }) => {
  return (
    <div>
      <Link>
        <Image
          src={product?.media?.secure_url || imgPLaceholder.src}
          alt=''
          height={400}
          width={400}
          title={product?.media?.title || product?.name}
        />
        <div className='p-3'>
          <h4>{product?.name}</h4>
          <p>
            <span className='line-through text-gray-400'>{product.mrp}</span>
            <span className='font-semibold'>{product?.sellingPrice}</span>
          </p>
        </div>
      </Link>
    </div>
  )
}

export default ProductBox