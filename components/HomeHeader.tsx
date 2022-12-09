import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import Tippy from '@tippyjs/react/headless'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBagShopping,
    faUser,
    faPhone,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'

import Button from './Button'
import SearchBox from './SearchBox'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
    isScrollDown,
    isScrollUp,
    setHeaderBlur,
    setToggleLogin,
} from '../redux/headerSlice'
import { deleteCartItem } from '../redux/cartSlice'

import 'tippy.js/animations/scale.css'

let scrolled: number = 0

const variants = {
    visible: {
        y: 0,
    },
    hidden: {
        y: -50,
        opacity: 0,
        transition: {
            y: { duration: 0.5 },
        },
    },
}
const HomeHeader: React.FC = () => {
    const { data: session } = useSession()
    const [visibleUserInfo, setVisibleUserInfo] = useState(false)
    const [visibleCart, setVisibleCart] = useState(false)
    const dispatch = useAppDispatch()
    const headerBlur = useAppSelector((state) => state.headerState.headerBlur)
    // const [isScroll, setIsScroll] = useState<boolean>(false)
    const isScroll = useAppSelector((state) => state.headerState.isScroll)
    const products = useAppSelector((state) => state.cart.products)
    const cartCount = products.length
    const subTotal = products.reduce(
        (subTotal, item) => subTotal + item.price * item.quantity,
        0
    )

    useEffect(() => {
        const scrollHandler = () => {
            window.scrollY > 80
                ? dispatch(setHeaderBlur(true))
                : dispatch(setHeaderBlur(false))
            if (window.scrollY > scrolled + 100) {
                scrolled = window.scrollY
                dispatch(isScrollDown())
            }
            if (window.scrollY < scrolled - 20) {
                scrolled = window.scrollY
                dispatch(isScrollUp())
            }
        }
        window.addEventListener('scroll', scrollHandler)
        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    return (
        <header
            className={`sticky top-0 z-[9999] w-full pt-4 transition-colors duration-500 ${
                headerBlur ? 'bg-black/90 backdrop-blur' : ''
            }`}
        >
            <motion.div className="container mx-auto flex h-[5rem] items-center justify-between border-b border-slate-50/10 px-4">
                <motion.div
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    transition={{ type: 'spring' }}
                    className="flex h-full w-[500px] items-center"
                    variants={{ like: { x: 200 } }}
                >
                    {/* <Link href={'/'}>
                        <a className="relative -ml-6 block h-[80px] w-[250px]">
                            <Image
                                src={'/images/logo/logo.png'}
                                layout="fill"
                                objectFit="cover"
                            />
                        </a>
                    </Link> */}
                    <Link
                        href={'/'}
                        // className="mx-auto block w-fit font-rubik text-3xl tracking-widest"
                    >
                        <a className="block w-fit font-rubik text-3xl tracking-widest">
                            <span className="text-shop-orange">Benit</span>
                            <span className="text-white">store</span>
                        </a>
                    </Link>
                </motion.div>
                <SearchBox />
                {/* the right side of the header  */}
                <div className="flex w-[500px] items-center justify-end space-x-4 text-shop-orange">
                    <div className="mr-8 flex items-center gap-4 text-sm text-shop-orange">
                        <FontAwesomeIcon icon={faPhone} className="h-6 w-6" />
                        <div>
                            <span> Hotline</span>
                            <p className="font-bold">
                                {' '}
                                0704042964 (8:30 - 22:30){' '}
                            </p>
                        </div>
                    </div>

                    {!session && (
                        <Button
                            text="Đăng nhập"
                            onClick={() => dispatch(setToggleLogin(true))}
                        />
                    )}
                    {session && (
                        <Tippy
                            interactive
                            visible={visibleUserInfo}
                            offset={[0, 5]}
                            render={(attrs) => (
                                <div
                                    className="rounded-xl bg-black/60 py-2 px-4 text-center text-sm"
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    <Link href={'/user'}>
                                        <a className="block cursor-pointer py-1 hover:text-shop-orange">
                                            {' '}
                                            Thông tin tài khoản{' '}
                                        </a>
                                    </Link>
                                    <div className="cursor-pointer py-1 hover:text-shop-orange">
                                        Đơn hàng
                                    </div>
                                    <div
                                        onClick={() => signOut()}
                                        className="mt-2 cursor-pointer border-t-[1px] border-slate-400 py-2 hover:text-shop-orange"
                                    >
                                        {' '}
                                        Đăng xuất{' '}
                                    </div>
                                </div>
                            )}
                            onClickOutside={() => setVisibleUserInfo(false)}
                        >
                            <button
                                className={`flex items-center gap-2 rounded-2xl bg-black/50 p-1 pr-3 ${
                                    visibleUserInfo
                                        ? 'ring-2 ring-shop-orange/70'
                                        : ''
                                }`}
                                onClick={() =>
                                    setVisibleUserInfo(!visibleUserInfo)
                                }
                            >
                                <div className="relative h-8 w-8 overflow-hidden rounded-xl">
                                    {session?.user?.image ? (
                                        <Image
                                            src={`${session?.user?.image}`}
                                            layout="fill"
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <small>{session?.user?.name}</small>
                            </button>
                        </Tippy>
                    )}
                    <Tippy
                        interactive
                        offset={[0, 13]}
                        render={(attrs) => (
                            <div
                                className="w-[350px] rounded-xl bg-slate-900/90 p-2 text-center text-sm"
                                tabIndex={-1}
                                {...attrs}
                            >
                                {' '}
                                <div>
                                    {products.map(
                                        (product: any, index: any) => (
                                            <div
                                                key={index}
                                                className="relative hover:bg-slate-700"
                                            >
                                                <Link
                                                    href={`/products/${product.slug.toLowerCase()}`}
                                                >
                                                    <a className="relative flex cursor-pointer gap-2 border-b-[1px] border-slate-400 p-2 ">
                                                        <div className="relative h-[70px] w-[70px] overflow-hidden rounded-xl">
                                                            <Image
                                                                src={`/images/products/${product.imageDefault}`}
                                                                layout="fill"
                                                                objectFit="cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col items-start justify-between">
                                                            <div>
                                                                <h2 className="font-bold text-slate-100">
                                                                    {
                                                                        product.name
                                                                    }
                                                                </h2>
                                                                <p className="text-left text-slate-300">
                                                                    {' '}
                                                                    Size:{' '}
                                                                    {
                                                                        product.size
                                                                    }
                                                                </p>
                                                            </div>
                                                            <p className="text-left">
                                                                <span className="text-red-500">
                                                                    {
                                                                        product.quantity
                                                                    }{' '}
                                                                    x{' '}
                                                                </span>
                                                                <span>
                                                                    {product.price.toLocaleString(
                                                                        'vi-VN',
                                                                        {
                                                                            style: 'currency',
                                                                            currency:
                                                                                'VND',
                                                                        }
                                                                    )}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </a>
                                                </Link>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className="absolute top-2 right-2 h-6 w-6 cursor-pointer hover:text-black"
                                                    onClick={(e) => {
                                                        dispatch(
                                                            deleteCartItem({
                                                                _id: product._id,
                                                                size: product.size,
                                                            })
                                                        )
                                                    }}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="mt-2 py-2 text-base font-bold">
                                    <span> Tổng số phụ: </span>
                                    <span className="text-pink-500">
                                        {' '}
                                        {subTotal.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                </div>
                                <button className="mx-auto my-4 block rounded-xl bg-black/70 px-8 py-3 font-bold transition hover:bg-slate-400 hover:text-slate-800">
                                    {' '}
                                    Thanh Toán{' '}
                                </button>
                            </div>
                        )}
                    >
                        <div>
                            <Link href={'/cart'}>
                                <a className="relative block">
                                    <FontAwesomeIcon
                                        icon={faBagShopping}
                                        className="h-6 w-6"
                                    ></FontAwesomeIcon>
                                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-shop-orange/90 text-sm text-black">
                                        {' '}
                                        {cartCount}
                                    </span>
                                </a>
                            </Link>
                        </div>
                        {/* <span>cc</span> */}
                    </Tippy>
                    {/*   <FontAwesomeIcon
                        icon={faUser}
                        className="h-6 w-6"
                    ></FontAwesomeIcon> */}
                    {/*   <Tippy
                        interactive
                        visible={visibleUserInfo}
                        offset={[0, 5]}
                        render={(attrs) => (
                            <div
                                className="rounded-xl bg-slate-500/50 p-2 text-center text-sm"
                                tabIndex={-1}
                                {...attrs}
                            >
                                <div className="cursor-pointer hover:text-sky-400">
                                    {' '}
                                    Thông tin tài khoản{' '}
                                </div>
                                <div className="cursor-pointer hover:text-sky-400">
                                    hello
                                </div>
                                <div
                                    onClick={() => signOut()}
                                    className="cursor-pointer hover:text-sky-400"
                                >
                                    {' '}
                                    Đăng xuất{' '}
                                </div>
                            </div>
                        )}
                        onClickOutside={() => setVisibleUserInfo(false)}
                    >
                        <Link href={'/cart'}>
                            <a className="relative block">
                                <FontAwesomeIcon
                                    icon={faBagShopping}
                                    className="h-6 w-6"
                                ></FontAwesomeIcon>
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-sm">
                                    {' '}
                                    {cartCount}
                                </span>
                            </a>
                        </Link>
                    </Tippy> */}
                    {/*  <Image
                        src={'/images/avatar.jpg'}
                        height={40}
                        width={40}
                        // layout="fill"
                        objectFit="cover"
                    /> */}
                </div>
            </motion.div>
            <motion.div
                className={`left-0 right-0 -z-10 -translate-y-[100%] overflow-hidden ${
                    isScroll ? 'absolute' : ''
                }`}
                variants={variants}
                animate={isScroll ? 'hidden' : 'visible'}
            >
                <motion.ul
                    className="mx-auto flex w-fit gap-4 text-slate-200"
                    initial={{ y: -30 }}
                    animate={{ y: 0 }}
                >
                    <Link href={'/products'}>
                        <a className="group relative cursor-pointer p-4 font-bold tracking-wider hover:text-shop-orange">
                            {' '}
                            Cửa hàng{' '}
                            <span className="absolute bottom-0 left-0 h-[5px] w-0 rounded-xl bg-shop-orange transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </Link>
                    <Link href={'/men'}>
                        <a className="group relative cursor-pointer p-4 font-bold tracking-wider hover:text-shop-orange">
                            {' '}
                            Nam{' '}
                            <span className="absolute bottom-0 left-0 h-[5px] w-0 rounded-xl bg-shop-orange transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </Link>
                    <Link href={'/women'}>
                        <a className="group relative cursor-pointer p-4 font-bold tracking-wider hover:text-shop-orange">
                            {' '}
                            Nữ{' '}
                            <span className="absolute bottom-0 left-0 h-[5px] w-0 rounded-xl bg-shop-orange transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </Link>
                    <Link href={'/kid'}>
                        <a className="group relative cursor-pointer p-4 font-bold tracking-wider hover:text-shop-orange">
                            {' '}
                            Trẻ em{' '}
                            <span className="absolute bottom-0 left-0 h-[5px] w-0 rounded-xl bg-shop-orange transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </Link>
                    <Link href={'/sales'}>
                        <a className="group relative cursor-pointer p-4 font-bold tracking-wider hover:text-shop-orange">
                            {' '}
                            Giảm giá{' '}
                            <span className="absolute bottom-0 left-0 h-[5px] w-0 rounded-xl bg-shop-orange transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </Link>
                </motion.ul>
            </motion.div>
        </header>
    )
}

export default HomeHeader
