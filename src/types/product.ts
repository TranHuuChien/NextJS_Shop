
export const OBJECT_STATUS_PRODUCT = () => {
    return {
        "0": {
            label: "Private",
            value: "0"
        },
        "1": {
            label: "Public",
            value: "1"
        }
    }
}

export type TProduct = {
    _id: string
    averageRating: number
    createdAt: Date | null
    image: string
    price: number
    name: string
    slug: string
    totalLike: number
    countInStock: number
    discountEndDate: Date | null
    discountStartDate: Date | null
    totalReviews: number
    discount: number
    sold: number
    description:string
    location: {
        name: string
        _id: string
    }
    likedBy: string[]
    views: number
    uniqueViews: string[]
}

export type ItemOrderProduct = {
    name: string,
    amount: number,
    image: string,
    price: number,
    discount: number,
    product: string,
    slug: string
}