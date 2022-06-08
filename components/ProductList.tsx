import React from 'react'

import ProductItem from './ProductItem'
import type { Product } from '../utils/typings'

type Props = {
    products: Product[]
}

const ProductList: React.FC<Props> = ({ products }) => {
    return (
        <div className="col-span-9 grid grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductItem product={product} key={product._id} />
            ))}
        </div>
    )
}

export default ProductList
