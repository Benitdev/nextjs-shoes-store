import Image from 'next/image'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'

import { Product } from '../utils/typings'

type Props = {
    product: Product
}
const ProductItem: React.FC<Props> = ({ product }) => {
    return (
        <Link href={`/products/${product.slug.toLowerCase()}`}>
            <a className="block h-[500px] space-y-4 border-[1px] border-slate-50/20">
                <div className="group relative h-[400px]">
                    <Image
                        src={`/images/products/${product.imageDefault}`}
                        layout="fill"
                    />
                    <span className="absolute bottom-1 left-1 bg-slate-800 px-2 py-1 text-slate-200 transition-transform group-hover:-translate-y-[30%]">
                        {product.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                    <FontAwesomeIcon
                        icon={faHeart}
                        className="absolute top-2 right-2 h-6 w-6"
                    />
                </div>
                <div className="p-4">
                    <p className="font-bold text-slate-300">{product.name}</p>
                    <span className="flex justify-between capitalize text-pink-500">
                        {product.childrenCategory}
                        <span className="font-extrabold text-slate-400">
                            {product.category}
                        </span>
                    </span>
                </div>
            </a>
        </Link>
    )
}

export default ProductItem
