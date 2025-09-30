import axios from 'axios'
import React from 'react'
import ProductDetail from './ProductDetail'

const ProductPage = async ({ params, searchParams }) => {
    const { slug } = await params
    const { color, size } = await searchParams
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/details/${slug}`
    if(color && size) {
        url = `?color=${color}&size=${size}`
    }
    const { data: getProduct } = null //= await axios.get(url)
    if(!getProduct.success) {
        return (
            <div className='flex justify-center items-center py-10 h-[300px]'>
                <h1 className='text-4xl font-semibold'>Data not found</h1>
            </div>
        )
    } else {
        return (
            <ProductDetail
                product={getProduct?.data?.product}
                variant={getProduct?.data?.variant}
                colors={getProduct?.data?.color}
                sizes={getProduct?.data?.sizes}
                reviewCounts={getProduct?.data?.reviewCounts}
            />
        )
    }
    return (
        <div>

        </div>
    )
}

export default ProductPage