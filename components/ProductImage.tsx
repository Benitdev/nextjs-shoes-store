import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { is } from 'immer/dist/internal'

type Props = {
    images: string[]
}
const ProductImage: React.FC<Props> = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>()

    const zoomResult = useRef<HTMLDivElement>(null)
    useEffect(() => {
        let imgs = document.querySelectorAll('.mainSwiper .swiper-slide img')
        const size = 4

        imgs.forEach((img) => {
            img?.addEventListener('mousemove', (e) => {
                handleZoomImg(e, img)
            })
            img?.addEventListener('mouseleave', handleMouseLeave)
        })

        function handleZoomImg(e: any, img: any) {
            zoomResult.current?.classList.remove('hidden')

            let x = (e.offsetX / (img.offsetWidth || 1)) * 100
            let y = (e.offsetY / (img.offsetWidth || 1)) * 110

            // move result
            let posX = e.offsetX + 120
            let posY = e.offsetY + 120

            zoomResult.current!.style.cssText = `
                        background-image: url(${img.src});
                        background-size: ${(img.width || 1) * size}px ${
                (img.height || 1) * size
            }px;
                        background-position : ${x}% ${y}%;
                        left: ${posX}px;  
                        top: ${posY}px;
                    `
        }
        function handleMouseLeave() {
            zoomResult.current?.classList.add('hidden')
        }

        return () => {
            imgs.forEach((img) => {
                img?.removeEventListener('mousemove', (e) => {
                    handleZoomImg(e, img)
                })
                img?.removeEventListener('mouseleave', handleMouseLeave)
            })
        }
    }, [])

    return (
        <div className="w-full lg:w-[50%]">
            <div className="relative mx-auto w-4/5 space-y-2">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mainSwiper"
                >
                    {images.map((image, index) => {
                        if (index !== images.length - 1)
                            return (
                                <SwiperSlide key={index}>
                                    <div
                                        className={`h-[300px] transition-all duration-500 sm:h-[350px] lg:h-[400px] xl:h-[500px]`}
                                    >
                                        <img
                                            src={`/images/products/${image}`}
                                            className="h-full w-full select-none object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                    })}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="thumbSwiper"
                >
                    {images.map((image, index) => {
                        if (index !== images.length - 1)
                            return (
                                <SwiperSlide key={index}>
                                    <div className="relative h-[60px] cursor-pointer sm:h-[80px] lg:h-[100px]">
                                        <Image
                                            src={`/images/products/${image}`}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                    })}
                </Swiper>
                <div
                    ref={zoomResult}
                    className="pointer-events-none absolute z-10 h-[250px] w-[250px] -translate-x-[50%] -translate-y-[50%] overflow-hidden rounded-full shadow-lg"
                ></div>
            </div>
        </div>
    )
}

export default ProductImage
