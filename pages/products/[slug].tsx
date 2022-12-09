import type { NextPage } from 'next'
import React from 'react'
import axios from 'axios'

import DefaultLayout from '../../components/layouts/DefaultLayout'
import FilterBar from '../../components/FilterBar'
import ProductImage from '../../components/ProductImage'
import ProductInfo from '../../components/ProductInfo'
import ProductReviews from '../../components/ProductReviews'

import type { Product } from '../../utils/typings'
import Image from 'next/image'
import WallHeader from '../../components/WallHeader'
import productApi from '../../api/productApi'

type Props = {
    product: Product
}

const ProductDetail: NextPage<Props> = ({ product }) => {
    return (
        <DefaultLayout title={product.name}>
            {/* <FilterBar></FilterBar> */}
            <WallHeader category={product.name} />
            <div className="!mt-4 flex flex-col items-center justify-between gap-8 px-14 lg:flex-row lg:items-start">
                <ProductImage
                    images={[product.imageDefault, ...product.images]}
                />
                <ProductInfo product={product} />
            </div>
            <div className="text-slate-100">
                <h1 className="mx-auto w-[400px] border-b-2 border-shop-orange/40 py-4 text-center font-vibes text-3xl font-bold capitalize text-shop-orange">
                    {' '}
                    mô tả sản phẩm{' '}
                </h1>
                <div>
                    <p className="p-10 px-16">
                        {' '}
                        {product.description} {product.description}{' '}
                        {product.description}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Image
                            src={`/images/products/${product.images[3]}`}
                            width={500}
                            height={500}
                            className="opacity-70"
                        />
                        <Image
                            src={`/images/products/${product.images[2]}`}
                            width={500}
                            height={500}
                            className="opacity-70"
                        />
                    </div>
                    <p className="p-10 px-16">
                        {' '}
                        {product.description} {product.description}{' '}
                        {product.description}
                    </p>
                </div>
            </div>
            <ProductReviews product={product} />
        </DefaultLayout>
    )
}
export async function getServerSideProps({ query }: any) {
    const { slug } = query
    const res: any = await productApi.getProductDetail(slug)

    return {
        props: {
            product: res.product,
        },
    }
}

export default ProductDetail
