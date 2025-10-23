
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

export type ItemOrderProduct = {
    name: string,
    amount: number,
    image: string,
    price: number,
    discount: number,
    product: string,
    slug: string
}