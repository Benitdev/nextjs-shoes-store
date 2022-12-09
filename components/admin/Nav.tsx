import Image from 'next/image'
import Link from 'next/link'
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
    const { cate } = router.query
    return (
        <div className="shadow-nav sticky top-0 left-0 z-[999px] h-screen w-[300px] bg-black/50">
            <div className="relative flex h-[150px] items-center justify-center">
                <Link
                    href={'/'}
                    // className="mx-auto block w-fit font-rubik text-3xl tracking-widest"
                >
                    <a className="block w-fit font-rubik text-3xl tracking-widest">
                        <span className="text-shop-orange">Benit</span>
                        <span className="text-white">store</span>
                    </a>
                </Link>
            </div>
            <div className="flex-center mt-6 flex flex-1 flex-col gap-4 px-4">
                {menus.map((menu, index) => (
                    <Link href={`/admin/${menu}`} key={index}>
                        <a
                            className={`block w-full rounded-xl py-4 text-center font-bold capitalize text-slate-200 hover:bg-shop-orange hover:text-slate-900 ${
                                menu == cate
                                    ? 'bg-shop-orange text-slate-900'
                                    : ''
                            }`}
                        >
                            {menu}
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Nav
