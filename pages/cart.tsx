import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import DefaultLayout from '../components/layouts/DefaultLayout'
import CartItems from '../components/CartItems'
import CartSummary from '../components/CartSummary'
import WallHeader from '../components/WallHeader'
const Cart: NextPage = () => {
    return (
        <DefaultLayout title="BQ Store - Giỏ hàng">
            <div>
                <WallHeader category="Trang Giỏ Hàng" />
                <div className="mt-10 flex flex-col items-center justify-between gap-10 px-14 lg:flex-row lg:items-start">
                    <CartItems />
                    <CartSummary />
                </div>
            </div>
        </DefaultLayout>
    )
}
/* export async function getServerSideProps() {
   const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/products`)

    return {
        props: {
            products: data,
        },
    } 
} */

export default Cart
