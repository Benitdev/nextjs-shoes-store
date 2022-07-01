import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SearchItem = ({ item }: any) => {
    return (
        <div className="">
            <div className="">
                <Link href={`/products/${item.slug}`}>
                    <div className="flex cursor-pointer items-center gap-2 rounded-xl hover:bg-slate-100/10">
                        <div className="relative h-14 w-14 overflow-hidden">
                            <Image
                                src={`/images/products/${item.imageDefault}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex-1 pr-2 leading-none ">
                            <h1 className="flex w-full justify-between truncate py-1 text-sm font-bold tracking-wider text-slate-200">
                                <span className="w-60 truncate text-left">
                                    {item.name}
                                </span>
                                <span className="flex flex-col text-right capitalize text-slate-400">
                                    {item.category}
                                    <span className="text-red-500">
                                        {item.childrenCategory}
                                    </span>
                                </span>
                            </h1>

                            <p className="text-left text-sm font-bold">
                                <span className="text-pink-600">
                                    {item.price.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </span>
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SearchItem
