import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'

import Product from '../models/Product'

import DefaultLayout from '../components/DefaultLayout'
import HomeSlider from '../components/HomeSlider'
import HomeCollection from '../components/HomeCollection'
import HomeFeatured from '../components/HomeFeatured'

const Home: NextPage = ({ products }: any) => {
    return (
        <DefaultLayout title="BQ Store">
            <HomeSlider isSlideProducts={products.slideProductsDocs} />
            <HomeCollection />
            <HomeFeatured featuredProducts={products.featuredProductsDocs} />
            <HomeFeatured
                featuredProducts={products.topRatedProductsDocs}
                title="Top Đánh Giá"
            />
        </DefaultLayout>
    )
}
export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/products`)

    return {
        props: {
            products: data,
        },
    }
}

export default Home
