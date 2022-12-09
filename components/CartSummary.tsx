import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import {
    faCreditCard,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import useDebounce from '../hooks/useDebounce'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import cartApi from '../api/cartApi'
import Loading from './common/Loading'
import LoadingIcon from './common/LoadingIcon'

const CartSummary = () => {
    const router = useRouter()
    const [coupon, setCoupon] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [couponSuccess, setCouponSuccess] = useState<any>(
        Cookies.get('coupon') ? JSON.parse(`${Cookies.get('coupon')}`) : ''
    )
    const cartItems = useAppSelector((state) => state.cart.products)
    const subTotal = cartItems.reduce((subTotal, item) => {
        if (item.isChecked) {
            return subTotal + item.price * item.quantity
        }
        return subTotal
    }, 0)
    let total = subTotal
    if (couponSuccess) {
        total =
            couponSuccess.type === 0
                ? subTotal - couponSuccess.value
                : (subTotal * (100 - couponSuccess.value)) / 100
    }
    const checkCoupon = async () => {
        try {
            setLoading(true)
            const data = await cartApi.checkCoupon({ code: coupon })
            toast.success('Thêm mã giảm giá thành công!')
            Cookies.set('coupon', JSON.stringify(data), {
                expires: 3 / (60 * 24),
            })
            setLoading(false)
            setCouponSuccess(data)
        } catch (err) {
            console.log(err)
            toast.error('Mã giảm giá không hợp lệ!')
            setLoading(false)
        }
    }
    console.log({ cartItems })
    return (
        <div className="w-[300px]">
            <h1 className="border-b-2 border-shop-orange indent-2 text-2xl font-bold capitalize tracking-widest text-shop-orange">
                {' '}
                thông tin sơ lược
            </h1>
            <div className="mt-4 space-y-2 rounded-3xl bg-slate-600/30 p-4 px-6 text-slate-200">
                <div className="flex justify-between ">
                    <h2 className="font-serif"> Tạm tính: </h2>
                    <span>
                        {subTotal.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                </div>
                <div>
                    <h2 className="font-serif"> Giao hàng: </h2>
                    <p className="ml-4 text-sm">
                        Giao Hàng Tận Nơi. Nhân viên báo phí vận chuyển.
                    </p>
                </div>
                <div className="border-b-[1px] pb-4">
                    <h2 className="font-serif"> Mã giảm giá: </h2>
                    <div className="mt-2 flex gap-2 px-4">
                        <input
                            type="text"
                            value={coupon}
                            className="w-40 bg-slate-200 px-2 text-slate-900 outline-none ring-shop-orange placeholder:text-sm focus:ring-4"
                            placeholder="Điền mã giảm giá"
                            onChange={(e) => setCoupon(e.target.value.trim())}
                        />
                        <button
                            className="bg-shop-orange px-4 py-1 font-bold text-slate-900"
                            onClick={checkCoupon}
                        >
                            {loading ? <LoadingIcon /> : 'Tra'}
                        </button>
                    </div>
                    {couponSuccess && (
                        <div className="mt-2 flex justify-between">
                            <span className="font-serif text-shop-orange">
                                {couponSuccess.code}
                            </span>
                            <span className="font-bold text-shop-orange">
                                -{' '}
                                {couponSuccess.type === 0
                                    ? couponSuccess.value.toLocaleString(
                                          'vi-VN',
                                          {
                                              style: 'currency',
                                              currency: 'VND',
                                          }
                                      )
                                    : `${couponSuccess.value}%`}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex justify-between p-2">
                    <h2 className="font-serif"> Tổng : </h2>
                    <span className="font-bold text-shop-orange">
                        {total.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                </div>
            </div>
            <div className="mt-4">
                <Link href={'/checkout'}>
                    <a className="button-effect flex h-14 w-full items-center justify-center gap-4 rounded-2xl bg-shop-orange/70 font-bold capitalize text-slate-200 shadow-2xl">
                        {' '}
                        thanh toán
                        <FontAwesomeIcon
                            icon={faCreditCard}
                            className="h-6 w-6"
                        />
                    </a>
                </Link>
            </div>
            <div className="mt-4">
                <button
                    className="button-effect flex h-14 w-full items-center justify-center gap-4 rounded-2xl bg-black/70 font-bold capitalize text-slate-200 shadow-2xl"
                    onClick={() => router.back()}
                >
                    {' '}
                    Quay lại
                    <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="h-6 w-6"
                    />
                </button>
            </div>
        </div>
    )
}

export default CartSummary
