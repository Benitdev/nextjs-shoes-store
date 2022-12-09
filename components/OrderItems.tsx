import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { useAppDispatch } from '../redux/hooks'
import { setIsLoading } from '../redux/headerSlice'

import CommentBox from './CommentBox'

const OrderItems = ({ order, setRefetch }: any) => {
    const dispatch = useAppDispatch()
    const [popup, setPopup] = useState<boolean>(false)
    const handleDeleteOrder = async () => {
        dispatch(setIsLoading(true))
        await axios.put(`/api/orders`, { id: order._id, orderState: 4 })
        dispatch(setIsLoading(false))
        toast.success('Huỷ đơn hàng thành công!')
        setRefetch((pre: boolean) => !pre)
    }
    const [showComment, setShowComment] = useState<boolean>(false)

    const checkCommentedAll = order.orderItems.find(
        (item: any) => !item.commented
    )
    return (
        <div
            key={order._id}
            className="relative mx-auto rounded-xl bg-slate-500/40 pb-4"
        >
            <div className="flex justify-between border-b-[1px] border-slate-900/70 px-6 py-2">
                <h3 className=" font-sans text-sm capitalize text-slate-200">
                    mã đơn hàng: <span className="font-bold ">{order._id}</span>
                </h3>
                <span className="text-sm font-bold text-slate-300">
                    {' '}
                    Ngày tạo:{' '}
                    <span>
                        {new Date(order.createdAt).toLocaleString('en-US')}
                    </span>
                </span>
            </div>
            <div className="grid grid-cols-6 px-6 py-2">
                <div className="col-span-2">
                    <div
                        className={`space-y-2 transition-all duration-300 ${
                            popup
                                ? 'max-h-[300px] overflow-y-auto'
                                : 'max-h-[60px] overflow-hidden'
                        }`}
                    >
                        {order.orderItems.map((item: any, index: number) => (
                            <Link href={`/products/${item.slug}`} key={index}>
                                <a className="flex cursor-pointer items-center gap-2 hover:bg-slate-100/10">
                                    <div className="relative h-14 w-14">
                                        <Image
                                            src={`/images/products/${item.image}`}
                                            width={50}
                                            height={50}
                                            objectFit="cover"
                                            className="rounded-lg"
                                        />
                                    </div>
                                    <div className="leading-none">
                                        <h1 className="w-full truncate text-sm font-bold tracking-wider text-shop-orange">
                                            {item.name}
                                        </h1>
                                        <span className="text-sm text-shop-orange">
                                            size: {item.size}
                                        </span>
                                        <p className="text-sm font-bold">
                                            <span className="text-shop-orange">
                                                {item.quantity} x{' '}
                                            </span>
                                            <span className="text-shop-orange">
                                                {item.price.toLocaleString(
                                                    'vi-VN',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>
                    {order.orderItems.length > 1 && (
                        <button
                            className="mx-auto mt-2 block rounded-md bg-shop-orange px-4 py-1 text-xs text-slate-900 hover:text-slate-900"
                            onClick={() => setPopup(!popup)}
                        >
                            {!popup ? 'Xem thêm' : 'Ẩn bớt'}
                        </button>
                    )}
                </div>
                <div className="text-center">
                    {' '}
                    <p className="text-sm text-slate-200"> Tổng tiền</p>
                    <p className="font-bold text-shop-orange">
                        {order.totalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-slate-200"> Mã giảm giá </p>
                </div>
                <div className="col-span-2 text-center">
                    <p className="text-sm text-slate-200">
                        {' '}
                        Địa chỉ giao hàng{' '}
                    </p>
                    <p className="text-sm text-shop-orange">
                        {order.shippingAddress}
                    </p>
                </div>
            </div>
            {(order.orderState == 0 || order.orderState == 1) && (
                <button
                    className="absolute bottom-2 right-2 rounded-xl bg-red-500 px-3 py-1 text-xs text-slate-900 hover:scale-110"
                    onClick={handleDeleteOrder}
                >
                    {' '}
                    Huỷ đơn hàng
                </button>
            )}

            {order.orderState == 4 && (
                <span className="absolute bottom-2 right-2 rounded-xl bg-red-500/70 px-3 py-1 text-xs text-slate-900">
                    {' '}
                    Ngày huỷ:{' '}
                    {new Date(order.updatedAt).toLocaleString('en-US')}
                </span>
            )}

            {order.orderState == 3 && checkCommentedAll && (
                <>
                    <button
                        className="absolute bottom-2 right-2 rounded-xl bg-red-500 px-4 py-1 text-xs font-bold text-slate-900 hover:scale-110"
                        onClick={() => setShowComment(true)}
                    >
                        {' '}
                        Đánh giá
                    </button>
                    {showComment && (
                        <CommentBox
                            order={order}
                            setShowComment={setShowComment}
                            setRefetch={setRefetch}
                        />
                    )}
                </>
            )}
            {order.orderState == 3 && !checkCommentedAll && (
                <button className="pointer-events-none absolute bottom-2 right-2 rounded-xl bg-red-800 px-4 py-1 text-xs font-bold text-slate-900">
                    {' '}
                    Đã đánh giá
                </button>
            )}
        </div>
    )
}

export default OrderItems
