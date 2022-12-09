import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useRef } from 'react'

import Product from '../models/Product'

import DefaultLayout from '../components/layouts/DefaultLayout'
import HomeSlider from '../components/HomeSlider'
import HomeCollection from '../components/HomeCollection'
import HomeFeatured from '../components/HomeFeatured'
import productApi from '../api/productApi'
import HomeBrands from '../components/HomeBrands'

const Home: NextPage = ({ products }: any) => {
    return (
        <DefaultLayout title="BQ Store">
            <HomeSlider isSlideProducts={products.slideProducts} />
            <HomeCollection />
            <HomeFeatured
                featuredProducts={products.featuredProducts}
                title="Sản phẩm nổi bật"
            />
            <HomeBrands />
            <HomeFeatured
                featuredProducts={products.topRatedProducts}
                title="Top Đánh Giá"
            />
        </DefaultLayout>
    )
}
export async function getServerSideProps() {
    const res = await productApi.getHomeProducts()

    return {
        props: {
            products: res,
        },
    }
}

export default Home
