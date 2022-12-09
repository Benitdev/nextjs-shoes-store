import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import { faClose, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CommentForm from './CommentForm'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
    order: any
    setShowComment: Dispatch<SetStateAction<boolean>>
    setRefetch: any
}
const CommentBox: React.FC<Props> = ({ order, setShowComment, setRefetch }) => {
    const [showFormComment, setShowFormComment] = useState<boolean>(false)
    const [item, setItem] = useState<any>()
    console.log(showFormComment)
    return (
        <div className="fixed inset-0 z-[999] flex items-center bg-black/50">
            <div className="relative mx-auto w-[500px] rounded-xl bg-slate-300 p-4">
                <h1 className="border-b-2 border-slate-600 py-4 text-center text-xl font-bold capitalize text-slate-700">
                    {' '}
                    đánh giá sản phẩm{' '}
                </h1>
                {!showFormComment ? (
                    <div className="">
                        <p className="mt-2 px-4 text-sm font-bold text-red-900">
                            {' '}
                            Những sản phẩm chưa đánh giá{' '}
                        </p>
                        <div className="mt-2 max-h-[400px] overflow-y-auto">
                            <div className="space-y-2 ">
                                {order.orderItems.map(
                                    (item: any, index: number) => {
                                        if (!item.commented)
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-700/80 p-2 pr-4 hover:bg-slate-700/70"
                                                >
                                                    <div className="flex gap-7">
                                                        <div className="relative h-16 w-16">
                                                            <Image
                                                                src={`/images/products/${item.image}`}
                                                                layout="fill"
                                                                objectFit="cover"
                                                                className="rounded-lg"
                                                            />
                                                        </div>
                                                        <div className="leading-none">
                                                            <h1 className="w-full truncate text-sm font-bold tracking-wider text-slate-200">
                                                                {item.name}
                                                            </h1>
                                                            <span className="text-sm text-slate-300">
                                                                size:{' '}
                                                                {item.size}
                                                            </span>
                                                            <p className="text-sm font-bold">
                                                                <span className="text-red-600">
                                                                    {
                                                                        item.quantity
                                                                    }{' '}
                                                                    x{' '}
                                                                </span>
                                                                <span className="text-slate-300">
                                                                    {item.price.toLocaleString(
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
                                                    </div>
                                                    <button
                                                        className="rounded-xl bg-pink-600/70 px-4 py-2 font-bold text-slate-800 hover:text-slate-200"
                                                        onClick={() => {
                                                            setItem(item)
                                                            setShowFormComment(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        {' '}
                                                        Đánh giá
                                                    </button>
                                                </div>
                                            )
                                    }
                                )}
                            </div>
                        </div>

                        <p className="mt-2 px-4 text-sm font-bold text-slate-900">
                            {' '}
                            Những sản phẩm đã đánh giá{' '}
                        </p>
                        <div className="mt-2 max-h-[400px] overflow-y-auto">
                            <div className="space-y-2 ">
                                {order.orderItems.map(
                                    (item: any, index: number) => {
                                        if (item.commented)
                                            return (
                                                <Link
                                                    href={`/products/${item.slug.toLowerCase()}`}
                                                >
                                                    <div
                                                        key={index}
                                                        className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-700/80 p-2 pr-4 hover:bg-slate-700/70"
                                                    >
                                                        <div className="flex gap-7">
                                                            <div className="relative h-16 w-16">
                                                                <Image
                                                                    src={`/images/products/${item.image}`}
                                                                    layout="fill"
                                                                    objectFit="cover"
                                                                    className="rounded-lg"
                                                                />
                                                            </div>
                                                            <div className="leading-none">
                                                                <h1 className="w-full truncate text-sm font-bold tracking-wider text-slate-200">
                                                                    {item.name}
                                                                </h1>
                                                                <span className="text-sm text-slate-300">
                                                                    size:{' '}
                                                                    {item.size}
                                                                </span>
                                                                <p className="text-sm font-bold">
                                                                    <span className="text-red-600">
                                                                        {
                                                                            item.quantity
                                                                        }{' '}
                                                                        x{' '}
                                                                    </span>
                                                                    <span className="text-slate-300">
                                                                        {item.price.toLocaleString(
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
                                                        </div>
                                                        <button
                                                            className="pointer-events-none rounded-xl bg-pink-900/70 px-4 py-2 font-bold text-slate-800"
                                                            onClick={() => {
                                                                setItem(item)
                                                                setShowFormComment(
                                                                    true
                                                                )
                                                            }}
                                                        >
                                                            {' '}
                                                            Đã đánh giá
                                                        </button>
                                                    </div>
                                                </Link>
                                            )
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <CommentForm
                        item={item}
                        orderId={order._id}
                        setShowFormComment={setShowFormComment}
                        setRefetch={setRefetch}
                    />
                )}
                <button
                    className="absolute top-1 right-1 p-1 hover:text-slate-400"
                    onClick={() => setShowComment(false)}
                >
                    <FontAwesomeIcon icon={faClose} className="h-8 w-8" />
                </button>
                {showFormComment && (
                    <button
                        className="absolute top-2 left-2 p-1 hover:text-slate-400"
                        onClick={() => setShowFormComment(false)}
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="h-6 w-6"
                        />
                    </button>
                )}
            </div>
        </div>
    )
}

export default CommentBox
