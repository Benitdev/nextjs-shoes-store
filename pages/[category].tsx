import type { NextPage } from 'next'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import DefaultLayout from '../components/layouts/DefaultLayout'
import FilterBar from '../components/FilterBar'
import WallHeader from '../components/WallHeader'
import ProductList from '../components/ProductList'
import type { Product } from '../utils/typings'
import productApi from '../api/productApi'

type Props = {
    products: Product[]
    category: string
}

const Products: NextPage<Props> = ({ products, category }) => {
    const [hideFilter, setHideFilter] = useState<boolean>(false)
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
                <WallHeader
                    category={title}
                    productPage
                    setHideFilter={setHideFilter}
                />
                <div className="grid grid-cols-11 gap-10">
                    <FilterBar category={category} hideFilter={hideFilter} />
                    <ProductList products={products} />
                </div>
            </div>
        </DefaultLayout>
    )
}

export async function getServerSideProps({ query }: any) {
    console.log(query)
    const res: any = await productApi.getProductsFilter({ params: query })
    return {
        props: {
            products: res.products,
            category: query.category,
        },
    }
}
export default Products
