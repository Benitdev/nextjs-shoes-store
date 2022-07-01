import Image from 'next/image'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faHeart } from '@fortawesome/free-solid-svg-icons'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
    changeQuantity,
    changeSize,
    deleteCartItem,
    checkedItem,
} from '../redux/cartSlice'

const CartItems = () => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.cart)
    return (
        <div className="flex-1">
            <h1 className="border-b-2 border-slate-300 indent-2 text-2xl font-bold capitalize tracking-widest text-slate-100">
                {' '}
                giỏ hàng{' '}
            </h1>
            <div className="mt-6 space-y-6 px-4">
                {cartItems.products.map((item, index) => (
                    <div
                        key={index}
                        className="relative grid grid-cols-6 gap-4 border-b-[1px] border-slate-200/40 pb-3 text-slate-200"
                    >
                        <input
                            type="checkbox"
                            className="absolute top-1/2 -left-10 h-6 w-6 -translate-y-1/2 cursor-pointer"
                            checked={item.isChecked}
                            onChange={(e) => {
                                dispatch(
                                    checkedItem({
                                        _id: item._id,
                                        size: item.size,
                                        checked: e.target.checked,
                                    })
                                )
                            }}
                        />
                        <div className="relative col-span-1 h-[120px] w-full overflow-hidden rounded-md">
                            <Image
                                src={`/images/products/${item.imageDefault}`}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <h4 className="text-xl font-bold">{item.name}</h4>
                            <div>
                                <label htmlFor="size">Size: </label>
                                <select
                                    name="size"
                                    className="ml-2 rounded-lg bg-slate-400/50 py-1 px-2 focus:ring-blue-500"
                                    value={item.size}
                                    onChange={(e) => {
                                        dispatch(
                                            changeSize({
                                                _id: item._id,
                                                size: e.target.value,
                                                quantity: item.quantity,
                                            })
                                        )
                                    }}
                                >
                                    {item.countInStock.map(
                                        ({ size, count }) => (
                                            <option
                                                key={size}
                                                value={size}
                                                className="bg-slate-600/40 text-slate-900 disabled:bg-slate-700/50"
                                                disabled={count === 0}
                                            >
                                                {' '}
                                                {size}{' '}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <p>
                                {item.price.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h4 className="underline underline-offset-2">
                                {' '}
                                Số Lượng{' '}
                            </h4>
                            <input
                                type="number"
                                value={item.quantity}
                                className="mx-auto w-16 rounded-lg bg-slate-400/50 px-2 text-center"
                                onChange={(e) => {
                                    if (
                                        e.target.value > '0' &&
                                        e.target.value &&
                                        !e.target.value.startsWith('0')
                                    )
                                        dispatch(
                                            changeQuantity({
                                                _id: item._id,
                                                size: item.size,
                                                quantity: e.target.value,
                                            })
                                        )
                                }}
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h4 className="underline underline-offset-2">
                                {' '}
                                Thành Tiền{' '}
                            </h4>
                            <p className="font-sans text-xl font-bold text-pink-500">
                                {(item.price * item.quantity).toLocaleString(
                                    'vi-VN',
                                    {
                                        style: 'currency',
                                        currency: 'VND',
                                    }
                                )}
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-4 px-6">
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="h-7 w-7 cursor-pointer hover:text-pink-500"
                            />
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className="h-7 w-7 cursor-pointer hover:text-slate-600"
                                onClick={() => {
                                    dispatch(
                                        deleteCartItem({
                                            _id: item._id,
                                            size: item.size,
                                        })
                                    )
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CartItems
