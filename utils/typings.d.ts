export type Product = {
    _id: string
    name: string
    slug: string
    category: string
    childrenCategory: string[]
    imageDefault: string
    images: string[]
    price: number
    rating: number
    numReviews: number
    countInStock: { size: number; count: number; _id: string }[]
    description: string
    reviews?: any
    isFeatured: boolean
}
