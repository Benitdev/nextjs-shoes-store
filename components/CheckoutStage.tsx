import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAppSelector } from '../redux/hooks'

import CheckoutAddress from './CheckoutAddress'
import CheckoutPayment from './CheckoutPayment'
import CheckoutSuccess from './CheckoutSuccess'

const stages = [
    'giỏ hàng',
    'địa chỉ giao hàng',
    'phương thức thanh toán',
    'hoàn tất đặt hàng',
]
const CheckoutStage = ({ session }: any) => {
    const router = useRouter()
    const [checkoutStage, setCheckoutStage] = useState<number>(1)
    const [addressForm, setAddressForm] = useState<any>()
    if (checkoutStage == 0) router.push('/cart')
    const cartItems = useAppSelector((state) =>
        state.cart.products.filter((item) => item.isChecked)
    )
    console.log(cartItems)
    if (cartItems.length === 0)
        return (
            <div className="text-sl mt-10 text-center font-bold uppercase text-pink-400">
                {' '}
                Giỏ hàng của bạn trống!!!
                <Link href={'/cart'}>
                    <a className="mx-auto mt-10 block w-40 rounded-xl bg-pink-700 px-10 py-5 font-bold text-slate-900 hover:text-slate-600">
                        {' '}
                        Quay lại{' '}
                    </a>
                </Link>
            </div>
        )
    return (
        <div>
            <div className="mx-auto h-28 w-[900px] rounded-2xl bg-slate-700/50">
                <div className="flex h-full items-center justify-between px-16">
                    {stages.map((stage, index) => (
                        <>
                            <button
                                key={index}
                                className={`pointer-events-none relative h-6 w-6 rounded-full ${
                                    checkoutStage >= index
                                        ? 'bg-pink-700'
                                        : 'bg-slate-300/80'
                                }`}
                            >
                                {index + 1}
                                <span
                                    className={`absolute top-[130%] left-1/2 w-max -translate-x-1/2 text-sm font-bold capitalize ${
                                        checkoutStage >= index
                                            ? 'text-pink-600'
                                            : 'text-slate-200'
                                    }`}
                                >
                                    {stage}
                                </span>
                            </button>
                            {index !== stages.length - 1 && (
                                <span
                                    key={index + 999}
                                    className="block h-2 flex-1 bg-slate-300"
                                >
                                    <span
                                        className={`block h-full bg-pink-600 transition-all duration-300 ${
                                            checkoutStage > index
                                                ? 'w-full'
                                                : ' w-0'
                                        }`}
                                    ></span>
                                </span>
                            )}
                        </>
                    ))}
                </div>
            </div>
            {checkoutStage === 1 && (
                <CheckoutAddress
                    session={session}
                    setAddressForm={setAddressForm}
                    setCheckoutStage={setCheckoutStage}
                />
            )}
            {checkoutStage === 2 && (
                <CheckoutPayment
                    session={session}
                    addressInfo={addressForm}
                    setCheckoutStage={setCheckoutStage}
                />
            )}
            {checkoutStage === 3 && <CheckoutSuccess />}
        </div>
    )
}

export default CheckoutStage
