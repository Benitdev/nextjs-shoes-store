import { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'
import ProductItem from './ProductItem'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type Props = {
    featuredProducts: any
    title: string
}
const HomeFeatured: NextPage<Props> = ({ featuredProducts, title }) => {
    return (
        <div className="">
            <h2 className="text-center font-vibes text-3xl tracking-widest text-shop-orange">
                {' '}
                Choose & Pick
            </h2>
            <h1 className="mb-4 border-b border-shop-orange pb-10 pt-5 text-center text-4xl font-bold tracking-widest text-slate-100">
                {' '}
                <span className="text-shop-orange">{`${title[0]}${title[1]}`}</span>
                {title.slice(2)}{' '}
            </h1>
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                grabCursor={true}
                loop
                pagination={{
                    clickable: true,
                    type: 'progressbar',
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {featuredProducts.map((product: any, index: any) => (
                    <SwiperSlide key={index}>
                        <ProductItem product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default HomeFeatured
