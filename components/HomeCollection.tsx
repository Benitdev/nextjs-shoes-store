import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeCollection: React.FC = () => {
    return (
        <div>
            <p className="py-10 text-4xl font-bold tracking-widest text-slate-200 underline underline-offset-4">
                {' '}
                WHO ARE YOU SHOPPING FOR?{' '}
            </p>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Link href={'products/men'}>
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
                <Link href={'products/women'}>
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
                <Link href={'products/kid'}>
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
