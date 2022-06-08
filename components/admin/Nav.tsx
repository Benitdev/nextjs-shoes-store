import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const menus = [
    'dashboard',
    'customers',
    'products',
    'orders',
    'analytics',
    'categories',
    'discount',
    'banner',
    'settings',
]

const Nav = () => {
    const router = useRouter()
    return (
        <div className="shadow-nav fixed top-0 left-0 z-[999px] h-screen w-[300px] bg-black/50">
            <div className="relative h-[150px] ">
                <Image
                    src={'/images/logo/logo.png'}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="flex-center mt-6 flex h-full flex-col gap-4 px-4">
                {menus.map((menu, index) => (
                    <button
                        className="block w-full rounded-xl py-4 font-bold capitalize text-slate-200 hover:bg-pink-600"
                        key={index}
                        onClick={() =>
                            router.push({
                                pathname: `admin`,
                                query: {
                                    cate: menu,
                                },
                            })
                        }
                    >
                        {menu}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Nav
