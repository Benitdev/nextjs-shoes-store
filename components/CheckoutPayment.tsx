import React, { useEffect, useState } from 'react'
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js'

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import axios from 'axios'
import { setIsLoading } from '../redux/headerSlice'
import { onApproveOrder } from '../redux/cartSlice'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Cookies from 'js-cookie'

const paymentMethods = [
    'thanh toán khi nhận hàng',
    'Chuyển khoản qua tài khoản ngân hàng',
    'Momo',
    'Paypal',
]
const CheckoutPayment = ({ session, addressInfo, setCheckoutStage }: any) => {
    const dispatch = useAppDispatch()
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
    const [paymentMethod, setPaymentMethod] = useState<number>(0)
    const cartItems = useAppSelector((state) =>
        state.cart.products.filter((item) => item.isChecked)
    )

    const subTotal = cartItems.reduce((subTotal, item) => {
        return subTotal + item.price * item.quantity
    }, 0)

    const couponSuccess = Cookies.get('coupon')
        ? JSON.parse(`${Cookies.get('coupon')}`)
        : null

    let total = subTotal
    let couponValue = 0
    if (couponSuccess) {
        couponValue =
            couponSuccess.type === 0
                ? couponSuccess.value
                : (subTotal * couponSuccess.value) / 100
        total =
            couponSuccess.type === 0
                ? subTotal - couponSuccess.value
                : (subTotal * (100 - couponSuccess.value)) / 100
    }
    useEffect(() => {
        const loadPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/keys/paypal')
            paypalDispatch({
                type: 'resetOptions',
                value: {
                    'client-id': clientId,
                    currency: 'USD',
                },
            })
        }
        loadPaypalScript()
    }, [])
    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: `${Math.floor(total + 69696 / 23000)}`,
                    },
                },
            ],
        })
    }
    const onApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            const name = details.payer.name.given_name
            alert(`Transaction completed by ${name}`)
        })
    }
    const handleSubmitPayment = async () => {
        try {
            dispatch(setIsLoading(true))
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems.map((item) => {
                    return {
                        _id: item._id,
                        slug: item.slug,
                        name: item.name,
                        size: item.size,
                        quantity: item.quantity,
                        image: item.imageDefault,
                        price: item.price,
                    }
                }),
                shippingAddress: `${addressInfo?.address}, ${addressInfo?.ward}, ${addressInfo?.district}, ${addressInfo?.province}`,
                paymentMethod,
                itemsPrice: subTotal,
                shippingPrice: 0,
                totalPrice: subTotal,
                isPaid: false,
                isDelivered: false,
            })
            dispatch(onApproveOrder(''))
            dispatch(setIsLoading(false))
            toast.success('Đặt hàng thành công!')
            setCheckoutStage((pre: any) => pre + 1)
        } catch (e) {
            toast.error(`${e}`)
        }
    }
    return (
        <div className="mx-auto mt-6 w-[900px]">
            <h1 className="mb-4 font-sans text-xl font-bold text-slate-200">
                3. Chọn hình thức thanh toán
            </h1>
            <div className="flex justify-between gap-6">
                <div className="w-[450px]">
                    <div className="h-fit rounded-xl bg-slate-600/30 p-6">
                        <div className="space-y-4">
                            {paymentMethods.map((method, index) => (
                                <div>
                                    <button
                                        key={index}
                                        className="flex items-center gap-4"
                                        onClick={() => setPaymentMethod(index)}
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-black bg-slate-400">
                                            <span
                                                className={`block h-3/4 w-3/4 rounded-full bg-pink-600 ${
                                                    index === paymentMethod
                                                        ? 'scale-100'
                                                        : 'scale-0'
                                                } transition duration-200`}
                                            ></span>
                                        </span>
                                        <p
                                            className={`text-sm font-bold capitalize tracking-wider ${
                                                index === paymentMethod
                                                    ? 'text-pink-500'
                                                    : 'text-slate-200'
                                            }`}
                                        >
                                            {' '}
                                            {method}
                                        </p>
                                    </button>
                                    <div
                                        className={`mt-4 overflow-y-auto text-slate-200 ${
                                            index === paymentMethod
                                                ? 'max-h-[500px]'
                                                : 'max-h-0'
                                        } transition-all duration-200`}
                                    >
                                        {paymentMethod === 3 && index === 3 && (
                                            <PayPalButtons
                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w mt-6 space-y-6">
                        <p className="text-sm text-slate-300">
                            Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn
                            đặt hàng, hỗ trợ trải nghiệm của bạn trên toàn bộ
                            trang web này và cho các mục đích khác được mô tả
                            <a className="text-sky-400">
                                {' '}
                                chính sách riêng tư{' '}
                            </a>
                            trong của chúng tôi.
                        </p>
                        <button
                            className="rounded-xl bg-pink-600 px-14 py-4 font-bold text-slate-800"
                            onClick={handleSubmitPayment}
                        >
                            {' '}
                            Đặt hàng{' '}
                        </button>
                    </div>
                </div>
                <div className="w-[400px] space-y-4">
                    <div className="rounded-xl bg-slate-600/30 p-4 px-6">
                        <h3 className="flex justify-between border-b-[1px] pb-2 text-sm font-bold capitalize tracking-wider text-slate-200">
                            giao hàng đến địa chỉ
                            <button
                                className="rounded-md bg-pink-600 px-2 text-slate-300 hover:text-slate-900"
                                onClick={() => setCheckoutStage(1)}
                            >
                                {' '}
                                Sửa{' '}
                            </button>
                        </h3>
                        <div className="space-y-1 px-3 py-2 text-sm text-slate-300">
                            <div>
                                <span>
                                    <span className="mr-2 font-bold">
                                        {' '}
                                        Họ tên:{' '}
                                    </span>
                                    {addressInfo?.name}
                                </span>
                            </div>
                            <div>
                                <span className="">
                                    <span className="mr-2 font-bold">
                                        Số điện thoại:
                                    </span>{' '}
                                    {addressInfo?.phone}
                                </span>
                            </div>
                            <div>
                                <span className="">
                                    <span className="mr-2 font-bold">
                                        Địa chỉ:
                                    </span>{' '}
                                    {addressInfo?.address}, {addressInfo?.ward}{' '}
                                    ,{addressInfo?.district} ,
                                    {addressInfo?.province}.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-slate-600/30 p-4 px-6">
                        <h3 className="flex justify-between border-b-[1px] pb-2 text-sm font-bold capitalize tracking-wider text-slate-200">
                            giỏ hàng
                            <Link href="/cart">
                                <button className="rounded-md bg-pink-600 px-2 text-slate-300  hover:text-slate-900">
                                    {' '}
                                    Sửa{' '}
                                </button>
                            </Link>
                        </h3>
                        <div className="px-4">
                            {cartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="border-b-[1px] border-slate-500 p-2"
                                >
                                    <h3 className="text-slate-200">
                                        <span>
                                            {item.quantity} x{' '}
                                            <span className="font-sans text-sm font-bold">
                                                Size {item.size}
                                            </span>{' '}
                                            -{' '}
                                        </span>
                                        <span className="font-sans font-bold text-sky-400">
                                            {item.name}
                                        </span>
                                    </h3>
                                    <p className="font-bold text-pink-400">
                                        {(
                                            item.quantity * item.price
                                        ).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                </div>
                            ))}
                            <div className="text-sm">
                                <div className="flex justify-between px-4 py-1 text-slate-200">
                                    <span> Tạm tính: </span>
                                    <span>
                                        {subTotal.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between px-4 py-1 text-slate-200">
                                    <span> Phụ phí: </span>
                                    <span>
                                        +{' '}
                                        {Number(69696).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between px-4 py-1 text-slate-200">
                                    <span> Giảm giá: </span>
                                    <span>
                                        {couponValue !== 0 && '-'}
                                        {couponValue.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between border-t-[1px] border-slate-500 py-2 px-2 text-slate-200">
                                <span> Tổng cộng: </span>
                                <span className="font-bold text-red-500">
                                    {Number(total + 69696).toLocaleString(
                                        'vi-VN',
                                        {
                                            style: 'currency',
                                            currency: 'VND',
                                        }
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPayment
