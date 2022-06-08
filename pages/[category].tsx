import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import DefaultLayout from '../components/DefaultLayout'
import FilterBar from '../components/FilterBar'
import WallHeader from '../components/WallHeader'
import ProductList from '../components/ProductList'
import type { Product } from '../utils/typings'

type Props = {
    products: Product[]
    category: string
}

const Products: NextPage<Props> = ({ products, category }) => {
    let title
    switch (category) {
        case 'men':
            title = 'Sản Phẩm Nam'
            break
        case 'women':
            title = 'Sản Phẩm Nữ'
            break
        case 'kid':
            title = 'Sản Phẩm Trẻ Em'
            break
        case 'sales':
            title = 'Sản Phẩm Giảm Giá'
            break
        default:
            title = 'Sản Phẩm'
    }
    return (
        <DefaultLayout title={title}>
            <div>
                <WallHeader category={title} productPage />
                <div className="grid grid-cols-11 gap-10">
                    <FilterBar category={category} />
                    <ProductList products={products} />
                </div>
            </div>
        </DefaultLayout>
    )
}

export async function getServerSideProps({ query }: any) {
    const { data } = await axios.get(
        `${process.env.NEXTAUTH_URL}/api/products`,
        {
            params: {
                ...query,
            },
        }
    )

    return {
        props: {
            products: data,
            category: query.category,
        },
    }
}
export default Products
