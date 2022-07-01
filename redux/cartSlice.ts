import { Product } from './../utils/typings.d'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'
import axios from 'axios'
import Cookies from 'js-cookie'

import { ToastContainer, toast } from 'react-toastify'

// declaring the types for our state
export type Cart = {
    products: {
        _id: string
        name: string
        slug: string
        category?: string
        childrenCategory?: string[]
        imageDefault: string
        countInStock: []
        price: number
        rating?: number
        size: number
        quantity: number
        isChecked: boolean
    }[]
}

const initialState: Cart = {
    products: Cookies.get('cartItems')
        ? JSON.parse(`${Cookies.get('cartItems')}`)
        : [],
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        cartAddItem: (state, action) => {
            const newItem = action.payload
            const existItem = state.products.find(
                (item) => item._id === newItem._id && item.size === newItem.size
            )
            existItem
                ? (existItem.quantity += newItem.quantity)
                : state.products.push(newItem)
            Cookies.set('cartItems', JSON.stringify(state.products))
        },
        deleteCartItem: (state, action) => {
            state.products = state.products.filter(
                (product) =>
                    product._id != action.payload._id ||
                    product.size != action.payload.size
            )
            Cookies.set('cartItems', JSON.stringify(state.products))
        },
        checkedItem: (state, action) => {
            const item = state.products.find(
                (product) =>
                    product._id === action.payload._id &&
                    product.size === action.payload.size
            )

            item!.isChecked = action.payload.checked
            Cookies.set('cartItems', JSON.stringify(state.products))
        },
        onApproveOrder: (state, action) => {
            state.products = state.products.filter(
                (product) => product.isChecked == false
            )
            Cookies.set('cartItems', JSON.stringify(state.products))
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(changeQuantity.fulfilled, (state, action) => {
                if (action.payload.message === 'Ok') {
                    const item = state.products.find(
                        (item) =>
                            item._id === action.payload._id &&
                            item.size === action.payload.size
                    )
                    item!.quantity = action.payload.quantity
                    console.log('ok')
                    Cookies.set('cartItems', JSON.stringify(state.products))
                } else toast.error('Số lượng trong kho không đủ!!!')
            })
            .addCase(changeSize.fulfilled, (state, action) => {
                if (action.payload.message === 'Ok') {
                    if (
                        state.products.find(
                            (item) =>
                                item._id === action.payload._id &&
                                item.size === action.payload.size
                        )
                    ) {
                        toast.error(
                            'Size của sản phẩm này đã có trong giỏ hàng!!!'
                        )
                        return
                    }
                    const item = state.products.find(
                        (item) => item._id === action.payload._id
                    )
                    item!.size = action.payload.size
                    Cookies.set('cartItems', JSON.stringify(state.products))
                } else toast.error('Số lượng trong kho không đủ!!!')
            })
    },
})

export const changeQuantity = createAsyncThunk(
    'cartSlice/changeQuantity',
    async ({ _id, size, quantity }: any) => {
        const res = await axios.post('/api/cart', {
            _id,
            size,
            quantity,
        })
        return { message: res.data.message, size, quantity, _id }
    }
)
export const changeSize = createAsyncThunk(
    'cartSlice/changeSize',
    async ({ _id, size, quantity }: any) => {
        const res = await axios.post('/api/cart', {
            _id,
            size,
            quantity,
        })
        return { message: res.data.message, size, quantity, _id }
    }
)
export const { cartAddItem, deleteCartItem, checkedItem, onApproveOrder } =
    cartSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default cartSlice.reducer
