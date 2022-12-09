import Image from 'next/image'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Product } from '../utils/typings'

type Props = {
    product: Product
}
const ProductItem: React.FC<Props> = ({ product }) => {
    return (
        <Link href={`/products/${product.slug.toLowerCase()}`}>
            <motion.a
                className="block h-[500px] cursor-pointer space-y-4 border-[1px] border-shop-orange/20 bg-shop-orange/5"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="group relative h-[400px]">
                    <Image
                        src={`/images/products/${product.imageDefault}`}
                        layout="fill"
                        className="scale-100 opacity-100 transition-all duration-200 group-hover:scale-0 group-hover:opacity-0 group-hover:!delay-[0]"
                    />
                    <Image
                        src={`/images/products/${product.images[0]}`}
                        layout="fill"
                        className="scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-hover:delay-200"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/80 px-2 py-1 text-shop-orange transition-transform group-hover:-translate-y-[30%]">
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
                    <p className="font-bold text-slate-100">{product.name}</p>
                    <span className="flex justify-between capitalize text-shop-warning">
                        {product.childrenCategory}
                        <span className="font-extrabold text-slate-400">
                            {product.category}
                        </span>
                    </span>
                </div>
            </motion.a>
        </Link>
    )
}

export default ProductItem
