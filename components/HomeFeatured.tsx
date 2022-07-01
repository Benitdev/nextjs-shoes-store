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
    title?: string
}
const HomeFeatured: NextPage<Props> = ({ featuredProducts, title }) => {
    return (
        <div className="">
            <p className="py-10 text-4xl font-bold tracking-widest text-slate-200 underline underline-offset-4">
                {title ? title : 'Best of Nike'}
            </p>
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                grabCursor={true}
                loop
                pagination={{
                    clickable: true,
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
