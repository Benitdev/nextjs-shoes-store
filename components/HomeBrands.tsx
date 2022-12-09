import Image from 'next/image'
import React from 'react'

type Props = {}

const brandList = [
    {
        name: 'nike',
        slug: 'nike',
        imageURL: '/images/logo/nike.png',
    },
    {
        name: 'adidas',
        slug: 'adidas',
        imageURL: '/images/logo/adidas.png',
    },
    {
        name: 'vans',
        slug: 'vans',
        imageURL: '/images/logo/vans.png',
    },
    {
        name: 'fila',
        slug: 'fila',
        imageURL: '/images/logo/fila.png',
    },
    {
        name: 'converse',
        slug: 'converse',
        imageURL: '/images/logo/converse.png',
    },
]

const HomeBrands = (props: Props) => {
    return (
        <div className="relative left-[calc(-50vw+50%)] w-[calc(100vw)] bg-shop-orange/30 px-10">
            <div className="mx-auto flex h-[200px] items-center justify-between px-[10px]">
                {brandList.map((item) => (
                    <div
                        key={item.slug}
                        className="relative h-[100px] w-[200px]"
                    >
                        <Image
                            src={item.imageURL}
                            alt="brand"
                            layout="fill"
                            // objectFit="cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomeBrands
