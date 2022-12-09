import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import axios from 'axios'
import Link from 'next/link'

type Props = {}

const orderStates = [
    {
        title: 'chờ xác nhận',
        color: 'bg-shop-cyan',
    },
    {
        title: 'chờ lấy hàng',
        color: 'bg-shop-warning',
    },
    {
        title: 'đang giao hàng',
        color: 'bg-shop-blue',
    },
    {
        title: 'đã giao',
        color: 'bg-shop-success',
    },
    {
        title: 'đã huỷ',
        color: 'bg-shop-error',
    },
]
const Orders = (props: Props) => {
    const [rowData, setRowData] = useState<any>([])
    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders/get-all')
                console.log(data)
                setRowData(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchAllOrders()
    }, [])
    /*   const [columnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
    ]) */
    return (
        <div className="space-y-10 py-16 px-10">
            <h1 className="text-center text-3xl font-bold text-shop-orange">
                Danh sách đơn hàng
            </h1>
            <div className="ag-theme-alpine overflow-hidden rounded-xl bg-black/50 px-4 py-3 pb-10">
                <div className="grid grid-cols-5 rounded-xl bg-shop-orange/20 p-4 font-bold text-slate-100">
                    <span>Mã đơn hàng</span>
                    <span>Tên người dùng</span>
                    <span>Tổng tiền</span>
                    <span>Ngày đặt hàng</span>
                    <span>Trạng thái</span>
                </div>
                <div>
                    {rowData.map((row: any) => (
                        <Link href={`/admin/orders/${row._id}`}>
                            <a
                                key={row._id}
                                className="grid grid-cols-5 p-6 text-slate-300"
                            >
                                <span>{row._id}</span>
                                <span className="font-bold">
                                    {row.userInfo[0]?.name}
                                </span>
                                <span>{row.totalPrice}</span>
                                <span>{row.createdAt}</span>
                                <span>
                                    <button
                                        className={`0' } flex-1 rounded-xl bg-shop-orange/90  px-4 py-2 font-bold  capitalize text-slate-900 transition duration-300 ${
                                            orderStates[row.orderState]?.color
                                        }`}
                                    >
                                        {orderStates[row.orderState]?.title}
                                    </button>
                                </span>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders
