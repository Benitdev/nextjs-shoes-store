import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import OrderItems from './OrderItems'

const orderStates = [
    'chờ xác nhận',
    'chờ lấy hàng',
    'đang giao hàng',
    'đã giao',
    'đã huỷ',
]
const UserOrder = () => {
    const [orderState, setOrderState] = useState<number>(0)
    const [orders, setOrders] = useState([])
    const [refetch, setRefetch] = useState<boolean>(false)
    useEffect(() => {
        const fetchOrders = async () => {
            const { data } = await axios.get('/api/orders')
            setOrders(data)
        }
        fetchOrders()
    }, [refetch])
    return (
        <div className="mx-auto mt-10 max-h-[1000px] overflow-y-auto rounded-xl bg-slate-700/40 ">
            <div className="">
                <div className="flex border-b-[1px] border-slate-400">
                    {orderStates.map((state, index) => (
                        <button
                            key={index}
                            className={`flex-1 px-4 py-2 font-bold capitalize  transition duration-300 hover:bg-shop-orange  hover:text-slate-900 ${
                                orderState === index
                                    ? 'bg-shop-orange  text-slate-900'
                                    : 'text-slate-400'
                            }`}
                            onClick={() => setOrderState(index)}
                        >
                            {state}
                        </button>
                    ))}
                </div>
                <div className="space-y-2 p-3 px-4">
                    {orders.map(
                        (order: any) =>
                            order.orderState === orderState && (
                                <OrderItems
                                    order={order}
                                    key={order._id}
                                    setRefetch={setRefetch}
                                />
                            )
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserOrder
