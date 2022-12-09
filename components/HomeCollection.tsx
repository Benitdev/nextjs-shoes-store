import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeCollection: React.FC = () => {
    return (
        <div className="py-10">
            <h2 className="text-center font-vibes text-3xl tracking-widest text-shop-orange">
                {' '}
                Shoes Category
            </h2>
            <h1 className="pb-10 pt-5 text-center text-4xl font-bold tracking-widest text-slate-100 underline underline-offset-4">
                {' '}
                <span className="text-shop-orange">WH</span>O ARE YOU SHOPPING
                FOR?{' '}
            </h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Link href={'men'}>
                    <div className="group relative h-[400px] cursor-pointer xl:h-[500px]">
                        <Image
                            src={'/images/collection/men.webp'}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-200 group-hover:scale-150"
                        />
                        <span className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black/70 p-4 py-2 text-2xl text-white">
                            {' '}
                            MEN{' '}
                        </span>
                    </div>
                </Link>
                <Link href={'women'}>
                    <div className="group relative h-[400px] cursor-pointer xl:h-[500px]">
                        <Image
                            src={'/images/collection/women.webp'}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-200 group-hover:scale-150"
                        />
                        <span className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] bg-black/70 p-4 py-2 text-2xl text-white">
                            {' '}
                            WOMEN{' '}
                        </span>
                    </div>
                </Link>
                <Link href={'kid'}>
                    <div className="group relative h-[400px] cursor-pointer xl:h-[500px]">
                        <Image
                            src={'/images/collection/kid.webp'}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-200 group-hover:scale-150"
                        />
                        <span className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] bg-black/70 p-4 py-2 text-2xl text-white">
                            {' '}
                            KIDS{' '}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default HomeCollection
